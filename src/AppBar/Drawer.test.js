import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import TemporaryDrawer from "./Drawer";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

const pages = [{ name: "test", path: "test" }];
let container;

describe("renders content", () => {
  const mockHandler = jest.fn();
  beforeEach(() => {
    container = render(<MemoryRouter> <TemporaryDrawer pages={pages} /> </MemoryRouter>);
  });
  test("after opening drawer navigation options will be rendered", async () => {
    const user = userEvent.setup();
    const button = screen.getByTestId("drawer-button");
    await user.click(button);
    screen.getAllByTestId("drawer-listing-item");
  });
  

});
