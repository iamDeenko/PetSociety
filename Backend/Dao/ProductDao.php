<?php


class ProductDao extends BaseDao{

    protected $table = 'products';


    public function __construct($table = 'products')
    {
        parent::__construct($table);
    }

    public function createProduct($data)
    {
        try {
            $this->connection->beginTransaction();

            // 1. Insert into Products Table

            $sql = "INSERT INTO products 
                (subcategory_id, name, description, price, stock_quantity, image_url)
                VALUES (:subcategory_id, :name, :description, :price, :stock_quantity, :image_url)";
            $stmt = $this->connection->prepare($sql);
            $stmt->execute([
                ':subcategory_id' => $data['subcategory_id'],
                ':name' => $data['name'],
                ':description' => $data['description'],
                ':price' => $data['price'],
                ':stock_quantity' => $data['stock_quantity'],
                ':image_url' => $data['image_url']
            ]);

            $product_id = $this->connection->lastInsertId();

            // 2. Insert into the adjacent subcategory table

            switch ($data['type']) {
                case 'food':
                    $this->insertFoodDetails($product_id, $data['details']);
                    break;
                case 'pet':
                    $this->insertPetDetails($product_id, $data['details']);
                    break;
                case 'accessory':
                    $this->insertAccessoryDetails($product_id, $data['details']);
                    break;
                case 'toy':
                    $this->insertToyDetails($product_id, $data['details']);
                    break;
                default:
                    throw new Exception("Unknown product type: " . $data['type']);
            }

            $this->connection->commit();
            return $product_id;

        } catch (PDOException $e) {
            $this->connection->rollBack();
            error_log("Error in createProduct: " . $e->getMessage());
            return false;
        }
    }

    public function getAllPets(){
        $sql = "SELECT *
                FROM products
                JOIN PetSociety.subcategories ps ON products.subcategory_id = ps.subcategory_id
                JOIN PetSociety.categories AS categories ON ps.category_id = categories.category_id
                WHERE categories.name = 'Pets'";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function findByCategory($category_name)
    {
        switch (strtolower($category_name)):
            case "pets":
                $sql = "SELECT 
                            p.*, 
                            pd.breed, pd.age, pd.gender, pd.color, 
                            pd.health_status, pd.vaccination_status, pd.special_needs
                        FROM products p
                        JOIN subcategories s ON p.subcategory_id = s.subcategory_id
                        JOIN categories c ON s.category_id = c.category_id
                        JOIN pet_details pd ON p.product_id = pd.product_id
                        WHERE c.name = :category_name";
                break;

            case "food":
                $sql = "SELECT 
                            p.*, 
                            fd.brand, fd.weight, fd.ingredients, fd.nutritional_info,
                            fd.age_group, fd.pet_type, fd.dietary_type, fd.storage_instructions
                        FROM products p
                        JOIN subcategories s ON p.subcategory_id = s.subcategory_id
                        JOIN categories c ON s.category_id = c.category_id
                        JOIN food_details fd ON p.product_id = fd.product_id
                        WHERE c.name = :category_name";
                break;

            case "toys":
                $sql = "SELECT 
                            p.*, 
                            td.brand, td.material, td.pet_type, td.age_recommendation,
                            td.durability_rating, td.chew_resistance
                        FROM products p
                        JOIN subcategories s ON p.subcategory_id = s.subcategory_id
                        JOIN categories c ON s.category_id = c.category_id
                        JOIN toys_details td ON p.product_id = td.product_id
                        WHERE c.name = :category_name";
                break;

            case "accessories":
                $sql = "SELECT 
                            p.*, 
                            ad.brand, ad.material, ad.color, ad.size, ad.pet_type
                        FROM products p
                        JOIN subcategories s ON p.subcategory_id = s.subcategory_id
                        JOIN categories c ON s.category_id = c.category_id
                        JOIN accessories_details ad ON p.product_id = ad.product_id
                        WHERE c.name = :category_name";
                break;

            default:
                throw new Exception("Category '$category_name' is not supported.");
        endswitch;

        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':category_name', $category_name);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    private function insertPetDetails($product_id, $details)
    {
        $sql = "INSERT INTO pet_details 
        (product_id, breed, age, gender, color, health_status, vaccination_status, special_needs)
        VALUES 
        (:product_id, :breed, :age, :gender, :color, :health_status, :vaccination_status, :special_needs)";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute([
            ':product_id' => $product_id,
            ':breed' => $details['breed'],
            ':age' => $details['age'],
            ':gender' => $details['gender'],
            ':color' => $details['color'],
            ':health_status' => $details['health_status'],
            ':vaccination_status' => $details['vaccination_status'],
            ':special_needs' => $details['special_needs']
        ]);
    }

    private function insertFoodDetails($product_id, $details)
    {
        $sql = "INSERT INTO food_details 
        (product_id, brand, weight, ingredients, nutritional_info, age_group, pet_type, dietary_type, storage_instructions)
        VALUES 
        (:product_id, :brand, :weight, :ingredients, :nutritional_info, :age_group, :pet_type, :dietary_type, :storage_instructions)";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute([
            ':product_id' => $product_id,
            ':brand' => $details['brand'],
            ':weight' => $details['weight'],
            ':ingredients' => $details['ingredients'],
            ':nutritional_info' => $details['nutritional_info'],
            ':age_group' => $details['age_group'],
            ':pet_type' => $details['pet_type'],
            ':dietary_type' => $details['dietary_type'],
            ':storage_instructions' => $details['storage_instructions']
        ]);
    }


    private function insertAccessoryDetails($product_id, $details)
    {
        $sql = "INSERT INTO accessories_details 
        (product_id, brand, material, color, size, pet_type)
        VALUES 
        (:product_id, :brand, :material, :color, :size, :pet_type)";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute([
            ':product_id' => $product_id,
            ':brand' => $details['brand'],
            ':material' => $details['material'],
            ':color' => $details['color'],
            ':size' => $details['size'],
            ':pet_type' => $details['pet_type']
        ]);
    }


    private function insertToyDetails($product_id, $details)
    {
        $sql = "INSERT INTO toys_details 
        (product_id, brand, material, pet_type, age_recommendation, durability_rating, chew_resistance)
        VALUES 
        (:product_id, :brand, :material, :pet_type, :age_recommendation, :durability_rating, :chew_resistance)";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute([
            ':product_id' => $product_id,
            ':brand' => $details['brand'],
            ':material' => $details['material'],
            ':pet_type' => $details['pet_type'],
            ':age_recommendation' => $details['age_recommendation'],
            ':durability_rating' => $details['durability_rating'],
            ':chew_resistance' => $details['chew_resistance']
        ]);
    }



}