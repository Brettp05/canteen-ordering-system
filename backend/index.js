const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Placeholder menu data
const menu = [
  { id: 1, name: 'Samosa', price: 20 },
  { id: 2, name: 'Sandwich', price: 40 },
  { id: 3, name: 'Tea', price: 10 },
];

// In-memory orders
const orders = [];

// Get menu
app.get('/menu', (req, res) => {
  res.json(menu);
});

// Place order
app.post('/order', (req, res) => {
  const order = { ...req.body, id: orders.length + 1, status: 'pending' };
  orders.push(order);
  res.status(201).json(order);
});

// Get all orders (for admin)
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Update order status (for admin)
app.patch('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (order) {
    order.status = req.body.status || order.status;
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 