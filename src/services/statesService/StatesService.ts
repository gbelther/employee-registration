import { AxiosResponse } from "axios";

import { api } from "../api";
import { IStateDTO } from "./dtos/StateDTO";

export class StatesService {
  public static async list(): Promise<AxiosResponse<IStateDTO[]>> {
    return await api.get<IStateDTO[]>("/states");
  }
}
