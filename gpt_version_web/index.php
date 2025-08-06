<?php
/* index.php – Página principal del Gestor de Contactos */
require_once 'config.php';
require_once 'functions.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Metadatos -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo SITE_TITLE; ?> – v<?php echo SITE_VERSION; ?></title>

    <!-- Bootstrap CSS (CDN) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Estilos propios -->
    <link href="styles.css" rel="stylesheet">
</head>
<body>

    <!-- ==============================================================
         NAVBAR / ENCABEZADO
         ============================================================== -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><?php echo SITE_TITLE; ?></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" aria-controls="navbarNav"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#addContactSection">Agregar Contacto</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- ==============================================================
         CONTENIDO PRINCIPAL
         ============================================================== -->
    <main class="container my-4">

        <!-- --------------------------------------------------------------
             FORMULARIO PARA AGREGAR CONTACTO
             -------------------------------------------------------------- -->
        <section id="addContactSection" class="mb-5">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Agregar Nuevo Contacto</h5>
                </div>
                <div class="card-body">
                    <form id="addContactForm" novalidate>
                        <div class="mb-3">
                            <label for="name" class="form-label">Nombre completo</label>
                            <input type="text" class="form-control" id="name" name="name"
                                   placeholder="Ej: Juan Pérez" required minlength="2">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Correo electrónico</label>
                            <input type="email" class="form-control" id="email" name="email"
                                   placeholder="ejemplo@dominio.com" required>
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">Teléfono</label>
                            <input type="tel" class="form-control" id="phone" name="phone"
                                   placeholder="+34 600 123 456" required pattern="^\+?\d{7,15}$">
                            <div class="form-text">Formato: +CódigoPaís número (7‑15 dígitos).</div>
                        </div>
                        <button type="submit" class="btn btn-success">Agregar Contacto</button>
                    </form>
                </div>
            </div>
        </section>

        <!-- --------------------------------------------------------------
             LISTADO DE CONTACTOS
             -------------------------------------------------------------- -->
        <section id="contactListSection">
            <h3 class="mb-4">Lista de Contactos</h3>
            <div id="contactList" class="row">
                <!-- Las tarjetas se generan dinámicamente mediante JavaScript -->
            </div>
        </section>

    </main>

    <!-- ==============================================================
         MODAL PARA EDITAR CONTACTO
         ============================================================== -->
    <div class="modal fade" id="editContactModal" tabindex="-1"
         aria-labelledby="editContactModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 id="editContactModalLabel" class="modal-title">Editar Contacto</h5>
                    <button type="button" class="btn-close btn-close-white"
                            data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form id="editContactForm" novalidate>
                        <input type="hidden" id="editContactId">
                        <div class="mb-3">
                            <label for="editName" class="form-label">Nombre completo</label>
                            <input type="text" class="form-control" id="editName"
                                   required minlength="2">
                        </div>
                        <div class="mb-3">
                            <label for="editEmail" class="form-label">Correo electrónico</label>
                            <input type="email" class="form-control" id="editEmail"
                                   required>
                        </div>
                        <div class="mb-3">
                            <label for="editPhone" class="form-label">Teléfono</label>
                            <input type="tel" class="form-control" id="editPhone"
                                   required pattern="^\+?\d{7,15}$">
                            <div class="form-text">Formato: +CódigoPaís número (7‑15 dígitos).</div>
                        </div>
                        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- ==============================================================
         FOOTER
         ============================================================== -->
    <footer class="mt-auto py-3 bg-light">
        <div class="container text-center">
            <p class="mb-0">&copy; <?php echo date('Y'); ?> <?php echo SITE_TITLE; ?>. Todos los derechos reservados.</p>
            <small>Contacto: <a href="mailto:info@example.com">info@example.com</a></small>
        </div>
    </footer>

    <!-- ==============================================================
         SCRIPTS (Bootstrap, SweetAlert2, Custom)
         ============================================================== -->
    <!-- Bootstrap Bundle (incluye Popper) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

    <!-- SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Archivo JavaScript propio -->
    <script src="scripts.js"></script>
</body>
</html>