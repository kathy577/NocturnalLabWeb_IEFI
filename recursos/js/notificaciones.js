export function mostrarNotificacion(contenedor, mensaje, tipo = "info") {
  if (!contenedor) return;

  contenedor.textContent = mensaje;
  contenedor.className = `notificacion notificacion--${tipo}`;
  contenedor.setAttribute("role", tipo === "error" ? "alert" : "status");
  contenedor.setAttribute("aria-live", tipo === "error" ? "assertive" : "polite");
  contenedor.hidden = false;
}

export function ocultarNotificacion(contenedor) {
  if (!contenedor) return;
  contenedor.textContent = "";
  contenedor.hidden = true;
}