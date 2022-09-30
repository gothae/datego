import {createSlice} from '@reduxjs/toolkit';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

const initialState = {
  one: [],
  two: [],
  thr: [],
  fou: [],
  fiv: []
}
const algolistSlice = createSlice({
  name: 'algolist',
  initialState,
  reducers: {
    setalgolist(state, action) {
      state.one = action.payload.one
      state.two = action.payload.two
      state.thr = action.payload.thr
      state.fou = action.payload.fou
      state.fiv = action.payload.fiv
    },
  },
  extraReducers: builder => {},
});
export default algolistSlice;