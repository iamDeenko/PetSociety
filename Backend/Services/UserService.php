<?php


require_once __DIR__ . '/../Dao/Factory.php';

class UserService
{
    private UserDao $userDao;

    public function __construct()
    {
        $this->userDao = new UserDao();
    }


    public function getAllUsers()
    {
        $this->userDao->getAllUsers();
    }

    public function getUserOrders($id)
    {
       return $this->userDao->getUserOrders($id);
    }

}