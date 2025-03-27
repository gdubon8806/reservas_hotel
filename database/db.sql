-- Crear la base de datos
CREATE DATABASE hotel_reservas;

-- Usar la base de datos
USE hotel_reservas;

-- Crear la tabla Clientes
CREATE TABLE Clientes (
  cliente_id INT IDENTITY(1,1) PRIMARY KEY,
  nombre VARCHAR(255),
  apellido VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  telefono VARCHAR(20),
  direccion VARCHAR(255)
);

-- Crear la tabla Habitaciones
CREATE TABLE Habitaciones (
  habitacion_id INT IDENTITY(1,1) PRIMARY KEY,
  numero_habitacion VARCHAR(10) UNIQUE,
  piso INT,
  tipo_habitacion VARCHAR(50),
  precio_noche DECIMAL(10, 2),
  descripcion TEXT
);

-- Crear la tabla Reservas
CREATE TABLE Reservas (
  reserva_id INT IDENTITY(1,1) PRIMARY KEY,
  cliente_id INT,
  habitacion_id INT,
  fecha_llegada DATE,
  fecha_salida DATE,
  numero_adultos INT,
  numero_niños INT,
  precio_total DECIMAL(10, 2),
  estado_reserva VARCHAR(20),
  FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id),
  FOREIGN KEY (habitacion_id) REFERENCES Habitaciones(habitacion_id)
);