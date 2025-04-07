# 🐾 PetSociety

**PetSociety** is a sleek and minimalistic pet shop web application that allows users to browse and purchase pets, accessories, toys, and food. The platform is built with clean backend architecture and structured data access for scalable e-commerce development.

---

## 📌 Project Overview
A beautifully curated pet shop website where users can:
- Browse available products across multiple categories.
- Register and log in to their account.
- View detailed product info.
- Perform basic CRUD operations on backend entities.

---

## ✅ Tech Stack
- **Frontend**: HTML, CSS, JavaScript (static for now)
- **Backend**: PHP (OOP)
- **Database**: MySQL

---

## 🚀 Milestone 1 — UI Foundation

**Features:**
- [x] Product View Page
- [x] Static Shop Page
- [x] Registration Page
- [x] Login Page
- [x] General Frontend Layout

The goal of Milestone 1 was to build the **static structure** of the site with all primary pages accessible.

---

## 🛠️ Milestone 2 — Backend Logic & CRUD

**Features:**
- [x] MySQL Database with CTI (Class Table Inheritance) Structure
- [x] PHP DAO (Data Access Object) Layer
- [x] CRUD operations for all major entities:
    - Products
    - Subcategories
    - Categories
    - Users
    - Carts
    - Cart Items
    - Orders
    - Product-Specific Tables:
        - `pet_details`
        - `food_details`
        - `accessories_details`
        - `toys_details`
- [x] `ProductDao::createProduct()` handles insertion across CTI tables
- [x] `BaseDao` with dynamic `findBy()`, `getById()`, `update()`, and `delete()`
- [x] Dynamic `Factory` class for instantiating DAO objects

---

## 📁 Project Structure
```
Backend/
├── Dao/               → All DAO classes
├── Routes/            → Backend route stubs
├── Services/          → Future service logic
├── test.php           → Manual testing entrypoint

Frontend/
├── assets/            → CSS, JS, Fonts, Images
├── tpl/               → HTML templates
├── index.html         → App entry

Other Files:
├── Database-Schema.jpg
├── README.md
├── LICENSE
```

---

## 📦 Features in Progress
- Full RESTful API with routing
- Admin dashboard for CRUD via UI
- Order history, reviews, and more!

---

## 👨‍💻 Author
This project is actively being developed by me as part of a Web Programming course project.

---

## 🐕 License
MIT — open source and proud.

---

Need to test or add data? Try using the  `Factory` classes in `test.php` to instantly generate real or dummy products.