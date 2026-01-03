// ======= CONFIG (cambiá esto y queda listo) =======
const CONFIG = {
  whatsappNumber: "59800000000", // <-- cambialo
  businessName: "BRASA 23",
  mapsQuery: "Av. Principal 1234, Montevideo", // <-- cambialo
};

// Construye link wa.me con mensaje prellenado
function buildWhatsAppLink(message) {
  const base = `https://wa.me/${CONFIG.whatsappNumber}`;
  const text = encodeURIComponent(message);
  return `${base}?text=${text}`;
}

function buildMapsLink(query) {
  const q = encodeURIComponent(query);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function buildMapsEmbed(query) {
  // Embed simple sin API key (para demo)
  const q = encodeURIComponent(query);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

// ======= CTA messages =======
const reserveMsg = `Hola ${CONFIG.businessName}, quiero reservar. Somos ___ para hoy a las ____.`;
const promoMsg = `Hola ${CONFIG.businessName}, quiero reservar para el martes 2x1. Somos ___ a las ____.`;

// ======= Wire up buttons =======
const ctas = [
  "ctaReserveTop",
  "ctaReserveHero",
  "ctaReserveMenu",
  "ctaReservePromo",
  "ctaReserveLocation",
  "ctaReserveMobile",
  "wappFloat",
];

ctas.forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const msg = id === "ctaReservePromo" ? promoMsg : reserveMsg;
  el.href = buildWhatsAppLink(msg);
  el.target = "_blank";
  el.rel = "noopener";
});

// Maps
const mapsBtn = document.getElementById("ctaMaps");
if (mapsBtn) {
  mapsBtn.href = buildMapsLink(CONFIG.mapsQuery);
}
const iframe = document.querySelector(".loc__map iframe");
if (iframe) {
  iframe.src = buildMapsEmbed(CONFIG.mapsQuery);
}

// ======= Mobile drawer =======
const burgerBtn = document.getElementById("burgerBtn");
const drawer = document.getElementById("drawer");

function closeDrawer() {
  drawer?.classList.remove("is-open");
  burgerBtn?.setAttribute("aria-expanded", "false");
  drawer?.setAttribute("aria-hidden", "true");
}

function openDrawer() {
  drawer?.classList.add("is-open");
  burgerBtn?.setAttribute("aria-expanded", "true");
  drawer?.setAttribute("aria-hidden", "false");
}

burgerBtn?.addEventListener("click", () => {
  const isOpen = drawer.classList.contains("is-open");
  isOpen ? closeDrawer() : openDrawer();
});

// Cierra al clickear links del drawer
document.querySelectorAll(".drawer__link").forEach((a) => {
  a.addEventListener("click", closeDrawer);
});

// Cierra con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});
