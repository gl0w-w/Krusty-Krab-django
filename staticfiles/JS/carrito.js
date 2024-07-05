window.addEventListener("load", function () {
  var agregarBtns = document.querySelectorAll(".producto-Agregar");
  var numerito = document.getElementById("numerito");
  var cantidadEnCarrito = parseInt(localStorage.getItem("cantidadEnCarrito")) || 0;
  numerito.textContent = cantidadEnCarrito;

  function agregarAlCarrito() {
      cantidadEnCarrito++;
      numerito.textContent = cantidadEnCarrito;
      localStorage.setItem("cantidadEnCarrito", cantidadEnCarrito);

      var producto = this.closest(".card");
      var productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];
      productosEnCarrito.push(producto.outerHTML);
      localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));

      agregarAlCarritoVisual(producto);
      mostrarTotalCompra();
  }

  agregarBtns.forEach(function (btn) {
      btn.addEventListener("click", agregarAlCarrito);
  });

  var botonComprar = document.querySelector(".boton-comprar");

  botonComprar.addEventListener("click", function () {
      var productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];
      if (productosEnCarrito.length === 0) {
          alert("Por favor, agregue algún producto al carrito antes de comprar.");
          window.location.href = "{% url 'index.html'%}";
          return;
      }
      alert("¡Muchas gracias por su compra!");
      document.getElementById("productos-en-carrito-container").innerHTML = "";
      numerito.textContent = "0";
      localStorage.removeItem("productosEnCarrito");
      localStorage.setItem("cantidadEnCarrito", "0");
      window.location.href = "{% url 'index.html'%}";
  });

  function mostrarTotalCompra() {
      var total = 0;
      var productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

      productosEnCarrito.forEach(function (productoHTML) {
          var precio = parseFloat(productoHTML.match(/Precio: \$([0-9,.]+)/)[1].replace(",", ""));
          total += precio;
      });

      document.querySelector(".Total-compra-txt").textContent = "Total de compras: $" + total.toFixed(2);
  }

  // Asegúrate de ocultar los botones en compra.html
  if (window.location.pathname.includes("compra.html")) {
      var cards = document.querySelectorAll(".card");
      cards.forEach(function (card) {
          var botonAgregar = card.querySelector(".producto-Agregar");
          if (botonAgregar) {
              botonAgregar.style.display = "none";
          }
      });
  }
});

function agregarAlCarritoVisual(producto) {
  if (window.location.pathname !== "/carrito.html") {
      var nuevoProducto = document.createElement("div");
      nuevoProducto.classList.add("card", "producto-en-carrito");
      nuevoProducto.innerHTML = `
          <img class="card-img" src="${producto.querySelector("img").src}" alt="Producto">
          <div class="card-content">
              <h3 class="card-content-title">${producto.querySelector("h3").textContent}</h3>
              <p class="card-content-description">Descripción del producto</p>
      `;
      var productosEnCarritoContainer = document.getElementById("productos-en-carrito-container");
      productosEnCarritoContainer.appendChild(nuevoProducto);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var productosEnCarritoContainer = document.getElementById("productos-en-carrito-container");
  var numerito = document.getElementById("numerito");
  var vaciarBtn = document.querySelector(".boton-vaciar-carrito");

  function vaciarCarrito() {
      if (productosEnCarritoContainer.children.length === 0) {
          alert("Por favor, realice una compra.");
          window.location.href = "{% url 'index.html'%}";
          return;
      }

      productosEnCarritoContainer.innerHTML = "";
      var cantidadEnCarrito = 0;
      numerito.textContent = cantidadEnCarrito;
      localStorage.removeItem("productosEnCarrito");
      localStorage.setItem("cantidadEnCarrito", cantidadEnCarrito);

      document.querySelector(".Total-compra-txt").textContent = "Total de compras: $0.00";
  }

  vaciarBtn.addEventListener("click", vaciarCarrito);

  var productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];
  var cantidadEnCarrito = productosEnCarrito.length;
  numerito.textContent = cantidadEnCarrito;

  productosEnCarrito.forEach(function (productoHTML) {
      var nuevoProducto = document.createElement("div");
      nuevoProducto.innerHTML = productoHTML;
      productosEnCarritoContainer.appendChild(nuevoProducto);
  });

  mostrarTotalCompra();
});

function mostrarTotalCompra() {
  var total = 0;
  var productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

  productosEnCarrito.forEach(function (productoHTML) {
      var precioMatch = productoHTML.match(/Precio: \$([0-9,.]+)/);
      if (precioMatch) {
          var precio = parseFloat(precioMatch[1].replace(",", ""));
          total += precio;
      }
  });

  document.querySelector(".Total-compra-txt").textContent = "Total de compras: $" + total.toFixed(2);
}