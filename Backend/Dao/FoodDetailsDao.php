<?php

class FoodDetailsDao extends BaseDao
{

    protected $table = 'food_details';

    public function __construct($table = 'food_details')
    {
        parent::__construct($table);
    }

}