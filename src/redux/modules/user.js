import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = {
        uid: action.payload.email,
        displayName: action.payload.displayName,
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

export const { setUser, setLoggedIn, setLoading } = userSlice.actions;

export default userSlice.reducer;
