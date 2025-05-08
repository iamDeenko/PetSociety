<?php

require_once 'BaseDao.php';




require_once 'Database.php';
require_once 'ProductDao.php';
require_once 'UserDao.php';
require_once 'OrderDao.php';


class Factory
{
    public static function make($item)
    {
        switch (strtolower($item)) {
            case 'product':
                return new ProductDao();
            case 'order':
                return new OrderDao();
            case 'orderitem':
                return new OrderItemDao();
            case 'user':
                return new UserDao();
       
            default:
                throw new Exception("Factory Error: DAO for '{$item}' not found. {TIP: `USE SINGULAR NAMES: e.g product`");
        }
    }

    public static function make_by_category_ADMIN($item)
    {
        switch (strtolower($item)) {
            case 'products':
                return new ProductDao();
            case 'users':
                return new UserDao();
            case 'orders':
                return new OrderDao();
            default:
                throw new Exception("Factory Error: '{$item}' not found. {TIP: `USE PLURAL NAMES: e.g productS`");
        }
    }

}
