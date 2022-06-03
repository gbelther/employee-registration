import { createAsyncThunk } from "@reduxjs/toolkit";

import { ErrorHandling } from "../../../errors/errorHandling";
import { CompaniesService } from "../../../services/companiesService";

export const listCompanies = createAsyncThunk(
  "companies/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CompaniesService.list();

      return response.data;
    } catch (error) {
      const errorHandling = new ErrorHandling(error);
      return rejectWithValue(errorHandling.error);
    }
  }
);
