<?php

class AccessoriesDetailsDao extends BaseDao
{

    protected $table = 'accessories_details';
    public function __construct($table = 'accessories_details')
    {
        parent::__construct($table);
    }

}
