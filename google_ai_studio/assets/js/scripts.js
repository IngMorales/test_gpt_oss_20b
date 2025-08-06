/*
 * Archivo: scripts.js
 * Descripción: Lógica del lado del cliente para el CRUD de contactos.
 */

// Se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- Referencias a Elementos del DOM ---
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contact-list');
    const editModalElement = document.getElementById('editContactModal');
    const editModal = new bootstrap.Modal(editModalElement);
    const editForm = document.getElementById('editForm');
    
    const STORAGE_KEY = 'myContacts';

    // --- Funciones de Lógica de Negocio (CRUD) ---

    /**
     * Obtiene los contactos desde localStorage.
     * @returns {Array} - Un array de objetos de contacto.
     */
    const getContacts = () => {
        const contacts = localStorage.getItem(STORAGE_KEY);
        return contacts ? JSON.parse(contacts) : [];
    };

    /**
     * Guarda los contactos en localStorage.
     * @param {Array} contacts - El array de contactos a guardar.
     */
    const saveContacts = (contacts) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    };

    /**
     * Renderiza los contactos en la interfaz de usuario.
     */
    const renderContacts = () => {
        contactList.innerHTML = ''; // Limpiar la lista actual
        const contacts = getContacts();

        if (contacts.length === 0) {
            contactList.innerHTML = '<p class="text-center text-muted">No hay contactos para mostrar. ¡Añade uno!</p>';
            return;
        }

        contacts.forEach(contact => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4 mb-4 fade-in';
            card.innerHTML = `
                <div class="card contact-card h-100">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title mb-3">${contact.name}</h5>
                        <p class="card-text text-muted flex-grow-1">
                            <i class="bi bi-envelope-fill"></i> ${contact.email}<br>
                            <i class="bi bi-telephone-fill"></i> ${contact.phone}
                        </p>
                        <div class="mt-auto d-flex justify-content-end">
                            <button class="btn btn-outline-primary btn-sm me-2 btn-edit" data-id="${contact.id}">
                                <i class="bi bi-pencil-square"></i> Editar
                            </button>
                            <button class="btn btn-outline-danger btn-sm btn-delete" data-id="${contact.id}">
                                <i class="bi bi-trash-fill"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            `;
            contactList.appendChild(card);
        });
    };
    
    /**
     * Valida los campos del formulario.
     * @param {string} name - Nombre del contacto.
     * @param {string} email - Email del contacto.
     * @param {string} phone - Teléfono del contacto.
     * @returns {boolean} - True si es válido, false en caso contrario.
     */
    const validateFields = (name, email, phone) => {
        if (!name || !email || !phone) {
            Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
            return false;
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            Swal.fire('Error', 'Por favor, introduce un correo electrónico válido.', 'error');
            return false;
        }
        
        // Validación simple para teléfono (al menos 7 dígitos)
        const phoneRegex = /^[0-9\s-]{7,}$/;
        if (!phoneRegex.test(phone)) {
            Swal.fire('Error', 'Por favor, introduce un número de teléfono válido.', 'error');
            return false;
        }

        return true;
    };


    // --- Manejadores de Eventos ---

    // Manejar el envío del formulario para agregar contacto
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar el envío real del formulario

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (!validateFields(name, email, phone)) return;

        const contacts = getContacts();
        const newContact = {
            id: Date.now().toString(), // ID único basado en el timestamp
            name,
            email,
            phone
        };

        contacts.push(newContact);
        saveContacts(contacts);
        
        Swal.fire('¡Éxito!', 'Contacto agregado correctamente.', 'success');
        contactForm.reset();
        renderContacts();
    });

    // Manejar clics en los botones de editar y eliminar (usando delegación de eventos)
    contactList.addEventListener('click', (e) => {
        const target = e.target.closest('button'); // Encuentra el botón más cercano al clic
        if (!target) return;

        const id = target.dataset.id;

        if (target.classList.contains('btn-edit')) {
            // Lógica para editar
            const contacts = getContacts();
            const contactToEdit = contacts.find(contact => contact.id === id);
            
            if(contactToEdit) {
                document.getElementById('editId').value = contactToEdit.id;
                document.getElementById('editName').value = contactToEdit.name;
                document.getElementById('editEmail').value = contactToEdit.email;
                document.getElementById('editPhone').value = contactToEdit.phone;
                editModal.show();
            }
        }

        if (target.classList.contains('btn-delete')) {
            // Lógica para eliminar con confirmación
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esta acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, ¡eliminar!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    let contacts = getContacts();
                    contacts = contacts.filter(contact => contact.id !== id);
                    saveContacts(contacts);
                    renderContacts();
                    Swal.fire('¡Eliminado!', 'El contacto ha sido eliminado.', 'success');
                }
            });
        }
    });
    
    // Manejar el envío del formulario de edición
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('editId').value;
        const name = document.getElementById('editName').value.trim();
        const email = document.getElementById('editEmail').value.trim();
        const phone = document.getElementById('editPhone').value.trim();

        if (!validateFields(name, email, phone)) return;

        let contacts = getContacts();
        const contactIndex = contacts.findIndex(contact => contact.id === id);
        
        if (contactIndex > -1) {
            contacts[contactIndex] = { id, name, email, phone };
            saveContacts(contacts);
            renderContacts();
            editModal.hide();
            Swal.fire('¡Actualizado!', 'El contacto se ha actualizado correctamente.', 'success');
        }
    });

    // --- Carga Inicial ---
    renderContacts();
});