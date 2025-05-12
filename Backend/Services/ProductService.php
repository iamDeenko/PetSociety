<?php

require_once __DIR__ . '/../Dao/BaseDao.php';
require_once __DIR__ . '/../Dao/ProductDao.php';
require_once 'BaseService.php';

class ProductService extends BaseService
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

    public function getAllProducts()
    {
        try {
            return $this->productDao->getAllProducts();
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function getBySubcategory($category_name, $subcategory_name){
        try {
            return $this->productDao->getBySubcategory($category_name, $subcategory_name);
        } catch (Exception $e) {
            echo $e->getMessage();
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

    public function update($id, $data)
    {
        try {
            if (!$id) throw new Exception("ID is required for update.");
            return $this->productDao->update($id, $data);
        } catch (Exception $e) {
            error_log("Update Error: " . $e->getMessage());
            return false;
        }
    }



    public function deleteBy($category_name, $id)
    {
        return $this->productDao->deleteBy($category_name, $id);
    }


    public function getByCategory($category_name){
        return $this->productDao->getByCategory($category_name);
    }


    public function getById($id)
    {
        return $this->productDao->getById($id);
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

