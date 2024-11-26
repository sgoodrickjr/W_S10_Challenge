import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, setSizeFilter } from '../state/orderSlice';

export default function OrderList() {
  const dispatch = useDispatch();
  const { orderHistory, sizeFilter } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filteredOrders = orderHistory.filter(order => 
    sizeFilter === 'All' || order.size === sizeFilter
  );

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map(order => (
          <li key={order.id}>
            <div>
              {`${order.fullName} ordered a size ${order.size}`}
              {order.toppings.length > 0 ? ` with ${order.toppings.length} toppings` : ' with no toppings'}
            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => (
          <button
            data-testid={`filterBtn${size}`}
            key={size}
            className={`button-filter${size === sizeFilter ? ' active' : ''}`}
            onClick={() => dispatch(setSizeFilter(size))}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
