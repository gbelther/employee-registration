import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import companiesSlice from "./companies/companiesSlice";
import employeesSlice from "./employees/employeesSlice";

export const store = configureStore({
  reducer: {
    employees: employeesSlice,
    companies: companiesSlice,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
