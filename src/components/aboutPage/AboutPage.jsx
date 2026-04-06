import "./AboutPage.css";

function AboutPage() {
  return (
    <main>
      <h1 className="about-title">About Little Lemon</h1>
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
      <section className="history">
        <div className="content-wrapper">
          <h1>History</h1>
          <p>
            Little Lemon began as a labour of love, blending Mediterranean food
            with politics.
          </p>
          <p>
            Serving political rivals from the Ronald McRegans of the world to
            Chairman Meow, we have contributed to the sewage of the imperial
            palace as well as to the browning of the White House.
          </p>
          <p>
            After several decades of serving reasonably priced food, we are
            proud to introduce our fare to a new generation of activists.
          </p>
        </div>
      </section>
      <section className="future">
        <div className="content-wrapper">
          <h1>Future</h1>
          <p>
            There has never been a better time to get involved with Little
            Lemon.
          </p>
          <p>
            Our cooking programs take you from novice to head chef in the blink
            of an eye. You provide the food and money, and we'll yell at you
            until it is hot and mostly edible.
          </p>
          <p>
            After several decades of serving reasonably priced food, we are
            proud to introduce our fare to a new generation of activists.
          </p>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
