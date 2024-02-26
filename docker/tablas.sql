CREATE TABLE stocks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    fecha_compra DATE,
    precio_compra DECIMAL,
    cantidad INT
);