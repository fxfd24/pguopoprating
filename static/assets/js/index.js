const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        const { currentLang, theme, toggleLang, toggleTheme, applyThemeClasses } = window.initThemeAndLang();
        const t = computed(() => window.globalTranslations[currentLang.value]);

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

        const setupParallax = () => {
            if (window.innerWidth < 768) return;

            const textBlock = document.getElementById('text-parallax');
            const gridBlock = document.getElementById('grid-parallax');

            document.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                const deltaX = (mouseX - centerX) / centerX;
                const deltaY = (mouseY - centerY) / centerY;

                // Двигаются только центральный текст и сетка
                if (textBlock) textBlock.style.transform = `translate3d(${deltaX * -8}px, ${deltaY * -5}px, 0)`;
                if (gridBlock) gridBlock.style.transform = `translate3d(${deltaX * 12}px, ${deltaY * 6}px, 0)`;
            });
        };

        onMounted(() => {
            applyThemeClasses();
            setupScrollListener();
            setupParallax();
        });

        return { currentLang, theme, t, toggleLang, toggleTheme };
    }
}).mount('#app');