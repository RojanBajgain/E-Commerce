import { configureStore } from "@reduxjs/toolkit";
import userReducer, { setUser, clearUser } from "./user.slice";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
export { setUser, clearUser };
