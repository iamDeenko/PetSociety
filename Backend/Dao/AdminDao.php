<?php

require_once 'BaseDao.php';

class AdminDao extends BaseDao
{



    public function __construct($table = 'users')
    {
        parent::__construct($table);
    }


    public function getById($id)
    {
        $sql = "select *
                from users
                WHERE users.user_id = :id";

        $statement = $this->connection->prepare($sql);

        $statement->bindParam(':id', $id);

        $statement->execute();

        return $statement->fetch();
    }


    public function getAllUsers()
    {
        $sql = 'SELECT * FROM users';
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

    public function deleteUser($id)
    {
        $sql = 'DELETE FROM users WHERE users.user_id = :id';

        $statement = $this->connection->prepare($sql);

        $statement->bindParam(':id', $id);

        $statement->execute();

        return $statement->fetchAll();
    }
}
