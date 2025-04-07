<?php


class PetDetailsDao extends BaseDao
{
    protected $table = 'pet_details';

    public function __construct($table = 'pet_details')
    {
        parent::__construct($table);
    }


}