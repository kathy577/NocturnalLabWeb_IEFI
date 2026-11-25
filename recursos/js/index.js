import { obtenerProductos } from "./api.js";
import { filtrarProductos } from "./filtros.js";
import { renderizadoProductos } from "./vista.js";
import { agregarProductoAlCarrito } from "./storage.js";
import { mostrarNotificacion } from "./notificaciones.js";

const formFiltros = document.getElementById("form-filtros");
const contenedorProductos = document.getElementById("contenedor-productos");
const avisoCatalogo = document.getElementById("notificacion-catalogo");

let catalogoCompleto = [];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    catalogoCompleto = await obtenerProductos();
    renderizadoProductos(contenedorProductos, catalogoCompleto, { permitirAgregar: true });
  } catch (error) {
    mostrarNotificacion(
      avisoCatalogo,
      "Ocurrió un error al cargar el catálogo. Revisá tu conexión o intentá más tarde.",
      "error"
    );
  }
});

if (formFiltros) {
  formFiltros.addEventListener("submit", (event) => {
    event.preventDefault();

    const criterios = {
      categoria: document.getElementById("id-categoria")?.value ?? "todas",
      precio: document.getElementById("id-precio")?.value ?? "todos",
      talle: document.getElementById("id-talle")?.value ?? "todos"
    };

    const filtrados = filtrarProductos(catalogoCompleto, criterios);
    renderizadoProductos(contenedorProductos, filtrados, { permitirAgregar: true });
  });
}

if (contenedorProductos) {
  contenedorProductos.addEventListener("click", (event) => {
    const boton = event.target.closest(".btn-agregar-carrito");
    if (!boton) return;

    const id = boton.dataset.id;
    const producto = catalogoCompleto.find((p) => p.id === id);
    if (!producto) return;

    agregarProductoAlCarrito(producto);
    mostrarNotificacion(
      avisoCatalogo,
      `"${producto.nombre}" se agregó al carrito.`,
      "exito"
    );
  });
}
