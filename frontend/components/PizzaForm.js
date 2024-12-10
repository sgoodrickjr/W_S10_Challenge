import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';

export default function PizzaForm() {
  const { dispatch } = useContext(AppContext);
  const [fullName, setFullName] = useState('');
  const [size, setSize] = useState('');
  const [toppings, setToppings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const toppingOptions = [
    { id: '1', name: 'Pepperoni', testId: 'checkPepperoni' },
    { id: '2', name: 'Green Peppers', testId: 'checkGreenpeppers' }, // Lowercase "p"
    { id: '3', name: 'Pineapple', testId: 'checkPineapple' },
    { id: '4', name: 'Mushrooms', testId: 'checkMushrooms' },
    { id: '5', name: 'Ham', testId: 'checkHam' },
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

    setValidationMessage('');
    setIsLoading(true);

    const orderData = {
      customer: fullName,
      size,
      toppings,
    };

    dispatch({ type: 'ADD_ORDER', payload: orderData });

    try {
      const response = await fetch('http://localhost:9009/api/pizza/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setValidationMessage(errorData.message);
        dispatch({ type: 'REMOVE_ORDER', payload: orderData });
      } else {
        setFullName('');
        setSize('');
        setToppings([]);
        setValidationMessage('');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      dispatch({ type: 'REMOVE_ORDER', payload: orderData });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="pizzaForm" onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>

      <div className="input-group">
        <label htmlFor="fullName">Full Name:</label>
        <input
          data-testid="fullNameInput"
          id="fullName"
          name="fullName"
          placeholder="Type full name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="size">Size:</label>
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          data-testid="sizeSelect"
        >
          <option value="">Choose size</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
      </div>

      <div className="input-group">
        <label>Toppings:</label>
        {toppingOptions.map((topping) => (
          <div key={topping.id}>
            <label>
              <input
                data-testid={topping.testId}
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

      {validationMessage && <p data-testid="validationMessage">{validationMessage}</p>}
      {isLoading && <p data-testid="loadingMessage">Order in progress...</p>}

      <button data-testid="submit" type="submit">
        Submit
      </button>
    </form>
  );
}
