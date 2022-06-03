import { Props } from "react-select";

import * as Sty from "./styles";

export function Select({ ...rest }: Omit<Props, "theme" | "styles">) {
  return <Sty.Container {...rest} />;
}
