import { AxiosResponse } from "axios";

import { api } from "../api";
import { IEmployeeDTO } from "./dtos/EmployeeDTO";

export class EmployeesService {
  public static async listByCompanyId(
    id: string
  ): Promise<AxiosResponse<IEmployeeDTO[]>> {
    return await api.get<IEmployeeDTO[]>("/employees", {
      params: {
        id_company: id,
      },
    });
  }

  public static async createEmployee(
    employee: Omit<IEmployeeDTO, "id">
  ): Promise<AxiosResponse<IEmployeeDTO>> {
    return await api.post<IEmployeeDTO>("/employees", employee);
  }

  public static async updateEmployee(
    employee: IEmployeeDTO
  ): Promise<AxiosResponse<IEmployeeDTO>> {
    return await api.put<IEmployeeDTO>(`/employees/${employee.id}`, employee);
  }
}
