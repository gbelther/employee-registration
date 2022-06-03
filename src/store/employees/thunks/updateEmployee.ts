import { createAsyncThunk } from "@reduxjs/toolkit";

import { ErrorHandling } from "../../../errors/errorHandling";
import { EmployeesService } from "../../../services/employeesService";
import { IEmployeeDTO } from "../../../services/employeesService/dtos/EmployeeDTO";

interface IPayload {
  employee: IEmployeeDTO;
}

export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ employee }: IPayload, { rejectWithValue }) => {
    try {
      const response = await EmployeesService.updateEmployee(employee);

      return response.data;
    } catch (error) {
      const errorHandling = new ErrorHandling(error);
      return rejectWithValue(errorHandling.error);
    }
  }
);
