/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { format } from "date-fns";

import {
  cleanMaskNumber,
  cpfMask,
  telMask,
} from "../../../../utils/inputMasks";
import { ErrorHandling } from "../../../../errors/errorHandling";
import { IEmployeeDTO } from "../../../../services/employeesService/dtos/EmployeeDTO";
import { CitiesService } from "../../../../services/citiesService";
import { StatesService } from "../../../../services/statesService";
import { IStateDTO } from "../../../../services/statesService/dtos/StateDTO";
import { ICityDTO } from "../../../../services/citiesService/dtos/CityDTO";
import { IRoleDTO } from "../../../../services/rolesService/dtos/IRoleDTO";
import { ISectorDTO } from "../../../../services/sectorService/dtos/SectorDTO";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { SectorService } from "../../../../services/sectorService";
import { RolesService } from "../../../../services/rolesService";

import * as Sty from "./styles";
import {
  createEmployee,
  updateEmployee,
} from "../../../../store/employees/thunks";
import { Spinner } from "../../../global";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface IEmployeeForm {
  id?: string;
  name: string;
  cpf: string;
  rg: string;
  birthday: string;
  street: string;
  number: string;
  uf: string;
  id_city: string;
  email: string;
  phone: string;
  id_sector: string;
  id_role: string;
  id_company: string;
}

interface IModalEmployeeProps {
  isOpen: boolean;
  onRequestClose: () => void;
  currentData?: IEmployeeDTO;
}

const schema = yup.object().shape(
  {
    name: yup.string().required("Campo obrigatório"),
    cpf: yup.string().min(11, "CPF inválido").required("Campo obrigatório"),
    rg: yup.string().required("Campo obrigatório"),
    birthday: yup.date().required("Campo obrigatório"),
    street: yup.string().required("Campo obrigatório"),
    number: yup.string().required("Campo obrigatório"),
    uf: yup.string().required("Campo obrigatório"),
    id_city: yup.string().required("Campo obrigatório"),
    email: yup
      .string()
      .email("E-mail inválido")
      .when("phone", {
        is: (phone) => !phone || phone.length === 0,
        then: yup.string().email().required("Necessário E-mail ou Telefone"),
        otherwise: yup.string(),
      }),
    phone: yup.string().when("email", {
      is: (email) => !email || email.length === 0,
      then: yup.string().required("Necessário E-mail ou Telefone"),
      otherwise: yup.string(),
    }),
    id_sector: yup.string().required("Campo obrigatório"),
    id_role: yup.string().required("Campo obrigatório"),
    id_company: yup.string().required("Campo obrigatório"),
  },
  [["email", "phone"]]
);

export function ModalEmployee({
  isOpen,
  onRequestClose,
  currentData,
}: IModalEmployeeProps) {
  const dispatch = useAppDispatch();
  const companiesReducer = useAppSelector((state) => state.companies);
  const employeesReducer = useAppSelector((state) => state.employees);

  const [states, setStates] = useState<IStateDTO[]>([]);
  const [cities, setCities] = useState<ICityDTO[]>([]);
  const [sectors, setSectors] = useState<ISectorDTO[]>([]);
  const [roles, setRoles] = useState<IRoleDTO[]>([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingSectors, setLoadingSectors] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IEmployeeForm>({
    resolver: yupResolver(schema),
    defaultValues: currentData && {
      id: currentData.id,
      name: currentData.name,
      cpf: currentData.cpf,
      rg: currentData.rg,
      birthday: currentData.birthday,
      street: currentData.street,
      number: currentData.number,
      id_city: currentData.city.id,
      uf: currentData.city.id_state,
      email: currentData.email,
      phone: currentData.phone,
      id_sector: currentData.role.id_sector,
      id_role: currentData.role.id,
      id_company: currentData.id_company,
    },
  });

  const ufWatch = watch("uf");
  const sectorWatch = watch("id_sector");

  async function handleSubmitForm(data: IEmployeeForm) {
    const newCity = cities.find(
      (cityIterator) => cityIterator.id === data.id_city
    );
    const newState = states.find(
      (stateIterator) => stateIterator.id === newCity?.id_state
    );
    const newRole = roles.find(
      (roleIterator) => roleIterator.id === data.id_role
    );
    const newSector = sectors.find(
      (sectorIterator) => sectorIterator.id === newRole?.id_sector
    );

    if (newCity && newState && newRole && newSector) {
      const submitDataFormatted: IEmployeeDTO = {
        id: currentData?.id,
        name: data.name,
        cpf: data.cpf,
        rg: data.rg,
        birthday: data.birthday,
        street: data.street,
        number: data.number,
        city: {
          ...newCity,
          state: newState,
        },
        uf: data.uf,
        email: data.email,
        phone: data.phone,
        role: {
          ...newRole,
          sector: newSector,
        },
        id_company: data.id_company,
      };

      setLoadingSubmit(true);

      if (currentData) {
        updateCurrentEmployee(submitDataFormatted);
      } else {
        createNewEmployee(submitDataFormatted);
      }
    } else {
      alert("Erro desconhecido");
    }
  }

  function createNewEmployee(data: IEmployeeDTO) {
    dispatch(
      createEmployee({
        employee: data,
      })
    );
  }

  function updateCurrentEmployee(data: IEmployeeDTO) {
    dispatch(
      updateEmployee({
        employee: data,
      })
    );
  }

  async function listStates() {
    setLoadingStates(true);
    try {
      const response = await StatesService.list();
      setStates(response.data);
    } catch (error) {
      const errorHandling = new ErrorHandling(error);
      alert(errorHandling.error);
      onRequestClose();
    } finally {
      setLoadingStates(false);
    }
  }

  async function listCities(id_state: string) {
    setLoadingCities(true);
    try {
      const response = await CitiesService.listByIdState(id_state);
      setCities(response.data);
    } catch (error) {
      const errorHandling = new ErrorHandling(error);
      alert(errorHandling.error);
      onRequestClose();
    } finally {
      setLoadingCities(false);
    }
  }

  async function listSectors() {
    setLoadingSectors(true);
    try {
      const response = await SectorService.list();
      setSectors(response.data);
    } catch (error) {
      const errorHandling = new ErrorHandling(error);
      alert(errorHandling.error);
      onRequestClose();
    } finally {
      setLoadingSectors(false);
    }
  }

  async function listRoles(id_sector: string) {
    setLoadingRoles(true);
    try {
      const response = await RolesService.listByIdSector(id_sector);
      setRoles(response.data);
    } catch (error) {
      const errorHandling = new ErrorHandling(error);
      alert(errorHandling.error);
      onRequestClose();
    } finally {
      setLoadingRoles(false);
    }
  }

  function formatDate(date: string) {
    if (date) {
      const value = new Date(date);
      const formatted = format(value, "yyyy-MM-dd");
      return formatted;
    }
    return undefined;
  }

  function renderFeedbackLoading() {
    return <Spinner />;
  }

  useEffect(() => {
    if (!employeesReducer.loading) {
      if (loadingSubmit) {
        setLoadingSubmit(false);
        onRequestClose();
      }
    }
  }, [employeesReducer.loading]);

  useEffect(() => {
    if (ufWatch) {
      listCities(ufWatch);
    }
  }, [ufWatch]);

  useEffect(() => {
    if (sectorWatch) {
      listRoles(sectorWatch);
    }
  }, [sectorWatch]);

  useEffect(() => {
    Promise.all([listStates(), listSectors()]);
  }, []);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <Sty.ModalHeader>
        <Sty.Title>{currentData ? "Editar" : "Cadastrar"}</Sty.Title>
        <Sty.IconClose onClick={onRequestClose} />
      </Sty.ModalHeader>
      <Sty.ModalBody
        id="employee-form"
        noValidate
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <Sty.InputGroup>
          <Sty.InputWrapper>
            <Sty.InputLabel>Nome</Sty.InputLabel>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Sty.Input
                  type="text"
                  name="name"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Sty.InputError>{errors.name?.message}</Sty.InputError>
          </Sty.InputWrapper>
          <Sty.InputWrapper>
            <Sty.InputLabel>CPF</Sty.InputLabel>
            <Controller
              name="cpf"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Sty.Input
                  type="text"
                  name="cpf"
                  maxLength={14}
                  value={cpfMask(value)}
                  onChange={(event) =>
                    onChange(cleanMaskNumber(event.target.value))
                  }
                  onBlur={onBlur}
                />
              )}
            />
            <Sty.InputError>{errors.cpf?.message}</Sty.InputError>
          </Sty.InputWrapper>
        </Sty.InputGroup>
        <Sty.InputGroup>
          <Sty.InputWrapper>
            <Sty.InputLabel>RG</Sty.InputLabel>
            <Controller
              name="rg"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Sty.Input
                  type="text"
                  name="rg"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Sty.InputError>{errors.rg?.message}</Sty.InputError>
          </Sty.InputWrapper>
          <Sty.InputWrapper>
            <Sty.InputLabel>Data de Nascimento</Sty.InputLabel>
            <Controller
              name="birthday"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Sty.Input
                  type="date"
                  name="birthday"
                  value={formatDate(value)}
                  onChange={(event) =>
                    new Date(event.target.value).getFullYear() > 999 &&
                    onChange(new Date(event.target.value))
                  }
                  onBlur={onBlur}
                />
              )}
            />
            <Sty.InputError>{errors.birthday?.message}</Sty.InputError>
          </Sty.InputWrapper>
        </Sty.InputGroup>
        <Sty.InputGroup>
          <Sty.InputWrapper>
            <Sty.InputLabel>Rua</Sty.InputLabel>
            <Controller
              name="street"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Sty.Input
                  type="text"
                  name="street"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Sty.InputError>{errors.street?.message}</Sty.InputError>
          </Sty.InputWrapper>
          <Sty.InputWrapper>
            <Sty.InputLabel>Número</Sty.InputLabel>
            <Controller
              name="number"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Sty.Input
                  type="number"
                  name="number"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Sty.InputError>{errors.number?.message}</Sty.InputError>
          </Sty.InputWrapper>
        </Sty.InputGroup>
        <Sty.InputGroup>
          <Sty.InputWrapper>
            <Sty.InputLabel>Estado (UF)</Sty.InputLabel>
            {loadingStates ? (
              renderFeedbackLoading()
            ) : (
              <Controller
                name="uf"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Sty.Select value={value} onChange={onChange}>
                    <option value="0" disabled selected>
                      Selecione
                    </option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </Sty.Select>
                )}
              />
            )}
            <Sty.InputError>{errors.uf?.message}</Sty.InputError>
          </Sty.InputWrapper>
          <Sty.InputWrapper>
            <Sty.InputLabel>Cidade</Sty.InputLabel>
            {loadingCities ? (
              renderFeedbackLoading()
            ) : (
              <Controller
                name="id_city"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Sty.Select value={value} onChange={onChange}>
                    <option value="0" disabled selected>
                      Selecione
                    </option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Sty.Select>
                )}
              />
            )}
            <Sty.InputError>{errors.id_city?.message}</Sty.InputError>
          </Sty.InputWrapper>
        </Sty.InputGroup>
        <Sty.InputGroup>
          <Sty.InputWrapper>
            <Sty.InputLabel>Email</Sty.InputLabel>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Sty.Input
                  type="email"
                  name="email"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Sty.InputError>{errors.email?.message}</Sty.InputError>
          </Sty.InputWrapper>
          <Sty.InputWrapper>
            <Sty.InputLabel>Telephone</Sty.InputLabel>
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Sty.Input
                  type="text"
                  name="phone"
                  value={telMask(value)}
                  onChange={(event) =>
                    onChange(cleanMaskNumber(event.target.value))
                  }
                  onBlur={onBlur}
                />
              )}
            />
            <Sty.InputError>{errors.phone?.message}</Sty.InputError>
          </Sty.InputWrapper>
        </Sty.InputGroup>
        <Sty.InputGroup>
          <Sty.InputWrapper>
            <Sty.InputLabel>Setor</Sty.InputLabel>
            {loadingSectors ? (
              renderFeedbackLoading()
            ) : (
              <Controller
                name="id_sector"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Sty.Select value={value} onChange={onChange}>
                    <option value="0" disabled selected>
                      Selecione
                    </option>
                    {sectors.map((sector) => (
                      <option key={sector.id} value={sector.id}>
                        {sector.name}
                      </option>
                    ))}
                  </Sty.Select>
                )}
              />
            )}
            <Sty.InputError>{errors.id_sector?.message}</Sty.InputError>
          </Sty.InputWrapper>
          <Sty.InputWrapper>
            <Sty.InputLabel>Cargo</Sty.InputLabel>
            {loadingRoles ? (
              renderFeedbackLoading()
            ) : (
              <Controller
                name="id_role"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Sty.Select value={value} onChange={onChange}>
                    <option value="0" disabled selected>
                      Selecione
                    </option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </Sty.Select>
                )}
              />
            )}
            <Sty.InputError>{errors.id_role?.message}</Sty.InputError>
          </Sty.InputWrapper>
        </Sty.InputGroup>
        <Sty.InputWrapper>
          <Sty.InputLabel>Empresa</Sty.InputLabel>
          <Controller
            name="id_company"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Sty.Select value={value} onChange={onChange}>
                <option value="0" disabled selected>
                  Selecione
                </option>
                {companiesReducer.data?.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </Sty.Select>
            )}
          />
          <Sty.InputError>{errors.id_company?.message}</Sty.InputError>
        </Sty.InputWrapper>
      </Sty.ModalBody>
      <Sty.ModalFooter>
        <Sty.Button type="button" onClick={onRequestClose}>
          Cancelar
        </Sty.Button>
        <Sty.Button mode="save" type="submit" form="employee-form">
          Salvar
        </Sty.Button>
      </Sty.ModalFooter>
    </Modal>
  );
}
