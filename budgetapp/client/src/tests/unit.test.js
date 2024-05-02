import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "../components/Register";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe("Login Component rendered", () => {
  it("renders login component without crashing", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
  });
});
