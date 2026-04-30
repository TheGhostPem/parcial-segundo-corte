USE parcial2_raul;

INSERT INTO equipos (codigo, nombre, estadio, aforo, año_fundacion, ciudad) VALUES
('RM', 'Real Madrid', 'Santiago Bernabéu', 81044, 1902, 'Madrid'),
('FCB', 'FC Barcelona', 'Spotify Camp Nou', 99354, 1899, 'Barcelona');

INSERT INTO usuarios (usuario, password, rol) VALUES
('admin', '$2a$10$Xm7vP...HashedPassword...', 'admin'); 
-- Nota: La clave real del admin es 123456 (encriptada con bcrypt)
