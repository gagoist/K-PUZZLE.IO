try {
  bindLegalUi();
} catch (error) {
  console.error(error);
}

function bindLegalUi() {
  const LEGAL_PAGES = {
    "#privacy-modal": "privacy.html",
    "#contact-modal": "contact.html",
  };
  const contactForm = document.querySelector("#contact-form");
  const contactEmail = document.querySelector("#contact-email");
  const contactMessage = document.querySelector("#contact-message");
  const contactStatus = document.querySelector("#contact-status");
  const contactSubmit = document.querySelector("#contact-submit");
  const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/accb560be3fe9cbf6a6822903a1f60db";
  let contactResetTimer = 0;

  function redirectLegacyLegalHash() {
    const dest = LEGAL_PAGES[location.hash];
    if (dest) location.replace(dest);
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

  redirectLegacyLegalHash();
  window.addEventListener("hashchange", redirectLegacyLegalHash);

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
      clearTimeout(contactResetTimer);
      contactResetTimer = window.setTimeout(resetContactForm, 1600);
    } catch (error) {
      setContactStatus("Couldn't send right now. Please try again.", true);
      if (contactSubmit) {
        contactSubmit.disabled = false;
        contactSubmit.textContent = "Send";
      }
    }
  });
}
