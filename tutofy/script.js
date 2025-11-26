document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.getElementById('loginContainer');
    const userPanel = document.getElementById('userPanel');
    const userNameSpan = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');

    // ====== LOGIN SIMPLIFICADO: entra con cualquier cosa ======
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const remember = document.getElementById('remember').checked;

        // Toma el nombre del correo (antes del @)
        let nombre = email.split('@')[0] || "Estudiante";
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();

        if (remember) {
            localStorage.setItem('usuarioActual', email);
            localStorage.setItem('nombreUsuario', nombre);
        }

        entrarAlSistema(nombre);
    });

    // Si ya había iniciado sesión antes
    const nombreGuardado = localStorage.getItem('nombreUsuario');
    if (nombreGuardado) {
        entrarAlSistema(nombreGuardado);
    }

    function entrarAlSistema(nombre) {
        loginContainer.style.opacity = '0';
        setTimeout(() => {
            loginContainer.classList.add('hidden');
            userPanel.classList.remove('hidden');
            userNameSpan.textContent = nombre;

            // Mostrar la primera pestaña (Matemáticas) por defecto
            document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));
            document.querySelector('.tab-content').classList.add('active');
        }, 400);
    }

    // Cerrar sesión
    logoutBtn.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });

    // Toggle ojo contraseña
    document.querySelector('.toggle-password').addEventListener('click', () => {
        const passwordInput = document.getElementById('password');
        const icon = document.getElementById('toggleIcon');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });

    // Pestañas de materias
    document.querySelectorAll('.tabs a').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const target = tab.getAttribute('href');
            document.querySelectorAll('.tab-content').forEach(sec => {
                sec.classList.remove('active');
            });
            document.querySelector(target).classList.add('active');
        });
    });
});