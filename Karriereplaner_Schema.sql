CREATE DATABASE karriereplaner;
USE karriereplaner;

CREATE TABLE `kompetenz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kompetenzname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idKompetenz_UNIQUE` (`id`)
);
CREATE TABLE `kurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kursname` varchar(45) NOT NULL,
  `kursbeschreibung` varchar(255) DEFAULT NULL,
  `kurskategorie` json DEFAULT NULL,
  `kurskompetenzen_erlerndend` json DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idKurs_UNIQUE` (`id`)
);
CREATE TABLE `kurs_kompetenz` (
  `idKurs_Kompetenz` int NOT NULL AUTO_INCREMENT,
  `idKurs` int DEFAULT NULL,
  `idKompetenz` int DEFAULT NULL,
  PRIMARY KEY (`idKurs_Kompetenz`),
  UNIQUE KEY `idKurs_Kompetenz_UNIQUE` (`idKurs_Kompetenz`),
  KEY `idKurs` (`idKurs`),
  KEY `idKompetenz` (`idKompetenz`),
  CONSTRAINT `kurs_kompetenz_ibfk_1` FOREIGN KEY (`idKurs`) REFERENCES `kurs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `kurs_kompetenz_ibfk_2` FOREIGN KEY (`idKompetenz`) REFERENCES `kompetenz` (`id`) ON DELETE CASCADE
);
CREATE TABLE `kursgruppe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kursgruppenname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idKursgruppe_UNIQUE` (`id`)
);
CREATE TABLE `kurskategorie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `spalte` int DEFAULT NULL,
  `kurskategoriename` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idKurskategorie_UNIQUE` (`id`)
);
CREATE TABLE `kurs_kurskategorie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idKurs` int NOT NULL,
  `idKurskategorie` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `kurs_INDEX` (`idKurs`,`idKurskategorie`),
  KEY `idKurskategorie` (`idKurskategorie`),
  CONSTRAINT `kurs_kurskategorie_ibfk_1` FOREIGN KEY (`idKurs`) REFERENCES `kurs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `kurs_kurskategorie_ibfk_2` FOREIGN KEY (`idKurskategorie`) REFERENCES `kurskategorie` (`id`) ON DELETE CASCADE
);
CREATE TABLE `kurslogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL,
  `idKurs` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Kurs_idx` (`idKurs`),
  CONSTRAINT `FK_Kurs` FOREIGN KEY (`idKurs`) REFERENCES `kurs` (`id`) ON DELETE CASCADE
);
CREATE TABLE `kursreihenfolge` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idKurs` int NOT NULL,
  `idKursgruppe` int DEFAULT NULL,
  `Abfolge` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idKursreihenfolge_UNIQUE` (`id`),
  KEY `kursreihenfolge_gruppe_idx` (`idKursgruppe`),
  KEY `kursreihenfolge_kurs_idx` (`idKurs`),
  CONSTRAINT `kursreihenfolge_gruppe` FOREIGN KEY (`idKursgruppe`) REFERENCES `kursgruppe` (`id`) ON DELETE CASCADE,
  CONSTRAINT `kursreihenfolge_kurs` FOREIGN KEY (`idKurs`) REFERENCES `kurs` (`id`) ON DELETE CASCADE
);
CREATE TABLE `position` (
  `id` int NOT NULL AUTO_INCREMENT,
  `positionsname` varchar(45) DEFAULT NULL,
  `positionsbeschreibung` varchar(255) DEFAULT NULL,
  `passend_zu_branche` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idPosition_UNIQUE` (`id`)
);
CREATE TABLE `positionskategorie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `spalte` int DEFAULT NULL,
  `positionskategoriename` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idPositionskategorie_UNIQUE` (`id`)
);
CREATE TABLE `position_kompetenz` (
  `idPKomp` int NOT NULL AUTO_INCREMENT,
  `idPosition` int DEFAULT NULL,
  `idKompetenz` int DEFAULT NULL,
  PRIMARY KEY (`idPKomp`),
  UNIQUE KEY `idPosition_Anforderung_UNIQUE` (`idPKomp`),
  KEY `idPosition` (`idPosition`),
  KEY `idKompetenz` (`idKompetenz`),
  CONSTRAINT `position_kompetenz_ibfk_1` FOREIGN KEY (`idPosition`) REFERENCES `position` (`id`) ON DELETE CASCADE,
  CONSTRAINT `position_kompetenz_ibfk_2` FOREIGN KEY (`idKompetenz`) REFERENCES `kompetenz` (`id`) ON DELETE CASCADE
);
CREATE TABLE `position_positionskategorie` (
  `idPK` int NOT NULL AUTO_INCREMENT,
  `idPosition` int DEFAULT NULL,
  `idPositionskategorie` int DEFAULT NULL,
  PRIMARY KEY (`idPK`),
  UNIQUE KEY `idPK_UNIQUE` (`idPK`),
  KEY `idPosition` (`idPosition`),
  KEY `idPositionskategorie` (`idPositionskategorie`),
  CONSTRAINT `position_positionskategorie_ibfk_1` FOREIGN KEY (`idPosition`) REFERENCES `position` (`id`) ON DELETE CASCADE,
  CONSTRAINT `position_positionskategorie_ibfk_2` FOREIGN KEY (`idPositionskategorie`) REFERENCES `positionskategorie` (`id`) ON DELETE CASCADE
);
CREATE TABLE `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(45) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `idUser_UNIQUE` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;