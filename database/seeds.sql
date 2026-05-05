-- ============================================================
-- DATOS DE PRUEBA — parcial2_raul
-- Ejecutar DESPUÉS de schema.sql
-- ============================================================
USE parcial2_raul;

-- ------------------------------------------------------------
-- EQUIPOS
-- ------------------------------------------------------------
INSERT IGNORE INTO equipo (codigo, nombre, estadio, aforo, año_fundacion, ciudad) VALUES
('RM',  'Real Madrid',             'Santiago Bernabéu',       81044, 1902, 'Madrid'),
('FCB', 'FC Barcelona',            'Spotify Camp Nou',         99354, 1899, 'Barcelona'),
('ATM', 'Atlético de Madrid',      'Cívitas Metropolitano',   68456, 1903, 'Madrid'),
('BAY', 'Bayern Múnich',           'Allianz Arena',            75000, 1900, 'Múnich'),
('NAL', 'Atlético Nacional',       'Atanasio Girardot',        45000, 1947, 'Medellín'),
('JUN', 'Junior de Barranquilla',  'Metropolitano',            46692, 1924, 'Barranquilla'),
('LDU', 'Liga de Quito',           'Rodrigo Paz Delgado',      41575, 1918, 'Quito'),
('BSC', 'Barcelona SC',            'Monumental',               57267, 1925, 'Guayaquil');

-- ------------------------------------------------------------
-- JUGADORES
-- ------------------------------------------------------------
INSERT IGNORE INTO jugador (codigo, nombre, posicion, equipo_codigo) VALUES
('J1', 'Vinícius Júnior',    'Delantero',      'RM'),
('J2', 'Robert Lewandowski', 'Delantero',      'FCB'),
('J3', 'Antoine Griezmann',  'Delantero',      'ATM'),
('J4', 'Alex Arce',          'Delantero',      'LDU'),
('J5', 'Damián Díaz',        'Centrocampista', 'BSC'),
('J6', 'Dorlan Pabón',       'Delantero',      'NAL'),
('J7', 'Carlos Bacca',       'Delantero',      'JUN'),
('J8', 'Luis Díaz',          'Delantero',      NULL),
('J9', 'Michael Olise',      'Extremo',        'BAY');

-- ------------------------------------------------------------
-- PRESIDENTES
-- ------------------------------------------------------------
INSERT IGNORE INTO presidente (dni, nombre, apellidos, año_inicio, equipo_codigo) VALUES
('P1', 'Florentino', 'Pérez',    2000, 'RM'),
('P2', 'Joan',       'Laporta',  2021, 'FCB'),
('P3', 'Enrique',    'Cerezo',   2003, 'ATM'),
('P4', 'Isaac',      'Álvarez',  2024, 'LDU'),
('P5', 'Antonio',    'Álvarez',  2024, 'BSC'),
('P6', 'Mauricio',   'Navarro',  2022, 'JUN');

-- ------------------------------------------------------------
-- PARTIDOS
-- ------------------------------------------------------------
INSERT IGNORE INTO partido (id, fecha, goles_local, goles_visitante, equipo_local_codigo, equipo_visitante_codigo) VALUES
(1, '2026-05-15', 1, 3, 'RM', 'FCB');

-- ------------------------------------------------------------
-- GOLES
-- ------------------------------------------------------------
INSERT IGNORE INTO gol (id, minuto, descripcion, partido_id, jugador_codigo) VALUES
(1, 12, 'Tiro libre al ángulo',      1, 'J1'),
(2, 33, 'Cabezazo potente',          1, 'J2'),
(3, 67, 'Remate dentro del área',    1, 'J2'),
(4, 88, 'Jugada individual épica',   1, 'J2');

-- ------------------------------------------------------------
-- NOTA: El usuario admin (admin / 123456) se crea automáticamente
-- al arrancar el servidor (server.js → asegurarAdmin).
-- No es necesario insertarlo aquí.
-- ------------------------------------------------------------
