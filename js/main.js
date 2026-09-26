const inputNombre = document.getElementById("input-nombre");
const inputPrecio = document.getElementById("input-precio");
const btnAgregar = document.getElementById("btn-agregar");
const inputBusqueda = document.getElementById("input-busqueda");
const feedback = document.getElementById("feedback");
const contenedorProductos = document.getElementById("contenedor-productos");


const productos = [
    { id: 1, nombre: "Teclado mecánico", precio: 45000 },
    { id: 2, nombre: "Mouse inalámbrico", precio: 22000 },
    { id: 3, nombre: "Monitor 24''", precio: 180000 }
];

const productosJS = JSON.parse(localStorage.getItem("productosJS")) ?? productos;
    if (!localStorage.getItem("productosJS")) {
    guardarLocalStorage();
    }

function guardarLocalStorage() {
    localStorage.setItem("productosJS", JSON.stringify(productosJS));
}

function renderizarProductos(lista) {
    contenedorProductos.innerHTML = "";

    lista.forEach(({ id, nombre, precio}) => {
        contenedorProductos.innerHTML += `
            <div>
                <h3>${nombre}</h3>

                <span>ID:${id}</span>
                <p>Precio: $${precio}</p>
                <button class="btn-eliminar" data-id="${id}">Eliminar</button>
            </div>
         `;
    });
}

function actualizarVista() {
    const textoFiltro = inputBusqueda.value.toLowerCase().trim();
    const productosFiltrados = productosJS.filter((producto) => producto.nombre.toLowerCase().includes(textoFiltro)
    );
    renderizarProductos(productosFiltrados);
}

actualizarVista();



btnAgregar.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    const precio = parseFloat(inputPrecio.value);
    const nuevoId = productosJS.length > 0 ? Math.max(...productosJS.map(p => p.id)) + 1 : 1;


    if (nombre === "" || isNaN(precio) || precio <= 0) {
        feedback.textContent = "Por favor, ingrese un nombre y un precio";
        feedback.className = "mensaje-error";
        return;
    }

    const nuevoProducto = {id: nuevoId, nombre, precio};

    productosJS.push(nuevoProducto);

    guardarLocalStorage();
    actualizarVista();

    inputNombre.value = "";
    inputPrecio.value = "";
    feedback.textContent = "Producto agregado con éxito.";
    feedback.className = "mensaje-exito";
});

inputBusqueda.addEventListener("keyup", (e) => {
   actualizarVista();
});

contenedorProductos.addEventListener("click", (e) => {

    if (e.target?.classList.contains("btn-eliminar")) {
        const idAEliminar = parseInt(e.target.getAttribute("data-id"));


        const indice = productosJS.findIndex(p => p.id === idAEliminar);
        
        if (indice !== -1) {
        productosJS.splice(indice, 1);
        }

        guardarLocalStorage();

        feedback.textContent = "Producto eliminado con éxito.";
        feedback.className = "mensaje-alerta"

        actualizarVista();
        
    }
});