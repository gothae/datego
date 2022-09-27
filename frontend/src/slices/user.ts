import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: '',
  accessToken: '',
  code: 0,
  domain: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.code = action.payload.code;
      state.domain = action.payload.domain;
    },
    logoutUser(state, action) {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.code = action.payload.code;
      state.domain = action.payload.domain;
    },
    deleteUser(state, action) {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.code = action.payload.code;
      state.domain = action.payload.domain;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;

// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//   email: '',
//   name: '',
//   accessToken: '',
// };
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser(state, action) {
//       state.email = action.payload.email;
//       state.name = action.payload.name;
//       state.accessToken = action.payload.accessToken;
//     },
//   },
//   extraReducers: builder => {},
// });

// export default userSlice;
