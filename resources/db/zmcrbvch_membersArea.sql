-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 24, 2024 at 02:03 PM
-- Server version: 10.6.16-MariaDB-cll-lve
-- PHP Version: 8.1.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zmcrbvch_membersArea`
--

-- --------------------------------------------------------

--
-- Table structure for table `Estanteria`
--

CREATE TABLE `Estanteria` (
  `EstanteriaID` int(11) NOT NULL,
  `EstanteriaCode` varchar(35) DEFAULT NULL,
  `EstanteriaDesc` varchar(150) DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  `ActivedDT` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `CreatedDT` datetime DEFAULT NULL,
  `UpdatedBy` varchar(50) DEFAULT NULL,
  `UpdatedDT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `Estanteria`
--

INSERT INTO `Estanteria` (`EstanteriaID`, `EstanteriaCode`, `EstanteriaDesc`, `Active`, `ActivedDT`, `CreatedBy`, `CreatedDT`, `UpdatedBy`, `UpdatedDT`) VALUES
(1, 'ClipSpy', 'Esta es la Estanteria de ClipSpy', 1, '2024-01-24 11:42:32', 'Jon', '2024-01-24 11:42:32', NULL, '2024-01-24 11:42:32');

-- --------------------------------------------------------

--
-- Table structure for table `Lessons`
--

CREATE TABLE `Lessons` (
  `LessonID` int(11) NOT NULL,
  `LessonCode` varchar(35) DEFAULT NULL,
  `LessonName` varchar(500) DEFAULT NULL,
  `LessonDuration` varchar(35) DEFAULT NULL,
  `LessonVideoScript` varchar(2000) DEFAULT NULL,
  `FK_ProductModuleCode` varchar(35) DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  `ActivedDT` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `CreatedDT` datetime DEFAULT NULL,
  `UpdatedBy` varchar(50) DEFAULT NULL,
  `UpdatedDT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `Lessons`
--

INSERT INTO `Lessons` (`LessonID`, `LessonCode`, `LessonName`, `LessonDuration`, `LessonVideoScript`, `FK_ProductModuleCode`, `Active`, `ActivedDT`, `CreatedBy`, `CreatedDT`, `UpdatedBy`, `UpdatedDT`) VALUES
(1, 'L1', 'Lesson 1 - Intro', '5', 'Script', 'BIBeginners', 1, '2024-01-24 11:49:57', 'Jon', '2024-01-24 11:49:57', NULL, '2024-01-24 11:49:57'),
(2, 'L2', 'Lesson 2 - What is the lesson 2?', '10', 'script', 'BIBeginners', 1, '2024-01-24 11:49:57', 'jon', '2024-01-24 11:49:57', NULL, '2024-01-24 11:49:57');

-- --------------------------------------------------------

--
-- Table structure for table `ProductCategories`
--

CREATE TABLE `ProductCategories` (
  `ProductCategoryID` int(11) NOT NULL,
  `ProductCategoryCode` varchar(35) DEFAULT NULL,
  `ProductCategoryDesc` varchar(150) DEFAULT NULL,
  `FK_EstanteriaCode` varchar(35) DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  `ActivedDT` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `CreatedDT` datetime DEFAULT NULL,
  `UpdatedBy` varchar(50) DEFAULT NULL,
  `UpdatedDT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `ProductCategories`
--

INSERT INTO `ProductCategories` (`ProductCategoryID`, `ProductCategoryCode`, `ProductCategoryDesc`, `FK_EstanteriaCode`, `Active`, `ActivedDT`, `CreatedBy`, `CreatedDT`, `UpdatedBy`, `UpdatedDT`) VALUES
(1, 'Benchmark', 'Categoría para aprender a hacer benchmarking', 'ClipSpy', 1, '2024-01-24 11:43:51', 'Jon', '2024-01-24 11:43:51', NULL, '2024-01-24 11:43:51'),
(2, 'TraficoPago', 'Productos para aprender Trafico Pago', 'ClipSpy', 1, '2024-01-24 11:43:51', 'jon', '2024-01-24 11:43:51', NULL, '2024-01-24 11:43:51'),
(3, 'Copywriting', 'Copywriting y Escritura Comercial', 'ClipSpy', 1, '2024-01-24 11:43:51', 'Jon', '2024-01-24 11:43:51', NULL, '2024-01-24 11:43:51');

-- --------------------------------------------------------

--
-- Table structure for table `ProductModules`
--

CREATE TABLE `ProductModules` (
  `ProductModuleID` int(11) NOT NULL,
  `ProductModuleCode` varchar(35) DEFAULT NULL,
  `ProductModuleName` varchar(100) DEFAULT NULL,
  `FK_ProductCode` varchar(35) DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  `ActivedDT` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `CreatedDT` datetime DEFAULT NULL,
  `UpdatedBy` varchar(50) DEFAULT NULL,
  `UpdatedDT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `ProductModules`
--

INSERT INTO `ProductModules` (`ProductModuleID`, `ProductModuleCode`, `ProductModuleName`, `FK_ProductCode`, `Active`, `ActivedDT`, `CreatedBy`, `CreatedDT`, `UpdatedBy`, `UpdatedDT`) VALUES
(1, 'Intro', 'Bienvenida e Introducción', 'BIBeginners', 1, '2024-01-24 11:49:57', 'jon', '2024-01-24 11:49:57', NULL, '2024-01-24 11:49:57');

-- --------------------------------------------------------

--
-- Table structure for table `Productos`
--

CREATE TABLE `Productos` (
  `ProductID` int(11) NOT NULL,
  `ProductCode` varchar(35) DEFAULT NULL,
  `ProductName` varchar(50) DEFAULT NULL,
  `Estado` varchar(35) DEFAULT NULL,
  `ImageURL` varchar(150) DEFAULT NULL,
  `ProductDesc` varchar(500) DEFAULT NULL,
  `WebhookKey` varchar(500) DEFAULT NULL,
  `Webhook` varchar(500) DEFAULT NULL,
  `ThirdPartyProductID` varchar(50) DEFAULT NULL,
  `Disponibilidad` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FK_ProductCategoryCode` varchar(35) DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  `ActivedDT` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `CreatedDT` datetime DEFAULT NULL,
  `UpdatedBy` varchar(50) DEFAULT NULL,
  `UpdatedDT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `Productos`
--

INSERT INTO `Productos` (`ProductID`, `ProductCode`, `ProductName`, `Estado`, `ImageURL`, `ProductDesc`, `WebhookKey`, `Webhook`, `ThirdPartyProductID`, `Disponibilidad`, `FK_ProductCategoryCode`, `Active`, `ActivedDT`, `CreatedBy`, `CreatedDT`, `UpdatedBy`, `UpdatedDT`) VALUES
(1, 'BIBeginners', 'BI para Principiantes', 'Activo', 'https://www.google.com', 'Este producto es para business intelligence', 'https://bh8906.banahosting.com:2083/cpsess1588714782/3rdparty/phpMyAdmin/index.php?route=/table/change&db=zmcrbvch_membersArea&table=Productos', 'https://bh8906.banahosting.com:2083/cpsess1588714782/3rdparty/phpMyAdmin/index.php?route=/table/change&db=zmcrbvch_membersArea&table=Productos', '56465464564', '2024-01-24 16:48:05', 'Benchmark', 1, '2024-01-24 11:46:17', NULL, '2024-01-24 11:46:17', NULL, '2024-01-24 11:46:17'),
(2, 'IntroBench', 'Introducción al Benchmarking', 'activo', 'https://bh8906.banahosting.com:2083/cpsess1588714782/3rdparty/phpMyAdmin/index.php?route=/table/change&db=zmcrbvch_membersArea&table=Productos', 'Este producto es para aprender a hacer benchmarking', 'https://bh8906.banahosting.com:2083/cpsess1588714782/3rdparty/phpMyAdmin/index.php?route=/table/change&db=zmcrbvch_membersArea&table=Productos', 'https://bh8906.banahosting.com:2083/cpsess1588714782/3rdparty/phpMyAdmin/index.php?route=/table/change&db=zmcrbvch_membersArea&table=Productos', '478787888', '2024-01-24 16:49:35', 'Benchmark', 1, '2024-01-24 11:48:27', 'jon', '2024-01-24 11:48:27', NULL, '2024-01-24 11:48:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Estanteria`
--
ALTER TABLE `Estanteria`
  ADD PRIMARY KEY (`EstanteriaID`),
  ADD KEY `EstanteriaCodeIDX` (`EstanteriaCode`);

--
-- Indexes for table `Lessons`
--
ALTER TABLE `Lessons`
  ADD PRIMARY KEY (`LessonID`),
  ADD KEY `FK_ProductModuleCode` (`FK_ProductModuleCode`);

--
-- Indexes for table `ProductCategories`
--
ALTER TABLE `ProductCategories`
  ADD PRIMARY KEY (`ProductCategoryID`),
  ADD UNIQUE KEY `ProductcategoryCodeIDX` (`ProductCategoryCode`),
  ADD KEY `EstanteriaIDX` (`FK_EstanteriaCode`),
  ADD KEY `ProductCatCodeIDX` (`ProductCategoryCode`) USING BTREE;

--
-- Indexes for table `ProductModules`
--
ALTER TABLE `ProductModules`
  ADD PRIMARY KEY (`ProductModuleID`),
  ADD KEY `FK_ProductCode` (`FK_ProductCode`);

--
-- Indexes for table `Productos`
--
ALTER TABLE `Productos`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `FK_ProductCategoryCode` (`FK_ProductCategoryCode`),
  ADD KEY `ProductCodeIDX` (`ProductCode`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Estanteria`
--
ALTER TABLE `Estanteria`
  MODIFY `EstanteriaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Lessons`
--
ALTER TABLE `Lessons`
  MODIFY `LessonID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ProductCategories`
--
ALTER TABLE `ProductCategories`
  MODIFY `ProductCategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ProductModules`
--
ALTER TABLE `ProductModules`
  MODIFY `ProductModuleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Productos`
--
ALTER TABLE `Productos`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Lessons`
--
ALTER TABLE `Lessons`
  ADD CONSTRAINT `Lessons_ibfk_1` FOREIGN KEY (`FK_ProductModuleCode`) REFERENCES `ProductModules` (`FK_ProductCode`);

--
-- Constraints for table `ProductCategories`
--
ALTER TABLE `ProductCategories`
  ADD CONSTRAINT `ProductCategories_ibfk_1` FOREIGN KEY (`FK_EstanteriaCode`) REFERENCES `Estanteria` (`EstanteriaCode`);

--
-- Constraints for table `ProductModules`
--
ALTER TABLE `ProductModules`
  ADD CONSTRAINT `ProductModules_ibfk_1` FOREIGN KEY (`FK_ProductCode`) REFERENCES `Productos` (`ProductCode`);

--
-- Constraints for table `Productos`
--
ALTER TABLE `Productos`
  ADD CONSTRAINT `Productos_ibfk_1` FOREIGN KEY (`FK_ProductCategoryCode`) REFERENCES `ProductCategories` (`ProductCategoryCode`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
