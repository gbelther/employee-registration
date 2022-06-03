import { createGlobalStyle } from "styled-components";
import colors from "./colors";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }

    input, select {
      background-color: transparent;
    }

    body {
        background: #FFFFFF;
        color: ${colors.darkGray};
        font-family: Roboto, Helvetica, sans-serif;

        button {
          cursor: pointer;

          &:disabled {
            cursor: not-allowed;
          }
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
    }
`;
