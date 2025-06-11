<?php

require_once 'BaseService.php';
require_once __DIR__ . '/../Dao/CategoryDao.php';


class CategoryService extends BaseService
{

    public function __construct()
    {
        $dao = new CategoryDao();

        parent::__construct($dao);
    }

    public function loadAllSubcategories()
    {
        return $this->dao->loadAllSubcategories();
    }

    public function getSubcategoriesFromCategoryID($category_id)
    {
        return $this->dao->getSubcategoriesFromCategoryID($category_id);
    }
}
