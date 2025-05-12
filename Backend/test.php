<?php

require_once 'Backend/Dao/AuthDao.php';

$dao = new AuthDao();

$res = $dao->getUserByEmail("admin@petsociety.test");

print_r($res)

?>