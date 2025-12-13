
// document.addEventListener("DOMContentLoaded", () => {

//     const items = document.querySelectorAll(".photo-item");
//     const filterBtns = document.querySelectorAll(".filter-btn");
//     const lightbox = document.getElementById("lightbox");
//     const lightboxImg = document.getElementById("lightbox-img");
//     const HOLD_TIME = 500;

//     // CLICK + LONG PRESS (updated with preload & fallback src)
//     items.forEach(item => {
//         let pressTimer = null;
//         const fullSrc = item.dataset.full || item.querySelector('img').src.replace('.md.jpg', '.jpg'); // Fallback if no data-full
//         let preloadImg = null; // For hover preload

//         // Preload on hover (desktop boost)
//         item.addEventListener("mouseenter", () => {
//             if (!preloadImg && fullSrc) {
//                 preloadImg = new Image();
//                 preloadImg.src = fullSrc;
//             }
//         });

//         // Normal click
//         item.addEventListener("click", e => {
//             if (e.target.tagName === 'IMG') openLightbox(fullSrc);
//         });

//         // Long press start
//         const startPress = () => {
//             pressTimer = setTimeout(() => {
//                 openLightbox(fullSrc);
//             }, HOLD_TIME);
//         };

//         // Cancel
//         const cancelPress = () => {
//             if (pressTimer) {
//                 clearTimeout(pressTimer);
//                 pressTimer = null;
//             }
//         };

//         // Mobile
//         item.addEventListener("touchstart", startPress);
//         item.addEventListener("touchend", cancelPress);
//         item.addEventListener("touchmove", cancelPress);

//         // Desktop
//         item.addEventListener("mousedown", startPress);
//         item.addEventListener("mouseup", cancelPress);
//         item.addEventListener("mouseleave", cancelPress);
//     });
// });

// // Lightbox
// function openLightbox(src) {
//     const lightbox = document.getElementById("lightbox");
//     const img = document.getElementById("lightbox-img");

//     img.src = src;
//     lightbox.style.display = "flex";
//     document.body.style.overflow = "hidden";
// }

// function closeLightbox() {
//     document.getElementById("lightbox").style.display = "none";
//     document.body.style.overflow = "auto";
// }

// document.addEventListener("keydown", e => {
//     if (e.key === "Escape") closeLightbox();
// });
//  <script>
//     const focusEl = document.querySelector(".focus-text");

//     if (focusEl) {
//         const observer = new IntersectionObserver(
//             entries => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         focusEl.classList.add("focus-active");
//                     } else {
//                         focusEl.classList.remove("focus-active");
//                     }
//                 });
//             },
//             {
//                 threshold: 0.6
//             }
//         );

//         observer.observe(focusEl);
//     }
// </script>
document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(".photo-item");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const HOLD_TIME = 500;

    // CLICK + LONG PRESS
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

// Lightbox
function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");

    if (!lightbox || !img) return;

    img.src = src;
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;

    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
});
