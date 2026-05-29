const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        // Подтягиваем общую инициализацию темы и языка
        const { currentLang, theme, toggleLang, toggleTheme, applyThemeClasses } = window.initThemeAndLang();

        const t = computed(() => window.globalTranslations[currentLang.value]);

        // ---- ИНТЕРАКТИВНЫЙ 3D-ПАРАЛЛАКС ДЛЯ МЫШКИ ----
        const setupParallax = () => {
            if (window.innerWidth < 768) return;

            const header = document.getElementById('header-parallax');
            const textBlock = document.getElementById('text-parallax');
            const gridBlock = document.getElementById('grid-parallax');

            document.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                const deltaX = (mouseX - centerX) / centerX;
                const deltaY = (mouseY - centerY) / centerY;

                if (header) {
                    header.style.transform = `translate3d(${deltaX * 8}px, ${deltaY * 4}px, 0)`;
                }
                if (textBlock) {
                    textBlock.style.transform = `translate3d(${deltaX * -10}px, ${deltaY * -6}px, 0)`;
                }
                if (gridBlock) {
                    gridBlock.style.transform = `translate3d(${deltaX * 15}px, ${deltaY * 8}px, 0)`;
                }
            });
        };

        onMounted(() => {
            applyThemeClasses();
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