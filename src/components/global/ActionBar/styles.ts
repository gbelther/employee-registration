import styled from "styled-components";
import { IoMdAdd } from "react-icons/io";

import colors from "../../../styles/colors";

export const Container = styled.header`
  padding: 0.25rem 0;
  border-bottom: 1px solid ${colors.darkBlue};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StartOptions = styled.section``;
export const EndOptions = styled.section``;

export const AddButton = styled.button`
  background-color: ${colors.darkBlue};
  border-color: ${colors.darkBlue};
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconAdd = styled(IoMdAdd).attrs({
  color: colors.mostlyWhite,
  size: 16,
})``;
