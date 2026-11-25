import { obtenerProductos } from "./api.js";
import { renderizadoProductos } from "./vista.js";
import { mostrarNotificacion } from "./notificaciones.js";

const contenedorProductos = document.getElementById("contenedor-productos");
const avisoInicio = document.getElementById("notificacion-inicio");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const productos = await obtenerProductos();
    const destacados = productos.filter((p) => p.destacado);
    const listaMostrar = destacados.length > 0 ? destacados.slice(0, 3) : productos.slice(0, 3);
    renderizadoProductos(contenedorProductos, listaMostrar, { permitirAgregar: false });
  } catch (error) {
    mostrarNotificacion(
      avisoInicio,
      "No pudimos cargar los productos destacados en este momento. Intentá recargar la página.",
      "error"
    );
  }
});