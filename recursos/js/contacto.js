import { mostrarNotificacion } from "./notificaciones.js";

const WHATSAPP_NUMERO = "5493510000000"; // Reemplazar por número real sin + ni espacios
const formContacto = document.getElementById("form-contacto");
const avisoContacto = document.getElementById("notificacion-contacto");

function validarFormularioContacto({ nombre, email, mensaje }) {
  if (!nombre || !email || !mensaje) {
    return "Por favor, completá nombre, correo electrónico y mensaje.";
  }
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    return "Por favor, ingresá una dirección de correo electrónico válida.";
  }
  return null;
}

if (formContacto) {
  formContacto.addEventListener("submit", (event) => {
    event.preventDefault();

    const datos = {
      nombre: document.getElementById("id-nombre")?.value.trim() ?? "",
      telefono: document.getElementById("id-telefono")?.value.trim() ?? "",
      email: document.getElementById("id-email")?.value.trim() ?? "",
      direccion: document.getElementById("id-direccion")?.value.trim() ?? "",
      mensaje: document.getElementById("id-mensaje")?.value.trim() ?? ""
    };

    const errorValidacion = validarFormularioContacto(datos);
    if (errorValidacion) {
      mostrarNotificacion(avisoContacto, errorValidacion, "error");
      return;
    }

    const textoWhatsApp = [
      "¡Hola Nocturnal Lab! Nueva consulta desde la web:",
      `Nombre: ${datos.nombre}`,
      `Email: ${datos.email}`,
      datos.telefono ? `Teléfono: ${datos.telefono}` : null,
      datos.direccion ? `Dirección: ${datos.direccion}` : null,
      `Mensaje: ${datos.mensaje}`
    ]
      .filter(Boolean)
      .join("\n");

    const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(textoWhatsApp)}`;
    window.open(urlWhatsApp, "_blank", "noopener,noreferrer");

    formContacto.reset();
    mostrarNotificacion(
      avisoContacto,
      `¡Gracias, ${datos.nombre}! Se abrió WhatsApp con tu consulta lista para enviar.`,
      "exito"
    );
  });
}