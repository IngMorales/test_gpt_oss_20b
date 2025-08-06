/* scripts.js */

/* ---------------------------------------------------------------------------
 *  CONFIGURACIÓN INICIAL
 * --------------------------------------------------------------------------- */
const STORAGE_KEY = 'contacts';

/* ---------------------------------------------------------------------------
 *  FUNCIÓN DE ACCESO A localStorage
 * --------------------------------------------------------------------------- */
function getContacts() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveContacts(contacts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

/* ---------------------------------------------------------------------------
 *  RENDERIZADO DE LA LISTA DE CONTACTOS
 * --------------------------------------------------------------------------- */
function renderContacts() {
    const container = document.getElementById('contactList');
    container.innerHTML = '';

    const contacts = getContacts();

    if (contacts.length === 0) {
        container.innerHTML = '<p class="text-muted">No hay contactos registrados.</p>';
        return;
    }

    contacts.forEach(contact => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-3';
        col.innerHTML = `
            <div class="card fade-in">
                <div class="card-body">
                    <h5 class="card-title">${escapeHTML(contact.name)}</h5>
                    <p class="card-text">
                        <strong>Correo:</strong> ${escapeHTML(contact.email)}<br>
                        <strong>Teléfono:</strong> ${escapeHTML(contact.phone)}
                    </p>
                    <button class="btn btn-sm btn-primary me-2 editBtn" data-id="${contact.id}">Editar</button>
                    <button class="btn btn-sm btn-danger deleteBtn" data-id="${contact.id}">Eliminar</button>
                </div>
            </div>`;
        container.appendChild(col);
    });

    // Volver a asignar los listeners (después de recrear los nodos)
    attachCardEventListeners();
}

/* ---------------------------------------------------------------------------
 *  HELPERS
 * --------------------------------------------------------------------------- */

/* Escape HTML para evitar XSS en los datos mostrados */
function escapeHTML(str) {
    return str.replace(/[&<>"'`=\/]/g, function (s) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '`': '&#x60;',
            '=': '&#x3D;',
            '/': '&#x2F;'
        })[s];
    });
}

/* Validaciones */
function validateName(name) {
    return name.length >= 2;
}
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
function validatePhone(phone) {
    const re = /^\+?\d{7,15}$/; // + opcional, 7‑15 dígitos
    return re.test(phone);
}

/* ---------------------------------------------------------------------------
 *  EVENT LISTENERS: CARD (Editar / Eliminar)
 * --------------------------------------------------------------------------- */
function attachCardEventListeners() {
    // EDITAR
    document.querySelectorAll('.editBtn').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.dataset.id;
            openEditModal(id);
        });
    });

    // ELIMINAR
    document.querySelectorAll('.deleteBtn').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.dataset.id;
            confirmDelete(id);
        });
    });
}

/* ---------------------------------------------------------------------------
 *  FORMULARIO DE AGREGAR CONTACTO
 * --------------------------------------------------------------------------- */
document.getElementById('addContactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name  = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    /* Validación cliente */
    if (!validateName(name) || !validateEmail(email) || !validatePhone(phone)) {
        Swal.fire({
            icon: 'error',
            title: 'Datos inválidos',
            text: 'Revisa los campos del formulario e inténtalo de nuevo.'
        });
        return;
    }

    const newContact = {
        id: Date.now().toString(), // ID único basado en timestamp
        name,
        email,
        phone
    };

    const contacts = getContacts();
    contacts.push(newContact);
    saveContacts(contacts);
    renderContacts();

    // Limpiar formulario
    this.reset();

    Swal.fire({
        icon: 'success',
        title: '¡Contacto añadido!',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
    });
});

/* ---------------------------------------------------------------------------
 *  MODAL DE EDICIÓN DE CONTACTO
 * --------------------------------------------------------------------------- */
function openEditModal(id) {
    const contacts = getContacts();
    const contact = contacts.find(c => c.id === id);
    if (!contact) {
        Swal.fire({
            icon: 'error',
            title: 'Contacto no encontrado',
            text: 'Inténtalo de nuevo.'
        });
        return;
    }

    // Rellenar campos del modal
    document.getElementById('editContactId').value = contact.id;
    document.getElementById('editName').value = contact.name;
    document.getElementById('editEmail').value = contact.email;
    document.getElementById('editPhone').value = contact.phone;

    // Mostrar el modal (Bootstrap 5)
    const editModal = new bootstrap.Modal(document.getElementById('editContactModal'));
    editModal.show();
}

/* Guardar cambios del modal */
document.getElementById('editContactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id    = document.getElementById('editContactId').value;
    const name  = document.getElementById('editName').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const phone = document.getElementById('editPhone').value.trim();

    if (!validateName(name) || !validateEmail(email) || !validatePhone(phone)) {
        Swal.fire({
            icon: 'error',
            title: 'Datos inválidos',
            text: 'Revisa los campos del formulario e inténtalo de nuevo.'
        });
        return;
    }

    const contacts = getContacts();
    const idx = contacts.findIndex(c => c.id === id);
    if (idx === -1) {
        Swal.fire({
            icon: 'error',
            title: 'Contacto no encontrado',
            text: 'Inténtalo de nuevo.'
        });
        return;
    }

    contacts[idx] = { id, name, email, phone };
    saveContacts(contacts);
    renderContacts();

    // Ocultar modal
    const modalEl = document.getElementById('editContactModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    Swal.fire({
        icon: 'success',
        title: '¡Contacto actualizado!',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
    });
});

/* ---------------------------------------------------------------------------
 *  CONFIRMACIÓN DE ELIMINAR
 * --------------------------------------------------------------------------- */
function confirmDelete(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el contacto de forma permanente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteContact(id);
            Swal.fire({
                icon: 'success',
                title: '¡Contactos eliminado!',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}

/* Eliminar realmente del storage */
function deleteContact(id) {
    const contacts = getContacts().filter(c => c.id !== id);
    saveContacts(contacts);
    renderContacts();
}

/* ---------------------------------------------------------------------------
 *  INICIALIZACIÓN
 * --------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    renderContacts();
});