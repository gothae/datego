import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  userSpotList: []
};

const userSpotSlice = createSlice({
  name: 'userSpot',
  initialState,
  reducers: {
    setUserSpot(state, action) {
      state.userSpotList = action.payload.userSpotList;
    },
  },
  extraReducers: builder => {},
});
export default userSpotSlice;