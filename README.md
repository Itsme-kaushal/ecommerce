# E-Commerce Management Portal API

A comprehensive REST API for E-Commerce Management Portal with JWT authentication, role-based access control, and real-time inventory management.

## Features

- 🔐 JWT Authentication & Role-based Access Control
- 👥 User Management (Customer & Admin roles)
- 📦 Product & Category Management
- 🛒 Shopping Cart Management
- 📋 Order Processing with Mock Payment Gateway
- 💾 SQLite Database with Sequelize ORM
- 📚 Swagger API Documentation
- ⚡ Real-time Inventory Management with Transactions

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Database (Optional)
Create admin user and sample data:
```bash
npm run seed:all
```

Or create only admin user:
```bash
npm run seed:admin
```

### 3. Start Server
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Documentation

### Swagger UI
Access the interactive API documentation at:
```
http://localhost:3000/api-docs
```

### Swagger JSON
Get the raw OpenAPI specification at:
```
http://localhost:3000/swagger.json
```

## Default Credentials

After running the seed script:

### Admin User
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@ecommerce.com`
- **Role**: `ADMIN`

### Sample Customer
- **Username**: `customer1`
- **Password**: `customer123`
- **Email**: `customer1@example.com`
- **Role**: `CUSTOMER`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Products
- `GET /products` - List products (with search/filter)
- `GET /products/:id` - Get product details
- `POST /products` - Add product (Admin only)
- `PUT /products/:id` - Update product (Admin only)
- `DELETE /products/:id` - Delete product (Admin only)

### Categories
- `GET /categories` - List categories
- `POST /categories` - Add category (Admin only)
- `PUT /categories/:id` - Update category (Admin only)
- `DELETE /categories/:id` - Delete category (Admin only)

### Cart Management
- `GET /cart` - View cart
- `POST /cart` - Add to cart
- `PUT /cart/:productId` - Update cart item
- `DELETE /cart/:productId` - Remove from cart

### Orders
- `POST /orders/checkout` - Checkout cart
- `GET /orders` - Order history
- `GET /orders/:id` - Order details
- `PUT /orders/:id/status` - Update order status (Admin only)

### Admin Reports
- `GET /admin/reports/sales` - Sales reports (Admin only)

## Database

The application uses SQLite with the following tables:
- `users` - User accounts
- `categories` - Product categories
- `products` - Product catalog
- `cart` - Shopping cart items
- `orders` - Order records
- `order_items` - Order line items

Database file: `database.sqlite`

## Environment Variables

Create a `.env` file:
```env
PORT=3000
DB_PATH=./database.sqlite
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

## Testing the API

### 1. Login to get JWT token
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### 2. Use token in subsequent requests
```bash
curl -X GET http://localhost:3000/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## License

ISC
