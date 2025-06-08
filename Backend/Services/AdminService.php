<?php

require_once __DIR__ . '/../Dao/AdminDao.php';

require_once 'BaseService.php';

class AdminService extends BaseService
{



    public function __construct()
    {
        $dao = new AdminDao();

        parent::__construct($dao);
    }


    public function getTotalSales()
    {
        return $this->dao->getTotalSales();
    }

    public function getSalesByCategory()
    {
        return $this->dao->getSalesByCategory();
    }

    public function getUsersByName($name)
    {
        return $this->dao->getUsersByName($name);
    }

    public function getUserByID($id)
    {
        return $this->dao->getUserByID($id);
    }

    public function getUserOrderHistory($user_ID)
    {
        return $this->dao->getUserOrderHistory($user_ID);
    }

    public function getUserCart($user_ID)
    {
        return $this->dao->getUserCart($user_ID);
    }
    public function getAllUsers()
    {
        return $this->dao->getAllUsers();
    }
    public function addProduct($data, $files = null)
    {
        try {
            // Handle image upload if present
            if ($files && isset($files['image']) && $files['image']['error'] === UPLOAD_ERR_OK) {
                $uploadDir = __DIR__ . '/../../Frontend/images/uploads/';

                // Create directory if it doesn't exist
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0755, true);
                }

                $fileName = time() . '_' . $files['image']['name'];
                $uploadPath = $uploadDir . $fileName;

                if (move_uploaded_file($files['image']['tmp_name'], $uploadPath)) {
                    $data['image_url'] = './images/uploads/' . $fileName;
                } else {
                    $data['image_url'] = './images/default-product.png';
                }
            } else {
                $data['image_url'] = './images/default-product.png';
            }

            // Map category to type for the ProductDao
            $categoryToType = [
                '1' => 'pet',     // Pets
                '2' => 'accessory', // Accessories  
                '3' => 'food',    // Food
                '4' => 'toy'      // Toys
            ];

            $data['type'] = $categoryToType[$data['category']] ?? 'product';

            // Build details array based on category
            $details = [];
            switch ($data['type']) {
                case 'pet':
                    $details = [
                        'breed' => $data['breed'] ?? '',
                        'age' => $data['age'] ?? '',
                        'gender' => $data['gender'] ?? '',
                        'color' => $data['color'] ?? '',
                        'health_status' => $data['health_status'] ?? 'Healthy',
                        'vaccination_status' => $data['vaccination_status'] ?? 'Up to date',
                        'special_needs' => $data['special_needs'] ?? 'None'
                    ];
                    break;
                case 'food':
                    $details = [
                        'brand' => $data['brand'] ?? '',
                        'weight' => floatval($data['weight'] ?? 0),
                        'ingredients' => $data['ingredients'] ?? '',
                        'nutritional_info' => $data['nutritional_info'] ?? '',
                        'age_group' => $data['age_group'] ?? 'All Ages',
                        'pet_type' => $data['pet_type'] ?? '',
                        'dietary_type' => $data['dietary_type'] ?? 'Standard',
                        'storage_instructions' => $data['storage_instructions'] ?? 'Store in a cool, dry place'
                    ];
                    break;
                case 'accessory':
                    $details = [
                        'brand' => $data['brand'] ?? '',
                        'material' => $data['material'] ?? '',
                        'color' => $data['color'] ?? '',
                        'size' => $data['size'] ?? '',
                        'pet_type' => $data['pet_type'] ?? ''
                    ];
                    break;
                case 'toy':
                    $details = [
                        'brand' => $data['brand'] ?? '',
                        'material' => $data['material'] ?? '',
                        'pet_type' => $data['pet_type'] ?? '',
                        'age_recommendation' => $data['age_recommendation'] ?? 'All',
                        'durability_rating' => $data['durability_rating'] ?? 'Medium',
                        'chew_resistance' => $data['chew_resistance'] ?? 'Medium'
                    ];
                    break;
            }

            $data['details'] = $details;

            $result = $this->dao->addProduct($data);

            if ($result === false) {
                throw new Exception("Failed to create product");
            }

            return ['success' => true, 'message' => 'Product created successfully'];
        } catch (Exception $e) {
            error_log("Error in addProduct: " . $e->getMessage());
            throw new Exception("Failed to add product: " . $e->getMessage());
        }
    }

    public function searchProducts($query)
    {
        return $this->dao->searchProducts($query);
    }

    public function getProductById($id)
    {
        return $this->dao->getProductById($id);
    }

    public function updateProduct($id, $data, $files = null)
    {
        try {
            // Handle image upload if present
            if ($files && isset($files['image']) && $files['image']['error'] === UPLOAD_ERR_OK) {
                $uploadDir = __DIR__ . '/../../Frontend/images/uploads/';

                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0755, true);
                }

                $fileName = time() . '_' . $files['image']['name'];
                $uploadPath = $uploadDir . $fileName;

                if (move_uploaded_file($files['image']['tmp_name'], $uploadPath)) {
                    $data['image_url'] = './images/uploads/' . $fileName;
                }
            }

            $result = $this->dao->updateProduct($id, $data);

            if ($result === false) {
                throw new Exception("Failed to update product");
            }

            return ['success' => true, 'message' => 'Product updated successfully'];
        } catch (Exception $e) {
            error_log("Error in updateProduct: " . $e->getMessage());
            throw new Exception("Failed to update product: " . $e->getMessage());
        }
    }

    public function deleteProduct($id)
    {
        try {
            $result = $this->dao->deleteProduct($id);

            if ($result === false) {
                throw new Exception("Failed to delete product");
            }

            return ['success' => true, 'message' => 'Product deleted successfully'];
        } catch (Exception $e) {
            error_log("Error in deleteProduct: " . $e->getMessage());
            throw new Exception("Failed to delete product: " . $e->getMessage());
        }
    }
}
