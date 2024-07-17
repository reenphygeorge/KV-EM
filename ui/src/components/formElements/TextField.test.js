/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TextField from "./TextField";

describe("Check if TextField works properly", () => {
  test("Check if TextField rendered correctly", () => {
    const { getByTestId } = render(<TextField />);
    const element = getByTestId("input-wrap");
    expect(element).toBeTruthy();
  });

  test("Check if label is displayed properly", () => {
    const label = "Test Label";
    const id = "test-id";
    const { getByLabelText } = render(<TextField label={label} id={id} />);
    const element = getByLabelText(label);
    expect(element).toBeTruthy();
  });

  test("Check if value is displayed properly", () => {
    const value = "Test Value";
    const { getByDisplayValue } = render(<TextField value={value} />);
    const element = getByDisplayValue(value);
    expect(element).toBeTruthy();
  });

  test("Check if placeholder is displayed properly", () => {
    const placeholder = "Test Field";
    const { getByPlaceholderText } = render(<TextField label={placeholder} />);
    const element = getByPlaceholderText(placeholder);
    expect(element).toBeTruthy();
  });

  test("Check if onChange function is invoked properly", () => {
    let valueReturned;
    const value = "test value";
    const onChangeMock = jest.fn((e) => {
      valueReturned = e.target.value;
    });
    const { getByTestId } = render(<TextField handleChange={onChangeMock} />);
    const element = getByTestId("input");
    fireEvent.change(element, { target: { value } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(valueReturned === value).toBeTruthy();
  });
  test("Check if snapshot is matched properly", () => {
    const onChangeMock = jest.fn();
    const value = "test value";
    const label = "test label";
    const id = "test-id";
    const { asFragment } = render(
      <TextField
        id={id}
        label={label}
        value={value}
        handleChange={onChangeMock}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
