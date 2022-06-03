import { fireEvent, render } from "@testing-library/react";
import { faker } from "@faker-js/faker";

import { ActionBar, IActionBarProps } from ".";

interface MakeSutParams extends IActionBarProps {}

const makeSut = (props: MakeSutParams) => {
  const sut = render(<ActionBar {...props} />);
  return {
    sut,
  };
};

describe("<ActionBar />", () => {
  it("should not be able to render any component if not passed props", () => {
    const { sut } = makeSut({});
    expect(sut.queryByLabelText("select")).toBeFalsy();
    expect(sut.queryByLabelText("button")).toBeFalsy();
  });

  it("should be able to render select when passed by props", () => {
    const value = faker.random.word();
    const label = faker.random.word();

    const options = [
      {
        value: value,
        label: label,
      },
    ];
    const { sut } = makeSut({ selectOptions: options });
    const select = sut.queryByLabelText("select");
    expect(select).toBeTruthy();
  });

  it("should be able to render button when passed by props onAddItem", () => {
    const onAddItem = jest.fn();
    const { sut } = makeSut({ onAddItem });
    const button = sut.queryByLabelText("button");
    expect(button).toBeTruthy();

    fireEvent.click(button);
    expect(onAddItem).toHaveBeenCalled();
  });
});
