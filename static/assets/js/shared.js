(function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})();

// Словарь транслитерации руководителей для английской версии ОПОП
const supervisorTranslations = {
    "Воробьев Г.А.": "Vorobiev G.A.",
    "Минец К.Г.": "Minets K.G.",
    "Таран О.Л.": "Taran O.L.",
    "Фалеева А.Ю.": "Faleeva A.Y.",
    "Боднева Н.А.": "Bodneva N.A.",
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
    "Акименко М.А.": "Akimenko M.A.",
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
    "Еремкина Н.В.": "Eremkina N.V."
};

// Функция автоматического перевода ФИО руководителя
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