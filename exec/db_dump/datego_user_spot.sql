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
-- Table structure for table `user_spot`
--

DROP TABLE IF EXISTS `user_spot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_spot` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `rate` int DEFAULT NULL,
  `spot_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8d5k2uj0qls2a48l8ypi4353q` (`spot_id`),
  KEY `FK51fut2q4wdrvm1chc8ewpxy1y` (`user_id`),
  CONSTRAINT `FK51fut2q4wdrvm1chc8ewpxy1y` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK8d5k2uj0qls2a48l8ypi4353q` FOREIGN KEY (`spot_id`) REFERENCES `spot` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=256 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_spot`
--

LOCK TABLES `user_spot` WRITE;
/*!40000 ALTER TABLE `user_spot` DISABLE KEYS */;
INSERT INTO `user_spot` VALUES (145,'2022-09-28 01:26:51.000000',5,234,42),(146,'2022-09-28 01:26:51.000000',5,1201,45),(147,'2022-09-28 01:56:01.000000',5,272,42),(148,'2022-09-28 01:56:03.000000',5,134,42),(149,'2022-09-28 01:56:03.000000',5,325,45),(150,'2022-10-01 13:44:08.000000',5,13,45),(151,'2022-10-01 13:49:11.000000',5,271,45),(152,'2022-10-01 13:49:12.000000',5,271,45),(153,'2022-10-01 13:49:13.000000',5,271,45),(154,NULL,0,3,45),(155,'2022-10-04 14:41:14.771230',0,3,45),(156,'2022-10-04 06:19:19.870233',0,1971,45),(157,'2022-10-04 06:24:23.134531',0,311,45),(158,'2022-10-04 06:24:54.532233',0,313,45),(159,'2022-10-04 06:24:54.646536',0,313,45),(160,'2022-10-04 06:44:57.673982',0,1125,45),(161,'2022-10-04 06:47:56.113387',0,1125,45),(162,'2022-10-04 06:49:37.376597',0,1125,45),(163,'2022-10-04 06:54:05.968758',0,1125,45),(164,'2022-10-04 06:55:59.834005',0,311,45),(165,'2022-10-04 06:56:23.441747',0,1125,45),(166,'2022-10-04 07:04:18.249924',0,1125,45),(167,'2022-10-04 07:09:02.435439',0,1122,45),(168,'2022-10-04 07:12:47.629490',0,1122,45),(169,'2022-10-04 07:15:32.704743',0,1122,45),(170,'2022-10-04 07:23:01.963000',0,1122,45),(171,'2022-10-04 07:23:46.730599',0,1000,45),(172,'2022-10-04 08:09:52.580478',0,1201,45),(173,'2022-10-04 08:09:52.711978',0,1201,45),(174,'2022-10-04 08:16:41.128486',0,325,45),(175,'2022-10-04 08:22:52.186613',0,1201,45),(176,'2022-10-04 08:29:09.125304',0,1000,45),(177,'2022-10-04 08:29:09.892226',0,1000,45),(178,'2022-10-04 08:30:54.420171',0,1000,45),(179,'2022-10-04 08:30:54.746841',0,1000,45),(180,'2022-10-04 08:31:58.925762',0,1000,45),(181,'2022-10-04 08:37:22.752241',0,1000,45),(182,'2022-10-04 08:57:53.023834',0,1122,45),(183,'2022-10-04 08:58:03.242589',0,325,45),(184,'2022-10-04 08:58:11.779571',0,1967,45),(185,'2022-10-04 08:58:11.913503',0,1967,45),(186,'2022-10-04 08:58:12.044626',0,1967,45),(187,'2022-10-04 08:58:12.189402',0,1967,45),(188,'2022-10-04 09:05:01.606297',0,1122,45),(189,'2022-10-04 09:07:18.756206',0,1122,45),(190,'2022-10-04 10:07:37.804136',0,1122,45),(191,'2022-10-04 11:55:09.316989',0,1000,45),(192,'2022-10-04 11:55:09.807429',0,1000,45),(193,'2022-10-04 11:55:10.538889',0,1000,45),(194,'2022-10-04 11:55:11.296106',0,1000,45),(195,'2022-10-04 13:13:26.287262',0,1201,45),(196,'2022-10-04 13:13:26.445080',0,1201,45),(197,'2022-10-04 13:17:43.239508',0,1324,42),(198,'2022-10-04 13:17:43.331088',0,1324,42),(199,'2022-10-04 13:17:43.513461',0,1324,42),(200,'2022-10-04 13:23:05.895008',0,271,45),(201,'2022-10-04 13:23:06.234604',0,271,45),(202,'2022-10-04 13:23:51.138548',0,1000,45),(203,'2022-10-04 13:23:51.686481',0,1000,45),(204,'2022-10-04 13:23:51.844743',0,1000,45),(205,'2022-10-04 13:23:52.515776',0,1000,45),(206,'2022-10-04 13:25:57.480885',0,1000,45),(207,'2022-10-04 13:27:17.539923',0,271,45),(209,'2022-10-04 14:14:41.861833',0,1079,45),(210,'2022-10-04 14:14:42.087895',0,1079,45),(211,'2022-10-04 14:14:42.360015',0,1079,45),(212,'2022-10-04 14:14:42.602098',0,1079,45),(213,'2022-10-04 14:14:57.671793',0,271,45),(214,'2022-10-04 14:14:57.850532',0,271,45),(215,'2022-10-04 14:14:58.047411',0,271,45),(216,'2022-10-04 14:15:00.220741',0,271,45),(217,'2022-10-04 14:16:24.052171',0,1073,45),(218,'2022-10-04 14:16:24.256934',0,1073,45),(219,'2022-10-04 14:16:24.542075',0,1073,45),(220,'2022-10-04 14:19:07.009598',0,1073,45),(221,'2022-10-04 14:19:07.181334',0,1073,45),(222,'2022-10-04 14:21:14.378362',0,271,45),(223,'2022-10-04 14:21:14.531694',0,271,45),(224,'2022-10-04 14:21:18.028362',0,271,45),(225,'2022-10-04 14:27:03.748375',0,1079,45),(226,'2022-10-04 14:27:03.984888',0,1079,45),(227,'2022-10-04 14:27:04.055134',0,1079,45),(228,'2022-10-04 14:27:04.273589',0,1079,45),(229,'2022-10-04 14:28:26.261902',0,1079,45),(230,'2022-10-04 14:28:26.439650',0,1079,45),(231,'2022-10-04 14:28:26.658170',0,1079,45),(232,'2022-10-04 14:51:53.079417',0,1004,45),(233,'2022-10-04 14:54:39.072381',0,928,45),(234,'2022-10-04 14:54:39.438181',0,928,45),(235,'2022-10-04 14:55:43.801472',0,928,45),(236,'2022-10-04 14:55:44.139646',0,928,45),(237,'2022-10-04 14:56:29.523933',0,928,45),(238,'2022-10-04 14:56:29.975597',0,928,45),(239,'2022-10-04 14:56:30.040717',0,928,45),(240,'2022-10-04 23:43:50.905738',0,1000,45),(241,'2022-10-05 00:15:35.744927',0,271,45),(242,'2022-10-05 00:22:58.480606',0,271,45),(243,'2022-10-05 00:22:58.812264',0,271,45),(244,'2022-10-05 00:22:58.928323',0,271,45),(245,'2022-10-05 00:29:22.113092',0,1324,42),(246,'2022-10-05 00:29:22.338360',0,1324,42),(247,'2022-10-05 00:31:06.582462',0,1576,45),(248,'2022-10-05 00:34:08.940152',0,1576,45),(249,'2022-10-05 00:34:09.101060',0,1576,45),(250,'2022-10-05 00:34:09.259219',0,1576,45),(251,'2022-10-05 00:35:02.229867',0,235,45),(252,'2022-10-05 00:48:25.455710',0,1125,45),(253,'2022-10-05 00:49:07.819025',0,1967,45),(254,'2022-10-05 01:06:02.024605',0,1967,45),(255,'2022-10-05 01:30:56.601649',0,1492,45);
/*!40000 ALTER TABLE `user_spot` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-05 11:13:01
