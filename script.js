document.addEventListener("DOMContentLoaded", () => {

  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");

  const year = document.getElementById("year");


  /* ANO AUTOMÁTICO */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* HEADER AO ROLAR */

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* MENU MOBILE */

  function closeMenu() {

    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        mobileMenu.classList.toggle("open");

      menuToggle.classList.toggle(
        "active",
        isOpen
      );

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

  }


  /* FECHAR MENU AO CLICAR */

  document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });


  /* FECHAR MENU REDIMENSIONANDO */

  window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {
      closeMenu();
    }

  });


  /* SCROLL SUAVE */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        closeMenu();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });


  /* ÍCONES LUCIDE */

  function renderIcons() {

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

  }

  renderIcons();


  /* ANIMAÇÕES AO ENTRAR NA TELA */

  const revealElements =
    document.querySelectorAll(".reveal");


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {
    observer.observe(element);
  });


  /* LIGHTBOX DA GALERIA */

  const galleryItems =
    document.querySelectorAll(
      ".gallery-item"
    );


  function openLightbox(imageSrc) {

    if (
      !lightbox ||
      !lightboxImage
    ) {
      return;
    }

    lightboxImage.src = imageSrc;

    lightbox.classList.add("open");

    document.body.style.overflow =
      "hidden";

  }


  function closeLightbox() {

    if (
      !lightbox ||
      !lightboxImage
    ) {
      return;
    }

    lightbox.classList.remove("open");

    document.body.style.overflow = "";

    setTimeout(() => {
      lightboxImage.src = "";
    }, 250);

  }


  galleryItems.forEach(item => {

    item.addEventListener(
      "click",
      () => {

        const image =
          item.dataset.image;

        if (image) {
          openLightbox(image);
        }

      }
    );

  });


  if (lightboxClose) {

    lightboxClose.addEventListener(
      "click",
      closeLightbox
    );

  }


  if (lightbox) {

    lightbox.addEventListener(
      "click",
      event => {

        if (event.target === lightbox) {
          closeLightbox();
        }

      }
    );

  }


  /* ESC */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {
        closeMenu();
        closeLightbox();
      }

    }
  );


  /* GSAP */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    !prefersReducedMotion &&
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
  ) {

    gsap.registerPlugin(
      ScrollTrigger
    );


    /* HERO */

    gsap.from(
      ".hero-bg",
      {
        scale: 1.1,
        duration: 1.5,
        ease: "power2.out"
      }
    );


    /* PARALLAX */

    gsap.to(
      ".hero-bg",
      {
        yPercent: 10,
        ease: "none",

        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      }
    );


    /* MANIFESTO */

    gsap.to(
      ".manifesto-glow",
      {
        y: -80,
        ease: "none",

        scrollTrigger: {
          trigger: ".manifesto",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

  }

});