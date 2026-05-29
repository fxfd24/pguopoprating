// 1. Мгновенная проверка темы для исключения белой вспышки при загрузке страницы
(function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})();

// 2. Глобальный переводчик для всех страниц
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
        
        // Общие тексты
        goHome: "На главную",
        goHomeBtn: "Вернуться на главную",
        submittedTitle: "Спасибо за участие!",
        submittedDesc: "Ваша оценка успешно принята. Вы помогаете сделать образовательный процесс лучше.",
        loading: "Сохранение...",
        saveBtn: "Отправить оценку",
        accessDenied: "Доступ ограничен",
        enterPassword: "Пожалуйста, введите пароль доступа...",
        passwordPlaceholder: "Введите пароль...",
        loginBtn: "Войти в панель"
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

        // Общие тексты
        goHome: "Back",
        goHomeBtn: "Go to Main Page",
        submittedTitle: "Thank you for participating!",
        submittedDesc: "Your rating has been successfully saved. You are helping to improve the education quality.",
        loading: "Saving...",
        saveBtn: "Submit Evaluation",
        accessDenied: "Access Restricted",
        enterPassword: "Please enter the access password...",
        passwordPlaceholder: "Enter password...",
        loginBtn: "Log In"
    }
};

// 3. Общие хелперы для экспорта во Vue
window.initThemeAndLang = () => {
    const currentLang = ref(localStorage.getItem('lang') || 'ru');
    const theme = ref(localStorage.getItem('theme') || 'light');

    const toggleLang = () => {
        currentLang.value = currentLang.value === 'ru' ? 'en' : 'ru';
        localStorage.setItem('lang', currentLang.value);
        // Перезагружаем страницу, чтобы все Vue-компоненты на любой странице обновили язык
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

    return {
        currentLang,
        theme,
        toggleLang,
        toggleTheme,
        applyThemeClasses
    };
};