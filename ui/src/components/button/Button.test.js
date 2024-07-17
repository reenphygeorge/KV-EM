/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Check if Button works properly", () => {
  test("Check if button rendered correctly", () => {
    const { getByTestId } = render(<Button />);
    const element = getByTestId("button-component");
    expect(element).toBeTruthy();
  });

  test("Check if text displayed properly", () => {
    const innerText = "Test Button";
    const { getByText } = render(<Button innerText={innerText} />);

    const element = getByText(innerText);
    expect(element).toBeTruthy();
  });

  test("Check if onClick function is invoked properly", () => {
    const onClickMock = jest.fn();
    const { getByTestId } = render(<Button onClick={onClickMock} />);

    const element = getByTestId("button-component");
    fireEvent.click(element);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("Check if snapshot is matched properly", () => {
    const onClickMock = jest.fn();
    const innerText = "Click Here";

    const { asFragment } = render(
      <Button innerText={innerText} onClick={onClickMock} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
