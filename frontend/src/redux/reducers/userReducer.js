import { createReducer } from "@reduxjs/toolkit";
// import { useReducer } from "react";

export const userReducer = createReducer(
  {},
  {
    loginRequest: (state) => {
      state.loading = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAunthicated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.isAunthicated = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
