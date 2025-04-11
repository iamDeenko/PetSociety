<?php

class CartItemDao extends BaseDao{

    public function __construct($table = 'cart_items')
    {
        parent::__construct($table);
    }

}