export function renderizadoProductos(contenedor, productos, { permitirAgregar = false } = {}) {
  if (!contenedor) return;

  if (!productos || productos.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron productos con esos filtros.</p>";
    return;
  }

  contenedor.innerHTML = productos
    .map((producto) => {
      const tallesTexto =
        Array.isArray(producto.talles) && producto.talles.length > 0
          ? producto.talles.map((t) => t.toUpperCase()).join(", ")
          : "Talle único / Sin talle";

      const botonAgregar = permitirAgregar
        ? `<button type="button" class="btn-agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>`
        : "";

      return `
        <article class="producto">
          <img
            src="${producto.imagen}"
            alt="${producto.nombre}"
            width="200"
          >
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio.toLocaleString("es-AR")}</p>
          <p>Categoría: ${producto.categoria}</p>
          <p>Talles: ${tallesTexto}</p>
          ${botonAgregar}
        </article>
      `;
    })
    .join("");
}

export function renderizadoCarrito(contenedor, items) {
  if (!contenedor) return;

  if (!items || items.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  contenedor.innerHTML = items
    .map((item) => {
      const subtotalItem = item.precio * item.cantidad;
      return `
        <article class="item-carrito">
          <img src="${item.imagen}" alt="${item.nombre}" width="120">
          <div>
            <h3>${item.nombre}</h3>
            <p>Precio unitario: $${item.precio.toLocaleString("es-AR")}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Subtotal: $${subtotalItem.toLocaleString("es-AR")}</p>
            <button type="button" class="btn-quitar-item" data-id="${item.id}">Quitar</button>
          </div>
        </article>
      `;
    })
    .join("");
}