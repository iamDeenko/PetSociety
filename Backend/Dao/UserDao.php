<?php


class UserDao extends BaseDao
{

    protected $table = 'users';


    public function __construct($table = 'categories')
    {
        parent::__construct($table);
    }

}