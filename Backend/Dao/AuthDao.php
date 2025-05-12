<?php

require_once 'BaseDao.php';

class AuthDao extends BaseDao{

    protected $table = 'users';


    public function __construct($table = 'users')
    {
        parent::__construct($table);
    }


    public function getUserByEmail($email)
    {
        $sql = "SELECT * FROM users WHERE email = :email";
        $statement = $this->connection->prepare($sql);

        $statement->bindParam(':email', $email);

        $statement->execute();

        return $statement->fetch();
    }


 

}

