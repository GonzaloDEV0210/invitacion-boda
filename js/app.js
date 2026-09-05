/**
 * Invitación de Boda - Gonzalo y Sayuri
 * Lógica interactiva en Vanilla JavaScript
 */

// Observer global para que initHeroEnvelope pueda reutilizarlo
let revealObserver = null;

document.addEventListener("DOMContentLoaded", () => {
  initHeroEnvelope();
  initCountdown();
  initMusicPlayer();
  initScrollReveal();
  initModals();
  initRsvpForm();
  initClipboardCopy();
});

/* ==========================================================================
   1. Sobre Pequeño Interactivo en el Hero y Hoja de Invitación
   ========================================================================== */
function initHeroEnvelope() {
  const envelopeBtn    = document.getElementById("hero-envelope-btn");
  const heroSection    = document.querySelector("header.hero-section");
  const mainContent    = document.getElementById("main-content");
  const transScreen    = document.getElementById("transition-screen");
  const ornament       = transScreen?.querySelector(".transition-ornament");
  const line1          = document.getElementById("transition-line-1");
  const line2          = document.getElementById("transition-line-2");

  if (!envelopeBtn || !heroSection || !mainContent || !transScreen) return;

  // Flash de luz
  const flash = document.createElement("div");
  flash.id = "envelope-flash";
  document.body.appendChild(flash);

  function openEnvelope() {
    if (envelopeBtn.classList.contains("is-opening")) return;
    envelopeBtn.classList.add("is-opening");

    // 0ms — La solapa 3D se abre + lacre desaparece

    // 600ms — Flash de luz muy suave
    setTimeout(() => {
      flash.classList.add("flash-in");
    }, 600);

    // 1000ms — Pantalla lila aparece suavemente, hero se desvanece
    setTimeout(() => {
      heroSection.classList.add("fade-out");
      transScreen.classList.add("ts-visible");
      flash.classList.remove("flash-in");
      flash.classList.add("flash-out");
    }, 1000);

    // 1600ms — Ornamento lila se despliega
    setTimeout(() => {
      if (ornament) ornament.classList.add("ts-show");
    }, 1600);

    // 2100ms — "¿Estás listo?" aparece suavemente
    setTimeout(() => {
      if (line1) line1.classList.add("ts-show");
    }, 2100);

    // 3600ms — "Comencemos..." aparece con calma
    setTimeout(() => {
      if (line2) line2.classList.add("ts-show");
    }, 3600);

    // 4800ms — Pantalla se desvanece suavemente (más rápido)
    setTimeout(() => {
      transScreen.classList.add("ts-hiding");
    }, 4800);

    // 5300ms — Contenido aparece y scroll se desbloquea
    setTimeout(() => {
      mainContent.classList.add("active");
      document.body.classList.remove("locked");

      // Lluvia de flores de entrada
      initFlowerRain();

      // Re-activar el IntersectionObserver para que el scroll
      // revele los elementos poco a poco de forma natural
      if (revealObserver) {
        document.querySelectorAll("[data-reveal]").forEach(el => {
          revealObserver.observe(el);
        });
      }

      // Música con fade-in suave
      if (window.weddingMusic) {
        window.weddingMusic.autoStart();
      }
    }, 5300);

    // 6500ms — Limpieza del DOM
    setTimeout(() => {
      heroSection.style.display = "none";
      transScreen.remove();
      flash.remove();
    }, 6500);
  }

  envelopeBtn.addEventListener("click", openEnvelope);
}

/* ==========================================================================
   Lluvia de Flores — Entrada al Contenido
   ========================================================================== */
function initFlowerRain() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const container = document.createElement("div");
  container.id = "flower-rain";
  document.body.appendChild(container);

  // Formas SVG: flor 5 pétalos, corazón, pétalo suelto
  const shapes = [
    `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <ellipse cx="12" cy="5"  rx="3.5" ry="5.5" transform="rotate(0   12 12)"/>
      <ellipse cx="12" cy="5"  rx="3.5" ry="5.5" transform="rotate(72  12 12)"/>
      <ellipse cx="12" cy="5"  rx="3.5" ry="5.5" transform="rotate(144 12 12)"/>
      <ellipse cx="12" cy="5"  rx="3.5" ry="5.5" transform="rotate(216 12 12)"/>
      <ellipse cx="12" cy="5"  rx="3.5" ry="5.5" transform="rotate(288 12 12)"/>
      <circle cx="12" cy="12" r="2.5"/>
    </svg>`,
    `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M12 20C7 15 2 12 2 8a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 4-5 7-10 12z"/>
    </svg>`,
    `<svg viewBox="0 0 14 22" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <ellipse cx="7" cy="11" rx="5.5" ry="10"/>
    </svg>`,
    `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <circle cx="12" cy="12" r="3"/>
      <ellipse cx="12" cy="4"  rx="2.5" ry="4" transform="rotate(0   12 12)"/>
      <ellipse cx="12" cy="4"  rx="2.5" ry="4" transform="rotate(60  12 12)"/>
      <ellipse cx="12" cy="4"  rx="2.5" ry="4" transform="rotate(120 12 12)"/>
      <ellipse cx="12" cy="4"  rx="2.5" ry="4" transform="rotate(180 12 12)"/>
      <ellipse cx="12" cy="4"  rx="2.5" ry="4" transform="rotate(240 12 12)"/>
      <ellipse cx="12" cy="4"  rx="2.5" ry="4" transform="rotate(300 12 12)"/>
    </svg>`,
  ];

  // Tonos lilas bebé
  const colors = [
    "oklch(0.82 0.08 300)",
    "oklch(0.88 0.06 305)",
    "oklch(0.78 0.10 295)",
    "oklch(0.92 0.05 308)",
    "oklch(0.75 0.09 298)",
  ];

  const total = 60;

  for (let i = 0; i < total; i++) {
    const el = document.createElement("div");
    el.className = "rain-flower";

    const size    = Math.random() * 18 + 8;            // 8–26 px
    const left    = Math.random() * 102 - 1;           // -1% → 101%
    const delay   = Math.random() * 3.2;               // 0–3.2 s
    const dur     = Math.random() * 2.5 + 2.8;         // 2.8–5.3 s
    const drift   = (Math.random() - 0.5) * 140;       // ±70 px horizontal
    const spin    = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 540 + 180); // ±180–720°
    const color   = colors[Math.floor(Math.random() * colors.length)];
    const shape   = shapes[Math.floor(Math.random() * shapes.length)];

    el.innerHTML  = shape;
    el.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      color: ${color};
      opacity: 0;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      --drift-x: ${drift}px;
      --spin: ${spin}deg;
    `;

    container.appendChild(el);
  }

  // Limpiar el contenedor cuando terminen todas las animaciones
  setTimeout(() => container.remove(), 6500);
}



/* ==========================================================================
   2. Cuenta Regresiva (Countdown)
   ========================================================================== */
function initCountdown() {
  const WEDDING_DATE = new Date("2026-10-10T15:30:00-05:00").getTime();

  const daysEl = document.getElementById("countdown-days");
  const hoursEl = document.getElementById("countdown-hours");
  const minEl = document.getElementById("countdown-minutes");
  const secEl = document.getElementById("countdown-seconds");

  if (!daysEl || !hoursEl || !minEl || !secEl) return;

  function update() {
    const now = Date.now();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minEl.textContent = "00";
      secEl.textContent = "00";
      return;
    }

    const s = Math.floor(diff / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;

    daysEl.textContent = String(d).padStart(2, "0");
    hoursEl.textContent = String(h).padStart(2, "0");
    minEl.textContent = String(m).padStart(2, "0");
    secEl.textContent = String(sec).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   3. Reproductor de Música (Music Player)
   ========================================================================== */
function initMusicPlayer() {
  const audio = document.getElementById("wedding-audio");
  const playBtn = document.getElementById("btn-play-pause");
  const playerCard = document.querySelector(".music-player-floating");
  const progressBarWrap = document.getElementById("progress-bar-wrap");
  const progressBarFill = document.getElementById("progress-bar-fill");
  const currentTimeEl = document.getElementById("current-time");
  const totalDurationEl = document.getElementById("total-duration");
  const playerStatusEl = document.getElementById("player-status");
  const iconPlay = document.getElementById("icon-play");
  const iconPause = document.getElementById("icon-pause");

  if (!audio || !playBtn) return;

  const TARGET_VOLUME = 0.55;
  let fadeTimer = null;
  let isPlaying = false;

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === null) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const fadeIn = () => {
    if (fadeTimer) clearInterval(fadeTimer);
    audio.volume = 0;
    fadeTimer = setInterval(() => {
      const next = Math.min(TARGET_VOLUME, audio.volume + TARGET_VOLUME / 90);
      audio.volume = next;
      if (next >= TARGET_VOLUME) {
        clearInterval(fadeTimer);
        fadeTimer = null;
      }
    }, 80);
  };

  const setPlayState = (playing) => {
    isPlaying = playing;
    if (playerCard) {
      if (playing) {
        playerCard.classList.add("playing");
      } else {
        playerCard.classList.remove("playing");
      }
    }
    if (iconPlay && iconPause) {
      iconPlay.style.display = playing ? "none" : "block";
      iconPause.style.display = playing ? "block" : "none";
    }
    if (playerStatusEl) {
      playerStatusEl.textContent = playing ? "Sonando ahora" : "Reproducir";
    }
  };

  const toggle = async () => {
    try {
      if (isPlaying) {
        audio.pause();
        setPlayState(false);
      } else {
        audio.loop = true;
        await audio.play();
        fadeIn();
        setPlayState(true);
      }
    } catch (err) {
      console.warn("Reproducción no disponible o bloqueada por el navegador:", err);
      setPlayState(false);
      if (playerStatusEl) playerStatusEl.textContent = "Canción no disponible";
    }
  };

  playBtn.addEventListener("click", toggle);

  audio.addEventListener("timeupdate", () => {
    const cur = audio.currentTime || 0;
    const dur = audio.duration || 0;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(cur);
    if (progressBarFill && dur > 0) {
      const pct = (cur / dur) * 100;
      progressBarFill.style.width = `${pct}%`;
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    if (totalDurationEl) totalDurationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("ended", () => {
    setPlayState(false);
  });

  if (progressBarWrap) {
    progressBarWrap.addEventListener("click", (e) => {
      const rect = progressBarWrap.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      if (audio.duration) {
        audio.currentTime = pos * audio.duration;
      }
    });
  }

  // Exportar para que la apertura del sobre pueda activarlo
  window.weddingMusic = {
    autoStart: () => {
      if (isPlaying) return;
      audio.loop = true;
      audio.volume = 0;
      audio.play().then(() => {
        fadeIn();
        setPlayState(true);
      }).catch(() => {
        /* Autoplay bloqueado: el usuario puede dar clic al botón */
      });
    }
  };
}

/* ==========================================================================
   4. Animaciones al hacer Scroll (IntersectionObserver)
   ========================================================================= */
function initScrollReveal() {
  const reveals = document.querySelectorAll("[data-reveal]");
  if (!reveals.length) return;

  if (!("IntersectionObserver" in window)) {
    reveals.forEach(el => el.setAttribute("data-shown", "true"));
    return;
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.setAttribute("data-shown", "true");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -4% 0px"
  });

  // Solo observa si el elemento es visible (fuera de display:none)
  reveals.forEach(el => {
    const parent = el.closest("#main-content");
    if (!parent) revealObserver.observe(el);
  });
}

/* ==========================================================================
   5. Sistema de Modales (RSVP & Regalos)
   ========================================================================== */
function initModals() {
  const triggers = document.querySelectorAll("[data-modal-target]");
  const closeBtns = document.querySelectorAll("[data-modal-close]");
  const backdrops = document.querySelectorAll(".modal-backdrop");

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add("active");
      document.body.classList.add("locked");
    }
  }

  function closeModal(modalEl) {
    if (modalEl) {
      modalEl.classList.remove("active");
      const activeModals = document.querySelectorAll(".modal-backdrop.active, .letter-sheet-overlay.active");
      if (activeModals.length === 0) {
        document.body.classList.remove("locked");
      }
    }
  }

  triggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-modal-target");
      openModal(targetId);
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal-backdrop");
      closeModal(modal);
    });
  });

  backdrops.forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop.active").forEach(closeModal);
    }
  });
}

/* ==========================================================================
   6. Formulario RSVP, Google Sheets & WhatsApp (Gonzalo y Sayuri)
   ========================================================================== */
function initRsvpForm() {
  const form = document.getElementById("rsvp-form");
  const nameInput = document.getElementById("rsvp-nombre");
  const phoneInput = document.getElementById("rsvp-tel");
  const checkInput = document.getElementById("rsvp-check");

  const errName = document.getElementById("error-name");
  const errPhone = document.getElementById("error-phone");
  const errCheck = document.getElementById("error-check");

  const formSection = document.getElementById("rsvp-form-container");
  const successSection = document.getElementById("rsvp-success-container");

  if (!form) return;

  const WHATSAPP_PHONE = "51999999999";
  // URL de la aplicación web de Google Apps Script conectada a Google Sheets:
  const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbxmFj6MBBhaOf1K2Zzzo2CfolkTCCe6oGNdbvRaqHz3bIMaDxVeHGo6LjCQacJMou3D/exec";


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let hasErrors = false;

    // Reset errors
    if (errName) errName.textContent = "";
    if (errPhone) errPhone.textContent = "";
    if (errCheck) errCheck.textContent = "";

    const nameVal = nameInput ? nameInput.value.trim() : "";
    const phoneVal = phoneInput ? phoneInput.value.trim() : "";
    const checkVal = checkInput ? checkInput.checked : false;

    if (!nameVal) {
      if (errName) errName.textContent = "Ingresa tus nombres y apellidos";
      hasErrors = true;
    } else if (nameVal.length < 5) {
      if (errName) errName.textContent = "Escribe tu nombre completo";
      hasErrors = true;
    } else if (nameVal.length > 100) {
      if (errName) errName.textContent = "Máximo 100 caracteres";
      hasErrors = true;
    }

    if (!phoneVal) {
      if (errPhone) errPhone.textContent = "Ingresa tu número de celular";
      hasErrors = true;
    } else if (!/^[0-9+\s()-]{7,20}$/.test(phoneVal)) {
      if (errPhone) errPhone.textContent = "Número no válido";
      hasErrors = true;
    }

    if (!checkVal) {
      if (errCheck) errCheck.textContent = "Debes marcar la confirmación";
      hasErrors = true;
    }

    if (hasErrors) return;

    // Guardar automáticamente en Google Sheets (si se configuró la URL)
    if (GOOGLE_SHEETS_URL) {
      fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nameVal,
          celular: phoneVal,
          asistencia: checkVal
        })
      }).catch((err) => console.warn("Error enviando a Google Sheets:", err));
    }

    // Mostrar pantalla de éxito
    if (formSection) formSection.style.display = "none";
    if (successSection) successSection.style.display = "block";
  });
}



/* ==========================================================================
   7. Copiar al Portapapeles (Datos Bancarios)
   ========================================================================== */
function initClipboardCopy() {
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const textToCopy = btn.getAttribute("data-copy") || "";
      const cleanText = textToCopy.replace(/\s+/g, "");

      try {
        await navigator.clipboard.writeText(cleanText);

        const iconCopy = btn.querySelector(".icon-copy");
        const iconCheck = btn.querySelector(".icon-check");

        if (iconCopy && iconCheck) {
          iconCopy.style.display = "none";
          iconCheck.style.display = "block";

          setTimeout(() => {
            iconCopy.style.display = "block";
            iconCheck.style.display = "none";
          }, 1800);
        }
      } catch (err) {
        console.warn("No se pudo copiar al portapapeles:", err);
      }
    });
  });
}
