import { createAsyncThunk } from "@reduxjs/toolkit";

import { ErrorHandling } from "../../../errors/errorHandling";
import { EmployeesService } from "../../../services/employeesService";
import { IEmployeeDTO } from "../../../services/employeesService/dtos/EmployeeDTO";

interface IPayload {
  employee: Omit<IEmployeeDTO, "id">;
}

export const createEmployee = createAsyncThunk(
  "employee/create",
  async ({ employee }: IPayload, { rejectWithValue }) => {
    try {
      const response = await EmployeesService.createEmployee(employee);

      return response.data;
    } catch (error) {
      const errorHandling = new ErrorHandling(error);
      return rejectWithValue(errorHandling.error);
    }
  }
);
