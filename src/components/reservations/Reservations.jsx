import "./Reservations.css";
import "../button/Button.css";

function Reservations({
  today,
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
  getFieldProps,
  handleSubmit,
  handleDateChange,
  times,
  loading,
}) {
  const safeTimes = Array.isArray(times) ? times : [];
  return (
    <>
      <section className="booking-form">
        <h1>Book a table</h1>
        <form onSubmit={handleSubmit} action="post">
          <legend>Reservation form</legend>
          <label htmlFor="occasion">
            Occasion
            <select
              name="occasion"
              id="occasion"
              {...getFieldProps("occasion")}
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
              <select name="title" id="title" {...getFieldProps("title")}>
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
                {...getFieldProps("firstName")}
              />
              {touched.firstName && errors.firstName ? (
                <div className="error">{errors.firstName}</div>
              ) : null}
            </label>
            <label htmlFor="lastName">
              Last Name<span className="required">*</span>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                id="lastName"
                {...getFieldProps("lastName")}
              />
              {touched.lastName && errors.lastName ? (
                <div className="error">{errors.lastName}</div>
              ) : null}
            </label>
            <label htmlFor="email">
              Email<span className="required">*</span>
              <input
                type="email"
                placeholder="Email"
                {...getFieldProps("email")}
              />
              {touched.email && errors.email ? (
                <div className="error">{errors.email}</div>
              ) : null}
            </label>
            <label htmlFor="phone">
              Phone<span className="required">*</span>
              <input
                type="tel"
                placeholder="Phone number"
                name="phone"
                id="phone"
                {...getFieldProps("phone")}
              />
              {touched.phone && errors.phone ? (
                <div className="error">{errors.phone}</div>
              ) : null}
            </label>
          </fieldset>
          <fieldset className="booking-details">
            <legend>Booking details</legend>
            <label htmlFor="guests">
              Number of guests
              <select name="guests" id="guests" {...getFieldProps("guests")}>
                <option className="option" value="1">
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
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
                {...getFieldProps("date")}
                onChange={handleDateChange}
              />
              {touched.date && errors.date ? (
                <div className="error">{errors.date}</div>
              ) : null}
            </label>
            <div className="time-slots">
              {!values.date ? (
                <p>Please select a date</p>
              ) : loading ? (
                <p>Loading times...</p>
              ) : (
                safeTimes.map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={`time-slot ${values.time === time ? "selected" : ""}`}
                    onClick={() => {
                      setFieldValue("time", time);
                    }}
                  >
                    {time}
                  </button>
                ))
              )}
            </div>
            <label htmlFor="location" className="switch">
              <input
                type="checkbox"
                name="location"
                id="location"
                {...getFieldProps("location")}
                placeholder="Location"
                checked={values.location}
                onChange={handleChange}
                readOnly
              />
              <span className="slider"></span>
              <span className="location-label">
                {values.location ? "Outdoors" : "Indoors"}
              </span>
            </label>
            <label htmlFor="requirements" className="text-box-label">
              Requirements
              <br />
              <textarea
                name="requirements"
                id="requirements"
                {...getFieldProps("requirements")}
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
