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
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `photo_link` varchar(255) DEFAULT NULL,
  `user_spot_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmsr3ypo2dy5lstsd8l8yckslf` (`user_spot_id`),
  CONSTRAINT `FKmsr3ypo2dy5lstsd8l8yckslf` FOREIGN KEY (`user_spot_id`) REFERENCES `user_spot` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (1,'https://www.qplace.kr/content/images/2022/01/SE-a860a672-e07d-4baa-938e-1e533d094c64.jpg',146),(2,'https://www.sagabai.com/taxfree/site_files/image/restaurant/restaurant_01.jpg',149),(6,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/1100a9df-e7cb-4b0b-9226-6deb726268e3rn_image_picker_lib_temp_78b601a0-9c9c-409a-b2b3-fc36c6f53746.jpg',167),(7,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/4d977eea-8d89-434b-938f-18890594b42drn_image_picker_lib_temp_02112cf6-856a-45a0-9f53-15451f971b14.jpg',168),(8,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/67091ee7-b974-4fe8-837a-d53a997f34fdrn_image_picker_lib_temp_e63ab069-b992-47a7-8f88-f4dcda87f27e.jpg',169),(9,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/0b4e8413-b4ad-4440-8e23-bbea7f5fb70arn_image_picker_lib_temp_f78f3484-ca8c-48ec-a2c0-93a135297cb9.jpg',170),(10,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/ba264090-41db-44c1-b9cb-40e4a8cc6339rn_image_picker_lib_temp_f5682dd8-08f7-4947-8aea-8ddce47bf9ce.jpg',173),(11,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/c1577c14-6076-4132-9e29-b1c3ecfa718ern_image_picker_lib_temp_b99f65c8-db84-432b-9dc8-33dfe46e84f9.jpg',174),(12,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/58123669-999e-4a85-aec7-b32166ad2d0drn_image_picker_lib_temp_ad4cd01b-3fcd-4bb7-9253-f7ab2dbc8c72.jpg',175),(13,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/df82bd93-b680-4b48-b172-116d75e1e518rn_image_picker_lib_temp_1a4e123e-aeec-402b-ab07-efe70f3938e3.jpg',196),(14,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/3aada95d-3b47-4ca3-aa0e-3e855f76d3b5rn_image_picker_lib_temp_b26aec5d-ad97-4614-9054-cf31b8f8b340.jpg',199),(15,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/c6783e09-b207-44d9-9078-2c8dd83d6429rn_image_picker_lib_temp_32cbdc27-45c9-4a84-9dd1-bf6ee3c255ec.jpg',207),(16,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/c07d77f2-a00e-4a98-818d-6de9fa94de9brn_image_picker_lib_temp_f445dbb4-a22a-4d07-961c-790630d042a5.jpg',216),(17,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/c8523305-c409-4b40-8677-90a7b2e18147rn_image_picker_lib_temp_f4e9730a-3672-4084-8d9f-ff28ef90c680.jpg',219),(18,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/35d7373a-bff6-4db2-972b-3255eab7bda4rn_image_picker_lib_temp_a5177017-1c04-4bd6-b676-cb81c3d8cd0b.jpg',221),(19,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/f0b49a51-b886-4752-a59e-e0c64ef13336rn_image_picker_lib_temp_e9c7d78e-4d98-4829-ba02-c317bee5c63c.jpg',224),(20,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/f2e8e481-277e-49a5-a199-0bdef62f83fcrn_image_picker_lib_temp_9d4573f4-8419-47dc-a3cd-1e4855f04d5b.jpg',231),(21,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/c3694169-24af-4ce2-98e7-1120ad64c0c2rn_image_picker_lib_temp_04938b37-4ec8-4ed3-bed9-9c1b83e32da4.jpg',234),(22,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/4223ccd9-6f99-46b1-b682-e7597cc8dd57rn_image_picker_lib_temp_f47a4fe6-79de-4ad3-b433-45920ab395c2.jpg',246),(23,'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/9bc37e21-db7e-4742-be43-1592d3dc2865rn_image_picker_lib_temp_5ecfa108-d1fa-468c-acf7-28ac248483a5.jpg',254);
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
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
