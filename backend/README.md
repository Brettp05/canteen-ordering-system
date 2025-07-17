# Backend (Node.js + Express)

## How to Run

1. Open a terminal and navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Start the server:
   ```sh
   node index.js
   ```

The server will run on [http://localhost:5000](http://localhost:5000)

## API Endpoints
- `GET /menu` — Get menu items
- `POST /order` — Place an order
- `GET /orders` — Get all orders (admin)
- `PATCH /orders/:id` — Update order status (admin) 