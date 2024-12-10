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
        dispatch({ type: 'SET_ORDERS', payload: data });
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [dispatch]);

  const filteredOrders =
    filter === 'All' ? state.orders : state.orders.filter((order) => order.size === filter);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <ol>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <li key={index} className="order-box">
                {order.customer || order.fullName} ordered a size {order.size}{' '}
                {order.toppings?.length
                  ? `with ${order.toppings.length} topping${order.toppings.length > 1 ? 's' : ''}`
                  : 'with no toppings'}
                .
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
