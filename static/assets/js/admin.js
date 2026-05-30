const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        const { currentLang, theme, applyThemeClasses } = window.initThemeAndLang();
        const t = computed(() => window.globalTranslations[currentLang.value]);

        const authenticated = ref(false);
        const passwordInput = ref('');
        const showPassword = ref(false);
        const authLoading = ref(false);
        const authError = ref('');

        const stats = ref({ students_voted: 0, deans_voted: 0, hods_voted: 0 });
        const instToday = ref([]); 
        const ratings = ref([]);
        const searchQuery = ref('');
        const selectedInstitute = ref('');

        const showAllLeaders = ref(false);
        const showAllInstitutes = ref(false);

        // Стейты сброса БД перед релизом
        const resetConfirmPassword = ref('');
        const showResetPassword = ref(false);
        const resetLoading = ref(false);

        const renderMiniChart = (canvasId, yesterdayCurve, todayCurve) => {
            const ctx = document.getElementById(canvasId);
            if (!ctx) return;
            
            const todayColor = '#000000';
            const yesterdayColor = 'rgba(0, 0, 0, 0.15)';

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['12:00', '15:00', '18:00', '24:00'],
                    datasets: [
                        {
                            label: 'Вчера',
                            data: yesterdayCurve,
                            borderColor: yesterdayColor,
                            borderWidth: 2,
                            fill: false,
                            tension: 0.3,
                            pointRadius: 2,
                            pointBackgroundColor: yesterdayColor
                        },
                        {
                            label: 'Сегодня',
                            data: todayCurve,
                            borderColor: todayColor,
                            borderWidth: 2.5,
                            fill: false,
                            tension: 0.3,
                            pointRadius: 3,
                            pointBackgroundColor: todayColor
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }
                }
            });
        };

        const loadAdminData = async () => {
            try {
                const response = await fetch('/api/admin/stats');
                const data = await response.json();
                stats.value = data.stats;
                instToday.value = data.inst_today;
                ratings.value = data.ratings;

                setTimeout(() => {
                    renderMiniChart('chart-students', data.stats.students_yesterday_curve, data.stats.students_today_curve);
                    renderMiniChart('chart-deans', data.stats.deans_yesterday_curve, data.stats.deans_today_curve);
                    renderMiniChart('chart-hods', data.stats.hods_yesterday_curve, data.stats.hods_today_curve);
                }, 100);

            } catch (err) {
                console.error("Ошибка загрузки сводных данных админки:", err);
            }
        };

        const verifyPassword = async () => {
            const trimmedPass = passwordInput.value.trim();
            if (!trimmedPass) return;
            authLoading.value = true;
            authError.value = '';
            try {
                const response = await fetch('/api/auth/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        role: 'admin',
                        password: trimmedPass
                    })
                });
                const res = await response.json();
                if (res.status === 'success') {
                    window.authSession.save('admin', trimmedPass);
                    sessionStorage.setItem('admin_password', trimmedPass);
                    authenticated.value = true;
                    await loadAdminData();
                } else {
                    authError.value = res.message || "Неверный пароль";
                }
            } catch (err) {
                authError.value = "Ошибка связи с сервером";
            } finally {
                authLoading.value = false;
            }
        };

        // Запуск безопасного сброса оценок
        const resetDatabase = async () => {
            const trimmedPass = resetConfirmPassword.value.trim();
            if (!trimmedPass) return;
            
            const confirmed = confirm("Вы уверены, что хотите безвозвратно удалить ВСЕ оценки? Это действие нельзя отменить!");
            if (!confirmed) return;

            resetLoading.value = true;
            const adminPassword = sessionStorage.getItem('admin_password');
            try {
                const response = await fetch('/api/admin/reset_db', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'X-Password': adminPassword
                    },
                    body: JSON.stringify({
                        confirm_password: trimmedPass
                    })
                });

                if (response.status === 401) {
                    alert("Сессия истекла. Перезагрузите страницу.");
                    return;
                }

                const res = await response.json();
                if (response.status === 200) {
                    resetConfirmPassword.value = '';
                    await loadAdminData();
                    alert("База данных успешно очищена! Все оценки сброшены к нулю, система готова к релизу.");
                } else {
                    alert(res.detail || "Неверный пароль подтверждения сброса");
                }
            } catch (err) {
                console.error("Ошибка при сбросе БД:", err);
                alert("Ошибка связи с сервером.");
            } finally {
                resetLoading.value = false;
            }
        };

        const visibleLeaders = computed(() => {
            const sorted = [...ratings.value].sort((a, b) => b.r_a - a.r_a);
            return showAllLeaders.value ? sorted : sorted.slice(0, 3);
        });

        const visibleInstitutes = computed(() => {
            return showAllInstitutes.value ? instToday.value : instToday.value.slice(0, 3);
        });

        const uniqueInstitutes = computed(() => {
            const set = new Set(ratings.value.map(r => r.institute));
            return Array.from(set).filter(Boolean).sort();
        });

        const filteredRatings = computed(() => {
            let list = ratings.value;
            
            if (selectedInstitute.value) {
                list = list.filter(r => r.institute === selectedInstitute.value);
            }

            if (searchQuery.value) {
                const q = searchQuery.value.toLowerCase();
                list = list.filter(r => 
                    r.code.toLowerCase().includes(q) || 
                    r.spec_name.toLowerCase().includes(q) ||
                    r.supervisor_name.toLowerCase().includes(q)
                );
            }

            return list;
        });

        const downloadCSV = async () => {
            const password = sessionStorage.getItem('admin_password');
            try {
                const response = await fetch('/api/admin/export/csv', {
                    headers: { 'X-Password': password }
                });
                
                if (response.status === 401) {
                    alert("Сессия истекла или пароль не прошел проверку безопасности на сервере.");
                    return;
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = "opop_ratings.csv";
                document.body.appendChild(a);
                a.click();
                a.remove();
            } catch (err) {
                console.error("Ошибка скачивания отчета:", err);
                alert("Ошибка генерации файла отчета");
            }
        };

        const checkSavedSession = async () => {
            const savedPassword = window.authSession.get('admin');
            if (savedPassword) {
                try {
                    const response = await fetch('/api/auth/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ role: 'admin', password: savedPassword })
                    });
                    const res = await response.json();
                    if (res.status === 'success') {
                        sessionStorage.setItem('admin_password', savedPassword);
                        authenticated.value = true;
                        await loadAdminData();
                    } else {
                        window.authSession.clear('admin');
                    }
                } catch (e) {
                    console.error("Ошибка фоновой проверки сессии:", e);
                }
            }
        };

        onMounted(() => {
            document.documentElement.classList.remove('dark');
            checkSavedSession();
        });

        return {
            currentLang,
            theme,
            t,
            authenticated,
            passwordInput,
            showPassword,
            authLoading,
            authError,
            verifyPassword,
            stats,
            instToday,
            showAllLeaders,
            showAllInstitutes,
            visibleLeaders,
            visibleInstitutes,
            searchQuery,
            selectedInstitute,
            uniqueInstitutes,
            filteredRatings,
            downloadCSV,
            resetConfirmPassword,
            showResetPassword,
            resetLoading,
            resetDatabase
        };
    }
}).mount('#app');