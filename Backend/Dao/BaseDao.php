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
        $columns = implode(", ", array_keys($data));
        $placeholders = ":" . implode(", :", array_keys($data));


        $sql = "INSERT INTO " . $this->table . " ($columns) VALUES ($placeholders)";
        $stmt = $this->connection->prepare($sql);

        return $stmt->execute($data);
    }


    public function delete($id)
    {
        $sql = "DELETE FROM " . $this->table . " WHERE " . $this->idColumn . " = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);

        return $stmt->execute();
    }

    public function findBy($whereColumns = [], $whereValues = [], $selectColumns = [], $orderBy = null, $direction = 'ASC')
    {
        try {
            $select = '*';
            if (!empty($selectColumns)) {
                $select = implode(', ', $selectColumns);
            }

            $sql = "SELECT $select FROM " . $this->table;

            $params = [];
            if (!empty($whereColumns) && !empty($whereValues)) {
                if (count($whereColumns) !== count($whereValues)) {
                    throw new Exception("Mismatch in number of columns and values.");
                }

                $conditions = [];
                for ($i = 0; $i < count($whereColumns); $i++) {
                    $col = $whereColumns[$i];
                    $val = $whereValues[$i];
                    $conditions[] = "$col = :$col";
                    $params[":$col"] = $val;
                }

                $whereClause = implode(" AND ", $conditions);
                $sql .= " WHERE $whereClause";
            }

            // ORDER BY clause


            if (!empty($orderBy)) {
                $direction = strtoupper($direction) === 'DESC' ? 'DESC' : 'ASC';
                $sql .= " ORDER BY $orderBy $direction";
            }

            $stmt = $this->connection->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);

        } catch (Exception $e) {
            error_log("Error in findBy: " . $e->getMessage());
            return false;
        }
    }
}