<?php

require_once 'BaseDao.php';

require_once 'AccessoriesDetailsDao.php';
require_once 'CartDao.php';
require_once 'CartItemDao.php';
require_once 'CategoryDao.php';
require_once 'Database.php';
require_once 'FoodDetailsDao.php';
require_once 'OrderDao.php';
require_once 'OrderItemDao.php';
require_once 'PetDetailsDao.php';
require_once 'ProductDao.php';
require_once 'SubcategoryDao.php';
require_once 'ToyDetailsDao.php';
require_once 'UserDao.php';


class Factory
{
    public static function make($item)
    {
        switch (strtolower($item)) {
            case 'product':
                return new ProductDao();
            case 'category':
                return new CategoryDao();
            case 'subcategory':
                return new SubcategoryDao();
            case 'cart':
                return new CartDao();
            case 'cartitem':
                return new CartItemDao();
            case 'order':
                return new OrderDao();
            case 'orderitem':
                return new OrderItemDao();
            case 'user':
                return new UserDao();
            case 'fooddetails':
                return new FoodDetailsDao();
            case 'petdetails':
                return new PetDetailsDao();
            case 'accessoriesdetails':
                return new AccessoriesDetailsDao();
            case 'toydetails':
                return new ToyDetailsDao();
            default:
                throw new Exception("Factory Error: DAO for '{$item}' not found.");
        }
    }
}
