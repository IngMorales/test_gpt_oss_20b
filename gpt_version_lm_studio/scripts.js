/* ==============================================================
   scripts.js – Lógica CRUD + UI Interactiva
   ============================================================== */

   'use strict';

   /* ------------------------------------------------------------------
    * 1️⃣ CONSTANTES DE NAVEGACIÓN / ELEMENTOS DOM
    * ------------------------------------------------------------------ */
   const form          = document.getElementById('contactForm');      // Formulario de creación
   const editForm      = document.getElementById('form-edit');        // Formulario de edición (modal)
   const cardsContainer= document.querySelector('#cardsContainer');   // Donde se renderizan las tarjetas
   
   /* ------------------------------------------------------------------
    * 2️⃣ UTILIDADES DE LOCALSTORAGE
    * ------------------------------------------------------------------ */
   function getAll() {
       const data = localStorage.getItem('contacts');
       return data ? JSON.parse(data) : [];
   }
   
   function saveAll(arr) {
       localStorage.setItem('contacts', JSON.stringify(arr));
   }
   
   /* ------------------------------------------------------------------
    * 3️⃣ CRUD – CREATE, READ, UPDATE, DELETE
    * ------------------------------------------------------------------ */
   function addContact(contact) {
       const contacts = getAll();
       contacts.push(contact);
       saveAll(contacts);
       renderCards();
   
       Swal.fire({
           icon: 'success',
           title: '¡Guardado!',
           text: 'El contacto ha sido agregado.',
           timer: 1500,
           showConfirmButton: false
       });
   }
   
   function updateContact(id, updated) {
       const contacts = getAll();
       contacts[id] = updated;
       saveAll(contacts);
       renderCards();
   
       Swal.fire({
           icon: 'success',
           title: '¡Actualizado!',
           text: 'El contacto se ha actualizado.',
           timer: 1500,
           showConfirmButton: false
       });
   }
   
   function deleteContact(id) {
       const contacts = getAll();
       contacts.splice(id, 1);
       saveAll(contacts);
       renderCards();
   
       Swal.fire({
           icon: 'success',
           title: 'Eliminado!',
           text: 'El contacto ha sido eliminado.',
           timer: 1500,
           showConfirmButton: false
       });
   }
   
   /* ------------------------------------------------------------------
    * 4️⃣ Renderizado de Tarjetas (READ)
    * ------------------------------------------------------------------ */
   function renderCards() {
       const contacts = getAll();
       cardsContainer.innerHTML = ''; // Limpiar
   
       if (!contacts.length) {
           cardsContainer.innerHTML =
               `<div class="col-12 text-center py-5">
                   <h4>No hay contactos. Añade uno desde el formulario.</h4>
                </div>`;
           return;
       }
   
       contacts.forEach((c, idx) => {
           const card = document.createElement('div');
           card.className = 'col-md-6 col-lg-4 mb-4';
           card.innerHTML =
               `<div class="card h-100 shadow-sm border-0">
                   <div class="card-body d-flex flex-column">
                       <h5 class="card-title">${c.name}</h5>
                       <p class="mb-1"><i class="bi bi-envelope-fill text-primary me-2"></i>${c.email}</p>
                       <p><i class="bi bi-telephone-fill text-success me-2"></i>${c.phone}</p>
   
                       <div class="mt-auto d-flex justify-content-between">
                           <button class="btn btn-sm btn-outline-primary"
                                   data-id="${idx}"
                                   onclick="openEditModal(event)">
                               Editar
                           </button>
                           <button class="btn btn-sm btn-outline-danger"
                                   data-id="${idx}"
                                   onclick="confirmDelete(event)">
                               Eliminar
                           </button>
                       </div>
                   </div>
               </div>`;
   
           cardsContainer.appendChild(card);
       });
   }
   
   /* ------------------------------------------------------------------
    * 5️⃣ Modal de Edición – Abrir con datos pre-cargados
    * ------------------------------------------------------------------ */
   function openEditModal(e) {
       const id = e.target.dataset.id;
       const contacts = getAll();
       const contact = contacts[id];
   
       document.getElementById('edit-id').value   = id;
       document.getElementById('edit-name').value = contact.name;
       document.getElementById('edit-email').value= contact.email;
       document.getElementById('edit-phone').value= contact.phone;
   
       const modalEl = new bootstrap.Modal(document.getElementById('editModal'));
       modalEl.show();
   }
   
   /* ------------------------------------------------------------------
    * 6️⃣ Confirmación de Eliminación
    * ------------------------------------------------------------------ */
   function confirmDelete(e) {
       const id = e.target.dataset.id;
       Swal.fire({
           title: '¿Estás seguro?',
           text: "Esta acción no se puede revertir.",
           icon: 'warning',
           showCancelButton: true,
           confirmButtonText: 'Sí, eliminar',
           cancelButtonText: 'Cancelar'
       }).then((result) => {
           if (result.isConfirmed) deleteContact(id);
       });
   }
   
   /* ------------------------------------------------------------------
    * 7️⃣ Validación de Formularios
    * ------------------------------------------------------------------ */
   function validateForm(formEl) {
       if (!formEl.checkValidity()) {
           formEl.classList.add('was-validated');
           return false;
       }
       return true;
   }
   
   /* ------------------------------------------------------------------
    * 8️⃣ Eventos de Formulario (Crear y Editar)
    * ------------------------------------------------------------------ */
   // Crear
   form.addEventListener('submit', (e) => {
       e.preventDefault();
       if (!validateForm(form)) return;
   
       const newContact = {
           name:  form.name.value.trim(),
           email: form.email.value.trim(),
           phone: form.phone.value.trim()
       };
   
       addContact(newContact);
       form.reset();
       form.classList.remove('was-validated');
   });
   
   // Editar
   editForm.addEventListener('submit', (e) => {
       e.preventDefault();
       if (!validateForm(editForm)) return;
   
       const id          = editForm['edit-id'].value;
       const updatedData = {
           name:  editForm['edit-name'].value.trim(),
           email: editForm['edit-email'].value.trim(),
           phone: editForm['edit-phone'].value.trim()
       };
   
       updateContact(id, updatedData);
       editForm.reset();
       editForm.classList.remove('was-validated');
   
       // Ocultar modal
       const modalEl = document.getElementById('editModal');
       const modal   = bootstrap.Modal.getInstance(modalEl);
       modal.hide();
   });
   
   /* ------------------------------------------------------------------
    * 9️⃣ Inicialización al Cargar la Página
    * ------------------------------------------------------------------ */
   document.addEventListener('DOMContentLoaded', () => {
       renderCards(); // Mostrar contactos guardados
   });
   