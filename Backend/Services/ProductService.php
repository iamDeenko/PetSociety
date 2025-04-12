<?php

require_once __DIR__ . '/../Dao/Factory.php';


class ProductService
{

    private ProductDao $productDao;

    public function __construct()
    {
        $this->productDao = Factory::make("product");
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


    public function getAllAccessorries()
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

}
