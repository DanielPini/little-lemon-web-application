import "./About.css";

function About() {
  return (
    <section className="about-section">
      <div className="about-content-wrapper">
        <div className="about-text">
          <h1>Little Lemon</h1>
          <h2 className="subtitle">Chicago</h2>
          <p className="about">
            We are a family owned Mediterranean restuarant, focussed on
            traditional recipes served with a modern twist.
          </p>
        </div>
        <div className="about-images">
          <div className="restaurant-image image"></div>
          <div className="chef-image image"></div>
        </div>
      </div>
    </section>
  );
}

export default About;
