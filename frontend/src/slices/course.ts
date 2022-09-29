import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    stores: [],
    clear: [],
    medal:0
}
const courseSlice = createSlice({
    name:'course',
    initialState,
    reducers:{
        setCourse(state, action){
        state.stores = action.payload.stores,
        state.clear = action.payload.clear,
        state.medal = action.payload.medal
    },
},
extraReducers: builder => {},
})
export default courseSlice;