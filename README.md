# Product API

A simple RESTful API built with **Express.js** and **MongoDB Atlas** for managing products. It supports CRUD operations, authentication using an API key, and extra features like filtering, search, pagination, and product statistics.

To set up the project, install dependencies using `npm install`, then create a `.env` file in the root directory with the following content:

```
MONGO_URI = your_mongodb_connection_string
PORT = 3000
API_KEY=your_api_key
```

Start the server using `npm start`. The server will run on `http://localhost:3000`.

All requests require this header:
```
x-api-key: mysecretkey
```

### API Endpoints
- **GET /api/products** – Get all products (supports filtering, search, and pagination)
- **GET /api/products/:id** – Get a product by ID
- **POST /api/products** – Create a new product
- **PUT /api/products/:id** – Update a product
- **DELETE /api/products/:id** – Delete a product
- **GET /api/products/stats/category** – Get product count by category

### Example Product JSON
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
```

Developed by **Joy**
