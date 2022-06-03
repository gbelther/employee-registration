import { Select } from "..";
import * as Sty from "./styles";

export interface ISelectOption {
  value: string;
  label: string;
}

export interface IActionBarProps {
  selectOptions?: ISelectOption[];
  onSelectOption?: (option: ISelectOption) => void;
  onAddItem?: () => void;
}

export function ActionBar({
  selectOptions,
  onSelectOption,
  onAddItem,
}: IActionBarProps) {
  return (
    <Sty.Container>
      <Sty.StartOptions>
        {selectOptions && (
          <Select
            aria-label="select"
            placeholder="Selecionar empresa..."
            options={selectOptions}
            onChange={onSelectOption}
          />
        )}
      </Sty.StartOptions>
      <Sty.EndOptions>
        {onAddItem && (
          <Sty.AddButton aria-label="button" onClick={onAddItem}>
            <Sty.IconAdd />
          </Sty.AddButton>
        )}
      </Sty.EndOptions>
    </Sty.Container>
  );
}
