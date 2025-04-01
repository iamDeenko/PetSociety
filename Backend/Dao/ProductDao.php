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

            // 1. Insert into `products`
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

            // 2. Insert into the corresponding details table
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


    private function insertPetDetails($product_id, $details)
    {
        $sql = "INSERT INTO pet_details (product_id, breed, age, gender, color, health_status, vaccination_status, special_needs)
            VALUES (:product_id, :breed, :age, :gender, :color, :vaccination_status, :special_needs)";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute([
            ':product_id' => $product_id,
            ':breed' => $details['breed'],
            ':age' => $details['age'],
            ':gender' => $details['gender'],
            ':color' => $details['color'],
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