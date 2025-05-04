<?php

require_once __DIR__ . '/../Dao/PetDetailsDao.php';

require_once 'BaseService.php';

class PetDetailsService extends BaseService
{

    private PetDetailsDao $petDetailsDao;

    public function __construct()
    {
        $this->petDetailsDao = new PetDetailsDao();
    }


    public function getById($id)
    {
        return $this->petDetailsDao->getById($id);
    }


    public function getAll()
    {
        return $this->petDetailsDao->getAll();
    }


    public function delete($id)
    {
        return $this->petDetailsDao->delete($id);
    }


    public function update($id, $data)
    {
        return $this->petDetailsDao->update($id, $data);
    }

}