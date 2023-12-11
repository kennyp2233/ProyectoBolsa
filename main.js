const compras = [];
let filas = 0;
function agregarFila() {
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
    filas +=1;
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
  function guardarDatos(){
    agregarCompras()
    filas = 0
    //Limpiar el formulario
    document.getElementById('formularioDatos').reset();
  }

  function mostrarDatosEnLista(datos) {
    const listaDatos = document.getElementById('listaDatos');

    // Limpiar la lista antes de mostrar los datos
    listaDatos.innerHTML = '';

    datos.forEach((compra, index) => {
        const precioTotal = compra.precioCompra * compra.cantidad;

        // Crear un elemento de lista y agregarlo a la lista
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. Nombre: ${compra.nombre}, Fecha: ${compra.fechaCompra}, Precio: $${compra.precioCompra.toFixed(2)}, Cantidad: ${compra.cantidad}, Total: $${precioTotal.toFixed(2)}`;
        listaDatos.appendChild(listItem);
    });
}