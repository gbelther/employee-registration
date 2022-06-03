import { AxiosResponse } from "axios";

import { api } from "../api";
import { ICityDTO } from "./dtos/CityDTO";

export class CitiesService {
  public static async listByIdState(
    id: string
  ): Promise<AxiosResponse<ICityDTO[]>> {
    return await api.get<ICityDTO[]>("/cities", {
      params: {
        id_state: id,
      },
    });
  }
}
