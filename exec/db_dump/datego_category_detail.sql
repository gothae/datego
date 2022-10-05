-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: j7a104.p.ssafy.io    Database: datego
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category_detail`
--

DROP TABLE IF EXISTS `category_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_link` varchar(512) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1sd8561vgsmqkv7jq7sgbl21a` (`category_id`),
  CONSTRAINT `FK1sd8561vgsmqkv7jq7sgbl21a` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_detail`
--

LOCK TABLES `category_detail` WRITE;
/*!40000 ALTER TABLE `category_detail` DISABLE KEYS */;
INSERT INTO `category_detail` VALUES (1,'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F28fd41b0-20a9-48ce-a8b2-ec61b1836be3%2FUntitled.png?table=block&id=ca8d7ee9-aa22-4319-8618-fdcc7601ad65&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','한식',1),(2,'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8176fa3c-2294-46da-ace4-91a44e61881b%2FUntitled.png?table=block&id=55de2f54-cc4f-41be-9edb-6e3fde0b9a8c&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','일식',1),(3,'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2a18fb8f-401b-4b55-b758-b6c983292916%2Framen.png?table=block&id=d6c3f58d-13a6-4391-8a4a-3078521f0662&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','중식',1),(4,'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F35b00dfc-3ca5-45fb-ae1c-9ef95e1114a3%2Fpizza.png?table=block&id=b4e14a03-598f-497d-a52a-17851376b90e&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','양식',1),(5,'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2dac789f-3dc8-44f7-9695-2c06abc7722e%2FUntitled.png?table=block&id=b8d5a4cd-4712-438a-a0f8-9c4142575e5d&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','고기',1),(6,'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F632a676b-f1c3-4386-b9aa-09ef5c5dadf3%2Fnoodles.png?table=block&id=da0b8697-69a5-4bb3-af09-fcd8a4cf47ff&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','면',1),(7,'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F83fff454-bf1c-4976-9f5f-eda807ba873c%2Ffried-rice.png?table=block&id=bd25712d-68f4-4dea-862a-ff87a161f41e&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','아시안',1),(8,'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fddf98b89-aa51-44eb-9356-b92c8cc5a746%2Fmall.png?table=block&id=79552fa2-b108-4621-8106-a66ffa79471f&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','쇼핑몰/영화관',4),(9,'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc9d977c0-8800-4e67-9717-2133f57dad9a%2FUntitled.png?table=block&id=233a9777-d388-497d-a8a4-0b79a607c60e&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','실내스포츠',4),(10,'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F82524ea8-4356-43b6-85d5-b9499c462892%2FUntitled.png?table=block&id=64f1150e-91cc-46d6-963f-6f20557b2357&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','게임',4),(11,'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8104c490-aef9-4760-bb7e-4fc222249d61%2F2397304.png?table=block&id=d8c89e96-b201-48e8-a38a-34da30b42c3a&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','노래방',4),(12,'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F108d1a40-6cdb-4cdb-bcfb-fc9da45e1c6a%2F1719853.png?table=block&id=1d3e8487-662b-4e63-8e7f-0c24d2218aef&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','산책',4),(13,'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F108d1a40-6cdb-4cdb-bcfb-fc9da45e1c6a%2F1719853.png?table=block&id=1d3e8487-662b-4e63-8e7f-0c24d2218aef&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','산책',4);
/*!40000 ALTER TABLE `category_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-05 11:13:00
