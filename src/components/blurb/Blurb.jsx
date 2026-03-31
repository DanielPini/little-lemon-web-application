import Button from "../button/Button";
import "./Blurb.css";
import { Link } from "react-router-dom";

function Blurb() {
  return (
    <section className="blurb">
      <div className="blurb-content-wrapper">
        <h1>Little Lemon</h1>
        <h2 className="subtitle">Chicago</h2>
        <p className="description">
          We are a family-owned Mediterranian restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <Link to="/reservations">
          <Button text="Reserve a table" color="black" bg="#f4ce14" />
        </Link>
        <div className="blurb-image"></div>
      </div>
    </section>
  );
}
export default Blurb;
