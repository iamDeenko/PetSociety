<?php

require_once __DIR__ . '/../Dao/Factory.php';

require_once 'BaseService.php';

class AdminService {

    private AdminDao $adminDao;

    public function __construct()
    {
        $this->adminDao = new AdminDao();
    }



}
