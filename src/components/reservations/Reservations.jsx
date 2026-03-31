import { useFormik } from "formik";
import * as Yup from "yup";
import "./Reservations.css";
import { useNavigate } from "react-router-dom";
import "../button/Button.css";

function Reservations() {
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      occasion: "",
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      guests: "1",
      date: "",
      time: "",
      location: false,
      requirements: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("A valid first name is required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("A valid last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("An email address is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
        .required("A phone number is required"),
      guests: Yup.number().min(1, "At least 1 guest"),
      date: Yup.date().required("A date must be provided"),
      time: Yup.string()
        .required("A time must be provided")
        .test("time-range", "Time must be between 14:00 and 19:00", (value) => {
          if (!value) return false;
          return value >= "14:00" && value <= "19:00";
        }),
      location: Yup.bool(),
      requirements: Yup.string(),
    }),
    onSubmit: (values) => {
      localStorage.setItem("formValues", JSON.stringify(values, null, 2));
      navigate("/confirmation", { replace: true });
    },
  });

  return (
    <>
      <section className="booking-form">
        <h1>Book a table</h1>
        <form onSubmit={formik.handleSubmit} action="post">
          <legend>Reservation form</legend>
          <label htmlFor="occasion">
            Occasion
            <select
              name="occasion"
              id="occasion"
              {...formik.getFieldProps("occasion")}
            >
              <option disabled value="">
                --Select an occasion--
              </option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="engagement">Engagement</option>
              <option value="meeting">Business Meeting</option>
              <option value="breakup">Breakup</option>
              <option value="other">Other</option>
            </select>
          </label>
          <fieldset>
            <legend>Your information</legend>
            <label htmlFor="title" className="title-label">
              Title
              <select
                name="title"
                id="title"
                {...formik.getFieldProps("title")}
              >
                <option disabled value="">
                  -- Select a title --
                </option>
                <option value="Ms">Ms</option>
                <option value="Mx">Mx</option>
                <option value="Miss">Miss</option>
                <option value="Mrs">Mrs</option>
                <option value="Mr">Mr</option>
                <option value="Dr">Dr</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label htmlFor="firstName">
              First Name<span className="required">*</span>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                id="firstName"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error">{formik.errors.firstName}</div>
              ) : null}
            </label>
            <label htmlFor="lastName">
              Last Name<span className="required">*</span>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                id="lastName"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="error">{formik.errors.lastName}</div>
              ) : null}
            </label>
            <label htmlFor="email">
              Email<span className="required">*</span>
              <input
                type="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </label>
            <label htmlFor="phone">
              Phone<span className="required">*</span>
              <input
                type="tel"
                placeholder="Phone number"
                name="phone"
                id="phone"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error">{formik.errors.phone}</div>
              ) : null}
            </label>
          </fieldset>
          <fieldset className="booking-details">
            <legend>Booking details</legend>
            <label htmlFor="guests">
              Number of guests
              <select
                name="guests"
                id="guests"
                {...formik.getFieldProps("guests")}
              >
                <option className="option" value="1">
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </label>
            <br />
            <label htmlFor="date">
              Date<span className="required">*</span>
              <input
                type="date"
                name="date"
                id="date"
                min={today}
                {...formik.getFieldProps("date")}
              />
              {formik.touched.date && formik.errors.date ? (
                <div className="error">{formik.errors.date}</div>
              ) : null}
            </label>
            <label htmlFor="time">
              Time<span className="required">*</span>
              <input
                type="time"
                name="time"
                id="time"
                min="14:00"
                max="19:00"
                {...formik.getFieldProps("time")}
              />
              {formik.touched.time && formik.errors.time ? (
                <div className="error">{formik.errors.time}</div>
              ) : null}
            </label>
            <label htmlFor="location" className="switch">
              <input
                type="checkbox"
                name="location"
                id="location"
                {...formik.getFieldProps("location")}
                placeholder="Location"
                checked={formik.values.location}
                onChange={formik.handleChange}
                readOnly
              />
              <span className="slider"></span>
              <span className="location-label">
                {formik.values.location ? "Outdoors" : "Indoors"}
              </span>
            </label>
            <label htmlFor="requirements" className="text-box-label">
              Requirements
              <br />
              <textarea
                name="requirements"
                id="requirements"
                {...formik.getFieldProps("requirements")}
              ></textarea>
            </label>
          </fieldset>
          <button type="submit" className="button">
            Proceed to confirmation
          </button>
        </form>
      </section>
    </>
  );
}

export default Reservations;
