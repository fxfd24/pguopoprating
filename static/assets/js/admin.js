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
        const ratings = ref([]);
        const searchQuery = ref('');
        const selectedInstitute = ref('');

        const loadAdminData = async () => {
            try {
                const response = await fetch('/api/admin/stats');
                const data = await response.json();
                stats.value = data.stats;
                ratings.value = data.ratings;
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

        // Извлекаем список уникальных институтов для фильтра
        const uniqueInstitutes = computed(() => {
            const set = new Set(ratings.value.map(r => r.institute));
            return Array.from(set).filter(Boolean).sort();
        });

        // Фильтрация данных
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

        // Прямая защищенная выгрузка CSV на компьютер
        const downloadCSV = async () => {
            const password = sessionStorage.getItem('admin_password');
            try {
                const response = await fetch('/api/admin/export/csv', {
                    headers: {
                        'X-Password': password
                    }
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

        onMounted(() => {
            applyThemeClasses();
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
            searchQuery,
            selectedInstitute,
            uniqueInstitutes,
            filteredRatings,
            downloadCSV
        };
    }
}).mount('#app');