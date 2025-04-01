<?php


class CategoryDao extends BaseDao {

    protected $table = 'categories';


    public function __construct($table = 'categories')
    {
        parent::__construct($table);
    }


}



