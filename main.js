const compras = [];
let filas = 0;
let formInicial = document.getElementById("tablaIngreso").innerHTML;
function validarCampos() {
  let datos = document.querySelectorAll("input")
  let valido = true;
  datos.forEach((dato)=>{
    if(dato.value.length==0)
    valido =false
  });
  return valido;
}

function agregarFila() {

  if(!validarCampos()){
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

function agregarCompras() {
  const nombre = document.getElementsByName('nombre')[filas].value;
  const fechaCompra = document.getElementsByName('fecha')[filas].value;
  const precioCompra = parseFloat(document.getElementsByName('precio')[filas].value);
  const cantidad = parseInt(document.getElementsByName('cantidad')[filas].value);
  if (isNaN(precioCompra) || isNaN(cantidad)) {
    alert('Por favor, ingresa valores numéricos válidos para Precio de Compra y Cantidad.');
    return;
  }
  compras.push({ nombre, fechaCompra, precioCompra, cantidad });


  console.log(compras);
  mostrarDatosEnLista(compras)
}
function guardarDatos() {
  agregarCompras()
  filas = 0
  //Limpiar el formulario
  document.getElementById('tablaIngreso').innerHTML = formInicial;

}

function mostrarDatosEnLista(datos) {
  const listaDatos = document.getElementById('listaDatos');

  // Limpiar la lista antes de mostrar los datos
  listaDatos.innerHTML = '';
  datos.forEach((compra) => {
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
        `;
    listaDatos.appendChild(ul)
  });

}