-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 02, 2023 at 11:38 AM
-- Server version: 10.6.15-MariaDB-cll-lve
-- PHP Version: 8.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zmcrbvch_emailHacks`
--

-- --------------------------------------------------------

--
-- Table structure for table `Facturas`
--

CREATE TABLE `Facturas`
(
    `IDFactura`  int(11)        NOT NULL,
    `Codigo`     varchar(135)   NOT NULL,
    `Concepto`   varchar(100)   NOT NULL,
    `ValorTotal` decimal(10, 0) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1
  COLLATE = latin1_swedish_ci;

--
-- Dumping data for table `Facturas`
--

INSERT INTO `Facturas` (`IDFactura`, `Codigo`, `Concepto`, `ValorTotal`)
VALUES (1, 'ABC123', 'Venta de productos', 1000),
       (2, 'ASDFASDF', 'Compra software', 27),
       (4, 'ABC444', 'Venta de productos', 1000),
       (5, 'ABC555', 'Venta de productos', 1000),
       (6, 'ABC556', 'Venta de productos', 1000),
       (7, '009', 'COMPRA SOFTWARE', 15),
       (8, '02011', 'COMPRA SOFTWARE', 15),
       (9, '02012', 'COMPRA SOFTWARE', 15),
       (10, '02012', 'COMPRA SOFTWARE', 15),
       (11, '02012', 'COMPRA SOFTWARE', 15),
       (12, '02012', 'COMPRA SOFTWARE', 15),
       (13, '02012', 'COMPRA SOFTWARE', 15),
       (14, '02012', 'COMPRA SOFTWARE', 15),
       (15, '02012', 'COMPRA SOFTWARE', 15),
       (16, '666', 'COMPRA SOFTWARE', 15),
       (17, '777', 'COMPRA SOFTWARE', 15),
       (18, '777', 'COMPRA SOFTWARE', 15),
       (19, '777', 'COMPRA SOFTWARE', 15),
       (20, '999', 'COMPRA SOFTWARE', 15),
       (21, '7979', 'COMPRA SOFTWARE', 15),
       (22, '8989', 'COMPRA SOFTWARE', 15),
       (23, '8985', 'COMPRA SOFTWARE', 15),
       (24, '8983', 'COMPRA SOFTWARE', 15),
       (25, '8888', 'COMPRA SOFTWARE', 15),
       (26, '9696', 'COMPRA SOFTWARE', 15),
       (27, '9697', 'COMPRA SOFTWARE', 15),
       (28, '9698', 'COMPRA SOFTWARE', 15);

-- --------------------------------------------------------

--
-- Table structure for table `Personas`
--

CREATE TABLE `Personas`
(
    `IDPersona`    int(11)     NOT NULL,
    `Nombre`       varchar(50) NOT NULL,
    `Apellido`     varchar(50) DEFAULT NULL,
    `Edad`         int(2)      DEFAULT NULL,
    `FK_IDPais`    int(11)     DEFAULT NULL,
    `FK_IDFactura` int(11)     NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1
  COLLATE = latin1_swedish_ci COMMENT ='Personas que son Clientes';

--
-- Dumping data for table `Personas`
--

INSERT INTO `Personas` (`IDPersona`, `Nombre`, `Apellido`, `Edad`, `FK_IDPais`, `FK_IDFactura`)
VALUES (1, 'Jon', 'Mosquera', 49, NULL, 1),
       (6, 'asdf', 'sdf', 3, NULL, 2),
       (9, 'Jon', 'Probando Mejia', 10, 5, 4),
       (10, 'Paola', 'Gallego', 15, 5, 6),
       (11, 'Andrea', 'Echeverry', 15, 5, 26),
       (12, 'Cindy', 'Echeverry', 15, 5, 27),
       (13, 'Cindy Dayana', 'Echeverry', 15, 5, 28);

-- --------------------------------------------------------

--
-- Table structure for table `Usuarios`
--

CREATE TABLE `Usuarios`
(
    `UserID`       int(11)     NOT NULL,
    `Email`        varchar(50) NOT NULL,
    `Password`     varchar(50) NOT NULL,
    `Active`       tinyint(1)  NOT NULL,
    `FK_IDPersona` int(11)     NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1
  COLLATE = latin1_swedish_ci COMMENT ='Users of the App Sniper';

--
-- Dumping data for table `Usuarios`
--

INSERT INTO `Usuarios` (`UserID`, `Email`, `Password`, `Active`, `FK_IDPersona`)
VALUES (1, 'jon.mosquera@gmail.com', '123', 1, 1),
       (4, 'jon22@testing.com', '123', 1, 6),
       (5, 'pao@yeah.com', '123', 1, 9),
       (7, 'cindy@yeah.com', '123', 1, 13);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Facturas`
--
ALTER TABLE `Facturas`
    ADD PRIMARY KEY (`IDFactura`);

--
-- Indexes for table `Personas`
--
ALTER TABLE `Personas`
    ADD PRIMARY KEY (`IDPersona`),
    ADD UNIQUE KEY `FK_IDFactura` (`FK_IDFactura`),
    ADD KEY `IDX_Pais` (`FK_IDPais`),
    ADD KEY `IDX_Factura` (`FK_IDFactura`);

--
-- Indexes for table `Usuarios`
--
ALTER TABLE `Usuarios`
    ADD PRIMARY KEY (`UserID`),
    ADD UNIQUE KEY `FK_IDPersona` (`FK_IDPersona`),
    ADD UNIQUE KEY `Email` (`Email`),
    ADD KEY `IX_IDPersona` (`FK_IDPersona`),
    ADD KEY `Email_2` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Facturas`
--
ALTER TABLE `Facturas`
    MODIFY `IDFactura` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 29;

--
-- AUTO_INCREMENT for table `Personas`
--
ALTER TABLE `Personas`
    MODIFY `IDPersona` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 14;

--
-- AUTO_INCREMENT for table `Usuarios`
--
ALTER TABLE `Usuarios`
    MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Personas`
--
ALTER TABLE `Personas`
    ADD CONSTRAINT `FK_Persona_Facturas` FOREIGN KEY (`FK_IDFactura`) REFERENCES `Facturas` (`IDFactura`);

--
-- Constraints for table `Usuarios`
--
ALTER TABLE `Usuarios`
    ADD CONSTRAINT `FK_Usuarios_Personas` FOREIGN KEY (`FK_IDPersona`) REFERENCES `Personas` (`IDPersona`);
COMMIT;


CREATE TABLE AccesoTemporal
(
    RowID      INT          NOT NULL AUTO_INCREMENT,
    LinkID     varchar(255) NOT NULL UNIQUE,
    CreateAt   TIMESTAMP    NOT NULL,
    ValidUntil TIMESTAMP    NOT NULL,
    FK_UserID  int(11)      NOT NULL,
    primary key (RowID),
    index ix_AccesoTemporal_LinkID (LinkID),
    constraint AccesoTemporal__Usuarios_UserID foreign key (FK_UserID) references Usuarios (UserID)
)
    ENGINE = InnoDB
    DEFAULT CHARSET = latin1
    COLLATE = latin1_swedish_ci COMMENT ='Users of the App Sniper';

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
