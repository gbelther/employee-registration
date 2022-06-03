import { ICityDTO } from "../../citiesService/dtos/CityDTO";
import { IRoleDTO } from "../../rolesService/dtos/IRoleDTO";
import { ISectorDTO } from "../../sectorService/dtos/SectorDTO";
import { IStateDTO } from "../../statesService/dtos/StateDTO";

interface ICityEmployeeDTO extends ICityDTO {
  state: IStateDTO;
}

interface IRoleEmployeeDTO extends IRoleDTO {
  sector: ISectorDTO;
}

export interface IEmployeeDTO {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  birthday: string;
  street: string;
  number: string;
  city: ICityEmployeeDTO;
  uf: string;
  email: string;
  phone: string;
  role: IRoleEmployeeDTO;
  id_company: string;
  is_active: boolean;
}
