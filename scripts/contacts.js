const CONTACTS = {
  phoneDisplay: "+38 (000) 000-00-00",
  phoneDigits: "380000000000",
  email: "infocheck@comforttrans.ua",
  address: "Україна",
};

const contactLinks = {
  phone: () => `tel:+${CONTACTS.phoneDigits}`,
  email: () => `mailto:${CONTACTS.email}`,
  telegram: () => `tg://resolve?phone=${CONTACTS.phoneDigits}`,
  viber: () => `viber://chat?number=%2B${CONTACTS.phoneDigits}`,
};

const contactText = {
  phone: () => CONTACTS.phoneDisplay,
  email: () => CONTACTS.email,
  address: () => CONTACTS.address,
};

const applyContacts = (root = document) => {
  root.querySelectorAll("[data-contact]").forEach((element) => {
    const key = element.dataset.contact;
    const getText = contactText[key];

    if (getText) {
      element.textContent = getText();
    }
  });

  root.querySelectorAll("[data-contact-href]").forEach((element) => {
    const key = element.dataset.contactHref;
    const getHref = contactLinks[key];

    if (getHref) {
      element.href = getHref();
    }
  });
};

document.addEventListener("DOMContentLoaded", () => applyContacts());
document.body.addEventListener("htmx:afterSwap", (event) => applyContacts(event.target));
document.body.addEventListener("htmx:load", (event) => applyContacts(event.target));

window.CONTACTS = CONTACTS;
window.applyContacts = applyContacts;
