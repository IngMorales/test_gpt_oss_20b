document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    const modal = new bootstrap.Modal(document.getElementById('contactModal'));
    const modalTitle = document.getElementById('contactModalLabel');
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Render contacts
    function renderContacts() {
        contactList.innerHTML = '';
        contacts.forEach((contact, index) => {
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${contact.name}</h5>
                            <p class="card-text">Correo: ${contact.email}</p>
                            <p class="card-text">Teléfono: ${contact.phone}</p>
                            <button class="btn btn-warning btn-sm me-2" onclick="editContact(${index})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteContact(${index})">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
            contactList.innerHTML += card;
        });
    }

    // Save contact to localStorage
    function saveContact(contact) {
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts();
        Swal.fire('¡Éxito!', 'Contacto guardado.', 'success');
    }

    // Update contact
    function updateContact(index, contact) {
        contacts[index] = contact;
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts();
        Swal.fire('¡Éxito!', 'Contacto actualizado.', 'success');
    }

    // Delete contact
    window.deleteContact = function(index) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás deshacer esta acción.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                contacts.splice(index, 1);
                localStorage.setItem('contacts', JSON.stringify(contacts));
                renderContacts();
                Swal.fire('¡Eliminado!', 'El contacto ha sido eliminado.', 'success');
            }
        });
    };

    // Edit contact
    window.editContact = function(index) {
        const contact = contacts[index];
        document.getElementById('contactId').value = index;
        document.getElementById('name').value = contact.name;
        document.getElementById('email').value = contact.email;
        document.getElementById('phone').value = contact.phone;
        modalTitle.textContent = 'Editar Contacto';
        modal.show();
    };

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('contactId').value;
        const contact = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(contact.email)) {
            Swal.fire('Error', 'Por favor, ingrese un correo válido.', 'error');
            return;
        }

        // Validate phone
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(contact.phone)) {
            Swal.fire('Error', 'El teléfono debe tener 10 dígitos.', 'error');
            return;
        }

        if (id === '') {
            saveContact(contact);
        } else {
            updateContact(parseInt(id), contact);
        }

        contactForm.reset();
        document.getElementById('contactId').value = '';
        modalTitle.textContent = 'Agregar Contacto';
        modal.hide();
    });

    // Initial render
    renderContacts();
});