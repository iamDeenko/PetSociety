#!/bin/bash

# Main categories
categories=("Pets" "Accessories" "Food" "Toys")

# Subcategories (matching screenshot)
subcategories=(
    "Dogs Cats Small-Animals Birds Fish Reptiles Amphibians"
    "Leashes Bowls Carriers Grooming-Tools Travel-Accessories"
    "Dry-Food Wet-Food Treats Supplements"
    "Chewing Interactive Fetch-Retrieve"
)

# Create folders and files
for i in "${!categories[@]}"; do
    category="${categories[$i]}"
    subcats="${subcategories[$i]}"

    mkdir -p "$category"

    if [[ -n "$subcats" ]]; then
        for subcat in $subcats; do
            mkdir -p "$category/$subcat"
            touch "$category/$subcat/view_$(echo "$subcat" | tr '[:upper:]-' '[:lower:]_').html"
        done
    fi

    touch "$category/view_$(echo "$category" | tr '[:upper:]-' '[:lower:]_').html"
done
