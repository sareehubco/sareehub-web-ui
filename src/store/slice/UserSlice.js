import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    email: null,
    authenticated: false,
    firstName: null,
    lastName: null,
    phone: null,
};

const userSlice = createSlice({
    name: "user", initialState,
    reducers: {
        setEmail: (state, action) => {
          state.email = action.payload;
        },
        setUsername: (state, action) => {
          state.username = action.payload;
        },
        setAuthenticated: (state, action) => {
          state.authenticated = action.payload;
        },
        setFirstName: (state, action) => {
          state.firstName = action.payload;
        },
        setLastName: (state, action) => {
          state.lastName = action.payload;
        },
        setPhone: (state, action) => {
          state.phone = action.payload;
        },
        removeUser: (state) => {
          state.username = null;
          state.email = null;
          state.authenticated = false;
          state.firstName = null;
          state.lastName = null;
          state.phone = null;
        }
  }
});

export const {
    setEmail,
    setUsername,
    setAuthenticated,
    setFirstName,
    setLastName,
    setPhone,
    removeUser
} = userSlice.actions;

export default userSlice.reducer;
