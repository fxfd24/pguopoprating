const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        // Инициализируем язык и тему
        const { currentLang, theme, toggleLang, toggleTheme, applyThemeClasses } = window.initThemeAndLang();
        const t = computed(() => window.globalTranslations[currentLang.value]);

        const authenticated = ref(false);
        const passwordInput = ref('');
        const authLoading = ref(false);
        const authError = ref('');

        const specialties = ref([]);
        const searchQuery = ref('');
        const savedStatus = ref({}); 

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
            if (!passwordInput.value) return;
            authLoading.value = true;
            authError.value = '';
            try {
                const response = await fetch('/api/auth/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        role: 'manager',
                        password: passwordInput.value
                    })
                });
                const res = await response.json();
                if (res.status === 'success') {
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

        const getKSrokiValue = (specId) => {
            const spec = specialties.value.find(s => s.id === specId);
            return spec ? spec.k_sroki : 0;
        };

        const saveKSroki = async (specId, value) => {
            try {
                const response = await fetch('/api/vote/admin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        specialty_id: specId,
                        k_sroki: value
                    })
                });
                const res = await response.json();
                if (res.status === 'success') {
                    const spec = specialties.value.find(s => s.id === specId);
                    if (spec) spec.k_sroki = value;
                    savedStatus.value[specId] = true;
                    setTimeout(() => {
                        savedStatus.value[specId] = false;
                    }, 1500);
                }
            } catch (err) {
                console.error("Ошибка сохранения k_sroki:", err);
                alert("Ошибка сохранения оценки на сервере");
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
            authLoading,
            authError,
            verifyPassword,
            searchQuery,
            filteredSpecialties,
            getKSrokiValue,
            saveKSroki,
            savedStatus
        };
    }
}).mount('#app');