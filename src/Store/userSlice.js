import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loginError: "",
    isLoggedIn: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find((user) => user.email === email);

      if (user) {
        if (user.password === password) {
          state.isLoggedIn = true;
          state.loginError = "";
        } else {
          state.isLoggedIn = false;
          state.loginError = "Wrong credentials";
        }
      } else {
        state.isLoggedIn = false;
        state.loginError = "User not found";
      }
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.loginError = "";
    },
  },
});

export const { addUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
