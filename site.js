(() => {
  "use strict";

  const header = document.querySelector(".header");
  const backToTop = document.querySelector(".back-to-top");
  const navbarToggler = document.getElementById("navbarToggler");
  const navbarCollapse = document.getElementById("navbarCollapse");
  const menuLinks = [...document.querySelectorAll('.menu-scroll[href^="#"]')];

  const updateScrollState = () => {
    const scrollPosition = window.scrollY;
    header?.classList.toggle("sticky", scrollPosition > 0);
    if (backToTop) backToTop.style.display = scrollPosition > 50 ? "flex" : "none";

    for (const link of menuLinks) {
      const section = document.querySelector(link.hash);
      const isActive = section && section.offsetTop <= scrollPosition + 80
        && section.offsetTop + section.offsetHeight > scrollPosition + 80;
      link.classList.toggle("active", Boolean(isActive));
    }
  };

  let scrollFrame;
  window.addEventListener("scroll", () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      updateScrollState();
      scrollFrame = null;
    });
  }, { passive: true });
  updateScrollState();

  navbarToggler?.addEventListener("click", () => {
    const isOpen = navbarToggler.getAttribute("aria-expanded") === "true";
    navbarToggler.setAttribute("aria-expanded", String(!isOpen));
    navbarToggler.classList.toggle("navbarTogglerActive", !isOpen);
    navbarCollapse?.classList.toggle("hidden", isOpen);
  });

  for (const link of menuLinks) {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.hash);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      navbarToggler?.setAttribute("aria-expanded", "false");
      navbarToggler?.classList.remove("navbarTogglerActive");
      navbarCollapse?.classList.add("hidden");
    });
  }

  backToTop?.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  });

  const portfolioWrapper = document.querySelector("#portfolio .items-wrapper");
  const portfolioButtons = [...document.querySelectorAll(".portfolio-buttons button[data-filter]")];
  if (portfolioWrapper && portfolioButtons.length) {
    const filterPortfolio = (filter) => {
      for (const item of portfolioWrapper.querySelectorAll(".item")) item.hidden = !item.matches(filter);
    };

    for (const button of portfolioButtons) {
      button.addEventListener("click", () => {
        for (const candidate of portfolioButtons) {
          const active = candidate === button;
          candidate.classList.toggle("active", active);
          candidate.setAttribute("aria-pressed", String(active));
        }
        filterPortfolio(button.dataset.filter);
      });
    }
    filterPortfolio(".feat");
    portfolioWrapper.classList.add("portfolio-ready");
  }

  const year = document.getElementById("year-footer");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("contactForm");
  const status = document.getElementById("result");
  if (form && status) {
    const submitButton = form.querySelector('button[type="submit"]');
    const defaultLabel = submitButton?.dataset.label || submitButton?.textContent.trim() || "Senden";

    const setStatus = (message, type = "") => {
      status.textContent = message;
      status.className = "contact-form-status text-base";
      if (message) status.classList.add("is-visible");
      if (type) status.classList.add(type);
    };
    const invalidate = (field, message) => {
      field?.classList.add("is-invalid");
      field?.focus();
      setStatus(message, "is-error");
      return false;
    };
    const validate = () => {
      for (const field of form.querySelectorAll(".contact-field")) field.classList.remove("is-invalid");
      const name = form.elements.namedItem("name");
      const email = form.elements.namedItem("email");
      const phone = form.elements.namedItem("phone");
      const area = form.elements.namedItem("area");
      const content = form.elements.namedItem("content");
      const textPattern = /^[\p{L}\p{M}0-9 .,'&()\-/]+$/u;

      if (!name?.value.trim() || name.value.trim().length < 2 || !textPattern.test(name.value.trim())) return invalidate(name, "Bitte geben Sie einen gültigen Namen ein.");
      if (!/^\S+@\S+\.\S+$/.test(email?.value.trim() || "")) return invalidate(email, "Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      if (phone?.value.trim() && !/^[0-9+()\-\s/]{6,}$/.test(phone.value.trim())) return invalidate(phone, "Bitte geben Sie eine gültige Telefonnummer ein.");
      if (!area?.value.trim() || area.value.trim().length < 2 || !textPattern.test(area.value.trim())) return invalidate(area, "Bitte geben Sie ein gültiges Fachgebiet ein.");
      if (!content?.value.trim() || content.value.trim().length < 10) return invalidate(content, "Bitte beschreiben Sie Ihr Anliegen mit mindestens 10 Zeichen.");
      return true;
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!validate()) return;
      setStatus("Nachricht wird gesendet…", "is-pending");
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Wird gesendet…";
      }
      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: { "Accept": "application/json, text/plain, */*" },
          body: new URLSearchParams(new FormData(form)),
        });
        if (!response.ok) throw new Error("Request failed");
        form.reset();
        setStatus("Vielen Dank. Ihre Nachricht wurde erfolgreich versendet.", "is-success");
      } catch {
        setStatus("Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.", "is-error");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = defaultLabel;
        }
      }
    });
  }
})();
