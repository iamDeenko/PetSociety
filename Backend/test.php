<?php

require_once "Dao/Factory.php";


$data = [
    'subcategory_id'  => 3,                            // e.g. “3” might be Wet Food
    'name'            => 'Grain‐Free Salmon Feast',
    'description'     => 'Premium wet food for adult cats, salmon & veggies.',
    'price'           => 4.99,
    'stock_quantity'  => 120,
    'image_url'       => 'https://example.com/img/salmon-feast.jpg',
    'type'            => 'food',                       // triggers insertFoodDetails()
    'details'         => [
        'brand'                => 'PurrfectBites',
        'weight'               => '0.32',
        'ingredients'          => 'Salmon, Peas, Carrots, Potato Starch',
        'nutritional_info'     => 'Protein 12%, Fat 6%, Fiber 1%',
        'age_group'            => 'Adult',
        'pet_type'             => 'Cat',
        'dietary_type'         => 'Grain‐Free',
        'storage_instructions' => 'Refrigerate after opening'
    ]
];



// 2) Instantiate and call
$dao = new ProductDao();
$dao->createProduct($data);


?>