import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

// Initial state
const initialState = {
  orders: [], // Stores past orders
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] }; // Add new order
    default:
      return state;
  }
};

// Create the context
export const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => { // Accept children prop
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// PropTypes validation for AppProvider
AppProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children as a required node
};
