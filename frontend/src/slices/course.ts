import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    stores: [
        {name: "홍씨 고깃집먹으러가자",
    image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA5MDJfMjM1%2FMDAxNjYyMTA5MDk3Njcx.ayvBzFbHugL03yMrrSYJ-4qqBVHjVT7W83CVQ6FkY2og.vshkd-ZSSYK2yJtEfyMJhlt6wovfMPPX5i0_grtLh-gg.JPEG.bomin78%2FDSCF9485.JPG&type=a340",
    id:10,
    tags: ["맛집","분위기가 좋은", "가성비","한식"],
    location : {latitude:37.53698, longitude:127.0017},
    mission: "돈을 줍자!"},
    ],
    missions: {
        clear:[1,2,4],
        unclear:[3,5]}
    }

const courseSlice = createSlice({
    name:'course',
    initialState,
    reducers:{
        setCourse(state, action){
        state.stores = action.payload.stores,
        state.missions = action.payload.missions
    },
},
extraReducers: builder => {},
})
export default courseSlice;