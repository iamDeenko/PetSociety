<?php


class UserDao extends BaseDao
{

    protected $table = 'users';


    public function __construct($table = 'users')
    {
        parent::__construct($table);
    }


    public function getAllUsers()
    {
        $sql = "SELECT * FROM users";
        $statement = $this->connection->prepare($sql);

        $statement->execute();

        return $statement->fetchAll();
    }

    public function getUserOrders($id)
    {
        $sql = "select *
                from users
                JOIN PetSociety.orders o on users.user_id = o.user_id
                join PetSociety.order_items oi on o.order_id = oi.order_id
                WHERE users.user_id = :id";

        $statement = $this->connection->prepare($sql);

        $statement->bindParam(':id', $id);

        $statement->execute();

        return $statement->fetchAll();
    }


}