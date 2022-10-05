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
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `count` int NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `image_link` varchar(512) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKruoloyh4bf4kdko2ccv18xyyx` (`category_id`),
  CONSTRAINT `FKruoloyh4bf4kdko2ccv18xyyx` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,0,'가성비가 좋아요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F27ca214f-5dd5-4da9-9ab5-debc009cdcfb%2Fwon.png?table=block&id=58280e4b-f1cf-45c0-95ff-1bad72df8740&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','가성비 좋은',2),(2,0,'분위기가 좋아요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe9d10548-fef7-49b8-93c9-09e036b792b0%2Fheart.png?table=block&id=cf1f4e78-1887-4c0f-8d79-d6ea5392efba&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','분위기 좋은',2),(3,0,'감성있는 카페에요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffa130c9d-a33f-4977-a901-064cc13d6d5e%2Flevitation_(1).png?table=block&id=c7846e10-d3c2-4d84-8089-474e7b451670&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','감성카페',2),(4,0,'고급스러워요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F40fb960c-0a2b-4922-aabd-c07f5226bd1c%2FUntitled.png?table=block&id=24c19aa1-2a51-4d45-9242-ffec523bbecd&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','고급스러운',2),(5,0,'카페가 조용해요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F658c6aed-2dff-4efc-a633-63e8e0295bba%2Fsilence.png?table=block&id=1aacd7fb-f9d8-4060-887c-349d78232b6e&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','조용한',2),(6,0,'매장이 청결해요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5c09a3c3-6726-44f6-b5b7-4fc6038772b5%2Fclean.png?table=block&id=3344f726-c024-461c-a749-66041a0fc401&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','깔끔한',2),(7,0,'디저트가 맛있어요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F42e15502-7b78-4e88-a0b2-46101357d3cb%2Fcupcake.png?table=block&id=5747efb0-c2ef-4775-8dc9-68eb16d68c97&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','디저트',2),(8,0,'인테리어가 멋져요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3f82b093-286a-4fb8-a039-172939dcef85%2F837147.png?table=block&id=4003a3f5-b0b4-48b5-8114-a27d49575503&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','인테리어',2),(9,0,'이색적인 분위기에요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe91f60cc-df7a-42c8-9172-de3e988f150e%2Fone-of-a-kind_(1).png?table=block&id=2831b13f-d172-4c7f-9aef-6d83854ab016&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','이색적인',2),(10,0,'뷰가 좋아요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fea5db37a-f803-4ea3-a4c7-af6a22145002%2Fmountain.png?table=block&id=815888bd-c1a9-4919-842b-65162e2b982e&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','뷰가좋은',2),(11,0,'카페가 예뻐요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3642ce78-2dee-435f-b7f0-9fe67af7f1b1%2F4128155.png?table=block&id=31aac6fb-7c2b-4fdf-aef0-03250c3e127d&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','예쁜',2),(12,0,'동네 핫 플레이스에요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F823b426f-dca1-4abc-8034-e49f8954081c%2Ffree-icon-campfire-5246522.png?table=block&id=6d97a055-0071-4f5a-806e-9452d27acd5b&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','동네핫플',2),(13,0,'가성비가 좋아요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F27ca214f-5dd5-4da9-9ab5-debc009cdcfb%2Fwon.png?table=block&id=03178951-3a68-431a-8228-dd20366c5a37&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','가성비좋은',3),(14,0,'안주가 맛있어요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8fc6a36b-6255-4f1f-8ca7-8ae08ab85666%2Fbrewery.png?table=block&id=58132552-af09-4403-8454-087de600674c&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','안주맛집',3),(15,0,'분위기가 좋아요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F84f781dc-2213-4e41-8593-8eb5b1d49e84%2FUntitled.png?table=block&id=92dfff33-c58f-4551-aae0-c47e4a9f0577&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','분위기좋은',3),(16,0,'고급스러워요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F40fb960c-0a2b-4922-aabd-c07f5226bd1c%2FUntitled.png?table=block&id=5e7c49f5-6d75-4a53-abde-0b5eed0e347d&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','고급스러운',3),(17,0,'매장이 청결해요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5c09a3c3-6726-44f6-b5b7-4fc6038772b5%2Fclean.png?table=block&id=0778af54-3a54-447b-ab81-411e154b8e86&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','깔끔한',3),(18,0,'완전 취향 저격이에요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fdd46bcdc-5a91-4e0a-8c84-8046102545d6%2FUntitled.png?table=block&id=40a0e693-d03f-4c57-97c3-506e7eed830a&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','취향저격',3),(19,0,'힙한 술집이에요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd21ac0e6-0eef-4f40-9c3a-023783b13ff6%2FUntitled.png?table=block&id=0b90a0ed-4ecf-4140-9e50-3cb3e92d930a&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','힙한',3),(20,0,'감성있는 매장이에요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F66f154f1-a534-477b-a7c4-804980cfc0e0%2FUntitled.png?table=block&id=da2508b9-d7b2-43c5-8a94-ffba7bcda661&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','감성술집',3),(21,0,'인테리어가 멋져요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3f82b093-286a-4fb8-a039-172939dcef85%2F837147.png?table=block&id=7275bd18-9a77-4de5-a40f-dc1bf0751c00&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','인테리어',3),(22,0,'사진찍기 좋아요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fba4aa8e4-a4ed-462b-816c-22d1ee851997%2Fcamera_(1).png?table=block&id=42e29b6d-78ea-465b-8f34-f874a440ce9b&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','사진찍기좋은',3),(23,0,'이색적인 곳이에요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F60e3d61d-0c1a-4b91-a1c6-2199b32a19ca%2FUntitled.png?table=block&id=0b7fd312-f5d3-4cff-a3aa-6735ae5cb7b3&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','이색적인',3),(24,0,'동네 핫플이에요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F823b426f-dca1-4abc-8034-e49f8954081c%2Ffree-icon-campfire-5246522.png?table=block&id=2423b7df-6039-4a1f-840d-3fbd0306afb0&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','동네핫플',3),(25,0,'가성비가 좋아요','','가성비좋은',1),(26,0,'분위기가 좋아요','','분위기좋은',1),(27,0,'양이 푸짐해요','','푸짐한',1),(28,0,'격식있는 매장이에요','','격식있는',1),(29,0,'고급스러워요','','고급스러운',1),(30,0,'또 먹고 싶어요','','또먹고싶다',1),(31,0,'식당이 조용해요','','조용한',1),(32,0,'매장이 청결해요','','깔끔한',1),(33,0,'식당이 예뻐요','','예쁜',1),(34,0,'동네 핫 플레이스에요','','동네핫플',1),(35,0,'직원이 친절해요','','친절한',1),(36,0,'음식이 너무 맛있어요','','존맛탱',1),(37,0,'데이트할 때 방문하기 좋아요','','데이트',1),(38,0,'가성비가 좋아요','','가성비좋은',4),(39,0,'분위기가 좋아요','','분위기좋은',4),(40,0,'재밌어요','','재밌는',4),(41,0,'깔끔한 곳이에요','','깔끔한',4),(42,0,'직원이 친절해요','','친절한',4),(43,0,'인테리어가 멋져요','','인테리어',4),(44,0,'시간순삭이에요','','시간순삭',4),(45,0,'사진찍기 좋아요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fba4aa8e4-a4ed-462b-816c-22d1ee851997%2Fcamera_(1).png?table=block&id=b584398c-c434-48b6-89fc-9a5466d60ac5&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','사진찍기좋은',2),(46,0,'사진찍기 좋아요','https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fba4aa8e4-a4ed-462b-816c-22d1ee851997%2Fcamera_(1).png?table=block&id=b584398c-c434-48b6-89fc-9a5466d60ac5&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2','사진찍기좋은',2);
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-05 11:13:04
