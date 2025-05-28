-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: petsociety
-- ------------------------------------------------------
-- Server version	9.1.0




/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accessories_details`
--

use petsociety;

DROP TABLE IF EXISTS `accessories_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accessories_details` (
  `product_id` int NOT NULL,
  `brand` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `material` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pet_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `accessories_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_accessory_details_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accessories_details`
--

LOCK TABLES `accessories_details` WRITE;
/*!40000 ALTER TABLE `accessories_details` DISABLE KEYS */;
INSERT INTO `accessories_details` VALUES (74,'PetPro','Stainless Steel','Silver','Medium','Dog'),(75,'NightSafe','Nylon','Black','Large','Dog'),(76,'TravelPet','Fabric','Blue','Small','Cat'),(77,'FurCare','Plastic','Green','One Size','Dog'),(78,'HydroPet','Plastic','Red','350ml','Dog');
/*!40000 ALTER TABLE `accessories_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_item_ID` int NOT NULL AUTO_INCREMENT,
  `cart_ID` int NOT NULL,
  `product_ID` int NOT NULL,
  `product_name` varchar(128) DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(10,2) NOT NULL,
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_item_ID`),
  KEY `product_id` (`product_ID`),
  KEY `fk_cart` (`cart_ID`),
  CONSTRAINT `fk_cart` FOREIGN KEY (`cart_ID`) REFERENCES `carts` (`cart_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_cartitems_set_price` BEFORE INSERT ON `cart_items` FOR EACH ROW BEGIN
    -- Set the unit price from the products table
    SET NEW.price = (
                        SELECT p.price FROM products p WHERE p.product_id = NEW.product_id
                    ) * NEW.quantity;

    -- Set the product name from the products table
    SET NEW.product_name = (
        SELECT p.name FROM products p WHERE p.product_id = NEW.product_id
    );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_update_cart_total_after_insert` AFTER INSERT ON `cart_items` FOR EACH ROW BEGIN
    UPDATE carts
    SET price_total = (
        SELECT SUM(price)
        FROM cart_items
        WHERE cart_id = NEW.cart_id
    )
    WHERE cart_id = NEW.cart_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_update_cart_total_after_update` AFTER UPDATE ON `cart_items` FOR EACH ROW BEGIN
    UPDATE carts
    SET price_total = (
        SELECT SUM(price)
        FROM cart_items
        WHERE cart_id = NEW.cart_id
    )
    WHERE cart_id = NEW.cart_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_update_cart_total_after_delete` AFTER DELETE ON `cart_items` FOR EACH ROW BEGIN
    UPDATE carts
    SET price_total = (
        SELECT IFNULL(SUM(price), 0)
        FROM cart_items
        WHERE cart_id = OLD.cart_id
    )
    WHERE cart_id = OLD.cart_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cart_ID` int NOT NULL AUTO_INCREMENT,
  `user_ID` int NOT NULL,
  `status` enum('open','abandonded','ordered') NOT NULL DEFAULT 'open',
  `price_total` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_ID`),
  UNIQUE KEY `idx_user_active_cart` (`user_ID`,`status`)
) ENGINE=InnoDB AUTO_INCREMENT=324 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (7,61,'open',NULL,'2025-05-25 19:53:28','2025-05-25 19:53:28'),(13,62,'open',NULL,'2025-05-25 20:11:27','2025-05-25 20:11:27'),(318,1,'open',NULL,'2025-05-26 01:26:40','2025-05-26 01:26:40');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_cart_to_order_after_update` AFTER UPDATE ON `carts` FOR EACH ROW BEGIN
    DECLARE new_order_id INT;

    IF NEW.status = 'ordered' THEN
        -- 1. Create a new order record
        INSERT INTO orders (user_id, total_amount, order_date)
        VALUES (NEW.user_id, NEW.price_total, NOW());

        SET new_order_id = LAST_INSERT_ID();

        -- 2. Move cart items to order_details
        INSERT INTO order_details (order_id, product_id, quantity, price)
        SELECT
            new_order_id,
            ci.product_id,
            ci.quantity,
            ci.price
        FROM cart_items ci
        WHERE ci.cart_id = NEW.cart_id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Accessories'),(3,'Food'),(1,'Pets'),(4,'Toys');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_details`
--

DROP TABLE IF EXISTS `food_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_details` (
  `product_id` int NOT NULL,
  `brand` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `ingredients` text COLLATE utf8mb4_unicode_ci,
  `nutritional_info` text COLLATE utf8mb4_unicode_ci,
  `age_group` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pet_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dietary_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `storage_instructions` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `fk_food_details_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_details`
--

LOCK TABLES `food_details` WRITE;
/*!40000 ALTER TABLE `food_details` DISABLE KEYS */;
INSERT INTO `food_details` VALUES (1,'Pawsome Pets',5.50,'Chicken meal, brown rice, oats, chicken fat, fish oil, vitamins A, D, E.','Crude Protein (min) 26%, Crude Fat (min) 15%, Crude Fiber (max) 4%.','Adult','Dog','Standard','2026-03-31','Store in a cool, dry place.'),(2,'Healthy Bites',0.15,'Salmon, fish broth, liver, guar gum, essential vitamins and minerals, taurine.','Crude Protein (min) 10%, Crude Fat (min) 5%, Moisture (max) 78%.','All Stages','Cat','Standard','2025-12-15','Refrigerate after opening.'),(3,'Cheapo Chow',0.50,'Wheat flour, beef meal, corn syrup, glycerin, salt.','Crude Protein (min) 15%, Crude Fat (min) 6%.','Adult','Dog','Standard','2026-06-30','Keep bag sealed for freshness.'),(82,'PetVita',0.10,'Vitamins, Minerals','See label','All','Dog','Supplement','2027-03-01','Store in a cool, dry place');
/*!40000 ALTER TABLE `food_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price_per_unit` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `shipping_address_line1` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_address_line2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_city` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_state` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_postal_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_country` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `notes` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet_details`
--

DROP TABLE IF EXISTS `pet_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet_details` (
  `product_id` int NOT NULL,
  `breed` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `health_status` text COLLATE utf8mb4_unicode_ci,
  `vaccination_status` text COLLATE utf8mb4_unicode_ci,
  `special_needs` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `fk_pet_details_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `pet_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet_details`
--

LOCK TABLES `pet_details` WRITE;
/*!40000 ALTER TABLE `pet_details` DISABLE KEYS */;
INSERT INTO `pet_details` VALUES (52,'Golden Retriever','1.5 years','female','golden','excellent','fully vaccinated','none'),(89,'Siamese','1 year','Female','Cream/Gray','Healthy','Up to date','None'),(90,'Parakeet','6 months','Male','Blue/Green','Healthy','N/A','None'),(91,'Betta','4 months','Male','Red/Blue','Healthy','N/A','Keep in separate tank'),(92,'Dwarf Hamster','8 months','Female','Gray/White','Healthy','N/A','None'),(93,'Golden Retriever','2 years','Male','Golden','Healthy','Up to date','None');
/*!40000 ALTER TABLE `pet_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `subcategory_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int NOT NULL DEFAULT '0',
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image` longblob,
  PRIMARY KEY (`product_id`),
  KEY `subcategory_id` (`subcategory_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`subcategory_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,13,'Pawsome Pets Adult Chicken & Rice Kibble','Premium dry kibble formulated for active adult dogs with real chicken.',32.50,120,'./images/food/KibblePawsome.png',1,'2025-03-31 16:58:34','2025-05-25 18:33:27',NULL),(2,14,'Healthy Bites Salmon Feast Pate (Cat)','Deliciously smooth salmon pate suitable for cats of all life stages.',1.75,90,'./images/food/CatFood.png',1,'2025-03-31 16:58:34','2025-05-25 18:36:44',NULL),(3,15,'Cheapo Chow Beefy Training Bits','Economical crunchy beef-flavored biscuits, perfect for training rewards.',8.99,210,'./images/food/Beef.png',1,'2025-03-31 16:58:34','2025-05-25 18:35:27',NULL),(37,19,'ZoomBall Launcher','Automatic ball launcher for active dogs',34.99,25,'./images/toys/BallThrow.png',1,'2025-04-01 18:03:46','2025-05-25 18:20:53',NULL),(38,18,'Laser Mouse Toy','Auto-mouse with LED light that moves randomly',18.75,40,'./images/toys/Laser.png',1,'2025-04-01 18:03:46','2025-05-25 18:24:58',NULL),(52,1,'Becky','A loyal golden retriever that loves belly rubs.',349.99,1,'./images/pets/Becky.png',1,'2025-04-01 18:38:52','2025-05-25 17:55:16',NULL),(74,9,'Stainless Steel Bowl','Non-slip stainless steel food bowl',7.99,200,'./images/accessories/SteelBowl.png',1,'2025-05-25 16:45:47','2025-05-25 18:06:04',NULL),(75,8,'Reflective Leash','Reflective leash for night walks',12.50,150,'./images/accessories/ReflectiveLeash.png',1,'2025-05-25 16:45:47','2025-05-25 18:14:30',NULL),(76,10,'Soft Carrier','Comfortable carrier for small pets',29.99,80,'./images/accessories/CatCarrier.png',1,'2025-05-25 16:45:47','2025-05-25 18:10:30',NULL),(77,11,'Grooming Brush','Gentle brush for all fur types',8.99,120,'./images/accessories/BroomBrush.png',1,'2025-05-25 16:45:47','2025-05-25 18:12:03',NULL),(78,12,'Travel Water Bottle','Portable water bottle for pets',10.99,100,'./images/accessories/TravelBottle.png',1,'2025-05-25 16:45:47','2025-05-25 18:14:44',NULL),(82,16,'Vitamin Supplements','Daily vitamins for healthy pets',14.99,90,'./images/food/PetVita.png',1,'2025-05-25 16:46:21','2025-05-25 18:34:21',NULL),(84,17,'ChewMax Bone','Durable bone for aggressive chewers',8.99,110,'./images/toys/ChewToy.png',1,'2025-05-25 16:46:34','2025-05-25 18:19:50',NULL),(85,18,'Interactive Puzzle','Puzzle toy for mental stimulation',15.99,60,'./images/toys/DogPuzzle.png',1,'2025-05-25 16:46:34','2025-05-25 18:23:58',NULL),(86,19,'Fetch Ball','Bouncy ball for fetch games',4.99,200,'./images/toys/FetchBall.png',1,'2025-05-25 16:46:34','2025-05-25 18:22:21',NULL),(88,18,'Cat Teaser Wand','Interactive wand for cats',5.99,90,'./images/toys/CatWard.png',1,'2025-05-25 16:46:34','2025-05-25 18:24:32',NULL),(89,2,'Jell','Playful Siamese cat, loves attention.',120.00,3,'./images/pets/Luna.png',1,'2025-05-25 16:48:35','2025-05-26 00:58:14',NULL),(90,4,'Sky','Colorful parakeet, very social.',45.00,10,'./images/pets/Sky.jpg',1,'2025-05-25 16:48:42','2025-05-25 17:35:09',NULL),(91,5,'Bubbles','Beautiful Betta fish, easy to care for.',15.00,20,'./images/pets/Bubbles.png',1,'2025-05-25 16:48:50','2025-05-25 17:59:40',NULL),(92,3,'Nibbles','Adorable dwarf hamster, very active.',25.00,8,'./images/pets/Nibbles.png',1,'2025-05-25 16:48:57','2025-05-25 18:01:33',NULL),(93,1,'Max','Friendly Golden Retriever, great with kids.',350.00,5,'./images/pets/Max.png',1,'2025-05-25 16:50:10','2025-05-25 17:57:23',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `subcategory_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`subcategory_id`),
  UNIQUE KEY `category_id` (`category_id`,`name`),
  CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (7,1,'Amphibians'),(4,1,'Birds'),(2,1,'Cats'),(1,1,'Dogs'),(5,1,'Fish'),(6,1,'Reptiles'),(3,1,'Small Animals'),(9,2,'Bowls'),(10,2,'Carriers'),(11,2,'Grooming Tools'),(8,2,'Leashes'),(12,2,'Travel Accessories'),(13,3,'Dry Food'),(16,3,'Supplements'),(15,3,'Treats'),(14,3,'Wet Food'),(17,4,'Chewing'),(19,4,'Fetch & Retrieve'),(18,4,'Interactive');
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `toys_details`
--

DROP TABLE IF EXISTS `toys_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `toys_details` (
  `product_id` int NOT NULL,
  `brand` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `material` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pet_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age_recommendation` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `durability_rating` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chew_resistance` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `fk_toy_details_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `toys_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `toys_details`
--

LOCK TABLES `toys_details` WRITE;
/*!40000 ALTER TABLE `toys_details` DISABLE KEYS */;
INSERT INTO `toys_details` VALUES (37,'ZoomPlay','plastic & silicone','dog','8+ months','medium','low'),(38,'SmartWhiskers','ABS plastic','cat','6+ months','high','none'),(84,'ChewMax','Rubber','Dog','Adult','High','Extreme'),(85,'BrainyPet','Plastic','Dog','All','Medium','Low'),(86,'FetchPro','Rubber','Dog','All','Medium','Medium'),(88,'KittyFun','Feather & Plastic','Cat','All','Low','None');
/*!40000 ALTER TABLE `toys_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'deenko@gmail.com','$2y$10$yrCc7mGJakyEwNnJygvmJOQfF9ewcM7NhwvrK/QUAv//EVqC3r35G','Denis','Mahmutovic','0603512257','',NULL,NULL,'71210',NULL,1,'2025-05-24 16:03:15','2025-05-25 07:56:08'),(61,'deenko2@gmail.com','$2y$10$kqdjEo.zKXcatALv46uplul.kjboWYaHcSvrZEmUkvWpjOufUMyy.','Denis','Mahmutovic','0603512257','Zeljeznicka 22','71210','Sarajevo','71210','Bosnia & Herzegovina',0,'2025-05-25 19:45:53','2025-05-25 19:45:53'),(62,'deenko3@gmail.com','$2y$10$T6WKGquNusVHu/BxQtKgX.MWE2TA.cKDwCAxjDOyNVostSmMP25c2','Denis','Mahmutovic','0603512257','Zeljeznicka 22','71210','Sarajevo','71210','Bosnia & Herzegovina',0,'2025-05-25 19:55:18','2025-05-25 19:55:18');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-26  4:08:01
