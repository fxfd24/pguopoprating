const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        const { currentLang, theme, toggleLang, toggleTheme, applyThemeClasses } = window.initThemeAndLang();
        const t = computed(() => window.globalTranslations[currentLang.value]);

        const authenticated = ref(false);
        const passwordInput = ref('');
        const showPassword = ref(false);
        const authLoading = ref(false);
        const authError = ref('');

        const stats = ref({ students_voted: 0, deans_voted: 0, hods_voted: 0 });
        const instToday = ref([]); // Активность институтов за сегодня
        const ratings = ref([]);
        const searchQuery = ref('');
        const selectedInstitute = ref('');

        // Функция построения микро-графиков трендов
        const renderMiniChart = (canvasId, dataTrend) => {
            const ctx = document.getElementById(canvasId);
            if (!ctx) return;
            
            // Настройки цветов линии под темную и светлую тему
            const isDark = document.documentElement.classList.contains('dark');
            const lineColor = isDark ? '#6366f1' : '#4f46e5';

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Вчера', 'Сегодня', 'Прогноз'],
                    datasets: [
                        {
                            data: [dataTrend[0], dataTrend[1], dataTrend[1]], // Фактическая линия
                            borderColor: lineColor,
                            borderWidth: 2,
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0
                        },
                        {
                            data: [null, dataTrend[1], dataTrend[2]], // Пунктирная линия прогнозирования
                            borderColor: lineColor,
                            borderWidth: 2,
                            borderDash: [4, 4],
                            fill: false,
                            tension: 0.3,
                            pointRadius: 3,
                            pointBackgroundColor: lineColor
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

                // Строим микро-графики
                setTimeout(() => {
                    renderMiniChart('chart-students', data.stats.students_trend);
                    renderMiniChart('chart-deans', data.stats.deans_trend);
                    renderMiniChart('chart-hods', data.stats.hods_trend);
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

        // Топ-3 лидера-руководителя по коэффициенту R_A
        const topLeaders = computed(() => {
            return [...ratings.value]
                .sort((a, b) => b.r_a - a.r_a)
                .slice(0, 3);
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
            topLeaders,
            searchQuery,
            selectedInstitute,
            uniqueInstitutes,
            filteredRatings,
            downloadCSV
        };
    }
}).mount('#app');