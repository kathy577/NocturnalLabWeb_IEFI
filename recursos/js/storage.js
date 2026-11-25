const CLAVE_CARRITO = "nocturnal_lab_carrito_v1";

export function leerCarrito() {
  try {
    const raw = localStorage.getItem(CLAVE_CARRITO);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error al leer el carrito desde localStorage:", error);
    return [];
  }
}

export function guardarCarrito(items) {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
  } catch (error) {
    console.error("Error al guardar el carrito en localStorage:", error);
  }
}

export function agregarProductoAlCarrito(producto) {
  const carrito = leerCarrito();
  const indice = carrito.findIndex((item) => item.id === producto.id);

  if (indice >= 0) {
    carrito[indice].cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      imagen: producto.imagen,
      precio: producto.precio,
      categoria: producto.categoria,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  return carrito;
}

export function quitarProductoDelCarrito(idProducto) {
  const carrito = leerCarrito().filter((item) => item.id !== idProducto);
  guardarCarrito(carrito);
  return carrito;
}

export function vaciarCarrito() {
  guardarCarrito([]);
  return [];
}