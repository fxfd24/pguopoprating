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

        // ---- СЛОВАРЬ ПЕРЕВОДА ДИСЦИПЛИН ----
        const specialtyTranslations = {
            "Обеспечение информационной безопасности автоматизированных систем": "Information Security of Automated Systems",
            "Страховое дело (по отраслям)": "Insurance Business (by industry)",
            "Банковское дело": "Banking",
            "Экономическая безопасность": "Economic Security",
            "Экономико-правовое обеспечение экономической безопасности": "Economic and Legal Support of Economic Security",
            "Право и организация социального обеспечения (на базе основного общего образования)": "Law and Social Security Organization (Basic General Education)",
            "Право и судебное администрирование": "Law and Court Administration",
            "Гостиничное дело": "Hotel Business",
            "Графический дизайнер": "Graphic Design",
            "Архитектура": "Architecture",
            "Архитектурное проектирование": "Architectural Design",
            "Дизайн архитектурной среды": "Design of Architectural Environment",
            "Строительство": "Civil Engineering",
            "Экспертиза недвижимости и реновация городских и курортных территорий": "Real Estate Expertise and Renovation of Urban and Resort Territories",
            "Оператор информационных систем и ресурсов (на базе основного общего образования)": "Operator of Information Systems and Resources (Basic)",
            "Оператор информационных систем и ресурсов (на базе среднего общего образования)": "Operator of Information Systems and Resources (Secondary)",
            "Оператор интерфейсной графики": "Interface Graphics Operator",
            "Прикладная информатика": "Applied Informatics",
            "Прикладная информатика в менеджменте": "Applied Informatics in Management",
            "Информационная безопасность": "Information Security",
            "Организация и технологии защиты информации": "Organization and Technologies of Information Protection",
            "Управление информационной безупречностью и технологии защиты информации": "Information Security Management and Protection Technologies",
            "Мехатроника и робототехника": "Mechatronics and Robotics",
            "Интеллектуальная сервисная робототехника": "Intelligent Service Robotics",
            "Землеустройство": "Land Management",
            "Земельно-имущественные отношения": "Land and Property Relations",
            "Землеустройство и кадастры": "Land Management and Cadastres",
            "Кадастр недвижимости": "Real Estate Cadastre",
            "Инноватика": "Innovatics",
            "Управление инновационным бизнесом": "Innovative Business Management",
            "Психология": "Psychology",
            "Прикладная психология": "Applied Psychology",
            "Психология служебной деятельности": "Psychology of Interdepartmental Activity",
            "Психология безопасности": "Safety Psychology",
            "Психология безопасности, кадрового менеджмента и успешной профессиональной деятельности": "Psychology of Security, HR Management, and Professional Success",
            "Управление страховым бизнесом": "Insurance Business Management",
            "Операционная деятельность в логистике": "Operational Activity in Logistics",
            "Управление логистическими процессами": "Logistics Process Management",
            "Конгрессно-выставочная деятельность": "Congress and Exhibition Activity",
            "Экономика": "Economics",
            "Мировая экономика": "World Economy",
            "Менеджмент": "Management",
            "Управление бизнес-организациями": "Business Organization Management",
            "Государственное и муниципальное управление": "State and Municipal Administration",
            "Публичное управление устойчивым развитием территорий": "Public Management of Sustainable Regional Development",
            "Бизнес-информатика": "Business Informatics",
            "Информационные технологии в бизнесе": "Information Technology in Business",
            "Таможенное дело": "Customs Affairs",
            "Регулирование таможенной деятельности": "Regulation of Customs Activity",
            "Международные экономические отношения": "International Economic Relations",
            "Стратегетическое управление инновационной деятельностью предпринимательских структур в международно-ориентированной среде": "Strategic Management of Innovative Activity of Entrepreneurial Structures",
            "Современное публичное политико-административное управление": "Modern Public Political and Administrative Management",
            "Социальная работа": "Social Work",
            "Организационно-управленческие технологии в социальной работе": "Organizational and Management Technologies in Social Work",
            "Организация работы с молодежью": "Youth Work Organization",
            "Организационно-управленческие технологии в работе с молодежью": "Organizational and Management Technologies in Youth Work",
            "Юриспруденция": "Jurisprudence",
            "Юрист в сфере правового обеспечения деятельности организаций и граждан": "Lawyer in Legal Support of Organizations and Citizens",
            "Юрист в сфере правоохранительной деятельности": "Lawyer in Law Enforcement",
            "Юрист в сфере судебного администрирования": "Lawyer in Judicial Administration",
            "Юрист в сфере социального обеспечения": "Lawyer in Social Security",
            "Государственно-правовой": "State-Legal",
            "Цифровое право": "Digital Law",
            "Гражданско-правовой": "Civil-Legal",
            "Международно-правовой": "International-Legal",
            "Право в сфере международной безопасности": "International Security Law",
            "Публичное и частное право": "Public and Private Law",
            "Уголовно-правовой": "Criminal-Legal",
            "Судебная экспертиза": "Forensic Expertise",
            "Криминалистические экспертизы": "Criminalistic Expertises",
            "Инженерно-технические экспертизы": "Engineering and Technical Expertises",
            "Судебная и прокурорская деятельность": "Judicial and Prosecutorial Activity",
            "Судебная деятельность": "Judicial Activity",
            "Уголовное право, уголовный процесс": "Criminal Law and Criminal Procedure",
            "Юрист в сфере частного права": "Lawyer in Private Law",
            "Юрист в органах государственной и муниципальной власти": "Lawyer in State and Municipal Authorities",
            "Правовое обеспечение деятельности органов публичной власти, в том числе судов и органов прокуратуры": "Legal Support of Public Authorities including Courts and Prosecution",
            "Политология": "Political Science",
            "Прикладная политология": "Applied Political Science",
            "Международные отношения": "International Relations",
            "Международная безопасность": "International Security",
            "Публичная политика и социальные науки": "Public Policy and Social Sciences",
            "Стратегическое управление и администрирование в публичной политике": "Strategic Management and Administration in Public Policy",
            "Мировая политика": "World Politics",
            "Реклама": "Advertising",
            "Реклама и связи с общественностью": "Advertising and Public Relations",
            "Cвязи с общественностью в политике и бизнесе": "Public Relations in Politics and Business",
            "Журналистика": "Journalism",
            "Международная журналистика": "International Journalism",
            "Медиакоммуникации": "Media Communications",
            "Глобальные медиа и коммуникации": "Global Media and Communications",
            "Социально-политические коммуникации в современном обществе": "Socio-Political Communications in Modern Society",
            "Коммерческая реклама": "Commercial Advertising",
            "Медиапродюсирование и медиапроизводство": "Media Producing and Media Production",
            "Туризм и гостеприимство (на базе основного общего образования)": "Tourism and Hospitality (Basic Education)",
            "Туроператорские и турагентские услуги": "Tour Operator and Travel Agency Services",
            "Гостиничные услуги": "Hotel Services",
            "Сервис": "Service",
            "Экспертиза и оценка недвижимости": "Real Estate Assessment and Evaluation",
            "Сервис-менеджмент в креативных и конгрессно-выставочных проектах рекреационных территорий": "Service Management in Creative and MICE Projects",
            "Управление в креативной ресторанно-гастрономической индустрии рекреационных территорий": "Management in Creative Restaurant and Gastronomy Industry",
            "Туризм": "Tourism",
            "Технология и организация туроператорских и турагентских услуг": "Technology and Organization of Tour Operator and Travel Agency Services",
            "Гостиничное дело": "Hotel Management",
            "Гостиничная деятельность": "Hotel Activity",
            "Туристский менеджмент": "Tourism Management",
            "Международная гостиничная индустрия": "International Hotel Industry",
            "Педагогическое образование (с двумя профилями подготовки)": "Teacher Education (with two profiles)",
            "Изобразительное искусство и английский язык": "Fine Arts and English",
            "Английский язык и немецкий язык": "English and German",
            "Английский язык и дополнительное образование": "English and Extra Education",
            "Русский язык и китайский язык": "Russian and Chinese",
            "Русский язык и литература": "Russian and Literature",
            "Испанский язык и английский язык": "Spanish and English",
            "Математика и информатика": "Mathematics and Computer Science",
            "Французский и английский языки": "French and English",
            "Английский язык и педагогическая психология": "English and Educational Psychology",
            "История и китайский язык": "History and Chinese",
            "Информатика и английский язык": "Computer Science and English",
            "История и обществознание": "History and Social Studies",
            "Педагогическое образование": "Teacher Education",
            "Филологическое образование": "Philological Education",
            "Преподавание иностранных языков (английский язык)": "Teaching Foreign Languages (English)",
            "Деятельностные образовательные траектории: иностранный язык и педагогическая психология": "Foreign Language and Educational Psychology",
            "Лингвопедагогические модели обучения русскому языку как иностранному": "Linguopedagogical Models of Teaching Russian as Foreign",
            "Лингвистика": "Linguistics",
            "Теория и методика преподавания иностранных языков и культур (английский и испанский языки)": "Theory and Methodology of Teaching Foreign Languages and Cultures (English/Spanish)",
            "Теория и практика межкультурной коммуникации (в сфере энергетики) – английский и немецкий языки": "Theory and Practice of Intercultural Communication (Energy) - English/German",
            "Теория и практика межкультурной коммуникации (в сфере рекламы и маркетинга) – английский и итальянский языки": "Theory and Practice of Intercultural Communication (Advertising/Marketing) - English/Italian",
            "Теория и практика межкультурной коммуникации (в сфере рекламы и маркетинга) английский и испанский языки": "Theory and Practice of Intercultural Communication (Advertising/Marketing) English/Spanish",
            "Теория и практика межкультурной коммуникации (в сфере цифровых технологий и искусственного интеллекта) – английский и испанский языки": "Theory and Practice of Intercultural Communication (Digital/AI) - English/Spanish",
            "Теория, методика преподавания иностранных языков, межкультурная коммуникация – английский и немецкий языки": "Theory, Methodology of Teaching Foreign Languages, Intercultural Communication - English/German",
            "Теория, методика преподавания иностранных языков, межкультурная коммуникация – английский и итальянский языки": "Theory, Methodology of Teaching Foreign Languages, Intercultural Communication - English/Italian",
            "Теория, методика преподавания иностранных языков, межкультурная коммуникация – английский и испанский языки": "Theory, Methodology of Teaching Foreign Languages, Intercultural Communication - English/Spanish",
            "Теория, методика преподавания иностранных языков, межкультурная коммуникация – английский и китайский языки": "Theory, Methodology of Teaching Foreign Languages, Intercultural Communication - English/Chinese",
            "Теория и практика межкультурной коммуникации в сфере бизнеса – испанский и английский языки": "Theory and Practice of Intercultural Communication in Business - Spanish/English",
            "Теория и практика межкультурной коммуникации в сфере бизнеса – французский и английский языки": "Theory and Practice of Intercultural Communication in Business - French/English",
            "Теория и практика межкультурной коммуникации в сфере бизнеса – немецкий и английский языки": "Theory and Practice of Intercultural Communication in Business - German/English",
            "Теория и методика преподавания иностранных языков и культур (английский и французский языки)": "Theory and Methodology of Teaching Foreign Languages and Cultures (English/French)",
            "Теория и практика межкультурной коммуникации (английский и испанский языки)": "Theory and Practice of Intercultural Communication (English/Spanish)",
            "Теория и практика межкультурной коммуникации (английский и итальянский языки)": "Theory and Practice of Intercultural Communication (English/Italian)",
            "Теория и практика межкультурной коммуникации (английский и немецкий языки)": "Theory and Practice of Intercultural Communication (English/German)",
            "Теория и методика преподавания иностранных языков и культур (немецкий и английский языки)": "Theory and Methodology of Teaching Foreign Languages and Cultures (German/English)",
            "Теория и методика преподавания иностранных языков и культур (французский и английский языки)": "Theory and Methodology of Teaching Foreign Languages and Cultures (French/English)",
            "Теория и практика межкультурной коммуникации (испанский и английский языки)": "Theory and Practice of Intercultural Communication (Spanish/English)",
            "Теория и практика межкультурной коммуникации (немецкий и английский языки)": "Theory and Practice of Intercultural Communication (German/English)",
            "Теория и практика межкультурной коммуникации (французский и английский языки)": "Theory and Practice of Intercultural Communication (French/English)",
            "Теория, методика преподавания иностранных языков, межкультурная коммуникация – испанский и английский языки": "Theory, Methodology of Teaching Foreign Languages, Intercultural Communication - Spanish/English",
            "Теория, методика преподавания иностранных языков, межкультурная коммуникация – немецкий и английский языки": "Theory, Methodology of Teaching Foreign Languages, Intercultural Communication - German/English",
            "Теория, методика преподавания иностранных языков, межкультурная коммуникация – французский и английский языки": "Theory, Methodology of Teaching Foreign Languages, Intercultural Communication - French/English",
            "Перевод и переводоведение (английский и французский языки)": "Translation and Translation Studies (English/French)",
            "Перевод и переводоведение (английский и испанский языки)": "Translation and Translation Studies (English/Spanish)",
            "Перевод и переводоведение (немецкий и английский языки)": "Translation and Translation Studies (German/English)",
            "Перевод и переводоведение (фарси и английский языки)": "Translation and Translation Studies (Farsi/English)",
            "Перевод и переводоведение (китайский и английский языки)": "Translation and Translation Studies (Chinese/English)",
            "Перевод и переводоведение (арабский и английский языки)": "Translation and Translation Studies (Arabic/English)",
            "Теория и практика межкультурной коммуникации (четырехъязычие: английский, немецкий, французский, испанский языки)": "Theory and Practice of Intercultural Communication (Four Languages: English, German, French, Spanish)",
            "Перевод и переводоведение (английский и немецкий языки)": "Translation and Translation Studies (English/German)",
            "Интеллектуальные системы в гуманитарной сфере": "Intellectual Systems in Humanities",
            "Разработка и программирование интеллектуальных систем в гуманитарной сфере": "Development and Programming of Intellectual Systems in Humanities",
            "Лингвистическое обеспечение межгосударственных отношений (арабский и английский языки)": "Linguistic Support of Interstate Relations (Arabic/English)",
            "Лингвистическое обеспечение межгосударственных отношений (турецкий и английский языки)": "Linguistic Support of Interstate Relations (Turkish/English)",
            "Специальный перевод (перевод в сфере туризма и экскурсионного дела) – английский и китайский языки": "Special Translation (Tourism and Excursions) - English/Chinese",
            "Специальный перевод (перевод в нефтегазовой сфере) – английский и китайский языки": "Special Translation (Oil and Gas Sector) - English/Chinese",
            "Теория перевода и межъязыковая коммуникация": "Translation Theory and Interlingual Communication",
            "Лингвистика рекламы и нейромаркетинга": "Linguistics of Advertising and Neuromarketing",
            "Лингвистика в сфере деловой и профессиональной коммуникации (германские и романские языки)»": "Linguistics in Business and Professional Communication (Germanic and Romance Languages)",
            "Теория и практика аудиовизуального перевода": "Theory and Practice of Audiovisual Translation",
            "Сопоставительное изучение языков и культур и инновационные стратегии речевого общения (романские и германские языки)": "Comparative Study of Languages and Cultures and Innovative Strategies of Speech Communication (Romance/Germanic)",
            "Интеллектуальные системы в гуманитарной среде": "Intellectual Systems in Humanitarian Environment",
            "Цифровые технологии и искусственный интеллект": "Digital Technologies and Artificial Intelligence",
            "Делопроизводитель": "Clerk",
            "Организация документооборота": "Document Flow Organization",
            "История": "History",
            "История международных отношений": "History of International Relations",
            "Северный Кавказ в цивилизационном пространстве России (XVIII-XXI вв.): исторический анализ и политическое прогнозирование": "North Caucasus in the Civilizational Space of Russia",
            "Философия": "Philosophy",
            "Философия управления и методология принятия решений в сфере креативных индустрий": "Philosophy of Management and Decision-Making Methodology in Creative Industries",
            "Теология": "Theology",
            "Государственно-конфессиональные отношения (с православным блоком дисциплин)": "State-Confessional Relations (with Orthodox Block)",
            "Государственно-конфессиональные отношения (с исламским блоком дисциплин)": "State-Confessional Relations (with Islamic Block)",
            "Государственно-конфессиональные отношения (с православным компонентом)": "State-Confessional Relations (with Orthodox Component)",
            "Государственно-конфессиональные отношения (с исламским компонентом)": "State-Confessional Relations (with Islamic Component)",
            "Рекреация и спортивно-оздоровительный туризм": "Recreation and Sports-Health Tourism",
            "Рекреационно-оздоровительная деятельность": "Recreation and Health Activity",
            "Социально-культурная деятельность": "Social and Cultural Activity",
            "Менеджмент социально-культурной деятельность": "Management of Social and Cultural Activity",
            "Литературное творчество": "Literary Creation",
            "Литературный работник, переводчик художественной литературы": "Literary Worker, Translator of Fiction",
            "Дизайн": "Design",
            "Коммуникативный дизайн": "Communicative Design",
            "Дизайн среды": "Environmental Design",
            "Декоративно-прикладное искусство и народные промыслы": "Decorative and Applied Arts and Folk Crafts",
            "Арт-технологии в декоративно-прикладном искусстве": "Art Technologies in Decorative and Applied Arts",
            "Востоковедение и африканистика": "Asian and African Studies",
            "История стран Азии и Африки": "History of Asian and African Countries",
            "-": "-"
        };

        const translateText = (text) => {
            if (currentLang.value === 'ru') return text;
            return specialtyTranslations[text] || text;
        };

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

        // Плавный скролл-листенер для виджета
        const setupScrollListener = () => {
            const panel = document.getElementById('floating-panel');
            if (!panel) return;

            window.addEventListener('scroll', () => {
                if (window.scrollY > 40) {
                    panel.classList.add('floating-widget-hidden');
                } else {
                    panel.classList.remove('floating-widget-hidden');
                }
            });
        };

        onMounted(async () => {
            applyThemeClasses();
            setupScrollListener();
            try {
                const response = await fetch('/api/specialties');
                const rawData = await response.json();
                
                // Переводим направления в зависимости от выбранного языка при инициализации
                specialties.value = rawData.map(s => ({
                    ...s,
                    name: translateText(s.name),
                    profile: translateText(s.profile),
                    // ИСПРАВЛЕНО: добавили перевод руководителя!
                    supervisor_name: window.translateSupervisor(s.supervisor_name, currentLang.value)
                }));
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

        // Отправка голоса с автоматической плавной прокруткой до верха перед показом галочки успеха
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
                    // 1. Плавный скролл наверх
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    // 2. Показываем красивую анимированную галочку успеха ровно через 400мс
                    setTimeout(() => {
                        submitted.value = true;
                    }, 400);
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