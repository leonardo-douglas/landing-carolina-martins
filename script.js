// ========================================
// DRA. CAROLINA MARTINS
// JAVASCRIPT DA LANDING PAGE
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // HEADER AO ROLAR A PÁGINA
    // ==============================

    const header = document.querySelector(".header");

    function handleHeader() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeader);
    handleHeader();


    // ==============================
    // MENU MOBILE
    // ==============================

    const menuButton = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            const isOpen = mobileMenu.classList.toggle("active");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    }


    // ==============================
    // FECHAR MENU AO CLICAR NO LINK
    // ==============================

    const mobileLinks = document.querySelectorAll(
        ".mobile-menu a"
    );

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu?.classList.remove("active");

            menuButton?.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // ==============================
    // LIGHTBOX DA GALERIA
    // ==============================

    const galleryItems = document.querySelectorAll(
        ".gallery-item"
    );

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const lightboxClose = document.querySelector(".lightbox-close");

    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            const image = item.querySelector("img");

            if (!image || !lightbox || !lightboxImage) {
                return;
            }

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    // ==============================
    // FECHAR LIGHTBOX
    // ==============================

    function closeLightbox() {

        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }

    lightboxClose?.addEventListener(
        "click",
        closeLightbox
    );


    lightbox?.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    // Fechar com ESC

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });


    // ==============================
    // LUCIDE ICONS
    // ==============================

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }


    // ==============================
    // ANIMAÇÕES GSAP
    // ==============================

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined"
    ) {

        gsap.registerPlugin(ScrollTrigger);

        const elements = document.querySelectorAll(
            ".reveal"
        );

        elements.forEach(element => {

            gsap.fromTo(
                element,

                {
                    opacity: 0,
                    y: 40
                },

                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",

                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        once: true
                    }
                }
            );

        });


        // ==============================
        // HERO PARALLAX
        // ==============================

        const heroImage = document.querySelector(
            ".hero-image"
        );

        if (heroImage) {

            gsap.to(heroImage, {

                yPercent: 10,

                ease: "none",

                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }

            });

        }

    }


    // ==============================
    // REDUZIR ANIMAÇÕES
    // PARA QUEM PREFERE MENOS MOVIMENTO
    // ==============================

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {

        document
            .querySelectorAll(".reveal")
            .forEach(element => {

                element.style.opacity = "1";
                element.style.transform = "none";

            });

    }

});