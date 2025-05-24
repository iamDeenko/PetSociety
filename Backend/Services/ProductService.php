<?php

require_once __DIR__ . '/../Dao/BaseDao.php';
require_once __DIR__ . '/../Dao/AdminDao.php';
require_once 'BaseService.php';

class ProductService extends BaseService
{



    public function __construct()
    {
        $dao = new ProductDao();

        parent::__construct($dao);
    }


    public function createProduct($data)
    {
        try {
            return $this->dao->createProduct($data);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function getAllProducts()
    {
        try {
            return $this->dao->getAllProducts();
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function getBySubcategory($category_name, $subcategory_name)
    {
        try {
            return $this->dao->getBySubcategory($category_name, $subcategory_name);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }


    public function delete($id)
    {
        try {
            if (!$id) throw new Exception("ID is required for deletion.");
            return $this->dao->delete($id);
        } catch (Exception $e) {
            error_log("Delete Error: " . $e->getMessage());
            return false;
        }
    }

    public function update($id, $data)
    {
        try {
            if (!$id) throw new Exception("ID is required for update.");
            return $this->dao->update($id, $data);
        } catch (Exception $e) {
            error_log("Update Error: " . $e->getMessage());
            return false;
        }
    }



    public function deleteBy($category_name, $id)
    {
        return $this->dao->deleteBy($category_name, $id);
    }


    public function getByCategory($category_name)
    {
        return $this->dao->getByCategory($category_name);
    }


    public function getById($id)
    {
        return $this->dao->getById($id);
    }

    public function getBy($category_name, $id)
    {
        try {
            $res = $this->dao->getBy($category_name, $id);
            if ($res) {
                return $res;
            }
        } catch (Exception $e) {
            Flight::json($e->getMessage());
        }
    }
}
