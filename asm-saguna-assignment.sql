CREATE TABLE `associates` (
  `associateId` varchar(255) NOT NULL,
  `associateName` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`associateId`),
  UNIQUE KEY `unique_associates` (`associateId`,`associateName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `associate_spec` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `associateId` varchar(255) NOT NULL,
  `specializationId` int NOT NULL,
  PRIMARY KEY (`pid`),
  KEY `specializationId` (`specializationId`),
  CONSTRAINT `associate_spec_ibfk_1` FOREIGN KEY (`specializationId`) REFERENCES `specialization` (`specializationId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `specialization` (
  `specializationId` int NOT NULL AUTO_INCREMENT,
  `specilizationName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`specializationId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
