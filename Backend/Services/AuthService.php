<?php

require_once 'BaseService.php';
require_once '../Dao/AuthDao.php';

class AuthService extends BaseService
{

    private $authDao;


    public function __construct() 
    {
        $this->authDao = new AuthDao();
    }


    public function getUserByEmail($email)
    {
        return $this->authDao->getUserByEmail($email);   
    }
}

?>