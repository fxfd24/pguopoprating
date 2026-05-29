const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        const { currentLang, theme, toggleLang, toggleTheme, applyThemeClasses } = window.initThemeAndLang();
        const t = computed(() => window.globalTranslations[currentLang.value]);

        const specialties = ref([]);
        const searchQuery = ref('');
        const showDropdown = ref(false);
        const selectedSpec = ref(null);
        const loading = ref(false);
        const submitted = ref(false);

        const answers = ref({ q1: null, q2: null, q3: null, q4: null, q5: null });

        // Мультиязычные вопросы для студентов
        const studentQuestions = {
            ru: [
                "Руководитель образовательной программы помогает мне с адаптацией к образовательному процессу в университете; он(она) дает понятные и полезные ответы на организационные вопросы.",
                "Руководитель образовательной программы информирует о дополнительных возможностях (участии в конкурсах/конференциях/проектах, о перспективных образовательных траекториях и программах дополнительного образования, др.), исходя из моих образовательных и профессиональных интересов.",
                "Консультации руководителя образовательной программы перед практикой были полезны, и я был(а) уверен(а), что в случае возникновения проблем могу обратиться к нему(ней) за оперативной помощью.",
                "Руководитель образовательной программы лично активно участвует в организации профориентационных мероприятий (лекций с приглашенными экспертами, экскурсий на предприятия, встреч с успешными выпускниками программы и др.), делая их интересными и полезными для моего профессионального роста.",
                "В общении с руководителем образовательной программы нет равнодушия; я всегда уверен(а), что получу не просто формальный ответ, а реальную поддержку и совет."
            ],
            en: [
                "The Educational Program Supervisor helps me adapt to the university educational process; he/she provides clear and useful answers to organizational questions.",
                "The Educational Program Supervisor informs me of additional opportunities (participation in contests/conferences/projects, prospective educational trajectories, and supplementary education, etc.) based on my educational and professional interests.",
                "The consultations with the Educational Program Supervisor before my practical training were helpful, and I was confident that in case of any issues, I could reach out to him/her for quick support.",
                "The Educational Program Supervisor personally actively participates in organizing professional orientation activities (guest expert lectures, field trips to enterprises, meetings with successful alumni, etc.), making them interesting and useful for my professional growth.",
                "There is no indifference in communication with the Educational Program Supervisor; I am always confident that I will get not just a formal response, but real support and advice."
            ]
        };

        const questions = computed(() => studentQuestions[currentLang.value]);

        const scoreLabelsMap = {
            ru: { 2: "Однозначно нет", 3: "Скорее нет", 4: "Скорее да", 5: "Однозначно да" },
            en: { 2: "Definitely no", 3: "Rather no", 4: "Rather yes", 5: "Definitely yes" }
        };

        const scoreLabels = computed(() => scoreLabelsMap[currentLang.value]);

        onMounted(async () => {
            applyThemeClasses();
            try {
                const response = await fetch('/api/specialties');
                specialties.value = await response.json();
            } catch (error) {
                console.error("Ошибка при получении списка направлений:", error);
            }
        });

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

        const isFormValid = computed(() => {
            return selectedSpec.value && 
                   answers.value.q1 && answers.value.q2 && answers.value.q3 && answers.value.q4 && answers.value.q5;
        });

        const submitVote = async () => {
            if (!isFormValid.value) return;
            loading.value = true;
            try {
                const response = await fetch('/api/vote/student', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        specialty_id: selectedSpec.value.id,
                        ...answers.value
                    })
                });
                const res = await response.json();
                if (res.status === 'success') {
                    submitted.value = true;
                } else {
                    alert("Произошла ошибка при сохранении голоса / Error saving vote");
                }
            } catch (err) {
                console.error(err);
                alert("Ошибка отправки данных / Data transmission error");
            } finally {
                loading.value = false;
            }
        };

        return {
            currentLang,
            theme,
            toggleLang,
            toggleTheme,
            t,
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