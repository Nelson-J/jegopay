-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema jegopay
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema jegopay
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jegopay` ;
USE `jegopay` ;

-- -----------------------------------------------------
-- Table `jegopay`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jegopay`.`users` (
  `id` INT(8) NOT NULL,
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `date_joined` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` DATETIME NULL,
  `fullname` VARCHAR(255) NULL,
  `address` LONGTEXT NULL,
  `idcardno` INT(9) NULL COMMENT 'ID Card number.',
  `contact` VARCHAR(255) NULL COMMENT 'Phone number.',
  `is_superuser` TINYINT NULL DEFAULT 0,
  `is_active` TINYINT NULL DEFAULT 1,
  `is_merchant` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `jegopay`.`payment_methods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jegopay`.`payment_methods` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL COMMENT 'Type of payment method',
  `desc` LONGTEXT NULL COMMENT 'Payment method Description',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jegopay`.`transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jegopay`.`transactions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `amount` INT UNSIGNED NOT NULL,
  `transno` VARCHAR(255) NOT NULL COMMENT 'Transaction number generated on initialising a transaction. e.g. JEG-141234413',
  `desc` VARCHAR(255) NULL COMMENT 'Short description of the transaction process. i.e. why the transaction is being carried out. e.g. mobile money transaction for...',
  `pay_methods_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `pay_methods_id`, `users_id`),
  INDEX `fk_transactions_pay_methods_idx` (`pay_methods_id` ASC) VISIBLE,
  UNIQUE INDEX `transno_UNIQUE` (`transno` ASC) VISIBLE,
  CONSTRAINT `fk_transactions_pay_methods`
    FOREIGN KEY (`pay_methods_id`)
    REFERENCES `jegopay`.`payment_methods` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jegopay`.`funds`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jegopay`.`funds` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `operator` VARCHAR(45) NULL COMMENT 'API(payment method type)',
  `total` INT NULL COMMENT 'total amount from all transactions carried out.',
  `transactions_id` INT UNSIGNED NOT NULL,
  `transactions_pay_methods_id` INT NOT NULL,
  `transactions_users_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `transactions_id`, `transactions_pay_methods_id`, `transactions_users_id`, `users_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_funds_transactions1_idx` (`transactions_id` ASC, `transactions_pay_methods_id` ASC, `transactions_users_id` ASC) VISIBLE,
  INDEX `fk_funds_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_funds_transactions1`
    FOREIGN KEY (`transactions_id` , `transactions_pay_methods_id` , `transactions_users_id`)
    REFERENCES `jegopay`.`transactions` (`id` , `pay_methods_id` , `users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_funds_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `jegopay`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
