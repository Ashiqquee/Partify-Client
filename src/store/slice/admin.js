import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: null,
    name: null,
    token: null
};

export const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        adminLogin: (state, action) => {
            state.role = action.payload.user;
            state.name = action.payload.name;
            state.token = action.payload.token;
        },

        adminLogout: (state) => {
            state.role = null;
            state.name = null;
            state.token = null;
        }
    }
});

export const { adminLogin, adminLogout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
