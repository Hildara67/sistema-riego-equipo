const intro = document.getElementById('loginIntro');
const loginMain = document.getElementById('loginMain');
const form = document.getElementById('loginForm');
const usuarioInput = document.getElementById('usuario');
const passwordInput = document.getElementById('password');
const btnIngresar = document.getElementById('btnIngresar');
const errorMessage = document.getElementById('errorMessage');
const togglePassword = document.getElementById('togglePassword');

// Animación de entrada: muestra el logo 2.2s y luego aparece el formulario
setTimeout(() => {
  intro.classList.add('fade-out');
  setTimeout(() => {
    intro.style.display = 'none';
    loginMain.style.display = 'flex';
    requestAnimationFrame(() => {
      loginMain.classList.add('show');
      if (window.innerWidth > 768 && !window.api) {
        usuarioInput.focus();
      }
    });
  }, 700);
}, 2200);

// Habilita el botón solo si usuario no está vacío y contraseña >= 8 caracteres
function validarFormulario() {
  const valido = usuarioInput.value.trim().length > 0 && passwordInput.value.length >= 8;
  btnIngresar.disabled = !valido;
}

usuarioInput.addEventListener('input', validarFormulario);
passwordInput.addEventListener('input', validarFormulario);

// Solo permite caracteres alfanuméricos en el nombre de usuario
usuarioInput.addEventListener('input', function() {
  this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
});

// Botón para mostrar/ocultar la contraseña
togglePassword.addEventListener('click', function() {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
});

// Si el backend (Electron) no cargó el puente API, muestra error
if (!window.api) {
  errorMessage.textContent = 'Error cargando la aplicación. Intenta recargar la página.';
  errorMessage.classList.add('show');
  btnIngresar.disabled = true;
}

// Envío del formulario: llama al backend vía IPC (window.api.login)
// Redirige a dashboard.html (OPERADOR) o parcelas.html (SUPERVISOR)
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  if (btnIngresar.disabled) return;

  errorMessage.classList.remove('show');
  btnIngresar.disabled = true;
  btnIngresar.textContent = 'Ingresando...';

  try {
    if (!window.api || !window.api.login) {
      throw new Error('API no disponible. Ejecuta la aplicación con "npm start" desde la terminal.');
    }

    const result = await window.api.login({
      nombre: usuarioInput.value.trim(),
      password: passwordInput.value
    });

    if (result.success) {
      sessionStorage.setItem('usuario', JSON.stringify(result.usuario));
      const rol = result.usuario.rol;
      // OPERADOR ve dashboard, SUPERVISOR ve gestión de parcelas
      if (rol === 'OPERADOR') {
        window.location.href = 'dashboard.html';
      } else {
        window.location.href = 'parcelas.html';
      }
    } else {
      errorMessage.textContent = result.error || 'Credenciales inválidas';
      errorMessage.classList.add('show');
      usuarioInput.focus();
    }
  } catch (err) {
    errorMessage.textContent = 'Error: ' + err.message;
    errorMessage.classList.add('show');
  } finally {
    btnIngresar.disabled = false;
    btnIngresar.textContent = 'Ingresar';
  }
});
