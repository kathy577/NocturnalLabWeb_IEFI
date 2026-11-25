export function filtrarProductos(productos, { categoria = "todas", precio = "todos", talle = "todos" }) {
  return productos.filter((producto) => {
    const coincideCategoria = categoria === "todas" || producto.categoria === categoria;

    let coincidePrecio = true;
    if (precio === "menor") {
      coincidePrecio = producto.precio <= 25000;
    } else if (precio === "medio") {
      coincidePrecio = producto.precio > 25000 && producto.precio <= 35000;
    } else if (precio === "mayor") {
      coincidePrecio = producto.precio > 35000;
    }

    const tallesDisponibles = Array.isArray(producto.talles) ? producto.talles : [];
    const coincideTalle = talle === "todos" || tallesDisponibles.includes(talle);

    return coincideCategoria && coincidePrecio && coincideTalle;
  });
}