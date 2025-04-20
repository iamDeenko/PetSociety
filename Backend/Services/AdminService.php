<?php

require_once __DIR__ . '/../Dao/AdminDao.php';

require_once 'BaseService.php';

class AdminService extends BaseService
{

    private AdminDao $adminDao;

    public function __construct()
    {
        $this->adminDao = new AdminDao();
    }


    public function getAllUsers()
    {
        return $this->adminDao->getAllUsers();
    }

    public function getById($id)
    {
        return $this->adminDao->getById($id);
    }

    public function getUserOrders($id)
    {
        return $this->adminDao->getUserOrders($id);
    }

    public function deleteUser($id)
    {
        return $this->adminDao->deleteUser($id);
    }


}
