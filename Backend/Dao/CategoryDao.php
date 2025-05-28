<?php

class CategoryDao extends BaseDao
{

    public function __construct($table = 'categories')
    {
        parent::__construct($table);
    }

    public function getAllSubcategories()
    {
        $sql = "select c.category_id,c.name AS category_name ,s.subcategory_id, s.name as subcategory_name from categories c JOIN petsociety.subcategories s on c.category_id = s.category_id";

        $statement = $this->connection->prepare($sql);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }



    public function getSubcategoriesFromCategoryID($category_id)
    {
        $sql = "SELECT sc.name FROM subcategories sc JOIN categories c ON sc.category_id = c.category_id WHERE c.category_id = :category_id;";

        $statement = $this->connection->prepare($sql);
        $statement->bindParam('category_id', $category_id);
        $statement->execute();

        return $statement->fetchAll();
    }
}
