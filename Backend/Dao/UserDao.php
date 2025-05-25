<?php


class UserDao extends BaseDao
{

    protected $table = 'users';


    public function __construct($table = 'users')
    {
        parent::__construct($table);
    }


    public function getOrders($id)
    {
        $sql = "SELECT * FROM orders WHERE user_id = :id";

        $statement = $this->connection->prepare($sql);

        $statement->bindParam(':id', $id);

        $statement->execute();

        return $statement->fetchAll();
    }

    public function getUserCart($user_ID)
    {



        $sql = "SELECT c.cart_ID,
                       c.user_ID,
                       c.price_total 

                 FROM carts c

                 JOIN ajna_baza.cart_items ci ON c.cart_ID = ci.cart_ID

                 WHERE c.user_ID = :user_ID 

                 GROUP BY c.cart_ID, c.user_ID;";


        $statement = $this->connection->prepare($sql);

        $statement->bindValue("user_ID", $user_ID);

        $statement->execute();

        return $statement->fetch();
    }



    public function getUserOrders($user_ID)
    {
        $sql = "SELECT 
     
        ";


        $statement = $this->connection->prepare($sql);

        $statement->bindValue("user_ID", $user_ID);

        $statement->execute();

        return $statement->fetchAll();
    }

    public function createCart($user_ID)
    {
        $validUser = $this->getById($user_ID);

        if ($validUser) {
            $sql = "INSERT INTO carts (user_ID) VALUES (:user_ID)";
            $statement = $this->connection->prepare($sql);
            $statement->bindValue("user_ID", $user_ID);

            $statement->execute();

            if ($statement) {
                return ['success' => true, 'Message' => 'Created a cart successfully!'];
            }

            return ['success' => false, 'Message ' => 'User CANNOT have more than one cart!'];
        }



        return ['success' => false, 'Message ' => 'Invalid User ID!'];
    }
}
