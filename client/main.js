const { obtenerTodosLosStocks, crearStock, actualizarStock, eliminarStock } = api;

const compras = [];
let filas = 0;


let formInicial = document.getElementById("tablaIngreso").innerHTML;
obtenerDatosBD();


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
    let comprasBD = await obtenerTodosLosStocks();
    mostrarDatosEnLista(comprasBD);
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

async function obtenerDatosBD() {
  try {
    var datos = await obtenerTodosLosStocks();
    datos = await obtenerTodosLosStocks();
    console.log('Datos:', datos);
    mostrarDatosEnLista(datos);
  } catch (error) {
    console.error('Error:', error);
  }
}

function mostrarDatosEnLista(datos) {
  const listaDatos = document.getElementById('listaDatos');

  // Limpiar la lista antes de mostrar los datos
  listaDatos.innerHTML = '';
  datos.forEach(async (compra,index) => {
    let datosMercado = await getPrecioMercado(compra.nombre)
    console.log(datosMercado)
    const precioTotal = compra.precioCompra * compra.cantidad;
    let ul = document.createElement('ul')
    ul.className = 'info'
    // Crear un HTML para cada conjunto de datos y agregarlo a la lista
    ul.innerHTML += `
                <li id="cardId_${index}">Id: ${compra.id}</li>
                <li id="cardNombre_${index}">Nombre: ${compra.name}</li>
                <li id="cardFecha_${index}">Fecha: ${compra.fechaCompra}</li>
                <li id="cardPrecio_${index}">Precio: $${compra.precioCompra.toFixed(2)}</li>
                <li id="cardCantidad_${index}">Cantidad: ${compra.cantidad}</li>
                <li id="cardTotal_${index}">Total: $${precioTotal.toFixed(2)}</li>
                <li id="cardTotal_${index}">Cambio: ${calcularCambio(datosMercado, compra).toFixed(2)}%</li>
                <li id="cardTotal_${index}">Ganacia/Perdida: $${(datosMercado.c * compra.cantidad).toFixed(2)}</li>
                <button id="btnEliminar_${index}" type="button" name="eliminar">Eliminar</button>
        `;
    listaDatos.appendChild(ul)
  });



}



async function getPrecioMercado(symbol) {
  let urlPrecio = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=clls8cpr01qske4s3m10clls8cpr01qske4s3m1g`;
  let res = await fetch(urlPrecio)
  let datos = await res.json();
  console.log(datos)
  return datos
}
function calcularGanaciaPerdida(datos, compra) {
  console.log(datos)
  return datos.c * compra.cantidad;
}
function calcularCambio(datos, compra) {
  console.log(datos)
  return (datos.c - compra.precioCompra) / compra.precioCompra
}

document.getElementById('btnGuardar').addEventListener('click', () => {
  // Lógica para guardar los datos
  guardarDatos();
});


listaDatos.addEventListener('click', (event) => {
  
  if (event.target && event.target.matches('button[name="eliminar"]')) {
      
      const index = event.target.id.split('_')[1];
      var liElement = document.getElementById(`cardId_${index}`);
      var id = liElement.textContent.split(": ")[1].trim();
      console.log("compra.id es:", id);
      
      eliminarStock(id);
      
  }
  obtenerDatosBD();
});
