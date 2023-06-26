import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role:null,
    name:null,
    token:null,
};

export const userAuthSlice = createSlice({
    name:"userAuth",
    initialState,
    reducers:{
        userLogin : (state,action) => {
            state.role = action.payload.user;
            state.name = action.payload.name;
            state.token = action.payload.token;
        },
        
        userLogout : (state) => {
            state.role = null;
            state.name = null;
            state.token = null;
        }
    }
});

export const { userLogin, userLogout } = userAuthSlice.actions;

export default userAuthSlice.reducer;
