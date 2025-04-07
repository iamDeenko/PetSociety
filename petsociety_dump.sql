/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: PetSociety
-- ------------------------------------------------------
-- Server version	11.7.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `accessories_details`
--

DROP TABLE IF EXISTS `accessories_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `accessories_details` (
  `product_id` int(11) NOT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `material` varchar(100) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `pet_type` varchar(50) DEFAULT NULL,
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
/*!40000 ALTER TABLE `accessories_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `added_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cart_item_id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES
(2,'Accessories'),
(3,'Food'),
(1,'Pets'),
(4,'Toys');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_details`
--

DROP TABLE IF EXISTS `food_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_details` (
  `product_id` int(11) NOT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `ingredients` text DEFAULT NULL,
  `nutritional_info` text DEFAULT NULL,
  `age_group` varchar(50) DEFAULT NULL,
  `pet_type` varchar(50) DEFAULT NULL,
  `dietary_type` varchar(50) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `storage_instructions` text DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `fk_food_details_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_details`
--

LOCK TABLES `food_details` WRITE;
/*!40000 ALTER TABLE `food_details` DISABLE KEYS */;
INSERT INTO `food_details` VALUES
(1,'Pawsome Pets',5.50,'Chicken meal, brown rice, oats, chicken fat, fish oil, vitamins A, D, E.','Crude Protein (min) 26%, Crude Fat (min) 15%, Crude Fiber (max) 4%.','Adult','Dog','Standard','2026-03-31','Store in a cool, dry place.'),
(2,'Healthy Bites',0.15,'Salmon, fish broth, liver, guar gum, essential vitamins and minerals, taurine.','Crude Protein (min) 10%, Crude Fat (min) 5%, Moisture (max) 78%.','All Stages','Cat','Standard','2025-12-15','Refrigerate after opening.'),
(3,'Cheapo Chow',0.50,'Wheat flour, beef meal, corn syrup, glycerin, salt.','Crude Protein (min) 15%, Crude Fat (min) 6%.','Adult','Dog','Standard','2026-06-30','Keep bag sealed for freshness.'),
(4,'Healthy Bites',3.00,'Deboned chicken, potatoes, peas, flaxseed, glucosamine, chondroitin.','Crude Protein (min) 30%, Crude Fat (min) 12%.','Senior','Cat','Grain-Free','2026-01-31','Store airtight in original bag.'),
(5,'Pawsome Pets',0.37,'Lamb, lamb broth, carrots, peas, potato starch, fish oil (DHA).','Crude Protein (min) 9%, Crude Fat (min) 6%.','Puppy','Dog','Standard','2025-11-30','Refrigerate unused portion.'),
(6,'Cheapo Chow',15.00,'Corn, meat and bone meal, soybean meal, animal fat, salt, added colors.','Crude Protein (min) 18%, Crude Fat (min) 8%.','Adult','Dog','Standard','2026-08-01','Store in a cool, dry area.'),
(7,'Pawsome Pets',0.10,'Chicken meal, glycerin, tuna flavor, catnip, brewers yeast.','Crude Protein (min) 25%.','Adult','Cat','Standard','2026-05-10','Keep container sealed.'),
(8,'Healthy Bites',4.00,'Chicken, powdered cellulose, corn gluten meal, L-carnitine, vitamins.','Crude Protein (min) 35%, Crude Fat (min) 9%, Crude Fiber (max) 8%.','Adult','Cat','Weight Control','2026-02-28','Store in original bag, tightly sealed.'),
(9,'Cheapo Chow',1.80,'Water sufficient for processing, meat by-products, beef, wheat gluten, artificial flavors.','Crude Protein (min) 8%.','Adult','Dog','Standard','2025-10-31','Refrigerate after opening. Contains 12 cans.'),
(10,'Pawsome Pets',8.00,'Deboned Lamb, lamb meal, sweet potatoes, peas, lentils, canola oil.','Crude Protein (min) 22%, Crude Fat (min) 12%.','Adult','Dog','Limited Ingredient','2026-04-15','Store in a cool, dry place.'),
(11,'Healthy Bites',0.05,'Salmon.','Crude Protein (min) 50%.','All Stages','Cat','Grain-Free','2026-07-20','Keep container sealed.'),
(12,'Pawsome Pets',0.10,'Chicken, chicken liver, fish oil (DHA), dried egg product, taurine.','Crude Protein (min) 11%.','Kitten','Cat','Standard','2025-09-30','Refrigerate unused portion.'),
(13,'Cheapo Chow',10.00,'Poultry by-product meal, ground yellow corn, brewers rice, animal fat preserved with mixed-tocopherols.','Crude Protein (min) 30%.','All Stages','Cat','Standard','2026-10-01','Store sealed.'),
(14,'Healthy Bites',2.50,'Deboned chicken, oatmeal, barley, carrots, spinach, vitamins.','Crude Protein (min) 27%.','Adult','Dog','Standard','2026-03-15','Keep bag closed.'),
(15,'Pawsome Pets',0.37,'Turkey, turkey broth, potato starch, green beans, fish oil, senior vitamin blend.','Crude Protein (min) 7%.','Senior','Dog','Standard','2025-12-01','Refrigerate after opening.'),
(16,'Healthy Bites',0.15,'Duck, vegetable glycerin, salt.','Crude Protein (min) 40%.','Adult','Dog','Grain-Free','2026-06-05','Store in a cool, dry place.'),
(17,'Pawsome Pets',3.50,'Chicken meal, brewers rice, pea fiber, dried beet pulp, natural flavors.','Crude Protein (min) 32%. Helps control hairballs.','Adult','Cat','Standard','2026-04-20','Keep bag sealed.'),
(18,'Healthy Bites',0.15,'Turkey, turkey broth, rice, prebiotic fiber, essential nutrients.','Crude Protein (min) 9%. Easily digestible.','Adult','Cat','Limited Ingredient','2025-11-15','Refrigerate unused portion.'),
(19,'Cheapo Chow',20.00,'Ground corn, poultry by-product meal, soybean hulls, animal fat.','Crude Protein (min) 16%.','Adult','Dog','Standard','2026-09-10','Store in cool, dry place.'),
(20,'Pawsome Pets',0.08,'Chicken meal, rice flour, catnip, vegetable oil, minerals.','Crude Protein (min) 28%. Less than 2 calories per treat.','Adult','Cat','Standard','2026-08-25','Keep container closed.'),
(21,'Healthy Bites',8.00,'Deboned lamb, oatmeal, barley, fish meal (source of DHA), calcium.','Crude Protein (min) 26%. Controlled calcium for bone growth.','Puppy','Dog','Standard','2026-02-10','Store sealed.'),
(22,'Pawsome Pets',0.10,'Chicken, chicken broth, duck, tapioca starch, sunflower seed oil.','Crude Protein (min) 12%. Grain-free.','Adult','Cat','Grain-Free','2025-10-05','Refrigerate after opening.');
/*!40000 ALTER TABLE `food_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
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
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `order_date` timestamp NULL DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `shipping_address_line1` varchar(100) NOT NULL,
  `shipping_address_line2` varchar(100) DEFAULT NULL,
  `shipping_city` varchar(50) NOT NULL,
  `shipping_state` varchar(50) NOT NULL,
  `shipping_postal_code` varchar(20) NOT NULL,
  `shipping_country` varchar(50) NOT NULL,
  `shipping_method` varchar(50) DEFAULT NULL,
  `tracking_number` varchar(100) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_status` varchar(20) DEFAULT 'pending',
  `notes` text DEFAULT NULL,
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
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet_details` (
  `product_id` int(11) NOT NULL,
  `breed` varchar(100) DEFAULT NULL,
  `age` varchar(50) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `health_status` text DEFAULT NULL,
  `vaccination_status` text DEFAULT NULL,
  `special_needs` text DEFAULT NULL,
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
INSERT INTO `pet_details` VALUES
(52,'Golden Retriever','1.5 years','female','golden','excellent','fully vaccinated','none'),
(61,'TestBreed','1 year','female','white','healthy','vaccinated','none'),
(67,'TestBreed','1 year','female','white','healthy','vaccinated','none'),
(68,'TestBreed','1 year','female','white','healthy','vaccinated','none'),
(69,'TestBreed','1 year','female','white','healthy','vaccinated','none'),
(70,'TestBreed','1 year','female','white','healthy','vaccinated','none'),
(71,'TestBreed','1 year','female','white','healthy','vaccinated','none');
/*!40000 ALTER TABLE `pet_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `subcategory_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) NOT NULL DEFAULT 0,
  `image_url` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`product_id`),
  KEY `subcategory_id` (`subcategory_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`subcategory_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
(1,13,'Pawsome Pets Adult Chicken & Rice Kibble','Premium dry kibble formulated for active adult dogs with real chicken.',32.50,120,'/Frontend/assets/images/food_1.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(2,14,'Healthy Bites Salmon Feast Pate (Cat)','Deliciously smooth salmon pate suitable for cats of all life stages.',1.75,90,'/Frontend/assets/images/food_2.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(3,15,'Cheapo Chow Beefy Training Bits','Economical crunchy beef-flavored biscuits, perfect for training rewards.',8.99,210,'/Frontend/assets/images/food_3.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(4,13,'Healthy Bites Senior Cat Grain-Free Chicken','Grain-free formula with chicken, tailored for senior cat needs.',38.00,65,'/Frontend/assets/images/food_4.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(5,14,'Pawsome Pets Puppy Lamb & Veggie Stew','Hearty and nutritious lamb and vegetable stew specifically for puppies.',2.25,150,'/Frontend/assets/images/food_5.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(6,13,'Cheapo Chow Adult Dog Complete Kibble','Basic complete and balanced dry food for adult dogs, budget size.',21.50,190,'/Frontend/assets/images/food_6.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(7,15,'Pawsome Pets Tuna Soft Cat Treats','Irresistibly soft cat treats with real tuna flavor.',5.25,135,'/Frontend/assets/images/food_7.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(8,13,'Healthy Bites Cat Weight Control Formula','Dry food designed to help adult cats maintain a healthy weight.',36.99,70,'/Frontend/assets/images/food_8.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(9,14,'Cheapo Chow Beef Chunks Value Pack (Dog)','Economical pack of beef chunks in gravy for adult dogs.',15.99,80,'/Frontend/assets/images/food_9.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(10,13,'Pawsome Pets LID Lamb & Sweet Potato Kibble','Limited ingredient diet featuring lamb for dogs with sensitivities.',55.00,50,'/Frontend/assets/images/food_10.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(11,15,'Healthy Bites Freeze-Dried Salmon Snaps (Cat)','Pure freeze-dried salmon pieces, a high-value cat treat.',11.50,100,'/Frontend/assets/images/food_11.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(12,14,'Pawsome Pets Kitten Chicken First Pate','Ultra-soft chicken pate formulated for weaning kittens.',1.95,160,'/Frontend/assets/images/food_12.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(13,13,'Cheapo Chow Cat Complete Care Kibble','Provides essential nutrients for cats of all ages, value formula.',18.99,240,'/Frontend/assets/images/food_13.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(14,13,'Healthy Bites Small Breed Chicken & Oats','Nutritious kibble with smaller size for small breed adult dogs.',28.00,95,'/Frontend/assets/images/food_14.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(15,14,'Pawsome Pets Senior Dog Turkey Delight Stew','Tender turkey stew with gravy, easy to eat for senior dogs.',2.50,130,'/Frontend/assets/images/food_15.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(16,15,'Healthy Bites Grain-Free Duck Jerky','High-protein duck jerky treats, grain-free for sensitive dogs.',9.25,115,'/Frontend/assets/images/food_16.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(17,13,'Pawsome Pets Indoor Cat Hairball Control','Helps manage hairballs with natural fiber for indoor adult cats.',33.50,75,'/Frontend/assets/images/food_17.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(18,14,'Healthy Bites Sensitive Stomach Turkey Pate (Cat)','Gentle turkey pate formula for cats with sensitive digestive systems.',1.90,125,'/Frontend/assets/images/food_18.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(19,13,'Cheapo Chow Mega Mix Dog Kibble','Extra large bag of mixed flavor kibble for adult dogs.',35.99,100,'/Frontend/assets/images/food_19.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(20,15,'Pawsome Pets Crunchy Catnip Blasts','Crunchy treats bursting with catnip flavor cats love.',3.99,250,'/Frontend/assets/images/food_20.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(21,13,'Healthy Bites Large Breed Puppy Lamb Kibble','Formulated with lamb for healthy growth in large breed puppies.',48.50,60,'/Frontend/assets/images/food_21.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(22,14,'Pawsome Pets Shredded Chicken & Duck Entree (Cat)','Tender shreds of real chicken and duck in a savory broth.',1.80,110,'/Frontend/assets/images/food_22.jpg',1,'2025-03-31 16:58:34','2025-03-31 16:58:34'),
(34,9,'Ultra Tug Ball','Durable ball toy with rope handles',13.50,120,'images/ultra_tug.jpg',1,'2025-04-01 17:36:31','2025-04-01 17:36:31'),
(35,17,'BiteMax Chew Ring','Durable chew ring designed for heavy chewers',9.99,120,'images/toys/chew_ring.jpg',1,'2025-04-01 18:03:46','2025-04-01 18:03:46'),
(36,18,'WhiskerChase Feather Wand','Interactive wand toy with feathers for cats',5.49,80,'images/toys/feather_wand.jpg',1,'2025-04-01 18:03:46','2025-04-01 18:03:46'),
(37,19,'ZoomBall Launcher','Automatic ball launcher for active dogs',34.99,25,'images/toys/zoom_launcher.jpg',1,'2025-04-01 18:03:46','2025-04-01 18:03:46'),
(38,18,'Laser Mouse Toy','Auto-mouse with LED light that moves randomly',18.75,40,'images/toys/laser_mouse.jpg',1,'2025-04-01 18:03:46','2025-04-01 18:03:46'),
(39,19,'Squeaky Tennis Ball Set','Pack of 3 squeaky tennis balls for fetch games',12.99,100,'images/toys/squeaky_balls.jpg',1,'2025-04-01 18:03:46','2025-04-01 18:03:46'),
(52,1,'Becky','A loyal golden retriever that loves belly rubs.',349.99,1,'images/pets/becky.jpg',1,'2025-04-01 18:38:52','2025-04-01 18:38:52'),
(61,1,'Mega Test Doggo 2.0','A happy test dog',99999.00,1,'images/test/doggo.jpg',1,'2025-04-02 09:22:13','2025-04-02 10:30:06'),
(67,1,'Mega Test Doggo 2.0','A happy test dog',99999.00,1,'images/test/doggo.jpg',1,'2025-04-02 10:31:19','2025-04-02 10:32:38'),
(68,1,'Mega Test Doggo 2.0','A happy test dog',99999.00,1,'images/test/doggo.jpg',1,'2025-04-02 10:31:52','2025-04-02 10:33:00'),
(69,1,'Test Doggo','A happy test dog',199.99,1,'images/test/doggo.jpg',1,'2025-04-02 10:32:38','2025-04-02 10:32:38'),
(70,1,'Test Doggo','A happy test dog',199.99,1,'images/test/doggo.jpg',1,'2025-04-02 10:33:00','2025-04-02 10:33:00'),
(71,1,'Test Doggo','A happy test dog',199.99,1,'images/test/doggo.jpg',1,'2025-04-02 10:35:01','2025-04-02 10:35:01');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `subcategory_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
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
INSERT INTO `subcategories` VALUES
(7,1,'Amphibians'),
(4,1,'Birds'),
(2,1,'Cats'),
(1,1,'Dogs'),
(5,1,'Fish'),
(6,1,'Reptiles'),
(3,1,'Small Animals'),
(9,2,'Bowls'),
(10,2,'Carriers'),
(11,2,'Grooming Tools'),
(8,2,'Leashes'),
(12,2,'Travel Accessories'),
(13,3,'Dry Food'),
(16,3,'Supplements'),
(15,3,'Treats'),
(14,3,'Wet Food'),
(17,4,'Chewing'),
(19,4,'Fetch & Retrieve'),
(18,4,'Interactive');
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `toys_details`
--

DROP TABLE IF EXISTS `toys_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `toys_details` (
  `product_id` int(11) NOT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `material` varchar(100) DEFAULT NULL,
  `pet_type` varchar(50) DEFAULT NULL,
  `age_recommendation` varchar(50) DEFAULT NULL,
  `durability_rating` varchar(50) DEFAULT NULL,
  `chew_resistance` varchar(50) DEFAULT NULL,
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
INSERT INTO `toys_details` VALUES
(34,'ChewMaster','Rubber & Rope','dog','6+ months','high','extreme'),
(35,'BiteMax','natural rubber','dog','6+ months','very high','extreme'),
(36,'WhiskerChase','plastic & feathers','cat','3+ months','low','none'),
(37,'ZoomPlay','plastic & silicone','dog','8+ months','medium','low'),
(38,'SmartWhiskers','ABS plastic','cat','6+ months','high','none'),
(39,'ZoomPlay','rubber/felt combo','dog','4+ months','medium','moderate');
/*!40000 ALTER TABLE `toys_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address_line1` varchar(100) DEFAULT NULL,
  `address_line2` varchar(100) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-04-02 12:48:07
