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

        const specialties = ref([]);
        const searchQuery = ref('');
        
        // Локальное хранилище изменений перед сохранением
        const localChanges = ref({}); // { spec_id: value }
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
                    sessionStorage.setItem('manager_password', trimmedPass);
                    authenticated.value = true;
                    await loadManagerData();
                } else {
                    authError.value = res.message || "Неверный пароль";
                }
            } catch (err) {
                authError.value = "Ошибка связи с сервером";
            } finally {
                authLoading.value = false;
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

        // Получить текущее значение (учитывая локальные несохраненные изменения)
        const getKSrokiValue = (specId) => {
            if (localChanges.value[specId] !== undefined) {
                return localChanges.value[specId];
            }
            const spec = specialties.value.find(s => s.id === specId);
            return spec ? spec.k_sroki : 0;
        };

        // Запись изменений локально без отправки на сервер
        const setKSrokiLocal = (specId, value) => {
            localChanges.value[specId] = value;
        };

        // Есть ли несохраненные изменения
        const hasChanges = computed(() => {
            return Object.keys(localChanges.value).length > 0;
        });

        // Сохранить все накопленные изменения одним кликом на сервер
        const saveAllManagerData = async () => {
            if (!hasChanges.value) return;
            saveLoading.value = true;
            try {
                // Отправляем все локальные изменения по очереди
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
                
                // Перезагружаем свежие данные с бэкенда
                await loadManagerData();
                // Очищаем локальный буфер изменений
                localChanges.value = {};
                alert("Все изменения K_сроки успешно сохранены на сервере!");
            } catch (err) {
                console.error("Ошибка пакетного сохранения:", err);
                alert("Произошла ошибка при сохранении данных.");
            } finally {
                saveLoading.value = false;
            }
        };

        onMounted(() => {
            applyThemeClasses();
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
            getKSrokiValue,
            setKSrokiLocal,
            hasChanges,
            saveAllManagerData,
            saveLoading
        };
    }
}).mount('#app');