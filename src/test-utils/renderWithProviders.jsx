import { render } from "@testing-library/react";
import Reservations from "../components/reservations/Reservations";

const reservationProps = {
  today: "2026-04-04",
  values: { date: "2026-04-04", time: "" },
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
  times: [],
  loading: false,
};

export const renderReservations = (uiProps = {}) => {
  const props = { ...reservationProps, ...uiProps };
  return render(<Reservations {...props} />);
};
