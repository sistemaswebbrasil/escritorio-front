import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
  loading: false,
  isChecked: false,
};

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      localStorage.setItem("user", action.payload.email);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isChecked", action.payload.checked);
      state.user = action.payload.email;
      state.token = action.payload.token;
      state.isChecked = action.payload.checked;
    },

    setUnauthenticated(state) {
      if (!state.isChecked) localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = "";
      state.token = "";
      state.loading = false;
    },

    isAuthenticate(state) {
      state.user = localStorage.getItem("user") as string;
      state.token = localStorage.getItem("token") as string;
      state.isChecked = Boolean(localStorage.getItem("isChecked"));
    },
  },
});

export default login.reducer;

export const { setAuthenticated, setUnauthenticated, isAuthenticate } =
  login.actions;
