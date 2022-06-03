import { AxiosResponse } from "axios";

import { api } from "../api";
import { ICompanyDTO } from "./dtos/CompanyDTO";

export class CompaniesService {
  public static async list(): Promise<AxiosResponse<ICompanyDTO[]>> {
    return await api.get<ICompanyDTO[]>("/companies");
  }
}
