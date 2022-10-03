import {createSlice} from '@reduxjs/toolkit';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

const initialState = {
  // name: '',
  // id: 0,
  // tel: '',
  // addr1: '',
  // addr2: '',
  // Latitude: 0,
  // Longitude: 0,
  // menu: [''],
  // price: [0],
  // thumb: '',
  // rating: 0,
  // tags: ['']
  stores: [],
  storeindex: 0,
};
const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setstore(state, action) {
      // state.id = action.payload.id;
      // state.name = action.payload.name;
      // state.tel = action.payload
      // state.addr1 = action.payload.addr1
      // state.addr2 = action.payload.addr2
      // state.Latitude = action.payload.Latitude
      // state.Longitude = action.payload.Longitude
      // state.menu = action.payload.menu
      // state.price = action.payload.price
      // state.thumb = action.payload.thumb
      // state.rating = action.payload.rating
      // state.tags = action.payload.tags
      state.stores = action.payload.stores;
      state.storeindex = action.payload.storeindex;
    },
  },
  extraReducers: builder => {},
});
export default storeSlice;

// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//   id: '',
//   name: '',
//   accessToken: '',
// };
// const storeSlice = createSlice({
//   name: 'store',
//   initialState,
//   reducers: {
//     setstore(state, action) {
//       state.id = action.payload.id;
//       state.name = action.payload.name;
//       state.accessToken = action.payload.accessToken;
//     },
//   },
//   extraReducers: builder => {},
// });

// export default storeSlice;
