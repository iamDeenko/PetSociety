<?php

require_once __DIR__ . '/../Dao/dao.php';

require_once 'BaseService.php';

class AdminService extends BaseService
{



    public function __construct()
    {
        $dao = new AdminDao();

        parent::__construct($dao);
    }


    public function getAllUsers()
    {
        return $this->dao->getAllUsers();
    }

    public function getById($id)
    {
        return $this->dao->getById($id);
    }

    public function getUserOrders($id)
    {
        return $this->dao->getUserOrders($id);
    }

    public function deleteUser($id)
    {
        return $this->dao->deleteUser($id);
    }
}
