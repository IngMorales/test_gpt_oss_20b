<?php
/**
 * functions.php
 * Funciones de ayuda reutilizables.
 */

/**
 * Sanitiza una cadena de texto para evitar XSS.
 *
 * @param string $data Texto a sanitizar.
 * @return string Texto sanitizado.
 */
function sanitize(string $data): string {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

/**
 * Construye una ruta absoluta a recursos del proyecto.
 *
 * @param string $path Ruta relativa al recurso.
 * @return string Ruta absoluta.
 */
function asset(string $path): string {
    return rtrim(BASE_URL, '/') . '/' . ltrim($path, '/');
}
?>