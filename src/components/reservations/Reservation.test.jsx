import { fireEvent, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { renderReservations } from "../../test-utils/renderWithProviders";

const setup = (props = {}) => {
  return renderReservations(props);
};

test("renders reservation form heading", () => {
  setup();

  expect(screen.getByText("Book a table")).toBeInTheDocument();
});

test("renders all time slots", () => {
  setup({
    times: ["17:00", "18:00"],
  });

  expect(screen.getByRole("button", { name: "17:00" })).toBeInTheDocument();
});

test("selects slot on click", () => {
  const setFieldValue = vi.fn();

  setup({
    times: ["17:00", "18:00"],
    setFieldValue,
  });

  fireEvent.click(screen.getByRole("button", { name: "17:00" }));

  expect(setFieldValue).toHaveBeenCalledWith("time", "17:00");
});

test("shows date error when present", () => {
  setup({
    errors: { date: "Date required" },
    touched: { date: true },
  });

  expect(screen.getByText("Date required")).toBeInTheDocument();
});
