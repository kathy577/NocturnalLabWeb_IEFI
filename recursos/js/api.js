const URL_PRODUCTOS = "./recursos/data/productos.json";

export async function obtenerProductos() {
  try {
    const respuesta = await fetch(URL_PRODUCTOS);
    if (!respuesta.ok) {
      throw new Error(`Error al cargar productos (HTTP ${respuesta.status})`);
    }
    const datos = await respuesta.json();
    if (!Array.isArray(datos)) {
      throw new Error("El formato de datos de productos no es válido.");
    }
    return datos;
  } catch (error) {
    console.error("Error en obtenerProductos:", error);
    throw error;
  }
}