import {createSlice} from '@reduxjs/toolkit';
const initialState = {    
    missions: {
        clearMissions:[0],
        unclearMissions:[1,2,3,4]}
    }

const courseSlice = createSlice({
    name:'course',
    initialState,
    reducers:{
        setCourse(state, action){
        state.missions.clearMissions += action.payload.missions.clearMissions
        console.log(state.missions.clearMissions);
    },
},
extraReducers: builder => {},
})
export default courseSlice;