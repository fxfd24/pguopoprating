(function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})();

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
        saveBtn: "Отправить оценку",
        
        // Поля выбора студента
        selectSpecialtyLabel: "Направление подготовки (поиск по коду или названию)",
        selectPlaceholder: "Начните вводить код или название направления...",
        selectedCardTitle: "Выбранное направление",
        instituteLabel: "Институт",
        supervisorLabel: "Руководитель ОПОП",

        // Секретный шлюз (Исправлено: добавлены утерянные переводы!)
        accessDenied: "Доступ ограничен",
        enterPassword: "Пожалуйста, введите пароль доступа для продолжения.",
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

        // Секретный шлюз
        accessDenied: "Access Restricted",
        enterPassword: "Please enter the access password to continue.",
        passwordPlaceholder: "Enter password...",
        loginBtn: "Log In"
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

// Автоматический инжект кнопки "Наверх" на все страницы при их загрузке
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.createElement('div');
    btn.className = 'back-to-top glass-card shadow-2xl';
    btn.innerHTML = '<i class="fa-solid fa-arrow-up text-lg text-main"></i>';
    document.body.appendChild(btn);

    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        // Появляется только если прокрутили ниже 300px И крутим наверх
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

// 4. Автономный менеджер сессий (срок жизни - 24 часа)
window.authSession = {
    // Сохранить пароль с ограничением по времени
    save: (role, password) => {
        const sessionData = {
            password: password,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000 // Текущее время + 24 часа в миллисекундах
        };
        localStorage.setItem('auth_session_' + role, JSON.stringify(sessionData));
    },
    // Получить сохраненный пароль, если он еще не истек
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
    // Очистить сессию (разлогиниться)
    clear: (role) => {
        localStorage.removeItem('auth_session_' + role);
    }
};