import React, { useEffect, useState } from 'react';

function App() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    fetch('https://canteen-ordering-system-8dv7.onrender.com')
      .then(res => res.json())
      .then(data => setMenu(data));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const placeOrder = () => {
    fetch('https://canteen-ordering-system-8dv7.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, items: cart })
    })
      .then(res => res.json())
      .then(() => {
        setOrderPlaced(true);
        setCart([]);
        setName('');
      });
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Canteen Menu</h1>
      <ul>
        {menu.map(item => (
          <li key={item.id} style={{ marginBottom: 8 }}>
            {item.name} - ₹{item.price}
            <button style={{ marginLeft: 8 }} onClick={() => addToCart(item)}>Add</button>
          </li>
        ))}
      </ul>
      <h2>Cart</h2>
      <ul>
        {cart.map((item, idx) => (
          <li key={idx}>{item.name} - ₹{item.price}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button onClick={placeOrder} disabled={!name || cart.length === 0}>Place Order</button>
      {orderPlaced && <p style={{ color: 'green' }}>Order placed! Collect it from the canteen soon.</p>}
    </div>
  );
}

export default App;
