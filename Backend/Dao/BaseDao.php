<?php

require_once 'Database.php';

class BaseDao{

    protected $table;






    public function __construct($table)
    {
        $this->table = $table;
        $this->connection = Database::connect();
    }


    public function getAll() {
        $stmt = $this->connection->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll();
    }


    public function getById($id)
    {

        $idColumn = $this->convertName($this->table);

        $stmt = $this->connection->prepare("SELECT * FROM " . $this->table . " WHERE " .$idColumn." = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetch();
    }



    public function convertName($table)
    {
        $_id = "";

        switch (trim($table)) {
            case "products":
                $_id = "product_id";
                break;
            case "categories":
                $_id = "category_id";
                break;
            case "subcategories":
                $_id = "subcategory_id";
                break;
            case "users":
                $_id = "user_id";
                break;
            case "carts":
                $_id = "cart_id";
                break;
            case "cart_items":
                $_id = "cart_item_id";
                break;
            case "orders":
                $_id = "order_id";
                break;
            default:
                $_id = rtrim($table, 's') . '_id';
                break;
        }

        return $_id;
    }


}