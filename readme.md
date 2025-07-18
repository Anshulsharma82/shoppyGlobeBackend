# Shoppy Globe E-commerce Backend (Node.js + MongoDB)

This backend project powers the core functionality of the Shoppy Globe e-commerce platform. It provides a RESTful API built with Node.js, Express, and MongoDB, supporting essential features such as user authentication and shopping cart management.

## Key Features

### Product APIs
- Fetch all products
- Fetch product details by ID

### User APIs
- User registration
- User login (returns JWT token)

### Cart APIs (Protected - requires JWT)
- Add item to cart
- Update item quantity
- Remove item from cart

Note: Cart APIs are protected routes. Only authenticated users with a valid JWT token can access them.

## Collections and Schema Details

### Product
Each product document contains:
- `name` (String)
- `price` (Number)
- `description` (String)
- `stockQuantity` (Number)

### Cart
Each cart item contains:
- `productId` (ObjectId, reference to Product)
- `name` (String)
- `quantity` (Number)
- `description` (String)

### User
Each user document contains:
- `name` (String)
- `age` (Number)
- `username` (String)
- `email` (String, unique)
- `password` (Hashed String)

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password encryption
- Joi for request validation

## Github 
https://github.com/Anshulsharma82/shoppyGlobeBackend.git