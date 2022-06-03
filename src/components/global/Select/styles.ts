import styled from "styled-components";
import ReactSelect, { Props } from "react-select";
import colors from "../../../styles/colors";

export const Container = styled(ReactSelect).attrs({
  theme: (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: colors.darkBlue,
    },
  }),
  styles: {
    container: (provided) => ({
      ...provided,
      minWidth: "150px",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? colors.mostlyWhite : colors.darkBlue,
    }),
  },
})``;
