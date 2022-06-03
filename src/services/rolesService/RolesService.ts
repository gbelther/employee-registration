import { AxiosResponse } from "axios";

import { api } from "../api";
import { IRoleDTO } from "./dtos/IRoleDTO";

export class RolesService {
  public static async listByIdSector(
    id: string
  ): Promise<AxiosResponse<IRoleDTO[]>> {
    return await api.get<IRoleDTO[]>("/roles", {
      params: {
        id_sector: id,
      },
    });
  }
}
