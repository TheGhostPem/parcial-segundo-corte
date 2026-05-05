-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: parcial2_raul
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `equipo`
--

LOCK TABLES `equipo` WRITE;
/*!40000 ALTER TABLE `equipo` DISABLE KEYS */;
INSERT INTO `equipo` (`codigo`, `nombre`, `estadio`, `aforo`, `a├▒o_fundacion`, `ciudad`) VALUES ('111','111','sol mas alegre',NULL,NULL,'cartago'),('ATM','Atl├®tico de Madrid','C├¡vitas Metropolitano',68456,1903,'Madrid'),('BAY','Bayern M├║nich','Allianz Arena',75000,1900,'M├║nich'),('BSC','Barcelona SC','Monumental',57267,1925,'Guayaquil'),('FCB','FC Barcelona','Spotify Camp Nou',99354,1899,'Barcelona'),('JUN','Junior de Barranquilla','Metropolitano',46692,1924,'Barranquilla'),('LDU','Liga de Quito','Rodrigo Paz Delgado',41575,1918,'Quito'),('NAL','Atl├®tico Nacional','Atanasio Girardot',45000,1947,'Medell├¡n'),('RM','Real Madrid','Santiago Bernab├®u',81044,1902,'Madrid');
/*!40000 ALTER TABLE `equipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `jugador`
--

LOCK TABLES `jugador` WRITE;
/*!40000 ALTER TABLE `jugador` DISABLE KEYS */;
INSERT INTO `jugador` (`codigo`, `nombre`, `fecha_nacimiento`, `posicion`, `equipo_codigo`) VALUES ('J1','Vin├¡cius J├║nior',NULL,'Delantero','RM'),('J2','Robert Lewandowski',NULL,'Delantero','FCB'),('J3','Antoine Griezmann',NULL,'Delantero','ATM'),('J4','Alex Arce',NULL,'Delantero','LDU'),('J5','Dami├ín D├¡az',NULL,'Centrocampista','BSC'),('J6','Dorlan Pab├│n',NULL,'Delantero',NULL),('J7','Carlos Bacca',NULL,'Delantero',NULL),('J8','Luis D├¡az',NULL,'Delantero',NULL),('J9','Michael Olise',NULL,'Extremo',NULL);
/*!40000 ALTER TABLE `jugador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `presidente`
--

LOCK TABLES `presidente` WRITE;
/*!40000 ALTER TABLE `presidente` DISABLE KEYS */;
INSERT INTO `presidente` (`dni`, `nombre`, `apellidos`, `fecha_nacimiento`, `a├▒o_inicio`, `equipo_codigo`) VALUES ('P1','Florentino','P├®rez',NULL,2000,'RM'),('P2','Joan','Laporta',NULL,2021,'FCB'),('P3','Enrique','Cerezo',NULL,2003,'ATM'),('P4','Isaac','├ülvarez',NULL,2024,'LDU'),('P5','Antonio','├ülvarez',NULL,2024,'BSC'),('P6','Mauricio','Navarro',NULL,2022,NULL),('P7','Alejandro','Arteta',NULL,2020,NULL);
/*!40000 ALTER TABLE `presidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `partido`
--

LOCK TABLES `partido` WRITE;
/*!40000 ALTER TABLE `partido` DISABLE KEYS */;
INSERT INTO `partido` (`id`, `fecha`, `goles_local`, `goles_visitante`, `equipo_local_codigo`, `equipo_visitante_codigo`) VALUES (1,'2026-05-15',1,3,'RM','FCB');
/*!40000 ALTER TABLE `partido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `gol`
--

LOCK TABLES `gol` WRITE;
/*!40000 ALTER TABLE `gol` DISABLE KEYS */;
INSERT INTO `gol` (`id`, `minuto`, `descripcion`, `partido_id`, `jugador_codigo`) VALUES (4,12,'Tiro libre al ├íngulo',NULL,NULL),(5,33,'Cabezazo potente',NULL,NULL),(6,67,'Remate dentro del ├írea',NULL,NULL),(7,88,'Jugada individual ├®pica',NULL,NULL);
/*!40000 ALTER TABLE `gol` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-05  8:58:32
