const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        const authenticated = ref(false);
        const passwordInput = ref('');
        const authLoading = ref(false);
        const authError = ref('');

        const specialties = ref([]);
        const searchQuery = ref('');
        const savedStatus = ref({}); // статус автосохранения { spec_id: true/false }

        // Загрузка специальностей и уже существующих оценок
        const loadManagerData = async () => {
            try {
                // Загружаем данные из API статистики, так как там лежат и k_sroki, и инфо по программам
                const response = await fetch('/api/admin/stats');
                const data = await response.json();
                
                // Переносим данные о специальностях
                specialties.value = data.ratings;
            } catch (err) {
                console.error("Ошибка получения данных менеджера:", err);
            }
        };

        // Проверка пароля на бэкенде
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

        // Поиск/фильтрация по списку в таблице
        const filteredSpecialties = computed(() => {
            if (!searchQuery.value) return specialties.value;
            const q = searchQuery.value.toLowerCase();
            return specialties.value.filter(s => 
                s.code.toLowerCase().includes(q) || 
                s.spec_name.toLowerCase().includes(q) ||
                s.supervisor_name.toLowerCase().includes(q)
            );
        });

        // Получить текущее значение k_sroki для отрисовки активной кнопки
        const getKSrokiValue = (specId) => {
            const spec = specialties.value.find(s => s.id === specId);
            return spec ? spec.k_sroki : 0;
        };

        // Сохранить оценку в фоне при клике (автосохранение)
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
                    // Обновляем локальное состояние оценки, чтобы кнопка сразу загорелась фиолетовым
                    const spec = specialties.value.find(s => s.id === specId);
                    if (spec) spec.k_sroki = value;

                    // Показываем галочку "Сохранено"
                    savedStatus.value[specId] = true;
                    
                    // Скрываем её через 1.5 секунды
                    setTimeout(() => {
                        savedStatus.value[specId] = false;
                    }, 1500);
                }
            } catch (err) {
                console.error("Ошибка сохранения k_sroki:", err);
                alert("Ошибка сохранения оценки на сервере");
            }
        };

        return {
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