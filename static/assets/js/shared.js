(function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})();

// ---- 1. ГИГАНТСКИЙ СЛОВАРЬ ПЕРЕВОДА ДИСЦИПЛИН (ИНТЕГРИРОВАН СЮДА) ----
window.specialtyTranslations = {
    "Обеспечение информационной безопасности автоматизированных систем": "Information Security of Automated Systems",
    "Страховое дело (по отраслям)": "Insurance Business (by industry)",
    "Банковское дело": "Banking",
    "Экономическая безопасность": "Economic Security",
    "Экономико-правовое обеспечение экономической безопасности": "Economic and Legal Support of Economic Security",
    "Право и организация социального обеспечения (на базе 9 классов)": "Law and Social Security Organization (Basic General Education)",
    "Право и судебное администрирование": "Law and Court Administration",
    "Гостиничное дело": "Hotel Business",
    "Графический дизайнер": "Graphic Design",
    "Архитектура": "Architecture",
    "Архитектурное проектирование": "Architectural Design",
    "Дизайн архитектурной среды": "Design of Architectural Environment",
    "Строительство": "Civil Engineering",
    "Экспертиза недвижимости и реновация городских и курортных территорий": "Real Estate Expertise and Renovation of Urban and Resort Territories",
    "Оператор информационных систем и ресурсов (на базе 9 классов)": "Operator of Information Systems and Resources (Basic)",
    "Оператор информационных систем и ресурсов (на базе 11 классов)": "Operator of Information Systems and Resources (Secondary)",
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
    "Туризм и гостеприимство (на базе 9 классов)": "Tourism and Hospitality (Basic Education)",
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

// Функция перевода ОПОП
window.translateSpecialtyText = (text, lang) => {
    if (lang === 'ru') return text;
    return window.specialtyTranslations[text] || text;
};

// Словарь транслитерации руководителей для английской версии ОПОП
const supervisorTranslations = {
    "Воробьев Г.А.": "Vorobiev G.A.",
    "Минец К.Г.": "Minets K.G.",
    "Таран О.Л.": "Taran O.L.",
    "Фалеева А.Ю.": "Faleeva A.Y.",
    "Боднева Н.А.": "Bodneyeva N.A.",
    "Дмитриенко Б.Ч.": "Dmitrienko B.C.",
    "Голубич С.А": "Golubich S.A.",
    "Рубец Е.А.": "Rubets E.A.",
    "Малых М.С.": "Malykh M.S.",
    "Павленко И.И.": "Pavlenko I.I.",
    "Тимченко О.В.": "Timchenko O.V.",
    "Арзуманова С.М.": "Arzumanova S.M.",
    "Головина Ю.Е.": "Golovina Y.E.",
    "Шаповалова М.Л.": "Shapovalova M.L.",
    "Хребина С.В.": "Khrebina S.V.",
    "Минец К.С.": "Minets K.S.",
    "Медведева В.П.": "Medvedeva V.P.",
    "Кобзева М.С.": "Kobzeva M.S.",
    "Соловьева Е.А.": "Solovieva E.A.",
    "Килинкарова С.Г.": "Kilinkarova S.G.",
    "Ерёмина О.С.": "Eremina O.S.",
    "Кобышева Е.И.": "Kobysheva E.I.",
    "Май-Борода Г.Н.": "May-Boroda G.N.",
    "Чекменев Д.С.": "Chekmenev D.S.",
    "Чекменёв Д.С.": "Chekmenev D.S.",
    "Давыдова Е.В.": "Davydova E.V.",
    "Трапезникова Н.В.": "Trapeznikova N.V.",
    "Вильгоненко И.М.": "Vilgonenko I.M.",
    "Клычев Р.А.": "Klychev R.A.",
    "Анферова О.А.": "Anferova O.A.",
    "Серикова С.В.": "Serikova S.V.",
    "Бабошина Е.В.": "Baboshina E.V.",
    "Валяровский Ф.И.": "Valyarovsky F.I.",
    "Акименко M.А.": "Akimenko M.A.",
    "Попов А.П.": "Popov A.P.",
    "Некрасов Е.Е.": "Nekrasov E.E.",
    "Кандыба Р.А.": "Kandyba R.A.",
    "Текеева М.У.": "Tekeeva M.U.",
    "Герейханова И.А.": "Gereikhanova I.A.",
    "Герейханова  И.А": "Gereikhanova I.A.",
    "Миллер И.С.": "Miller I.S.",
    "Гикис С.Н.": "Gikis S.N.",
    "Ануфриенко С.В.": "Anufrienko S.V.",
    "Долгих К. С.": "Dolgikh K.S.",
    "Савич А.С.": "Savich A.S.",
    "Литвинова Ю.В.": "Litvinova Y.V.",
    "Алексеева М.А.": "Alekseeva M.A.",
    "Срибная Т.А.": "Sribnaya T.A.",
    "Гончарова Е.Н.": "Goncharova E.N.",
    "Мельникова Е.Н.": "Melnikova E.N.",
    "Петренко С.А.": "Petrenko S.A.",
    "Петренко А.Ф.": "Petrenko A.F.",
    "Тен Э.Г.": "Ten E.G.",
    "Рыжук А.В.": "Ryzhuk A.V.",
    "Маслова О.Б.": "Maslova O.B.",
    "Павлова Ю.В.": "Pavlova Y.V.",
    "Хачатурова К.Г.": "Khachaturova K.G.",
    "Голик Н.А.": "Golik N.A.",
    "Долматова О.В.": "Dolmatova O.V.",
    "Федотова И.Б.": "Fedotova I.B.",
    "Тищенко С.В.": "Tishchenko S.V.",
    "Елькин В.В.": "Elkin V.V.",
    "Москаленко К.О.": "Moskalenko K.O.",
    "Кобякова И.А.": "Kobyakova I.A.",
    "Чабанова А.А.": "Chabanova A.A.",
    "Коломиец Е.А.": "Kolomiets E.A.",
    "Пылев А.И.": "Pylev A.I.",
    "Бродская М.С.": "Brodskaya M.S.",
    "Магомедова П.М.": "Magomedova P.M.",
    "Магомедова П.М..": "Magomedova P.M.",
    "Иванова О.Е.": "Ivanova O.E.",
    "Гаджимурадова М.Г.": "Gadzhimuradova M.G.",
    "Саркисян М.Р.": "Sarkisyan M.R.",
    "Горохова Л.А.": "Gorokhova L.A.",
    "Халеева С.А.": "Khaleeva S.A.",
    "Ширяева Т.А.": "Shiryaeva T.A.",
    "Курских О.В.": "Kurskikh O.V.",
    "Шавкун Н.С.": "Shavkun N.S.",
    "Гетманова Е.С.": "Getmanova E.S.",
    "Николаенко Н.Д.": "Nikolaenko N.D.",
    "Ермаков В.П.": "Ermakov V.P.",
    "Суховская Д.Н.": "Sukhovskaya D.N.",
    "Осипов С.К.": "Osipov S.K.",
    "Имнаев Ш.А.": "Imnaev S.A.",
    "Маилян Э.Г.": "Mailyan E.G.",
    "Бабаян А.В.": "Babayan A.V.",
    "Шульженко В.И.": "Shulzhenko V.I.",
    "Чубарева О.В.": "Chubareva O.V.",
    "Еремкина Н.В.": "Eremkina N.V.",
    "Линец С.И.": "Linets S.I.",
    "Каспарян К.В.": "Kasparyan K.V."
};

window.translateSupervisor = (name, lang) => {
    if (lang === 'ru') return name;
    return supervisorTranslations[name] || name;
};

window.globalTranslations = {
    ru: {
        headerTitle: "Оценка ОПОП",
        headerSubtitle: "Пятигорский государственный университет",
        mainTitle: "Оценка качества образовательных программ",
        mainSubtitle: "Пожалуйста, выберите вашу роль в системе для перехода к заполнению анкеты оценки руководителей ОПОП.",
        studentTitle: "Обучающийся",
        studentDesc: "Оценка руководителя образовательной программы студентами всех курсов.",
        deanTitle: "Декан",
        deanDesc: "Оценка деятельности руководителей в ролях Наставника и Администратора.",
        hodTitle: "Зав. кафедрой",
        hodDesc: "Оценка качества учебно-методической работы и поддержки адаптации.",
        managerTitle: "Нач. управления",
        managerDesc: "Выставление критерия K_сроки по всем направлениям подготовки.",
        startBtn: "Начать опрос",
        evaluateBtn: "Перейти к оценке",
        fillBtn: "Заполнить K_сроки",
        
        // Внутренние страницы
        goHome: "На главную",
        goHomeBtn: "Вернуться на главную",
        submittedTitle: "Спасибо за участие!",
        submittedDesc: "Ваша оценка успешно принята. Вы помогаете сделать образовательный процесс лучше.",
        loading: "Сохранение...",
        saveBtn: "Отправить Оценку",
        
        // Поля выбора студента
        selectSpecialtyLabel: "Направление подготовки (поиск по коду или названию)",
        selectPlaceholder: "Начните вводить код или название направления...",
        selectedCardTitle: "Выбранное направление",
        instituteLabel: "Институт",
        supervisorLabel: "Руководитель ОПОП",

        accessDenied: "Доступ ограничен",
        enterPassword: "Пожалуйста, введите пароль доступа для продолжения.",
        passwordPlaceholder: "Введите пароль...",
        loginBtn: "Войти в панель",
        retakeBtn: "Пройти еще раз",
        
        // Специфичные тексты разделения ВШУ для экспертов
        selectRoleToEvaluate: "4. Выберите роль руководителя для оценки",
        adminRoleLabel: "Администратор ОПОП",
        mentorRoleLabel: "Наставник ОПОП",
        selectRolePlaceholder: "Выберите роль ниже"
    },
    en: {
        headerTitle: "OPOP Assessment",
        headerSubtitle: "Pyatigorsk State University",
        mainTitle: "Educational Program Assessment",
        mainSubtitle: "Please select your system role to proceed with the assessment questionnaire for OPOP leaders.",
        studentTitle: "Student",
        studentDesc: "Evaluation of the educational program supervisor by students of all academic years.",
        deanTitle: "Dean",
        deanDesc: "Assessment of leaders' activities in both Mentor and Administrator roles.",
        hodTitle: "Head of Dept",
        hodDesc: "Evaluation of educational materials quality and adaptation assistance.",
        managerTitle: "Head of Admin",
        managerDesc: "Setting the K_sroki criteria scores across all academic programs.",
        startBtn: "Start Survey",
        evaluateBtn: "Go to Assessment",
        fillBtn: "Fill K_sroki",

        // Внутренние страницы
        goHome: "Back",
        goHomeBtn: "Go to Main Page",
        submittedTitle: "Thank you for participating!",
        submittedDesc: "Your rating has been successfully saved. You are helping to improve the education quality.",
        loading: "Saving...",
        saveBtn: "Submit Evaluation",

        // Поля выбора студента
        selectSpecialtyLabel: "Academic Program (search by code or name)",
        selectPlaceholder: "Start typing program code or name...",
        selectedCardTitle: "Selected Program",
        instituteLabel: "Institute/School",
        supervisorLabel: "Program Supervisor",

        accessDenied: "Access Restricted",
        enterPassword: "Please enter the access password to continue.",
        passwordPlaceholder: "Enter password...",
        loginBtn: "Log In",
        retakeBtn: "Take survey again",
        
        // Специфичные тексты разделения ВШУ для экспертов
        selectRoleToEvaluate: "4. Select the role to evaluate",
        adminRoleLabel: "OPOP Administrator",
        mentorRoleLabel: "OPOP Mentor",
        selectRolePlaceholder: "Select a role below"
    }
};

window.initThemeAndLang = () => {
    const currentLang = ref(localStorage.getItem('lang') || 'ru');
    const theme = ref(localStorage.getItem('theme') || 'light');

    const toggleLang = () => {
        currentLang.value = currentLang.value === 'ru' ? 'en' : 'ru';
        localStorage.setItem('lang', currentLang.value);
        window.location.reload();
    };

    const applyThemeClasses = () => {
        const htmlElement = document.documentElement;
        if (theme.value === 'dark') {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    };

    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', theme.value);
        applyThemeClasses();
    };

    return { currentLang, theme, toggleLang, toggleTheme, applyThemeClasses };
};

window.authSession = {
    save: (role, password) => {
        const sessionData = {
            password: password,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000
        };
        localStorage.setItem('auth_session_' + role, JSON.stringify(sessionData));
    },
    get: (role) => {
        const raw = localStorage.getItem('auth_session_' + role);
        if (!raw) return null;
        try {
            const data = JSON.parse(raw);
            if (Date.now() < data.expiresAt) {
                return data.password;
            } else {
                localStorage.removeItem('auth_session_' + role);
                return null;
            }
        } catch (e) {
            localStorage.removeItem('auth_session_' + role);
            return null;
        }
    },
    clear: (role) => {
        localStorage.removeItem('auth_session_' + role);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.createElement('div');
    btn.className = 'back-to-top glass-card shadow-2xl';
    btn.innerHTML = '<i class="fa-solid fa-arrow-up text-lg text-main"></i>';
    document.body.appendChild(btn);

    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 300 && currentScrollY < lastScrollY) {
            btn.classList.add('back-to-top-show');
        } else {
            btn.classList.remove('back-to-top-show');
        }
        lastScrollY = currentScrollY;
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});