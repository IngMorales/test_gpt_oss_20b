<?php
/**
 * Archivo: index.php
 * Descripción: Punto de entrada principal de la aplicación.
 *              Integra el encabezado, el contenido principal y el pie de página.
 */

// Incluir el encabezado de la página
require_once 'includes/header.php';
?>

<!-- Sección para agregar un nuevo contacto -->
<section id="form-section" class="mb-5">
    <h2 class="mb-4 text-center">Agregar un Nuevo Contacto</h2>
    <form id="contactForm">
        <div class="row">
            <div class="col-md-4 mb-3">
                <label for="name" class="form-label">Nombre Completo</label>
                <input type="text" class="form-control" id="name" placeholder="Ej: Ana García" required>
            </div>
            <div class="col-md-4 mb-3">
                <label for="email" class="form-label">Correo Electrónico</label>
                <input type="email" class="form-control" id="email" placeholder="Ej: ana.garcia@correo.com" required>
            </div>
            <div class="col-md-4 mb-3">
                <label for="phone" class="form-label">Teléfono</label>
                <input type="tel" class="form-control" id="phone" placeholder="Ej: 600 123 456" required>
            </div>
        </div>
        <div class="d-grid">
            <button type="submit" class="btn btn-primary btn-lg">
                <i class="bi bi-person-plus-fill"></i> Guardar Contacto
            </button>
        </div>
    </form>
</section>

<!-- Sección para mostrar la lista de contactos -->
<section id="contacts-section">
    <h2 class="mb-4 text-center">Mis Contactos</h2>
    <div id="contact-list" class="row">
        <!-- Las tarjetas de contacto se insertarán aquí dinámicamente con JavaScript -->
    </div>
</section>

<?php
// Incluir el pie de página
require_once 'includes/footer.php';
?>