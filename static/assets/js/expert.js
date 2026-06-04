const { createApp, ref, computed, onMounted, watch } = Vue;

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
        const deansList = ref([]);
        const hodsList = ref([]);

        const roleType = ref('dean'); 
        const selectedEvaluator = ref('');
        const searchQuery = ref('');
        const showDropdown = ref(false);
        const selectedSpec = ref(null);
        const loading = ref(false);
        const submitted = ref(false);

        // ИСПРАВЛЕНО: стейт выбранной оцениваемой роли для ВШУ
        const selectedRoleType = ref(''); // 'admin' или 'nast'

        const nastAnswers = ref([null, null, null, null]); 
        const adminAnswers = ref([null, null, null]);      

        const questionsDB = {
            dean: {
                nast: [
                    "Вопрос 1. Вклад в общеинститутскую систему адаптации: участие в адаптации обучающихся к организационно-педагогическим условиям реализации ОПОП и особенностям образовательного процесса в университете.",
                    "Вопрос 2. Содействие развитию индивидуальных образовательных траекторий и инновационной проектной деятельности в Институте/Высшей школе: выбор факультативных дисциплин, программ ДПО, инновационных форматов ВКР.",
                    "Вопрос 3. Участие в организации и реализации профессионально ориентированных мероприятий/проектов для обучающихся ОПОП и абитуриентов.",
                    "Вопрос 4. Обеспечение координации действий между выпускающей кафедрой, деканатом и другими структурными подразделениями."
                ],
                admin: [
                    "Вопрос 1. Обеспечение бесперебойности учебного процесса: Работа администратора ОПОП предотвращает сбои в учебном процессе в Институте/Высшей школе, связанные с документационным обеспечением (своевременное оформление рабочих программ практик, ГИА).",
                    "Вопрос 2. Координация между выпускающей кафедрой и Управлением по формированию и оценке качества образования: Администратор ОПОП эффективно координирует взаимодействие между выпускающей кафедрой и Управлением по формированию и оценке качества образования по вопросам разработки и актуализации ОПОП.",
                    "Вопрос 3. Вклад в обеспечение качества программы: Администратор ОПОП обеспечивает подготовку документов, которые служат надежной основой для образовательного процесса и позитивно характеризуют программу при внутреннем и внешнем аудите."
                ]
            },
            hod: {
                nast: [
                    "Вопрос 1. Участие в адаптации студентов 1-го года обучения.",
                    "Вопрос 2. Консультирование по организационным вопросам и индивидуальным образовательным траекториям.",
                    "Вопрос 3. Организация консультаций и решение организационных вопросов, связанных с прохождением практики.",
                    "Вопрос 4. Участие в организации и реализации профессионально ориентированных образовательных мероприятий."
                ],
                admin: [
                    "Вопрос 1. Качество и точность материалов: Учебно-методические материалы к практикам, курсовому проектированию и ГИА подготовлены без ошибок, полностью соответствуют внутренним правилам университета.",
                    "Вопрос 2. Оперативность решения текущих вопросов: Запросы с кафедры (справки, копии документов, внесение изменений) выполняются в кратчайшие сроки.",
                    "Вопрос 3. Надежность и ответственность: На администратора ОПОП можно положиться в сроках и качестве выполнения порученных кафедрой задач."
                ]
            }
        };

        const loadInitialData = async () => {
            try {
                const specRes = await fetch('/api/specialties');
                specialties.value = await specRes.json();

                const expRes = await fetch('/api/experts');
                const data = await expRes.json();
                deansList.value = data.deans;
                hodsList.value = data.hods;
            } catch (err) {
                console.error("Ошибка загрузки справочников:", err);
            }
        };

        watch(roleType, () => {
            selectedEvaluator.value = '';
        });

        // Сброс ответов и роли при смене специальности
        watch(selectedSpec, () => {
            selectedRoleType.value = '';
            nastAnswers.value = [null, null, null, null];
            adminAnswers.value = [null, null, null];
        });

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
                        role: 'expert',
                        password: trimmedPass
                    })
                });
                const res = await response.json();
                if (res.status === 'success') {
                    window.authSession.save('expert', trimmedPass);
                    sessionStorage.setItem('expert_password', trimmedPass);
                    authenticated.value = true;
                    await loadInitialData();
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
            const savedPassword = window.authSession.get('expert');
            if (savedPassword) {
                try {
                    const response = await fetch('/api/auth/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ role: 'expert', password: savedPassword })
                    });
                    const res = await response.json();
                    if (res.status === 'success') {
                        sessionStorage.setItem('expert_password', savedPassword);
                        authenticated.value = true;
                        await loadInitialData();
                    } else {
                        window.authSession.clear('expert');
                    }
                } catch (e) {
                    console.error("Ошибка фоновой проверки сессии:", e);
                }
            }
        };


        const setRole = (role) => {
            roleType.value = role;
        };

        const currentEvaluatorsList = computed(() => {
            return roleType.value === 'dean' ? deansList.value : hodsList.value;
        });

        const currentQuestions = computed(() => {
            return questionsDB[roleType.value];
        });

        const filteredSpecialties = computed(() => {
            if (!searchQuery.value) return [];
            const q = searchQuery.value.toLowerCase();
            return specialties.value.filter(s => 
                s.code.toLowerCase().includes(q) || 
                s.name.toLowerCase().includes(q)
            );
        });

        const selectSpecialty = (spec) => {
            selectedSpec.value = spec;
            searchQuery.value = `${spec.code} ${spec.name}`;
            showDropdown.value = false;
        };

        // ИСПРАВЛЕНО: Умная валидация полей в зависимости от разделения ОПОП ВШУ
        const isFormValid = computed(() => {
            if (!selectedSpec.value || !selectedEvaluator.value) return false;
            
            if (selectedSpec.value.has_split_roles) {
                if (selectedRoleType.value === 'nast') {
                    return nastAnswers.value.every(v => v !== null);
                } else if (selectedRoleType.value === 'admin') {
                    return adminAnswers.value.every(v => v !== null);
                }
                return false;
            } else {
                const nastFilled = nastAnswers.value.every(v => v !== null);
                const adminFilled = adminAnswers.value.every(v => v !== null);
                return nastFilled && adminFilled;
            }
        });

        // ИСПРАВЛЕНО: Формирование частичной отправки результатов в зависимости от разделения ОПОП
        const submitEvaluation = async () => {
            if (!isFormValid.value) return;
            loading.value = true;
            
            const payload = {
                specialty_id: selectedSpec.value.id,
                evaluator_name: selectedEvaluator.value,
                role_type: roleType.value,
                nast_q1: null, nast_q2: null, nast_q3: null, nast_q4: null,
                admin_q1: null, admin_q2: null, admin_q3: null
            };

            if (selectedSpec.value.has_split_roles) {
                if (selectedRoleType.value === 'nast') {
                    payload.nast_q1 = nastAnswers.value[0];
                    payload.nast_q2 = nastAnswers.value[1];
                    payload.nast_q3 = nastAnswers.value[2];
                    payload.nast_q4 = nastAnswers.value[3];
                } else if (selectedRoleType.value === 'admin') {
                    payload.admin_q1 = adminAnswers.value[0];
                    payload.admin_q2 = adminAnswers.value[1];
                    payload.admin_q3 = adminAnswers.value[2];
                }
            } else {
                payload.nast_q1 = nastAnswers.value[0];
                payload.nast_q2 = nastAnswers.value[1];
                payload.nast_q3 = nastAnswers.value[2];
                payload.nast_q4 = nastAnswers.value[3];
                payload.admin_q1 = adminAnswers.value[0];
                payload.admin_q2 = adminAnswers.value[1];
                payload.admin_q3 = adminAnswers.value[2];
            }

            try {
                const response = await fetch('/api/vote/expert', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'X-Password': sessionStorage.getItem('expert_password')
                    },
                    body: JSON.stringify(payload)
                });
                
                if (response.status === 401) {
                    alert("Сессия истекла или неверный пароль. Обновите страницу.");
                    return;
                }

                const res = await response.json();
                if (res.status === 'success') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    setTimeout(() => {
                        submitted.value = true;
                    }, 400);
                } else {
                    alert("Ошибка сохранения результатов");
                }
            } catch (err) {
                console.error(err);
                alert("Ошибка отправки данных");
            } finally {
                loading.value = false;
            }
        };

        const resetForm = () => {
            selectedSpec.value = null;
            selectedRoleType.value = '';
            searchQuery.value = '';
            nastAnswers.value = [null, null, null, null];
            adminAnswers.value = [null, null, null];
            submitted.value = false;
        };

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
            roleType,
            setRole,
            selectedEvaluator,
            currentEvaluatorsList,
            searchQuery,
            showDropdown,
            filteredSpecialties,
            selectSpecialty,
            selectedSpec,
            selectedRoleType, // Экспортируем новый стейт во фронтенд!
            currentQuestions,
            nastAnswers,
            adminAnswers,
            isFormValid,
            loading,
            submitted,
            submitEvaluation,
            resetForm
        };
    }
}).mount('#app');