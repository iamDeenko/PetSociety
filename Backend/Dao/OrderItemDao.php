<?php

class OrderItemDao extends BaseDao{

    public function __construct($table = 'order_items')
    {
        parent::__construct($table);
    }

}