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
        return $this->productDao->createProduct($data);
    }

    public function getAll()
    {
        return $this->productDao->getAll();
    }


    public function getAllToys()
    {
        return $this->productDao->getAllToys();
    }


    public function getAllAccessorries()
    {
        return $this->productDao->getAllAccessories();
    }

    public function getAllFood()
    {
        return $this->productDao->getAllFood();
    }

    public function getAllPets()
    {
        return $this->productDao->getAllPets();
    }

}
