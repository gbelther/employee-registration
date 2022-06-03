import { Fragment, useEffect, useState } from "react";

import { ActionBar, Navbar, Spinner } from "../../../global";
import { EmployeeCard, ModalEmployee } from "..";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { listByCompanyId } from "../../../../store/employees/thunks";
import { listCompanies } from "../../../../store/companies/thunks";

import * as Sty from "./styles";

interface ICompanyOption {
  value: string;
  label: string;
}

export function Container() {
  const dispatch = useAppDispatch();
  const companiesReducer = useAppSelector((state) => state.companies);
  const employeesReducer = useAppSelector((state) => state.employees);

  const [showModalEmployee, setShowModalEmployee] = useState(false);
  const [companiesOptions, setCompaniesOptions] = useState<ICompanyOption[]>(
    []
  );
  const [currentCompany, setCurrentCompany] = useState<ICompanyOption | null>(
    null
  );

  function handleShowModalEmployee() {
    setShowModalEmployee(true);
  }

  function renderSpinner() {
    return (
      <Sty.ContainerFeedback>
        <Spinner />
      </Sty.ContainerFeedback>
    );
  }

  function renderFeedbackError(error: string) {
    return (
      <Sty.ContainerFeedback>
        <Sty.FeedbackError>{error}</Sty.FeedbackError>
      </Sty.ContainerFeedback>
    );
  }

  function renderEmployeesFeedback() {
    if (employeesReducer.loading) {
      return renderSpinner();
    }

    if (employeesReducer.error) {
      return renderFeedbackError(employeesReducer.error.message);
    }
  }

  useEffect(() => {
    setCompaniesOptions(
      companiesReducer.data?.map((company) => ({
        value: company.id,
        label: company.name,
      }))
    );
  }, [companiesReducer.data]);

  useEffect(() => {
    dispatch(listCompanies());
  }, [dispatch]);

  useEffect(() => {
    if (currentCompany) {
      dispatch(listByCompanyId({ id: currentCompany.value }));
    }
  }, [dispatch, currentCompany]);

  if (companiesReducer.loading) {
    return renderSpinner();
  }

  if (companiesReducer.error) {
    return renderFeedbackError(companiesReducer.error.message);
  }

  return (
    <Fragment>
      <Sty.Container>
        <Navbar />
        <Sty.ContentContainer>
          <ActionBar
            selectOptions={companiesOptions}
            onSelectOption={(option) => setCurrentCompany(option)}
            onAddItem={handleShowModalEmployee}
          />
          {employeesReducer.loading || employeesReducer.error ? (
            renderEmployeesFeedback()
          ) : (
            <Sty.EmployeeCardList>
              {employeesReducer.data?.map((employee) => (
                <EmployeeCard key={employee.id} employeeData={employee} />
              ))}
            </Sty.EmployeeCardList>
          )}
        </Sty.ContentContainer>
      </Sty.Container>
      {showModalEmployee && (
        <ModalEmployee
          isOpen={showModalEmployee}
          onRequestClose={() => setShowModalEmployee(false)}
        />
      )}
    </Fragment>
  );
}
