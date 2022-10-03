import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    
    missions: {
        clearMissions:[],
        unclearMissions:[0,1,2,3,4]}
    }

const courseSlice = createSlice({
    name:'course',
    initialState,
    reducers:{
        setCourse(state, action){
        state.missions = action.payload.missions
    },
},
extraReducers: builder => {},
})
export default courseSlice;