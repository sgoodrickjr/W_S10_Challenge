import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';

export default function PizzaForm() {
  const { dispatch } = useContext(AppContext);
  const [fullName, setFullName] = useState('');
  const [size, setSize] = useState('');
  const [toppings, setToppings] = useState([]);

  const toppingOptions = [
    { id: '1', name: 'Pepperoni' },
    { id: '2', name: 'Green Peppers' },
    { id: '3', name: 'Pineapple' },
    { id: '4', name: 'Mushrooms' },
    { id: '5', name: 'Ham' },
  ];

  const handleToppingChange = (toppingId) => {
    if (toppings.includes(toppingId)) {
      setToppings(toppings.filter((id) => id !== toppingId));
    } else {
      setToppings([...toppings, toppingId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      fullName,
      size,
      toppings,
    };

    try {
      const response = await fetch('http://localhost:9009/api/pizza/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const newOrder = await response.json();
        dispatch({ type: 'ADD_ORDER', payload: newOrder });
        setFullName('');
        setSize('');
        setToppings([]);
      }
      // No frontend error handling—error responses will fail silently.
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <form id="pizzaForm" onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>

      <div className="input-group">

      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input
   data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      </div>
      <div className="input-group">

      <div>
        <label htmlFor="size">Size:</label>
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
      </div>
      </div>
      <div className="input-group">
        <label>Toppings:</label>
        {toppingOptions.map((topping) => (
          <div key={topping.id}>
            <label>
              <input
                type="checkbox"
                value={topping.id}
                checked={toppings.includes(topping.id)}
                onChange={() => handleToppingChange(topping.id)}
              />
              {topping.name}
            </label>
          </div>
        ))}
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
