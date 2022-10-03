import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cafe: [],
  drink: [],
  mycourse: [],
  myfood: [],
  mycafe: [],
  myplay: [],
  mydrink: [],
  myprice: 0,
};
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.cafe = action.payload.cafe;
      state.drink = action.payload.drink;
    },
    setCourse(state, action) {
      state.mycourse = action.payload.mycourse;
      state.myfood = action.payload.myfood;
      state.mycafe = action.payload.mycafe;
      state.myplay = action.payload.myplay;
      state.mydrink = action.payload.mydrink;
      state.myprice = action.payload.myprice;
    },
    deletCourse(state, action) {
      state.mycourse = action.payload.mycourse;
      state.myfood = action.payload.myfood;
      state.mycafe = action.payload.mycafe;
      state.myplay = action.payload.myplay;
      state.mydrink = action.payload.mydrink;
      state.myprice = action.payload.myprice;
    },
  },
  extraReducers: builder => {},
});

export default categorySlice;
