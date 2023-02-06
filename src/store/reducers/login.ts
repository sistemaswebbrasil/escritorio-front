import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
  loading: false,
};

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      localStorage.setItem("user", action.payload.email);
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.email;
      state.token = action.payload.token;
    },

    setUnauthenticated(state) {
      state = initialState;
      localStorage.clear();
    },

    isAuthenticate(state) {
      state.user = localStorage.getItem("user") as string;
      state.token = localStorage.getItem("token") as string;
    },
  },
});

export default login.reducer;

export const { setAuthenticated, setUnauthenticated, isAuthenticate } =
  login.actions;
