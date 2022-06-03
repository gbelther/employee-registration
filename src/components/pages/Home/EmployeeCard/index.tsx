import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";

import { IEmployeeDTO } from "../../../../services/employeesService/dtos/EmployeeDTO";
import { cpfMask, telMask } from "../../../../utils/inputMasks";
import { ModalEmployee } from "../ModalEmployee";

import * as Sty from "./styles";

interface IEmployeeCardProps {
  employeeData: IEmployeeDTO;
}

export function EmployeeCard({ employeeData }: IEmployeeCardProps) {
  const [showModalEmployee, setShowModalEmployee] = useState(false);

  const employeeDataFormatted = useMemo(() => {
    return {
      ...employeeData,
      cpf: cpfMask(employeeData.cpf),
      phone: telMask(employeeData.phone),
      birthday: format(new Date(employeeData.birthday), "dd/MM/yyyy"),
      fullAddress: `${employeeData.street}, ${employeeData.number}, ${employeeData.city.name}/${employeeData.city.state.name}`,
    };
  }, [employeeData]);

  return (
    <Fragment>
      <Sty.Container>
        <Sty.ButtonOptions>
          <Sty.IconEdit onClick={() => setShowModalEmployee(true)} />
        </Sty.ButtonOptions>
        <Sty.PersonalData>
          <Sty.DataTitle>Nome</Sty.DataTitle>
          <Sty.DataDescription>
            {employeeDataFormatted.name}
          </Sty.DataDescription>
        </Sty.PersonalData>
        <Sty.PersonalData>
          <Sty.DataTitle>CPF</Sty.DataTitle>
          <Sty.DataDescription>{employeeDataFormatted.cpf}</Sty.DataDescription>
        </Sty.PersonalData>
        <Sty.PersonalData>
          <Sty.DataTitle>RG</Sty.DataTitle>
          <Sty.DataDescription>{employeeDataFormatted.rg}</Sty.DataDescription>
        </Sty.PersonalData>
        <Sty.PersonalData>
          <Sty.DataTitle>Data de Nascimento</Sty.DataTitle>
          <Sty.DataDescription>
            {employeeDataFormatted.birthday}
          </Sty.DataDescription>
        </Sty.PersonalData>
        <Sty.PersonalData>
          <Sty.DataTitle>Email</Sty.DataTitle>
          <Sty.DataDescription>
            {employeeDataFormatted.email}
          </Sty.DataDescription>
        </Sty.PersonalData>
        <Sty.PersonalData>
          <Sty.DataTitle>Telefone</Sty.DataTitle>
          <Sty.DataDescription>
            {employeeDataFormatted.phone}
          </Sty.DataDescription>
        </Sty.PersonalData>
        <Sty.PersonalData>
          <Sty.DataTitle>Setor</Sty.DataTitle>
          <Sty.DataDescription>
            {employeeDataFormatted.role.sector.name}
          </Sty.DataDescription>
        </Sty.PersonalData>
        <Sty.PersonalData>
          <Sty.DataTitle>Cargo</Sty.DataTitle>
          <Sty.DataDescription>
            {employeeDataFormatted.role.name}
          </Sty.DataDescription>
        </Sty.PersonalData>
        <Sty.PersonalData>
          <Sty.DataTitle>Endereço</Sty.DataTitle>
          <Sty.DataDescription>
            {employeeDataFormatted.fullAddress}
          </Sty.DataDescription>
        </Sty.PersonalData>
      </Sty.Container>

      {showModalEmployee && (
        <ModalEmployee
          isOpen={showModalEmployee}
          onRequestClose={() => setShowModalEmployee(false)}
          currentData={employeeData}
        />
      )}
    </Fragment>
  );
}
