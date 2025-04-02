<?php

require_once 'Dao/Factory.php';

echo "🐾🔧 Starting Full CRUD Test for PET Product 🔧🐾\n\n";

// 1️⃣ Create DAO
$productDao = Factory::make('product');

// 2️⃣ Build test product
$testProduct = [
    'subcategory_id' => 1,
    'name' => 'Test Doggo',
    'description' => 'A happy test dog',
    'price' => 199.99,
    'stock_quantity' => 1,
    'image_url' => 'images/test/doggo.jpg',
    'type' => 'pet',
    'details' => [
        'breed' => 'TestBreed',
        'age' => '1 year',
        'gender' => 'female',
        'color' => 'white',
        'health_status' => 'healthy',
        'vaccination_status' => 'vaccinated',
        'special_needs' => 'none'
    ]
];

// 3️⃣ CREATE
echo "📥 Inserting product...\n";
$productId = $productDao->createProduct($testProduct);

if ($productId) {
    echo "\n✅ Product created successfully! 🆔 ID: $productId\n";
    echo str_repeat("=", 70) . "\n";
} else {
    echo "❌ Insert failed!\n";
    exit;
}

// 4️⃣ READ 

//This function finds ALL products with the name -Test Doggo-
//Does NOT support joins as of now.


echo "\n🔍 Reading product by name...\n";

$readProduct = $productDao->findBy(
    ['name'],
    ['Test Doggo'],
    ['product_id', 'name'],
    'product_id',
    'DESC'
);

if ($readProduct) {
    echo "🧾 Product(s) found:\n";
    echo print_r($readProduct, true);
    echo str_repeat("=", 70) . "\n";
} else {
    echo "❌ Read failed!\n";
    exit;
}

// 5️⃣ READ by Category
echo "\n📦 Getting all products from category 'Pets'...\n";

$categoryProducts = $productDao->findByCategory('Pets');

if ($categoryProducts) {
    echo "🐶 Found " . count($categoryProducts) . " product(s) in 'Pets':\n";
    echo print_r($categoryProducts, true);
    echo str_repeat("=", 70) . "\n";
}

// 6️⃣ UPDATE

//Updates a product by ID. You have to pass in the update info as an array and do key value paring to update the values.
//0 Also includes error handling!
echo "\n✏️ Updating product ID $productId...\n";

$updatedProduct = $productDao->update($productId, [
    'name' => 'Mega Test Doggo 2.0',
    'price' => 999.99
]);

if ($updatedProduct) {
    echo "✅ Updated successfully! 🔁\n";
    echo print_r($productDao->getById($productId), true);
    echo str_repeat("=", 70) . "\n";
} else {
    echo "❌ Update failed!\n";
}

// 7️⃣ DELETE

//Only deleted specific product by ID.

echo "\n🗑️ Deleting product ID $productId...\n";

$deleted = $productDao->delete($productId);

if ($deleted) {
    echo "✅ Deleted successfully! 💥\n";
} else {
    echo "❌ Delete failed!\n";
}

echo "\n🧪 CRUD Test Complete ✅\n";


// Proof that the item gets deleted.
echo print_r($productDao->findBy(['product_id'], [$productId]));