<?php


class AdminDao extends UserDao {

    protected $table = 'users';

    public function __construct($table = 'users')
    {
        parent::__construct($table);
    }


    public function getProducts()
    {

    }
    
    

}