<?php


class UserDao extends BaseDao
{

    protected $table = 'users';


    public function __construct($table = 'users')
    {
        parent::__construct($table);
    }


    public function getOrders($id){
        $sql = "SELECT * FROM orders WHERE user_id = :id";
       
        $statement = $this->connection->prepare($sql);

        $statement->bindParam(':id', $id);

        $statement->execute();

        return $statement->fetchAll();
    }

    public function createOrder(){
        
    }

}