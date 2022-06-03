import { AxiosResponse } from "axios";

import { api } from "../api";
import { ISectorDTO } from "./dtos/SectorDTO";

export class SectorService {
  public static async list(): Promise<AxiosResponse<ISectorDTO[]>> {
    return await api.get<ISectorDTO[]>("/sectors");
  }
}
