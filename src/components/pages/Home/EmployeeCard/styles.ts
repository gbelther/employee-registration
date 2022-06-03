import styled from "styled-components";
import { AiTwotoneEdit } from "react-icons/ai";

import colors from "../../../../styles/colors";

export const Container = styled.div`
  background-color: ${colors.mostlyWhite};
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
  min-width: 365px;
  max-width: 520px;
  border-radius: 8px;
  padding: 0.5rem 3rem 0.5rem 0.5rem;

  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0.5rem;
  position: relative;

  @media (max-width: 524px) {
    display: flex;
    flex-direction: column;
  }
`;

export const PersonalData = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;

  &:last-child {
    grid-column: span 2;
  }
`;

export const DataTitle = styled.p`
  color: ${colors.darkBlue};
  font-size: 0.75rem;
  font-weight: 700;
`;

export const DataDescription = styled.p`
  color: ${colors.black};
  font-size: 0.875rem;
  font-weight: 400;
`;

export const ButtonOptions = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background-color: ${colors.veryDarkGray};
  border: 1px solid ${colors.veryDarkGray};
  border-radius: 4px;
  transition: 0.3s;

  &:hover {
    background-color: ${colors.darkBlue};
    filter: brightness(0.7);
  }
`;

export const IconEdit = styled(AiTwotoneEdit).attrs({
  size: "1.25rem",
  color: colors.mostlyWhite,
})``;
