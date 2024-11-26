import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../state/orderSlice';

export default function PizzaForm() {
  const [formState, setFormState] = useState({
    fullName: '',
    size: '',
    toppings: [],
  });

  const dispatch = useDispatch();
  const orderStatus = useSelector(state => state.orders.orderStatus);
  const error = useSelector(state => state.orders.error);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormState(prevState => ({
        ...prevState,
        toppings: checked
          ? [...prevState.toppings, value]
          : prevState.toppings.filter(t => t !== value),
      }));
    } else {
      setFormState(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOrder(formState));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {orderStatus === 'loading' && <div className='pending'>Order in progress...</div>}
      {error && <div className='failure'>Order failed: {error}</div>}

      <div className="input-group">
        <label htmlFor="fullName">Full Name</label><br />
        <input
          data-testid="fullNameInput"
          id="fullName"
          name="fullName"
          value={formState.fullName}
          onChange={handleChange}
          placeholder="Type full name"
          type="text"
        />
      </div>

      <div className="input-group">
        <label htmlFor="size">Size</label><br />
        <select
          data-testid="sizeSelect"
          id="size"
          name="size"
          value={formState.size}
          onChange={handleChange}
        >
          <option value="">----Choose size----</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            value="1"
            onChange={handleChange}
          />
          Pepperoni
          <br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            value="2"
            onChange={handleChange}
          />
          Green Peppers
          <br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            value="3"
            onChange={handleChange}
          />
          Pineapple
          <br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            value="4"
            onChange={handleChange}
          />
          Mushrooms
          <br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            value="5"
            onChange={handleChange}
          />
          Ham
          <br />
        </label>
      </div>
      <input data-testid="submit" type="submit" value="Submit" />
    </form>
  );
}
