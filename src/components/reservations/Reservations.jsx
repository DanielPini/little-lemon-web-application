import "./Reservations.css";

function Reservations() {
  return (
    <>
      <section className="book">
        <h1>Book a table</h1>
        <div className="book-image"></div>
      </section>
      <section className="booking-form">
        <form action="post">
          <fieldset>
            <label htmlFor="select-occasion">
              Select Occasion
              <select name="select-occasion" id="select-occasion">
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="engagement">Engagement</option>
                <option value="meeting">Business Meeting</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label htmlFor="">Enter your information</label>
          </fieldset>
        </form>
      </section>
    </>
  );
}

export default Reservations;
