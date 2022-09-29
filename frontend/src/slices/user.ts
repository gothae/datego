import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: '',
  accessToken: '',
  code: 0,
  domain: '',
  id: 0,
  preference: [],
  myReviews: [],
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
      state.id = action.payload.id;
    },
    setUserReviews(state, action) {
      state.myReviews = action.payload.reviews;
    },
    logoutUser(state, action) {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.code = action.payload.code;
      state.domain = action.payload.domain;
      state.id = action.payload.id;
    },
    deleteUser(state, action) {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.code = action.payload.code;
      state.domain = action.payload.domain;
      state.id = action.payload.id;
    },
    setPreference(state, action) {
      state.preference = action.payload.preference;
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
