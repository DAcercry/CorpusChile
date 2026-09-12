/**
 * CorpusChile — registro de cuenta con envío de correo (EmailJS)
 *
 * Configuración (gratis en https://www.emailjs.com/ ):
 * 1. Crea una cuenta EmailJS
 * 2. Añade un servicio de correo (Gmail, Outlook, etc.)
 * 3. Crea una plantilla con variables: {{to_email}}, {{to_name}}, {{message}}
 * 4. Reemplaza los tres valores de AUTH_CONFIG abajo
 *
 * La plantilla puede ir:
 *   - al usuario (bienvenida / confirma tu correo)
 *   - o a tu bandeja (aviso de nuevo registro)
 */

const AUTH_CONFIG = {
  // Reemplaza con tus claves de EmailJS
  publicKey: 'TU_PUBLIC_KEY',
  serviceId: 'TU_SERVICE_ID',
  templateId: 'TU_TEMPLATE_ID',
  // Correo que recibe el aviso de nueva cuenta (tú / admin)
  adminEmail: 'tu-correo@ejemplo.cl',
};

const STORAGE_KEY = 'corpuschile_users';

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function currentUser() {
  try {
    return JSON.parse(localStorage.getItem('corpuschile_session') || 'null');
  } catch {
    return null;
  }
}

function setSession(user) {
  if (user) localStorage.setItem('corpuschile_session', JSON.stringify(user));
  else localStorage.removeItem('corpuschile_session');
}

function isEmailjsConfigured() {
  return (
    AUTH_CONFIG.publicKey &&
    !AUTH_CONFIG.publicKey.startsWith('TU_') &&
    AUTH_CONFIG.serviceId &&
    !AUTH_CONFIG.serviceId.startsWith('TU_') &&
    AUTH_CONFIG.templateId &&
    !AUTH_CONFIG.templateId.startsWith('TU_')
  );
}

async function sendAccountEmail({ name, email }) {
  if (!isEmailjsConfigured()) {
    console.warn('EmailJS no configurado. Simulando envío de correo.');
    return { simulated: true };
  }

  if (typeof emailjs === 'undefined') {
    throw new Error('EmailJS no está cargado. Revisa el script en la página.');
  }

  emailjs.init(AUTH_CONFIG.publicKey);

  // 1) Correo al usuario (bienvenida)
  await emailjs.send(AUTH_CONFIG.serviceId, AUTH_CONFIG.templateId, {
    to_email: email,
    to_name: name,
    from_name: 'CorpusChile',
    message:
      `Hola ${name},\n\n` +
      `Recibimos tu solicitud de creación de cuenta en CorpusChile.\n` +
      `Correo registrado: ${email}\n\n` +
      `Si no fuiste tú, ignora este mensaje.\n\n` +
      `— Equipo CorpusChile`,
  });

  // 2) Aviso opcional al admin (misma plantilla, otro destinatario)
  if (AUTH_CONFIG.adminEmail && !AUTH_CONFIG.adminEmail.includes('ejemplo')) {
    try {
      await emailjs.send(AUTH_CONFIG.serviceId, AUTH_CONFIG.templateId, {
        to_email: AUTH_CONFIG.adminEmail,
        to_name: 'Admin CorpusChile',
        from_name: 'CorpusChile',
        message: `Nueva solicitud de cuenta:\nNombre: ${name}\nCorreo: ${email}`,
      });
    } catch (e) {
      console.warn('No se pudo notificar al admin:', e);
    }
  }

  return { simulated: false };
}

async function registerAccount({ name, email, password }) {
  name = (name || '').trim();
  email = (email || '').trim().toLowerCase();
  password = password || '';

  if (name.length < 2) throw new Error('Ingresa tu nombre.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Correo no válido.');
  if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.');

  const users = loadUsers();
  if (users.some((u) => u.email === email)) {
    throw new Error('Ya existe una cuenta con ese correo.');
  }

  // Nota: esto es solo prototipo en el navegador.
  // En producción usa Supabase / Firebase (contraseñas hasheadas en servidor).
  const user = {
    id: 'u_' + Date.now().toString(36),
    name,
    email,
    password, // solo demo local
    createdAt: new Date().toISOString(),
    pendingEmail: true,
  };
  users.push(user);
  saveUsers(users);

  const mail = await sendAccountEmail({ name, email });
  setSession({ id: user.id, name: user.name, email: user.email });

  return { user: { id: user.id, name, email }, mail };
}

function loginAccount({ email, password }) {
  email = (email || '').trim().toLowerCase();
  const users = loadUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error('Correo o contraseña incorrectos.');
  setSession({ id: user.id, name: user.name, email: user.email });
  return { id: user.id, name: user.name, email: user.email };
}

function logoutAccount() {
  setSession(null);
}

// API global
window.CorpusAuth = {
  registerAccount,
  loginAccount,
  logoutAccount,
  currentUser,
  isEmailjsConfigured,
  AUTH_CONFIG,
};
