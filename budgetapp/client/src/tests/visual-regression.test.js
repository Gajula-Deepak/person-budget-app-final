import React from "react";
import { generateImage } from "jsdom-screenshot";
import { render } from "@testing-library/react";
import Register from "../components/Register";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

it("Visual regression test for register", async () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const screenshot = await generateImage();
  expect(screenshot).toBeDefined();
});
