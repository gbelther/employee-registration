import { createSlice } from "@reduxjs/toolkit";

import { IError } from "../../errors/IError";
import { IEmployeeDTO } from "../../services/employeesService/dtos/EmployeeDTO";
import { createEmployee, listByCompanyId, updateEmployee } from "./thunks";

interface IEmployeesState {
  loading: boolean;
  data: IEmployeeDTO[] | null;
  error: IError | null;
}

const initialState: IEmployeesState = {
  loading: false,
  data: null,
  error: null,
};

const userSlice = createSlice({
  name: "employees",
  initialState: initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(listByCompanyId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    addCase(listByCompanyId.fulfilled, (state, { payload }) => {
      const data = payload;

      state.loading = false;
      state.error = null;
      state.data = data;
    });
    addCase(listByCompanyId.rejected, (state, { payload }) => {
      const error: IError = {
        message: (payload as IError).message,
        statusCode: (payload as IError).statusCode,
      };

      state.loading = false;
      state.error = error;
    });

    addCase(createEmployee.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    addCase(createEmployee.fulfilled, (state, { payload }) => {
      const data = payload;

      state.loading = false;
      state.error = null;

      if (state.data && state.data[0].id_company === data.id_company) {
        state.data.push(data);
      }
    });
    addCase(createEmployee.rejected, (state, { payload }) => {
      const error: IError = {
        message: (payload as IError).message,
        statusCode: (payload as IError).statusCode,
      };

      state.loading = false;
      state.error = error;
    });

    addCase(updateEmployee.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    addCase(updateEmployee.fulfilled, (state, { payload }) => {
      const data = payload;

      state.loading = false;
      state.error = null;

      if (state.data && state.data[0].id_company === data.id_company) {
        state.data = state.data.map((employee) => {
          if (employee.id === data.id) {
            return data;
          }

          return employee;
        });
      }
    });
    addCase(updateEmployee.rejected, (state, { payload }) => {
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
