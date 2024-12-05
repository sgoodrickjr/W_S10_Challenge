import React from 'react';
import PizzaForm from './PizzaForm';
import OrderList from './OrderList';
import { AppProvider } from '../AppContext';

export default function App() {
  return (
    <AppProvider>
      <div id="app">
        <PizzaForm />
        <OrderList />
      </div>
    </AppProvider>
  );
}
