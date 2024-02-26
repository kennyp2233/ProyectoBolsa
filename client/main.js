const { obtenerTodosLosStocks, crearStock, actualizarStock, eliminarStock } = api;

const compras = [];
let filas = 0;


let formInicial = document.getElementById("tablaIngreso").innerHTML;



function validarCampos() {
  let datos = document.querySelectorAll("input")
  let valido = true;
  if (datos[2].value < 0 && datos[3].value < 0) {
    valido = false;
    alert("Por favor, Ingrese valores no negativos")
  }
  datos.forEach((dato) => {
    if (dato.value.length == 0)
      valido = false
  });
  return valido;
}

function agregarFila() {

  if (!validarCampos()) {
    return;
  }

  var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.rows.length);
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);

  cell1.innerHTML = '<input type="text" name="nombre" required>';
  cell2.innerHTML = '<input type="date" name="fecha" required>';
  cell3.innerHTML = '<input type="number" name="precio" required>';
  cell4.innerHTML = '<input type="number" name="cantidad" required>';
  agregarCompras()
  filas += 1;
}

async function agregarCompras() {
  const name = document.getElementsByName('nombre')[filas].value;
  const fechaCompra = document.getElementsByName('fecha')[filas].value;
  const precioCompra = parseFloat(document.getElementsByName('precio')[filas].value);
  const cantidad = parseInt(document.getElementsByName('cantidad')[filas].value);
  if (isNaN(precioCompra) || isNaN(cantidad)) {
    alert('Por favor, ingresa valores numéricos válidos para Precio de Compra y Cantidad.');
    return;
  }
  const stock = {name,fechaCompra,precioCompra,cantidad};
  try {
    console.log('Creando stock:', stock);
    const respuesta = await crearStock(stock);
    console.log('Stock creado con éxito:', respuesta);
    compras.push(stock);
    mostrarDatosEnLista(compras);
  } catch (error) {
    console.error('Error al crear el stock:', error);
  }
}

function guardarDatos() {
  
  agregarCompras()
  filas = 0
  //Limpiar el formulario
  document.getElementById('tablaIngreso').innerHTML = formInicial;

}

async function mostrarDatosEnLista(datos) {
  const listaDatos = document.getElementById('listaDatos');

  // Limpiar la lista antes de mostrar los datos
  listaDatos.innerHTML = '';
  datos.forEach(async (compra) => {
    let datosMercado = await obtenerTodosLosStocks(compra.nombre)
    console.log(datosMercado)
    const precioTotal = compra.precioCompra * compra.cantidad;
    let ul = document.createElement('ul')
    ul.className = 'info'
    // Crear un HTML para cada conjunto de datos y agregarlo a la lista
    ul.innerHTML += `
                <li id="cardNombre">Nombre: ${compra.nombre}</li>
                <li id="cardFecha">Fecha: ${compra.fechaCompra}</li>
                <li id="cardPrecio">Precio: $${compra.precioCompra.toFixed(2)}</li>
                <li id="cardCantidad">Cantidad: ${compra.cantidad}</li>
                <li id="cardTotal">Total: $${precioTotal.toFixed(2)}</li>
                <li id="cardTotal">Cambio: ${calcularCambio(datosMercado, compra).toFixed(2)}%</li>
                <li id="cardTotal">Ganacia/Perdida: $${(datosMercado.c * compra.cantidad).toFixed(2)}</li>
        `;
    listaDatos.appendChild(ul)
  });
}

function calcularGanaciaPerdida(datos, compra) {
  console.log(datos)
  return datos.c * compra.cantidad;
}

function calcularCambio(datos, compra) {
  console.log(datos)
  return (datos.c - compra.precioCompra) / compra.precioCompra
}

document.getElementById('btnAgregar').addEventListener('click', () => {
  // Lógica para agregar una compra
  console.log("hola");
  agregarCompras();
});

document.getElementById('btnGuardar').addEventListener('click', () => {
  // Lógica para guardar los datos
  guardarDatos();
});
