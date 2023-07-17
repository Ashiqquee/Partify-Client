import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: null,
    name: null,
    token: null,
    id:null,
};

export const providerAuthSlice = createSlice({
    name: "providerAuth",
    initialState,
    reducers: {
        providerLogin: (state, action) => {
            state.role = action.payload.user;
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },

        providerLogout: (state) => {
            state.role = null;
            state.name = null;
            state.token = null;
            state.id = null;
        }
    }
});

export const { providerLogin, providerLogout } = providerAuthSlice.actions;

export default providerAuthSlice.reducer;
