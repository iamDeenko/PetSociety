<?php

require_once __DIR__ . '/../Dao/Factory.php';

require_once 'BaseService.php';

class ProductService
{

    private ProductDao $productDao;

    public function __construct()
    {
        $this->productDao = new ProductDao();
    }


    public function createProduct($data)
    {
        try {
            return $this->productDao->createProduct($data);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function getAll()
    {
        try {
            return $this->productDao->getAll();
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }


    public function getAllToys()
    {
        try {

            return $this->productDao->getAllToys();
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }


    public function getAllAccessories()
    {
        try {
            return $this->productDao->getAllAccessories();
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function getAllFood()
    {
        try {
            return $this->productDao->getAllFood();
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function getAllPets()
    {
        try {
            return $this->productDao->getAllPets();
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }


    public function getById($id)
    {
        try {
            return $this->productDao->getById($id);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }


    public function getPetById($id)
    {
        try {
            return $this->productDao->getPetById($id);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function getFoodById($id)
    {
        try {
            return $this->productDao->getFoodById($id);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function getToyById($id)
    {
        try {
            return $this->productDao->getToyById($id);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function getAccessoryById($id)
    {
        try {
            return $this->productDao->getAccessoryById($id);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }


    public function getByName($name)
    {
        try{
            return $this->productDao->getByName($name);
        } catch (Exception $exception){
            return $exception->getMessage();
        }
    }

    public function delete($id)
    {
        try {
            if (!$id) throw new Exception("ID is required for deletion.");
            return $this->productDao->delete($id);
        } catch (Exception $e) {
            error_log("Delete Error: " . $e->getMessage());
            return false;
        }
    }

    public function deleteByPetId($id)
    {
        try {
            if (!$id) throw new Exception("ID is required for deletion.");
            return $this->productDao->deleteByPetId($id);
        } catch (Exception $e) {
            error_log("Delete Error: " . $e->getMessage());
            return false;
        }
    }

    public function deleteByFoodId($id)
    {
        try {
            if (!$id) throw new Exception("ID is required for deletion.");
            return $this->productDao->deleteByFoodId($id);
        } catch (Exception $e) {
            error_log("Delete Error: " . $e->getMessage());
            return false;
        }
    }

    public function deleteByAccessoryId($id)
    {
        try {
            if (!$id) throw new Exception("ID is required for deletion.");
            return $this->productDao->deleteByAccessoryId($id);
        } catch (Exception $e) {
            error_log("Delete Error: " . $e->getMessage());
            return false;
        }
    }

    public function deleteByToyId($id)
    {
        try {
            if (!$id) throw new Exception("ID is required for deletion.");
            return $this->productDao->deleteByToyId($id);
        } catch (Exception $e) {
            error_log("Delete Error: " . $e->getMessage());
            return false;
        }
    }


    public function deleteBy($category_name, $id)
    {
        return $this->productDao->deleteBy($category_name, $id);
    }

    public function getBy($category_name, $id)
    {
        try{
            $res = $this->productDao->getBy($category_name,$id);
            if($res){
                return $res;
            }
        } catch (Exception $e){
            Flight::json($e->getMessage());
        }

    }
}

