import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../AppContext';

export default function OrderList() {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:9009/api/pizza/history');
        const data = await response.json();
        dispatch({ type: 'SET_ORDERS', payload: data }); // Populate the global state
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [dispatch]);

  // Filter orders based on the selected size
  const filteredOrders =
    filter === 'All' ? state.orders : state.orders.filter((order) => order.size === filter);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      {loading ? (
        <p data-testid="loadingMessage">Loading orders...</p>
      ) : (
        <ol>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <li key={index} className="order-box">
                <div>
                  <strong>{order.fullName || order.customer}</strong> ordered a{' '}
                  <strong>{order.size}</strong> pizza with{' '}
                  {order.toppings?.length > 0
                    ? order.toppings.join(', ')
                    : 'no toppings'}
                  .
                </div>
              </li>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </ol>
      )}
      <div id="sizeFilters">
        <p>Filter by size:</p>
        {['All', 'S', 'M', 'L'].map((size) => (
          <button
            key={size}
            className={`button-filter${size === filter ? ' active' : ''}`}
            data-testid={`filterBtn${size}`}
            onClick={() => setFilter(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
