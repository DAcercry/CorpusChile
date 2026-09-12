# Crear cuenta + correo (EmailJS)

CorpusChile en GitHub Pages es estático: no puede enviar correos solo. Usamos **EmailJS** (plan gratis).

## 1. Crear cuenta en EmailJS

1. Entra a https://www.emailjs.com/ y regístrate.
2. **Email Services** → Add Service → elige Gmail / Outlook / etc. y conéctalo.
3. Anota el **Service ID** (ej: `service_abc123`).

## 2. Plantilla de correo

1. **Email Templates** → Create Template.
2. En **To Email** usa: `{{to_email}}`
3. **Subject** ejemplo: `CorpusChile — creación de cuenta`
4. **Content** ejemplo:

```
Hola {{to_name}},

{{message}}

— CorpusChile
```

5. Anota el **Template ID** (ej: `template_xyz`).

## 3. Public Key

1. **Account** → **General** → **Public Key**
2. Cópiala.

## 4. Pegar claves en el proyecto

Edita `js/auth.js`:

```js
const AUTH_CONFIG = {
  publicKey: 'tu_public_key',
  serviceId: 'service_abc123',
  templateId: 'template_xyz',
  adminEmail: 'tu-correo-real@gmail.com', // opcional: te llega aviso de cada registro
};
```

## 5. Subir a GitHub

```
cuenta.html
js/auth.js
```

Enlace desde la portada: `cuenta.html`

## Limitaciones del prototipo

- Las “cuentas” se guardan en `localStorage` del navegador (solo demo).
- Para cuentas reales multi-dispositivo: **Supabase Auth** o **Firebase Auth** (también envían correo de verificación).
- No subas contraseñas reales a un backend sin cifrar; este flujo es solo para el prototipo.
