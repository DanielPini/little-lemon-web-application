import Button from "../button/Button";
import "./Blurb.css";

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
        <Button text="Reserve a table" color="black" bg="yellow" />
        <div className="blurb-image"></div>
      </div>
    </section>
  );
}
export default Blurb;
