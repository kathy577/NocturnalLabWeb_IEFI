import { renderizadoCarrito } from "./vista.js";
import { leerCarrito, quitarProductoDelCarrito, vaciarCarrito } from "./storage.js";
import { mostrarNotificacion } from "./notificaciones.js";

const WHATSAPP_NUMERO = "3512316703"; // Reemplazar por número real sin + ni espacios
const COSTO_ENVIO_DOMICILIO = 5000;

const contenedorCarrito = document.getElementById("contenedor-carrito");
const subtotalCarrito = document.getElementById("subtotal-carrito");
const envioCarrito = document.getElementById("envio-carrito");
const totalCarrito = document.getElementById("total-carrito");
const selectEnvio = document.getElementById("id-envio");
const formCarrito = document.getElementById("form-carrito");
const avisoCarrito = document.getElementById("notificacion-carrito");

let carritoActual = [];

function calcularTotales(items) {
  const subtotal = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const envio = items.length > 0 && selectEnvio?.value === "envio" ? COSTO_ENVIO_DOMICILIO : 0;
  return { subtotal, envio, total: subtotal + envio };
}

function actualizarVistaCarrito() {
  renderizadoCarrito(contenedorCarrito, carritoActual);
  const { subtotal, envio, total } = calcularTotales(carritoActual);

  if (subtotalCarrito) subtotalCarrito.textContent = `Subtotal: $${subtotal.toLocaleString("es-AR")}`;
  if (envioCarrito) envioCarrito.textContent = `Envío: $${envio.toLocaleString("es-AR")}`;
  if (totalCarrito) totalCarrito.textContent = `Total: $${total.toLocaleString("es-AR")}`;
}

function construirMensajePedido(items, envio, total) {
  const tipoEnvio = selectEnvio?.value === "envio" ? "Envío a domicilio" : "Retiro en Córdoba";
  const detalleItems = items
    .map((item) => `- ${item.nombre} x${item.cantidad} ($${(item.precio * item.cantidad).toLocaleString("es-AR")})`)
    .join("\n");

  return [
    "¡Hola Nocturnal Lab! Quiero confirmar este pedido:",
    detalleItems,
    `Modalidad: ${tipoEnvio}`,
    `Envío: $${envio.toLocaleString("es-AR")}`,
    `Total: $${total.toLocaleString("es-AR")}`
  ].join("\n");
}

document.addEventListener("DOMContentLoaded", () => {
  carritoActual = leerCarrito();
  actualizarVistaCarrito();
});

if (contenedorCarrito) {
  contenedorCarrito.addEventListener("click", (event) => {
    const botonQuitar = event.target.closest(".btn-quitar-item");
    if (!botonQuitar) return;

    carritoActual = quitarProductoDelCarrito(botonQuitar.dataset.id);
    actualizarVistaCarrito();
    mostrarNotificacion(avisoCarrito, "Producto eliminado del carrito.", "info");
  });
}

if (selectEnvio) {
  selectEnvio.addEventListener("change", () => {
    actualizarVistaCarrito();
  });
}

if (formCarrito) {
  formCarrito.addEventListener("submit", (event) => {
    event.preventDefault();

    if (carritoActual.length === 0) {
      mostrarNotificacion(
        avisoCarrito,
        "Tu carrito está vacío. Agregá productos desde el catálogo antes de confirmar.",
        "error"
      );
      return;
    }

    const { envio, total } = calcularTotales(carritoActual);
    const mensaje = construirMensajePedido(carritoActual, envio, total);
    const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;

    window.open(urlWhatsApp, "_blank", "noopener,noreferrer");
    carritoActual = vaciarCarrito();
    actualizarVistaCarrito();
    mostrarNotificacion(
      avisoCarrito,
      "¡Pedido listo! Se abrió WhatsApp con el resumen de tu compra y se limpió el carrito.",
      "exito"
    );
  });
}