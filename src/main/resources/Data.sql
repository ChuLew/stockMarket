CREATE SCHEMA `MarketDB` ;
CREATE TABLE `MarketDB`.`stream` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NULL,
  `description` VARCHAR(2000) NULL,
  `user_id` VARCHAR(2000) NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `MarketDB`.`stream` 
CHANGE COLUMN `user_id` `user_id` VARCHAR(2000) NOT NULL ;

CREATE TABLE `MarketDB`.`stock` (
  `idstock` INT NOT NULL AUTO_INCREMENT,
  `symbol` VARCHAR(45) NULL,
  `purchaseprice` VARCHAR(45) NULL,
  `datapurchased` DATETIME NULL,
  `quantity` INT NULL,
  `userid` VARCHAR(2000) NULL,
  `currentprice` INT NULL,
  PRIMARY KEY (`idstock`));


CREATE TABLE `MarketDB`.`person` (
  `idperson` INT NOT NULL,
  `holdings` INT NULL,
  PRIMARY KEY (`idperson`));
  
  ALTER TABLE `MarketDB`.`person` 
CHANGE COLUMN `idperson` `idperson` VARCHAR(200) NOT NULL ;

ALTER TABLE `MarketDB`.`stream` 
CHANGE COLUMN `user_id` `user_id` VARCHAR(200) NOT NULL ;

ALTER TABLE `MarketDB`.`stream` 
ADD INDEX `userforiegn_idx` (`user_id` ASC) VISIBLE;
;
ALTER TABLE `MarketDB`.`stream` 
ADD CONSTRAINT `userforiegn`
  FOREIGN KEY (`user_id`)
  REFERENCES `MarketDB`.`person` (`idperson`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;
  
  ALTER TABLE `MarketDB`.`stock` 
CHANGE COLUMN `userid` `userid` VARCHAR(200) NULL DEFAULT NULL ;


ALTER TABLE `MarketDB`.`stock` 
ADD INDEX `userstock_idx` (`userid` ASC) VISIBLE;
;
ALTER TABLE `MarketDB`.`stock` 
ADD CONSTRAINT `userstock`
  FOREIGN KEY (`userid`)
  REFERENCES `MarketDB`.`person` (`idperson`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;

ALTER TABLE `MarketDB`.`stock` 
CHANGE COLUMN `purchaseprice` `purchaseprice` INT NULL DEFAULT NULL ;

ALTER TABLE `MarketDB`.`stock` 
CHANGE COLUMN `purchaseprice` `purchaseprice` DECIMAL(25) NULL DEFAULT NULL ,
CHANGE COLUMN `quantity` `quantity` INT NOT NULL ,
CHANGE COLUMN `currentprice` `currentprice` DECIMAL(25) NULL DEFAULT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`idstock`, `quantity`);
;
ALTER TABLE `MarketDB`.`stock` 
CHANGE COLUMN `purchaseprice` `purchaseprice` DECIMAL(25,2) NULL DEFAULT NULL ,
CHANGE COLUMN `currentprice` `currentprice` DECIMAL(25,2) NULL DEFAULT NULL ;

ALTER TABLE `MarketDB`.`stock` 
CHANGE COLUMN `datapurchased` `datapurchased` VARCHAR(20) NULL DEFAULT NULL ;
ALTER TABLE `MarketDB`.`stock` 
CHANGE COLUMN `quantity` `quantity` INT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`idstock`);
;

ALTER TABLE `MarketDB`.`stock` 
CHANGE COLUMN `datapurchased` `datepurchased` VARCHAR(20) NULL DEFAULT NULL ;

ALTER TABLE `MarketDB`.`person` 
CHANGE COLUMN `holdings` `holdings` DECIMAL(65,2) NULL DEFAULT NULL ;

