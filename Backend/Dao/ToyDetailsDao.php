<?php


class ToyDetailsDao extends BaseDao
{

    protected $table = 'toys_details';
    public function __construct($table = 'toys_details')
    {
        parent::__construct($table);
    }

}
