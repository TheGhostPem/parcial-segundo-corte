USE parcial2_raul;

INSERT INTO equipos (codigo, nombre, estadio, aforo, año_fundacion, ciudad) VALUES
('RM', 'Real Madrid', 'Santiago Bernabéu', 81044, 1902, 'Madrid'),
('FCB', 'FC Barcelona', 'Spotify Camp Nou', 99354, 1899, 'Barcelona');

INSERT INTO usuarios (usuario, password, rol) VALUES
('admin', '$10$ecJwJM05X2yCuD6ZLx9wmOgXOOqDOZoM8.QyQcZHXhglCHnX.oQU.', 'admin'); 
-- Nota: La clave real del admin es 123456 (encriptada con bcrypt)
