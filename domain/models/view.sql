drop view_anuncios_activos

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` 
SQL SECURITY DEFINER 
VIEW `view_anuncios_activos` AS 
select `anunciosguardados`.`ID_SavedAd` AS `ID_SavedAd`,
`anunciosguardados`.`LibraryID` AS `LibraryID`,`anunciosguardados`.`Active` AS `Active`,
`anunciosguardados`.`Estatus` AS `Estatus`,`anunciosguardados`.`PostDT` AS `PostDT`,
`anunciosguardados`.`FK_PlatformID` AS `FK_PlatformID`,
`anunciosguardados`.`FK_Category_Code` AS `FK_Category_Code`,
`anunciosguardados`.`FK_UserID` AS `FK_UserID`,`anunciosguardados`.`FanPageName` 
AS `FanPageName`,`anunciosguardados`.`AdDescription` AS `AdDescription`,
`anunciosguardados`.`AdTitle` AS `AdTitle`,`anunciosguardados`.`AdCreative` AS `AdCreative` 
from `anunciosguardados` where (`anunciosguardados`.`Active` = 1)