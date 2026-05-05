USE parcial2_raul;

-- Datos de prueba: Equipos iniciales
INSERT INTO equipos (codigo, nombre, estadio, aforo, año_fundacion, ciudad) VALUES
('RM', 'Real Madrid', 'Santiago Bernabéu', 81044, 1902, 'Madrid'),
('FCB', 'FC Barcelona', 'Spotify Camp Nou', 99354, 1899, 'Barcelona');

-- NOTA: No se inserta el usuario admin aquí.
-- El servidor lo crea automáticamente al arrancar (server.js → asegurarAdmin)
-- con usuario: 'admin' y contraseña: '123456' (hasheada con bcrypt).
