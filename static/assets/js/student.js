const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        const specialties = ref([]);
        const searchQuery = ref('');
        const showDropdown = ref(false);
        const selectedSpec = ref(null);
        const loading = ref(false);
        const submitted = ref(false);

        // Оценки по вопросам
        const answers = ref({
            q1: null,
            q2: null,
            q3: null,
            q4: null,
            q5: null
        });

        const questions = [
            { text: "Руководитель образовательной программы помогает мне с адаптацией к образовательному процессу в университете; он(она) дает понятные и полезные ответы на организационные вопросы." },
            { text: "Руководитель образовательной программы информирует о дополнительных возможностях (участии в конкурсах/конференциях/проектах, о перспективных образовательных траекториях и программах дополнительного образования, др.), исходя из моих образовательных и профессиональных интересов." },
            { text: "Консультации руководителя образовательной программы перед практикой были полезны, и я был(а) уверен(а), что в случае возникновения проблем могу обратиться к нему(ней) за оперативной помощью." },
            { text: "Руководитель образовательной программы лично активно участвует в организации профориентационных мероприятий (лекций с приглашенными экспертами, экскурсий на предприятия, встреч с успешными выпускниками программы и др.), делая их интересными и полезными для моего профессионального роста." },
            { text: "В общении с руководителем образовательной программы нет равнодушия; я всегда уверен(а), что получу не просто формальный ответ, а реальную поддержку и совет." }
        ];

        const scoreLabels = {
            2: "Однозначно нет",
            3: "Скорее нет, чем да",
            4: "Скорее да, чем нет",
            5: "Однозначно да"
        };

        // Загрузка специальностей с бэкенда
        onMounted(async () => {
            try {
                const response = await fetch('/api/specialties');
                specialties.value = await response.json();
            } catch (error) {
                console.error("Ошибка при получении списка направлений:", error);
            }
        });

        // Реактивный поиск/фильтрация
        const filteredSpecialties = computed(() => {
            if (!searchQuery.value) return [];
            const q = searchQuery.value.toLowerCase();
            return specialties.value.filter(s => 
                s.code.toLowerCase().includes(q) || 
                s.name.toLowerCase().includes(q) ||
                s.supervisor_name.toLowerCase().includes(q)
            );
        });

        const selectSpecialty = (spec) => {
            selectedSpec.value = spec;
            searchQuery.value = `${spec.code} ${spec.name}`;
            showDropdown.value = false;
        };

        // Проверка заполненности анкеты
        const isFormValid = computed(() => {
            return selectedSpec.value && 
                   answers.value.q1 && 
                   answers.value.q2 && 
                   answers.value.q3 && 
                   answers.value.q4 && 
                   answers.value.q5;
        });

        // Отправка голоса на бэкенд
        const submitVote = async () => {
            if (!isFormValid.value) return;
            loading.value = true;
            try {
                const response = await fetch('/api/vote/student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        specialty_id: selectedSpec.value.id,
                        ...answers.value
                    })
                });
                const res = await response.json();
                if (res.status === 'success') {
                    submitted.value = true;
                } else {
                    alert("Произошла ошибка при сохранении голоса");
                }
            } catch (err) {
                console.error(err);
                alert("Ошибка отправки данных на сервер");
            } finally {
                loading.value = false;
            }
        };

        return {
            searchQuery,
            showDropdown,
            filteredSpecialties,
            selectedSpec,
            selectSpecialty,
            questions,
            scoreLabels,
            answers,
            isFormValid,
            loading,
            submitted,
            submitVote
        };
    }
}).mount('#app');