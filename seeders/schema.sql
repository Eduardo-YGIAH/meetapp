SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS
, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS
, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE
, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema meetapp
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `meetapp`
;

-- -----------------------------------------------------
-- Schema meetapp
-- -----------------------------------------------------
CREATE SCHEMA
IF NOT EXISTS `meetapp` DEFAULT CHARACTER
SET utf8 ;
USE `meetapp`
;

-- -----------------------------------------------------
-- Table `meetapp`.`location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `meetapp`.`location` ;

CREATE TABLE
IF NOT EXISTS `meetapp`.`location`
(
  `locationId` INT NOT NULL AUTO_INCREMENT,
  `postcode` VARCHAR
(45) NOT NULL,
  `address` VARCHAR
(45) NOT NULL,
  PRIMARY KEY
(`locationId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meetapp`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `meetapp`.`user` ;

CREATE TABLE
IF NOT EXISTS `meetapp`.`user`
(
  `userId` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR
(45) NOT NULL,
  `last_name` VARCHAR
(45) NOT NULL,
  `email` VARCHAR
(45) NOT NULL,
  `password` VARCHAR
(45) NOT NULL,
  `image` BLOB NOT NULL,
  `locationId` INT NOT NULL,
  PRIMARY KEY
(`userId`),
  INDEX `locationId_idx`
(`locationId` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meetapp`.`meet`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `meetapp`.`meet` ;

CREATE TABLE
IF NOT EXISTS `meetapp`.`meet`
(
  `meetId` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR
(45) NOT NULL,
  `description` VARCHAR
(45) NOT NULL,
  `locationId` INT NOT NULL,
  `userId` INT NULL,
  PRIMARY KEY
(`meetId`),
  INDEX `locationId_idx`
(`locationId` ASC) VISIBLE,
  INDEX `userId_idx`
(`userId` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meetapp`.`booking`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `meetapp`.`booking` ;

CREATE TABLE
IF NOT EXISTS `meetapp`.`booking`
(
  `bookId` INT NOT NULL,
  `meetId` INT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY
(`bookId`),
  INDEX `userId_idx`
(`userId` ASC) VISIBLE,
  INDEX `meetId_idx`
(`meetId` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE
=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS
=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS
=@OLD_UNIQUE_CHECKS;
