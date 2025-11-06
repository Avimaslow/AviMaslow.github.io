// assets/js/effects.js

(function () {
    // Starfield fades as you scroll down
    const starfield = document.getElementById("starfield");
    window.addEventListener("scroll", () => {
        const maxFade = 500; // px
        const y = window.scrollY;
        const opacity = Math.max(0, 1 - y / maxFade);
        if (starfield) {
            starfield.style.opacity = opacity.toFixed(2);
        }
    });

    // Simple scroll reveal for elements with .reveal
    const revealEls = [];
    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            }
        },
        { threshold: 0.15 }
    );

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".section, .card, .timeline-item, .project-card").forEach((el) => {
            el.classList.add("reveal");
            revealEls.push(el);
            observer.observe(el);
        });
    });
})();
