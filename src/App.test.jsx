import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import * as api from "./api";
import App from "./App";

vi.mock("./api");

const mockedFetchTimes = vi.mocked(api.fetchTimes);

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

test("Renders header", () => {
  renderWithRouter(<Header />);
  expect(screen.getByText("Home")).toBeInTheDocument();
});

test("Renders footer", () => {
  renderWithRouter(<Footer />);
  expect(screen.getByText("Social Media Links")).toBeInTheDocument();
});

test("fetchTimes is called when date is selected", async () => {
  mockedFetchTimes.mockResolvedValue(["17:00", "18:00"]);

  render(
    <MemoryRouter initialEntries={["/reservations"]}>
      <App />
    </MemoryRouter>,
  );

  fireEvent.change(screen.getByLabelText(/date/i), {
    target: { value: "2026-04-10" },
  });

  await waitFor(() => {
    expect(mockedFetchTimes).toHaveBeenCalledWith("2026-04-10");
  });
});
