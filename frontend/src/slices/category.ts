import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cafe: [],
  drink: [],
  cost: 0,
};
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.cafe = action.payload.cafe;
      state.drink = action.payload.drink;
      state.cost = action.payload.cost;
    },
  },
  extraReducers: builder => {},
});

export default categorySlice;
