const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        // ---- ЛОКАЛИЗАЦИЯ И ТЕМА ----
        const currentLang = ref(localStorage.getItem('lang') || 'ru');
        const theme = ref(localStorage.getItem('theme') || 'light');

        // Словарь переводов
        const translations = {
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
                fillBtn: "Заполнить K_сроки"
            },
            en: {
                headerTitle: "OPOP Rating System",
                headerSubtitle: "Pyatigorsk State University",
                mainTitle: "Educational Program Quality Assessment",
                mainSubtitle: "Please select your system role to proceed with the assessment questionnaire for OPOP leaders.",
                studentTitle: "Student",
                studentDesc: "Evaluation of the educational program supervisor by students of all years.",
                deanTitle: "Dean",
                deanDesc: "Assessment of leaders' activities in both Mentor and Administrator roles.",
                hodTitle: "Head of Dept",
                hodDesc: "Evaluation of educational materials quality and adaptation assistance.",
                managerTitle: "Head of Admin",
                managerDesc: "Setting the K_sroki criteria scores across all academic programs.",
                startBtn: "Start Survey",
                evaluateBtn: "Go to Assessment",
                fillBtn: "Fill K_sroki"
            }
        };

        const t = computed(() => translations[currentLang.value]);

        const toggleLang = () => {
            currentLang.value = currentLang.value === 'ru' ? 'en' : 'ru';
            localStorage.setItem('lang', currentLang.value);
        };

        const applyTheme = () => {
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
            applyTheme();
        };

        // ---- ИНТЕРАКТИВНЫЙ 3D-ПАРАЛЛАКС ДЛЯ МЫШКИ ----
        const setupParallax = () => {
            // На мобильных устройствах отключаем параллакс, чтобы не нагружать процессор
            if (window.innerWidth < 768) return;

            const header = document.getElementById('header-parallax');
            const textBlock = document.getElementById('text-parallax');
            const gridBlock = document.getElementById('grid-parallax');

            document.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                // Вычисляем отклонение от центра экрана
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                const deltaX = (mouseX - centerX) / centerX; // диапазон [-1, 1]
                const deltaY = (mouseY - centerY) / centerY; // диапазон [-1, 1]

                // Плавно смещаем элементы с разной амплитудой для эффекта глубины (3D)
                if (header) {
                    header.style.transform = `translate3d(${deltaX * 10}px, ${deltaY * 5}px, 0)`;
                }
                if (textBlock) {
                    textBlock.style.transform = `translate3d(${deltaX * -15}px, ${deltaY * -10}px, 0)`;
                }
                if (gridBlock) {
                    // Плитки смещаются чуть медленнее, создавая эффект того, что они "тяжелее"
                    gridBlock.style.transform = `translate3d(${deltaX * 22}px, ${deltaY * 12}px, 0)`;
                }
            });
        };

        onMounted(() => {
            applyTheme();
            setupParallax();
        });

        return {
            currentLang,
            theme,
            t,
            toggleLang,
            toggleTheme
        };
    }
}).mount('#app');