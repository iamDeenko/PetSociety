<?php

require_once 'BaseDao.php';

class AdminDao extends BaseDao
{



    public function __construct($table = 'users')
    {
        parent::__construct($table);
    }
    public function addProduct($data)
    {
        require_once 'ProductDao.php';
        $productDao = new ProductDao();
        return $productDao->createProduct($data);
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
                JOIN PetSociety.
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


    public function getUsersByName($name)
    {
        $sql = "SELECT *
                FROM users
                WHERE first_name LIKE :name
                ORDER BY first_name";

        $likeName = '%' . $name . '%';

        $statement = $this->connection->prepare($sql);
        $statement->bindParam(':name', $likeName, PDO::PARAM_STR);
        $statement->execute();
        $res = $statement->fetchAll();

        return $res;
    }


    public function getUserByID($user_ID)
    {
        $sql = "SELECT * FROM users WHERE user_ID = :user_ID";
        $statement = $this->connection->prepare($sql);
        $statement->bindParam(":user_ID", $user_ID);

        $statement->execute();

        $res = $statement->fetch();

        return $res;
    }

    public function getUserOrderHistory($user_ID)
    {
        $sql = "SELECT * FROM orders where user_ID = :user_ID";

        $statement = $this->connection->prepare($sql);
        $statement->bindParam("user_ID", $user_ID);

        $statement->execute();

        return $statement->fetchAll();
    }
    public function getUserCart($user_ID)
    {
        $sql = "SELECT * FROM carts where user_ID = :user_ID";

        $statement = $this->connection->prepare($sql);
        $statement->bindParam("user_ID", $user_ID);

        $statement->execute();

        return $statement->fetch();
    }

    public function searchProducts($query)
    {
        $sql = "SELECT p.*, ps.name AS subcategory_name, c.name AS category_name 
                FROM products p
                JOIN subcategories ps ON p.subcategory_id = ps.subcategory_id
                JOIN categories c ON ps.category_id = c.category_id
                WHERE p.name LIKE :query OR p.description LIKE :query
                ORDER BY p.name";

        $likeQuery = '%' . $query . '%';
        $statement = $this->connection->prepare($sql);
        $statement->bindParam(':query', $likeQuery, PDO::PARAM_STR);
        $statement->execute();

        return $statement->fetchAll();
    }

    public function getProductById($id)
    {
        $sql = "SELECT p.*, ps.name AS subcategory_name, c.name AS category_name 
                FROM products p
                JOIN subcategories ps ON p.subcategory_id = ps.subcategory_id
                JOIN categories c ON ps.category_id = c.category_id
                WHERE p.product_id = :id";

        $statement = $this->connection->prepare($sql);
        $statement->bindParam(':id', $id);
        $statement->execute();

        return $statement->fetch();
    }

    public function updateProduct($id, $data)
    {
        $sql = "UPDATE products SET 
                name = :name, 
                description = :description, 
                price = :price, 
                stock_quantity = :stock_quantity";

        if (isset($data['image_url'])) {
            $sql .= ", image_url = :image_url";
        }

        $sql .= " WHERE product_id = :id";

        $statement = $this->connection->prepare($sql);
        $statement->bindParam(':id', $id);
        $statement->bindParam(':name', $data['name']);
        $statement->bindParam(':description', $data['description']);
        $statement->bindParam(':price', $data['price']);
        $statement->bindParam(':stock_quantity', $data['stock_quantity']);

        if (isset($data['image_url'])) {
            $statement->bindParam(':image_url', $data['image_url']);
        }

        return $statement->execute();
    }

    public function deleteProduct($id)
    {
        $sql = "DELETE FROM products WHERE product_id = :id";
        $statement = $this->connection->prepare($sql);
        $statement->bindParam(':id', $id);

        return $statement->execute();
    }
}
