import { ReactNode } from "react";
import { Provider } from "react-redux";

import { store } from "../store";

interface IReduxProviderProps {
  children: ReactNode;
}

export function ReduxProvider({ children }: IReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
