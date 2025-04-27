<?php

require_once __DIR__ . "/../Dao/Factory.php";

class BaseService
{

    private BaseDao $baseDao;


    public function __construct()
    {
        $this->baseDao = Factory::make('basedao');
    }

    public function findBy($whereColumns = [], $whereValues = [], $selectColumns = [], $orderBy = null, $direction = 'ASC')
    {
        try {
            $this->baseDao->findBy($whereColumns,$whereValues,$selectColumns,$orderBy,$direction);
        }catch (Exception $e){
            return $e->getMessage();
        }
    }


    public function getById($id)
    {
        try {
            return $this->baseDao->getById($id);
        } catch (Exception $e){
            return $e->getMessage();
        }
    }



    public function getAll()
    {
        try{
            return $this->baseDao->getAll();
        } catch (Exception $e){
            return $e->getMessage();
        }
    }


    public function delete($id)
    {
        try{
           return $this->baseDao->delete();
        } catch (Exception $e){
            return $e->getMessage();
        }
    }


    public function update($id, $data)
    {
        try{
            $this->baseDao->update($id,$data);
        }catch (Exception $e){
            return $e->getMessage();
        }
    }
}