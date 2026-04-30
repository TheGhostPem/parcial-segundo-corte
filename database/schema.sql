CREATE DATABASE IF NOT EXISTS parcial2_raul;
USE parcial2_raul;

CREATE TABLE equipos (
    codigo VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    estadio VARCHAR(255),
    aforo INT,
    año_fundacion INT,
    ciudad VARCHAR(255)
);

CREATE TABLE jugadores (
    codigo VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE,
    posicion VARCHAR(255),
    equipo_codigo VARCHAR(255),
    FOREIGN KEY (equipo_codigo) REFERENCES equipos(codigo) ON DELETE SET NULL
);

CREATE TABLE presidentes (
    dni VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255),
    fecha_nacimiento DATE,
    año_inicio INT,
    equipo_codigo VARCHAR(255),
    FOREIGN KEY (equipo_codigo) REFERENCES equipos(codigo) ON DELETE SET NULL
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    imagen VARCHAR(255),
    rol ENUM('admin', 'usuario', 'moderador') DEFAULT 'usuario',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
