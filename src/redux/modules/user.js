import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    email: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        email: action.payload.email,
      };
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setLoggedIn, setLoading } = user.actions;

export default user.reducer;
