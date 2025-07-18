import { configureStore } from "@reduxjs/toolkit";

const placeholderReducer = (state = {}) => state;

export const makeStore = () => {
  return configureStore({
    reducer: placeholderReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
