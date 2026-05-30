const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
    setup() {
        const { currentLang, theme, toggleLang, toggleTheme, applyThemeClasses } = window.initThemeAndLang();
        const t = computed(() => window.globalTranslations[currentLang.value]);

        const authenticated = ref(false);
        const passwordInput = ref('');
        const showPassword = ref(false); 
        const authLoading = ref(false);
        const authError = ref('');

        const specialties = ref([]);
        const searchQuery = ref('');
        
        // Оптимизация производительности: Бесконечный скролл (Lazy Loading)
        const displayLimit = ref(4); // Изначально рендерим только 15 блоков
        
        const localChanges = ref({}); 
        const saveLoading = ref(false);

        const loadManagerData = async () => {
            try {
                const response = await fetch('/api/admin/stats');
                const data = await response.json();
                specialties.value = data.ratings;
            } catch (err) {
                console.error("Ошибка получения данных менеджера:", err);
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
                        role: 'manager',
                        password: trimmedPass
                    })
                });
                const res = await response.json();
                if (res.status === 'success') {
                    window.authSession.save('manager', trimmedPass);
                    sessionStorage.setItem('manager_password', trimmedPass);
                    authenticated.value = true;
                    await loadManagerData();
                    setupScrollListener();
                } else {
                    authError.value = res.message || "Неверный пароль";
                }
            } catch (err) {
                authError.value = "Ошибка связи с сервером";
            } finally {
                authLoading.value = false;
            }
        };

        const checkSavedSession = async () => {
            const savedPassword = window.authSession.get('manager');
            if (savedPassword) {
                try {
                    const response = await fetch('/api/auth/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ role: 'manager', password: savedPassword })
                    });
                    const res = await response.json();
                    if (res.status === 'success') {
                        sessionStorage.setItem('manager_password', savedPassword);
                        authenticated.value = true;
                        await loadManagerData();
                        setupScrollListener();
                    } else {
                        window.authSession.clear('manager');
                    }
                } catch (e) {
                    console.error("Ошибка фоновой проверки сессии:", e);
                }
            }
        };

        const filteredSpecialties = computed(() => {
            if (!searchQuery.value) return specialties.value;
            const q = searchQuery.value.toLowerCase();
            return specialties.value.filter(s => 
                s.code.toLowerCase().includes(q) || 
                s.spec_name.toLowerCase().includes(q) ||
                s.supervisor_name.toLowerCase().includes(q)
            );
        });

        // Срез для отображения (рендерит только видимую часть)
        const visibleSpecialties = computed(() => {
            return filteredSpecialties.value.slice(0, displayLimit.value);
        });

        // Бесконечная ленивая загрузка
        const handleInfiniteScroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 150) {
                if (displayLimit.value < filteredSpecialties.value.length) {
                    displayLimit.value += 3; // Подгружаем строго по 3 штуки при скролле к низу
                }
            }
        };

        const setupScrollListener = () => {
            window.addEventListener('scroll', handleInfiniteScroll);
        };

        const getKSrokiValue = (specId) => {
            if (localChanges.value[specId] !== undefined) {
                return localChanges.value[specId];
            }
            const spec = specialties.value.find(s => s.id === specId);
            return spec ? spec.k_sroki : 0;
        };

        const setKSrokiLocal = (specId, value) => {
            localChanges.value[specId] = value;
        };

        const hasChanges = computed(() => {
            return Object.keys(localChanges.value).length > 0;
        });

        const showSuccessToast = () => {
            const toast = document.getElementById('toast');
            if (toast) {
                toast.classList.add('toast-notification-show');
                setTimeout(() => {
                    toast.classList.remove('toast-notification-show');
                }, 3000);
            }
        };

        const saveAllManagerData = async () => {
            if (!hasChanges.value) return;
            saveLoading.value = true;
            try {
                for (const [specId, value] of Object.entries(localChanges.value)) {
                    await fetch('/api/vote/admin', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'X-Password': sessionStorage.getItem('manager_password')
                        },
                        body: JSON.stringify({
                            specialty_id: parseInt(specId),
                            k_sroki: value
                        })
                    });
                }
                
                await loadManagerData();
                localChanges.value = {};
                showSuccessToast(); // Вызываем красивый анимированный тост вместо алерта!
            } catch (err) {
                console.error("Ошибка пакетного сохранения:", err);
                alert("Произошла ошибка при сохранении данных.");
            } finally {
                saveLoading.value = false;
            }
        };

        onUnmounted(() => {
            window.removeEventListener('scroll', handleInfiniteScroll);
        });

        onMounted(() => {
            applyThemeClasses();
            checkSavedSession();
        });

        return {
            currentLang,
            theme,
            toggleLang,
            toggleTheme,
            t,
            authenticated,
            passwordInput,
            showPassword,
            authLoading,
            authError,
            verifyPassword,
            searchQuery,
            filteredSpecialties,
            visibleSpecialties,
            getKSrokiValue,
            setKSrokiLocal,
            hasChanges,
            saveAllManagerData,
            saveLoading
        };
    }
}).mount('#app');