import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks to handle async requests
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get('http://localhost:9009/api/pizza/history');
  return response.data;
});

export const createOrder = createAsyncThunk('orders/createOrder', async (newOrder, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:9009/api/pizza/order', newOrder);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orderHistory: [],
    orderStatus: 'idle',
    error: null,
    sizeFilter: 'All',
  },
  reducers: {
    setSizeFilter: (state, action) => {
      state.sizeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderHistory = action.payload;
        state.orderStatus = 'succeeded';
      })
      .addCase(createOrder.pending, (state) => {
        state.orderStatus = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderHistory.push(action.payload);
        state.orderStatus = 'succeeded';
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.orderStatus = 'failed';
      });
  },
});

export const { setSizeFilter } = orderSlice.actions;
export default orderSlice.reducer;
