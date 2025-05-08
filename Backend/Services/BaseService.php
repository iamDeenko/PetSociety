<?php

require_once __DIR__ . "/../Dao/BaseDao.php";

class BaseService
{

    private BaseDao $baseDao;
    

    public function __construct(BaseDao $dao) 
    {
 
        $this->baseDao = $dao;
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
           return $this->baseDao->delete($id);
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