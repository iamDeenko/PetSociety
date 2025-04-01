<?php


class ProductDao extends BaseDao{

    protected $table = 'products';


    public function __construct($table = 'products')
    {
        parent::__construct($table);
    }


}