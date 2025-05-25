<?php


require_once 'BaseService.php';
require_once __DIR__ . '/../Dao/OrderDao.php';


class OrderService extends BaseService
{



    public function __construct()
    {
        $dao = new ProductDao();

        parent::__construct($dao);
    }
}
