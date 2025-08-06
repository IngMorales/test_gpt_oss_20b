<?php
/* --------------------------------------------------------------
 * Archivo: index.php
 * Descripción: Punto de entrada del proyecto.
 *   Incluye la estructura HTML y los recursos externos (CSS, JS).
 * -------------------------------------------------------------- */
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Gestor de Contactos</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    <!-- Bootstrap 5 CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-9ndCyUa6k8zWJg7jLq4YB2Zt+vNwFQh3oR1yKpV7fT4nE5iXxGdZlM/3mX0I8f7"
          crossorigin="anonymous">
    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
    <!-- Nuestro estilo personalizado -->
    <link rel="stylesheet" href="styles.css">
</head>
<body class="bg-light">

<!-- ====================== Header ====================== -->
<header class="navbar navbar-expand-lg navbar-dark bg-primary py-3 shadow-sm">
    <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="#">Gestor de Contactos</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menú -->
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link active" href="#">Inicio</a></li>
                <li class="nav-item"><a class="nav-link" href="#contactForm">Agregar Contacto</a></li>
            </ul>
        </div>
    </div>
</header>

<!-- ====================== Main Content ====================== -->
<main class="container my-5">
    <!-- Formulario de Agregar / Editar Contacto -->
    <section id="contactForm" class="mb-5">
        <h2 class="mb-4 text-center">Agregar Nuevo Contacto</h2>
        <form id="form-contact" novalidate>
            <div class="row g-3">
                <!-- Nombre -->
                <div class="col-md-6">
                    <label for="name" class="form-label fw-semibold">Nombre completo *</label>
                    <input type="text" id="name" name="name" class="form-control"
                           placeholder="Ej. Juan Pérez" required>
                    <div class="invalid-feedback">El nombre es obligatorio.</div>
                </div>

                <!-- Correo -->
                <div class="col-md-6">
                    <label for="email" class="form-label fw-semibold">Correo electrónico *</label>
                    <input type="email" id="email" name="email" class="form-control"
                           placeholder="ejemplo@dominio.com" required>
                    <div class="invalid-feedback">Introduce un correo válido.</div>
                </div>

                <!-- Teléfono -->
                <div class="col-md-6">
                    <label for="phone" class="form-label fw-semibold">Teléfono *</label>
                    <input type="tel" id="phone" name="phone" class="form-control"
                           placeholder="+58 555 1234567" required pattern="^\+?\d{10,15}$">
                    <div class="invalid-feedback">Formato de teléfono inválido.</div>
                </div>

                <!-- Botón -->
                <div class="col-12 text-center mt-4">
                    <button type="submit" id="btn-save"
                            class="btn btn-success w-50 fw-semibold">Guardar Contacto</button>
                </div>
            </div>
        </form>
    </section>

    <!-- Lista de Contactos -->
    <section id="contactList">
        <h2 class="mb-4 text-center">Lista de Contactos</h2>
        <div id="cards-container" class="row g-4"></div>
    </section>
</main>

<!-- ====================== Footer ====================== -->
<footer class="bg-dark text-light py-3 mt-auto shadow-sm">
    <div class="container text-center">
        <p>© 2025 Gestor de Contactos. Todos los derechos reservados.</p>
        <p>Email: contacto@example.com | Teléfono: +58 555 1234567</p>
    </div>
</footer>

<!-- ====================== Modales y Scripts ====================== -->
<!-- Modal para editar contactos (Bootstrap) -->
<div class="modal fade" id="editModal" tabindex="-1"
     aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-light border-0 shadow">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="editModalLabel">Editar Contacto</h5>
                <button type="button" class="btn-close btn-close-white"
                        data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <form id="form-edit" novalidate>
                <div class="modal-body">
                    <!-- Campos ocultos -->
                    <input type="hidden" id="edit-id">

                    <!-- Nombre -->
                    <div class="mb-3">
                        <label for="edit-name" class="form-label fw-semibold">Nombre completo *</label>
                        <input type="text" id="edit-name" name="name"
                               class="form-control" required>
                        <div class="invalid-feedback">El nombre es obligatorio.</div>
                    </div>

                    <!-- Correo -->
                    <div class="mb-3">
                        <label for="edit-email" class="form-label fw-semibold">Correo electrónico *</label>
                        <input type="email" id="edit-email" name="email"
                               class="form-control" required>
                        <div class="invalid-feedback">Introduce un correo válido.</div>
                    </div>

                    <!-- Teléfono -->
                    <div class="mb-3">
                        <label for="edit-phone" class="form-label fw-semibold">Teléfono *</label>
                        <input type="tel" id="edit-phone" name="phone"
                               class="form-control" required
                               pattern="^\+?\d{10,15}$">
                        <div class="invalid-feedback">Formato de teléfono inválido.</div>
                    </div>
                </div>

                <!-- Botones -->
                <div class="modal-footer bg-light">
                    <button type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" id="btn-update"
                            class="btn btn-primary fw-semibold">Actualizar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Bootstrap JS Bundle (incluye Popper) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeo7YwGqD6gkJfWlTn8Zp5C9E9z1eKcL9UeFvVYb/3XhXwM"
        crossorigin="anonymous"></script>
<!-- SweetAlert2 JS -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
<!-- Nuestro script personalizado -->
<script src="scripts.js"></script>
</body>
</html>
