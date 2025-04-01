<?php

$table = "products";
$data = [
    'name' => 'Squeaky Duck Toy',
    'price' => 12.99,
    'description' => 'Great for small dogs!'
];

$id = 3; // Let's pretend we’re updating product ID 3

// Step 1: Create SET clause from $data



// Step 2: Build full SQL: "UPDATE products SET name = :name, price = :price, ... WHERE product_id = :id"

$sql = ""; // build this dynamically

echo "SQL: $sql\n";

// Step 3: Prepare the statement (just simulate with comments)
echo "Preparing statement...\n";

// Step 4: Loop through $data and simulate binding
foreach ($data as $key => $value) {
    echo "bindValue(':$key', '$value')\n";
}

// Step 5: Bind the ID
echo "bindValue(':id', $id)\n";

// Step 6: Execute
echo "Executing SQL...\n";