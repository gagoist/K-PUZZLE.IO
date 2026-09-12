try {
  bindLegalUi();
} catch (error) {
  console.error(error);
}

function bindLegalUi() {
  const legalModals = {
    privacy: document.querySelector("#privacy-modal"),
    contact: document.querySelector("#contact-modal"),
  };
  const contactForm = document.querySelector("#contact-form");
  const contactEmail = document.querySelector("#contact-email");
  const contactMessage = document.querySelector("#contact-message");
  const contactStatus = document.querySelector("#contact-status");
  const contactSubmit = document.querySelector("#contact-submit");
  const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/accb560be3fe9cbf6a6822903a1f60db";
  const LEGAL_HASHES = new Set(["#privacy-modal", "#contact-modal"]);
  let legalLastFocus = null;
  let contactCloseTimer = 0;

  function clearLegalHash() {
    if (!LEGAL_HASHES.has(location.hash)) return;
    history.replaceState(null, "", `${location.pathname}${location.search}`);
  }

  function openLegalModal(modal, { resetContact = false } = {}) {
    if (!modal) return;
    closeLegalModals({ restoreFocus: false, clearHash: false });
    if (resetContact) resetContactForm();
    legalLastFocus = document.activeElement;
    modal.hidden = false;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    if (modal.id && location.hash !== `#${modal.id}`) {
      history.replaceState(null, "", `#${modal.id}`);
    }
    const focusTarget =
      modal.querySelector("input:not(.contact-honey), textarea") ||
      modal.querySelector(".site-modal-close");
    if (focusTarget) focusTarget.focus();
  }

  function closeLegalModals({ restoreFocus = true, clearHash = true } = {}) {
    Object.values(legalModals).forEach((modal) => {
      if (!modal) return;
      modal.hidden = true;
      modal.classList.add("hidden");
    });
    document.body.style.overflow = "";
    clearTimeout(contactCloseTimer);
    if (clearHash) clearLegalHash();
    if (restoreFocus && legalLastFocus && typeof legalLastFocus.focus === "function") {
      legalLastFocus.focus();
    }
    legalLastFocus = null;
  }

  function resetContactForm() {
    contactForm?.reset();
    if (contactStatus) {
      contactStatus.textContent = "";
      contactStatus.classList.remove("is-error");
    }
    if (contactSubmit) {
      contactSubmit.disabled = false;
      contactSubmit.textContent = "Send";
    }
  }

  function setContactStatus(message, isError) {
    if (!contactStatus) return;
    contactStatus.textContent = message;
    contactStatus.classList.toggle("is-error", Boolean(isError));
  }

  function syncLegalHash() {
    if (location.hash === "#privacy-modal") {
      openLegalModal(legalModals.privacy);
      return;
    }
    if (location.hash === "#contact-modal") {
      openLegalModal(legalModals.contact, { resetContact: true });
      return;
    }
    closeLegalModals({ restoreFocus: false, clearHash: false });
  }

  document.addEventListener("click", (event) => {
    const privacyLink = event.target.closest("#open-privacy, a[href='#privacy-modal']");
    const contactLink = event.target.closest("#open-contact, a[href='#contact-modal']");
    const closeLink = event.target.closest("[data-close-modal]");
    if (privacyLink) {
      event.preventDefault();
      openLegalModal(legalModals.privacy);
      return;
    }
    if (contactLink) {
      event.preventDefault();
      openLegalModal(legalModals.contact, { resetContact: true });
      return;
    }
    if (closeLink) {
      event.preventDefault();
      closeLegalModals();
      return;
    }
    if (event.target === legalModals.privacy || event.target === legalModals.contact) {
      closeLegalModals();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if ([legalModals.privacy, legalModals.contact].some((modal) => modal && !modal.hidden)) {
      closeLegalModals();
    }
  });

  window.addEventListener("hashchange", syncLegalHash);

  contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const honey = contactForm.querySelector("[name='_honey']")?.value?.trim();
    if (honey) return;

    const email = contactEmail?.value.trim() ?? "";
    const message = contactMessage?.value.trim() ?? "";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setContactStatus("Please enter a valid email address.", true);
      contactEmail?.focus();
      return;
    }
    if (!message) {
      setContactStatus("Please write a message.", true);
      contactMessage?.focus();
      return;
    }

    if (contactSubmit) {
      contactSubmit.disabled = true;
      contactSubmit.textContent = "Sending…";
    }
    setContactStatus("");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          message,
          _replyto: email,
          _subject: "K-PUZZLE.COM contact",
          _template: "table",
          _captcha: false,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      const ok = response.ok && String(payload.success) !== "false";
      if (!ok) throw new Error("submit-failed");
      setContactStatus("Thank you for your message!");
      if (contactSubmit) contactSubmit.textContent = "Sent";
      contactCloseTimer = window.setTimeout(() => {
        closeLegalModals();
        resetContactForm();
      }, 1400);
    } catch (error) {
      setContactStatus("Couldn't send right now. Please try again.", true);
      if (contactSubmit) {
        contactSubmit.disabled = false;
        contactSubmit.textContent = "Send";
      }
    }
  });

  syncLegalHash();
}
