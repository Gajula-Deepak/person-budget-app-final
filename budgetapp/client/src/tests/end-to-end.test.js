import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import RegisterForm from "../components/Register";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe("Register Component", () => {
  it("registers the user after taking values and submits", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "user1@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "User1" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "User1password" },
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /Register/i }));
    });
    await waitFor(() => expect(window.location.pathname).toBe("/"));
  });
});
