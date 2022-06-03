import styled, { css } from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

import colors from "../../../../styles/colors";

interface IButtonProps {
  mode?: "save" | "cancel";
}

export const ModalHeader = styled.header`
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.lightGray};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

export const Title = styled.p`
  color: ${colors.black};
  font-size: 1.25rem;
  font-weight: 700;
`;

export const IconClose = styled(AiOutlineClose).attrs({
  size: 16,
  color: colors.black,
})`
  cursor: pointer;
`;

export const ModalBody = styled.form`
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputWrapper = styled.section`
  display: grid;
  grid-template-rows: auto 1fr 0.75rem;
`;

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

export const InputLabel = styled.label`
  color: ${colors.darkGray};
  font-size: 0.75rem;
  font-weight: 700;
`;

export const Input = styled.input`
  padding: 4px 0;
  border: none;
  border-bottom: 1px solid ${colors.darkGray};
  outline: none;
  font-size: 0.875rem;
`;

export const Select = styled.select`
  padding: 4px 0;
  border: none;
  border-bottom: 1px solid ${colors.darkGray};
  outline: none;
  font-size: 0.875rem;
`;

export const InputError = styled.span`
  color: ${colors.error};
  font-size: 0.625rem;
  height: 0.75rem;
  font-weight: 700;
`;

export const ModalFooter = styled.footer`
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const Button = styled.button<IButtonProps>`
  padding: 4px 8px;
  min-width: 100px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  background-color: ${colors.lightGray};
  border-color: ${colors.lightGray};
  border-width: 1px;
  border-style: solid;

  &:hover {
    filter: brightness(0.7);
  }

  ${({ mode }) =>
    mode === "save" &&
    css`
      background-color: ${colors.darkBlue};
      border-color: ${colors.darkBlue};
      color: ${colors.mostlyWhite};
    `}
`;
