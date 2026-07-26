/* =====================================================
   Saffron Dental & Aesthetic Clinic — Static Site Scripts
   ===================================================== */

(function () {
  "use strict";

  /* ---------- Header ---------- */
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add("is-solid");
    } else {
      header.classList.remove("is-solid");
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("is-open");
      mainNav.classList.toggle("is-open");
      document.body.style.overflow = mainNav.classList.contains("is-open") ? "hidden" : "";
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("is-open");
        mainNav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = Array.from(document.querySelectorAll("section[id], div[id]"));
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    let activeId = sections[0]?.id || "";

    for (const section of sections) {
      if (section.offsetTop <= scrollPos) {
        activeId = section.id;
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === "#" + activeId) {
        link.classList.add("is-active");
      } else {
        link.classList.remove("is-active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  /* ---------- Carousel ---------- */
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const prevBtn = carousel.querySelector(".carousel-prev");
    const nextBtn = carousel.querySelector(".carousel-next");
    const dotsContainer = carousel.querySelector(".carousel-dots");

    if (!slides.length) return;

    let currentIndex = 0;
    let autoplayTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;

    // Build dots
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.addEventListener("click", () => {
          goTo(i);
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));

    function updateCarousel() {
      const slideWidth = slides[0].offsetWidth + 16; // 1rem gap
      track.style.transform = "translate3d(-" + currentIndex * slideWidth + "px, 0, 0)";

      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === currentIndex);
      });
    }

    function next() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }

    function prev() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    }

    function goTo(index) {
      currentIndex = index;
      updateCarousel();
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(next, 4000);
    }

    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); resetAutoplay(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { next(); resetAutoplay(); });

    // Touch/swipe support
    track.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? next() : prev();
        resetAutoplay();
      }
    }, { passive: true });

    // Pause autoplay on hover
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
    startAutoplay();
  });

  /* ---------- Service Tabs ---------- */
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;

      tabBtns.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      tabPanels.forEach((panel) => {
        const match = panel.id === target || panel.id === "panel-" + target;
        if (match) {
          panel.hidden = false;
          panel.classList.add("is-active");
          // panels start hidden, so their reveal elements never intersect
          panel.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
        } else {
          panel.hidden = true;
          panel.classList.remove("is-active");
        }
      });
    });
  });


  /* ---------- Scroll reveal ---------- */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
