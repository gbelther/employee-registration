import { createSlice } from "@reduxjs/toolkit";

import { IError } from "../../errors/IError";
import { ICompanyDTO } from "../../services/companiesService/dtos/CompanyDTO";
import { listCompanies } from "./thunks";

interface ICompaniesState {
  loading: boolean;
  data: ICompanyDTO[] | null;
  error: IError | null;
}

const initialState: ICompaniesState = {
  loading: false,
  data: null,
  error: null,
};

const userSlice = createSlice({
  name: "companies",
  initialState: initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(listCompanies.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    addCase(listCompanies.fulfilled, (state, { payload }) => {
      const data = payload;

      state.loading = false;
      state.error = null;
      state.data = data;
    });
    addCase(listCompanies.rejected, (state, { payload }) => {
      const error: IError = {
        message: (payload as IError).message,
        statusCode: (payload as IError).statusCode,
      };

      state.loading = false;
      state.error = error;
    });
  },
});

export default userSlice.reducer;
