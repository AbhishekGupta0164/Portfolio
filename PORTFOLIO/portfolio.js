// PORTFOLIO/portfolio.js

/* =========================
   PORTFOLIO INTERACTIONS
========================= */
document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(".photo-item");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const HOLD_TIME = 500;

    // CLICK + LONG PRESSs
    items.forEach(item => {
        let pressTimer = null;

        const img = item.querySelector("img");
        if (!img) return;

        const fullSrc =
            item.dataset.full ||
            img.src.replace(".md.jpg", ".jpg");

        let preloadImg = null;

        // Preload on hover
        item.addEventListener("mouseenter", () => {
            if (!preloadImg && fullSrc) {
                preloadImg = new Image();
                preloadImg.src = fullSrc;
            }
        });

        // Normal click
        item.addEventListener("click", e => {
            if (e.target.tagName === "IMG") {
                openLightbox(fullSrc);
            }
        });

        // Long press start
        const startPress = () => {
            pressTimer = setTimeout(() => {
                openLightbox(fullSrc);
            }, HOLD_TIME);
        };

        // Cancel
        const cancelPress = () => {
            if (pressTimer) {
                clearTimeout(pressTimer);
                pressTimer = null;
            }
        };

        // Mobile
        item.addEventListener("touchstart", startPress);
        item.addEventListener("touchend", cancelPress);
        item.addEventListener("touchmove", cancelPress);

        // Desktop
        item.addEventListener("mousedown", startPress);
        item.addEventListener("mouseup", cancelPress);
        item.addEventListener("mouseleave", cancelPress);
    });
    // Filters (full logic: hide non-matches, stagger show matches)
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.dataset.category.toLowerCase();v

                // Hide all first
                items.forEach(item => {
                    item.classList.remove('show');
                    item.style.display = 'none';
                });

                // Show matches with stagger
                items.forEach((item, index) => {
                    const itemCategory = item.dataset.category.toLowerCase();
                    if (category === 'all' || itemCategory === category) {
                        setTimeout(() => {
                            item.style.display = 'block';
                            item.classList.add('show');
                        }, index * 100);
                    }
                });
            });
        });

        // Initial load: Show all with stagger
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.display = 'block';
                item.classList.add('show');
            }, index * 120);
        });
    }
    /* =========================
       HEADER SCROLL FOCUS
    ========================= */

    const focusEl = document.querySelector(".focus-text");

    if (focusEl) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        focusEl.classList.add("focus-active");
                    } else {
                        focusEl.classList.remove("focus-active");
                    }
                });
            },
            { threshold: 0.6 }
        );

        observer.observe(focusEl);
    }
});


// LIGHTBOX FUNCTIONS
function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    const spinner = document.getElementById("lightbox-spinner");

    if (!lightbox || !img) return;

    img.src = ''; // Reset
    img.classList.remove('loaded');
    if (spinner) spinner.style.display = 'block'; // Show spinner
    img.onerror = () => { // Fallback
        img.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
        if (spinner) spinner.style.display = 'none';
    };
    img.onload = () => {
        if (spinner) spinner.style.display = 'none';
        img.classList.add('loaded');
    };
    img.src = src; // Trigger load
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
} 

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    const spinner = document.getElementById("lightbox-spinner");

    if (!lightbox) return;

    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
    if (spinner) spinner.style.display = 'none';
    if (img) img.classList.remove('loaded');
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
});