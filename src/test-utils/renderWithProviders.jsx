import { render } from "@testing-library/react";
import Reservations from "../components/reservations/Reservations";

const reservationProps = {
  today: "2026-04-04",
  allSlots: [],
  availableSlots: [],
  values: { date: "", time: "" },
  errors: {},
  touched: {},
  handleChange: () => {},
  setFieldValue: () => {},
  getFieldProps: () => ({
    onChange: () => {},
    onBlur: () => {},
    value: "",
  }),
  handleSubmit: () => {},
  handleDateChange: () => {},
};

export const renderReservations = (uiProps = {}) => {
  const props = { ...reservationProps, ...uiProps };
  return render(<Reservations {...props} />);
};
