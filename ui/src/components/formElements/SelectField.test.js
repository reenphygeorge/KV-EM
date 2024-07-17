/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectField from "./SelectField";

describe("Check if SelectField works properly", () => {
  test("Check if SelectField rendered correctly", () => {
    const { getByTestId } = render(<SelectField options={[]} />);
    const element = getByTestId("select-wrap");
    expect(element).toBeTruthy();
  });

  test("Check if label is displayed properly", () => {
    const label = "Test Label";
    const id = "test-id";
    const { getByLabelText } = render(
      <SelectField label={label} id={id} options={[]} />
    );
    const element = getByLabelText(label);
    expect(element).toBeTruthy();
  });

  test("Check if value is displayed properly", () => {
    const value = "Test Value";
    const { getByDisplayValue } = render(
      <SelectField value={value} options={["Test Value"]} />
    );
    const element = getByDisplayValue(value);
    expect(element).toBeTruthy();
  });

  test("Check if onChange function is invoked properly", () => {
    let valueReturned;
    const value = "Option2";
    const onChangeMock = jest.fn((e) => {
      valueReturned = e.target.value;
    });
    const { getByTestId } = render(
      <SelectField
        options={["Option1", "Option2"]}
        handleChange={onChangeMock}
      />
    );
    const element = getByTestId("select");
    fireEvent.change(element, { target: { value } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(valueReturned === value).toBeTruthy();
  });

  test("Check if snapshot is matched properly", () => {
    const onChangeMock = jest.fn();
    const value = "Option2";
    const options = ["Option1", "Option2"];
    const label = "test label";
    const id = "test-id";
    const { asFragment } = render(
      <SelectField
        id={id}
        options={options}
        label={label}
        value={value}
        handleChange={onChangeMock}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
