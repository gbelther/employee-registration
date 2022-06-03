import { createAsyncThunk } from "@reduxjs/toolkit";

import { ErrorHandling } from "../../../errors/errorHandling";
import { EmployeesService } from "../../../services/employeesService";

interface IPayload {
  id: string;
}

export const listByCompanyId = createAsyncThunk(
  "employee/listByCompanyId",
  async ({ id }: IPayload, { rejectWithValue }) => {
    try {
      const response = await EmployeesService.listByCompanyId(id);

      return response.data;
    } catch (error) {
      const errorHandling = new ErrorHandling(error);
      return rejectWithValue(errorHandling.error);
    }
  }
);
