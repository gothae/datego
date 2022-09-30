import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  food: [],
  cafe: [],
  drink: [],
  activity: [],
  cost: 0,
  mycourse: [],
  mycategory: [],
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
      state.mycourse = action.payload.course;
      console.log('마이코스');
      console.log(action.payload.course);
      console.log(state.mycourse);
    },
  },
  extraReducers: builder => {},
});

export default categorySlice;
