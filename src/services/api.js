
const api = {};

api.obtenerTodosLosStocks = async function() {
  try {
    const respuesta = await fetch('http://127.0.0.1:9999/stocks');
    if (!respuesta.ok) {
      throw new Error('Error al obtener los stocks');
    }
    const stocks = await respuesta.json();
    return stocks.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

api.crearStock = async function(stock) {
  try {
    const respuesta = await fetch('http://127.0.0.1:9999/stocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stock),
    });
    if (!respuesta.ok) {
      throw new Error('Error al crear el stock');
    }
    const stockCreado = await respuesta.json();
    console.log('Respuesta:', stockCreado);


    return stockCreado;
  } catch (error) {
    console.error('Error:', error);
  }
}

api.actualizarStock = async function(stock) {
  try {
    const respuesta = await fetch('http://127.0.0.1:9999/stocks', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stock),
    });
    if (!respuesta.ok) {
      throw new Error('Error al actualizar el stock');
    }
    const stockActualizado = await respuesta.json();
    return stockActualizado;
  } catch (error) {
    console.error('Error:', error);
  }
}

api.eliminarStock = async function(id) {
  try {
    const respuesta = await fetch(`http://127.0.0.1:9999/stocks/${id}`, {
      method: 'DELETE',
    });
    if (!respuesta.ok) {
      throw new Error('Error al eliminar el stock');
    }
    return 'Stock eliminado con éxito';
  } catch (error) {
    console.error('Error:', error);
  }
}
