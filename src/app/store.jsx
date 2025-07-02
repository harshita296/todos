import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todosSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    user: userReducer,
  },
});
