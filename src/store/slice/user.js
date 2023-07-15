import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role:null,
    name:null,
    token:null,
    id:null,
};

export const userAuthSlice = createSlice({
    name:"userAuth",
    initialState,
    reducers:{
        userLogin : (state,action) => {
            console.log(action.payload);
            state.role = action.payload.user;
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.id = action.payload.id;

        },
        
        userLogout : (state) => {
            state.role = null;
            state.name = null;
            state.token = null;
            state.id = null;
        }
    }
});

export const { userLogin, userLogout } = userAuthSlice.actions;

export default userAuthSlice.reducer;
