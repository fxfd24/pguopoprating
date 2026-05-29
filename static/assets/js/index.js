const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        const { currentLang, theme, toggleLang, toggleTheme, applyThemeClasses } = window.initThemeAndLang();
        const t = computed(() => window.globalTranslations[currentLang.value]);

        // Плавное скрытие виджета при прокрутке страницы вниз
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

        onMounted(() => {
            applyThemeClasses();
            setupScrollListener();
        });

        return { currentLang, theme, t, toggleLang, toggleTheme };
    }
}).mount('#app');