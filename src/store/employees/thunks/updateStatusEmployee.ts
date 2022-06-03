import { createAsyncThunk } from "@reduxjs/toolkit";

import { ErrorHandling } from "../../../errors/errorHandling";
import { EmployeesService } from "../../../services/employeesService";
import { IEmployeeDTO } from "../../../services/employeesService/dtos/EmployeeDTO";

interface IPayload {
  id: string;
  isActive: boolean;
}

export const updateStatusEmployee = createAsyncThunk(
  "employee/update_status",
  async ({ id, isActive }: IPayload, { rejectWithValue }) => {
    try {
      const response = await EmployeesService.updateStatusEmployee(
        id,
        isActive
      );

      return response.data;
    } catch (error) {
      const errorHandling = new ErrorHandling(error);
      return rejectWithValue(errorHandling.error);
    }
  }
);
