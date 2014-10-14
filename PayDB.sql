drop table `PayDB`.`PaymentDetail`;
drop table `PayDB`.`UserInfo`;
drop table `PayDB`.`LoginInfo`;
CREATE TABLE IF NOT EXISTS `PayDB`.`LoginInfo` (
  `UserName` VARCHAR(30) NOT NULL,
  `Password` VARCHAR(120) NOT NULL,
  `CreateTime` DATETIME NOT NULL,
  PRIMARY KEY (`UserName`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `PayDB`.`PaymentDetail` (
  `UserName` VARCHAR(30) NOT NULL,
  `PayDate` DATETIME NOT NULL,
  `PayMoney` DECIMAL NOT NULL,
  `PayType` INT NOT NULL,
  `CreateTime` DATETIME NOT NULL,
  foreign key(`UserName`) references `PayDB`.`LoginInfo`(`UserName`) on delete cascade on update cascade)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `PayDB`.`UserInfo` (
  `UserName` VARCHAR(30) NOT NULL,
  `Company` VARCHAR(160) NULL,
  `CityName` VARCHAR(20) NULL,
  `Address` VARCHAR(200) NULL,
  `Telphone` VARCHAR(20) NULL,
  `Price` DECIMAL NULL DEFAULT 0.0,
  `CreateTime` DATETIME NOT NULL,
  foreign key(`UserName`) references `PayDB`.`LoginInfo`(`UserName`) on delete cascade on update cascade)
ENGINE = InnoDB;