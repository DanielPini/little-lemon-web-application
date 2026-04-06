import { fireEvent, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { renderReservations } from "../../test-utils/renderWithProviders";
import { isClosedDay, getAvailableSlots } from "../../lib/reservationRules";

const setup = (props = {}) => {
  return renderReservations(props);
};

test("renders reservation form heading", () => {
  setup();

  expect(screen.getByText("Book a table")).toBeInTheDocument();
});

test("renders all time slots", () => {
  setup({
    allSlots: ["17:00", "18:00"],
    availableSlots: ["17:00", "18:00"],
  });

  expect(screen.getByRole("button", { name: "17:00" })).toBeInTheDocument();
});

test("renders all time slots", () => {
  setup({
    allSlots: ["17:00", "18:00"],
    availableSlots: ["17:00", "18:00"],
  });

  expect(screen.getByRole("button", { name: "17:00" })).toBeInTheDocument();
});

test("disables unavailable slots", () => {
  setup({
    allSlots: ["17:00", "18:00"],
    availableSlots: ["18:00"],
  });

  expect(screen.getByRole("button", { name: "17:00" })).toBeDisabled();
});

test("selects slot on click", () => {
  const setFieldValue = vi.fn();

  setup({
    allSlots: ["17:00"],
    availableSlots: ["17:00"],
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

test("Monday is closed", () => {
  setup();
  expect(isClosedDay("2026-04-06")).toBe(true);
});

test("Sunday closes at 20:00", () => {
  setup();
  const slots = ["19:00", "20:00", "21:00"];

  const result = getAvailableSlots("2026-04-05", slots);

  expect(result).not.toContain("21:00");
});

test("removes slots within 60 minutes", () => {
  setup();
  const now = new Date("2026-04-04T17:00:00");

  const slots = ["17:00", "18:00"];

  const result = getAvailableSlots("2026-04-04", slots, now);

  expect(result).not.toContain("17:00");
});
