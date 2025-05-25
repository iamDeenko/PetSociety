<?php


require_once 'BaseService.php';

class UserService extends BaseService
{


    public function __construct()
    {
        $dao = new UserDao();
        parent::__construct($dao);
    }



    public function getUserOrders($id)
    {
        return $this->dao->getUserOrders($id);
    }
}
