<?php

require_once 'Database.php';

class BaseDao
{

    protected $table;
    protected $idColumn;


    public function __construct($table)
    {
        $this->table = $table;
        $this->idColumn = $this->convertName($this->table);
        $this->connection = Database::connect();
    }

    public function getAll()
    {

        try {
            $stmt = $this->connection->prepare("SELECT * FROM " . $this->table);
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (PDOException $exception) {
            echo $exception->getMessage();
        }
    }


    public function getById($id)
    {

        if(!$id) throw new Exception("ERROR::No_Data");

        try {
            $stmt = $this->connection->prepare("SELECT * FROM " . $this->table . " WHERE " . $this->idColumn . " = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            return $stmt->fetch();
        } catch (PDOException $exception) {
            echo $exception->getMessage();
        }
    }


    public function update($id, $data)
    {

        if(!$id || !$data) throw new Exception("ERROR::No_Data");


        try {
            $fields = '';

            foreach ($data as $key => $value) {
                $fields .= " $key = :$key, ";
            }

            $fields = rtrim($fields, ", ");
            $sql = "UPDATE " . $this->table . " SET $fields WHERE " . $this->idColumn . " = :id";
            $stmt = $this->connection->prepare($sql);
            $data['id'] = $id;
            return $stmt->execute($data);
        } catch (PDOException $exception) {
            echo $exception->getMessage();
        }
    }

    public function convertName($table)
    {
        // Ensure that $table is a string
        if (!is_string($table)) {
            throw new InvalidArgumentException("The table name must be a string.");
        }

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
                $_id = "product_id";
                break;
        }

        return $_id;
    }


    public function create($data)
    {

        if(!$data) throw new Exception("ERROR::No_Data");


        try{
            $columns = implode(", ", array_keys($data));
            $placeholders = ":" . implode(", :", array_keys($data));


            $sql = "INSERT INTO " . $this->table . " ($columns) VALUES ($placeholders)";
            $stmt = $this->connection->prepare($sql);

            return $stmt->execute($data);

        } catch (Exception $e){
            return $e->getMessage();
        }

    }


    public function delete($id)
    {

        if(!$id) throw new Exception("ERROR::No_Data");

        try{
            $sql = "DELETE FROM " . $this->table . " WHERE " . $this->idColumn . " = :id";
            $stmt = $this->connection->prepare($sql);
            $stmt->bindParam(':id', $id);

            return $stmt->execute();
        } catch (Exception $e){
            return $e->getMessage();
        }
    }


}