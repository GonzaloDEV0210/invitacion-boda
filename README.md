# Invitación de Boda · Gonzalo y Sayuri (10.10.2026)

Página web interactiva y responsiva para invitación de matrimonio, desarrollada en **HTML5, CSS3 y JavaScript puro**.

---

## Estructura del Proyecto

```text
invitacion-boda/
├── assets/          # Imágenes y recursos gráficos (fotos de la pareja, flores, etc.)
├── css/
│   └── style.css    # Hoja de estilos, animaciones y diseño responsivo
├── js/
│   └── app.js       # Lógica interactiva (sobre, contador, música, modales, RSVP)
├── favicon.ico      # Icono de la pestaña del navegador
├── index.html       # Página principal de la invitación
└── README.md        # Documentación
```

---

## Cómo usar en local (XAMPP / Apache)

1. Coloca esta carpeta en tu directorio de XAMPP:
   ```text
   C:\xampp\htdocs\invitacion-boda\
   ```
2. Inicia el módulo **Apache** desde el *XAMPP Control Panel*.
3. Abre tu navegador e ingresa a:
   ```text
   http://localhost/invitacion-boda/
   ```

---

## Personalización Rápida

- **Música de fondo**: Añade tu archivo de audio como `cancion.mp3` en la raíz del proyecto.
- **Códigos QR de Yape / Plin**: Coloca las imágenes `qr-yape.png` y `qr-plin.png` dentro de la carpeta `assets/`.
- **Número de WhatsApp para RSVP**: En `js/app.js`, edita la constante `WHATSAPP_PHONE` con el número deseado (incluyendo el código de país, ej. `51999999999`).
