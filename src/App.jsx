import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="blurb">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a famil;y owned Mediterranian restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
          <button>Reserve a table</button>
          <img src="" alt="" />
        </div>
        <h1>This Week's Specials</h1>
        <ul>
          <li className="food-option">Food option</li>
          <li className="food-option">Food option</li>
          <li className="food-option">Food option</li>
          <li className="food-option">Food option</li>
          <li className="food-option">Food option</li>
          <li className="food-option">Food option</li>
        </ul>
      </main>
      <Footer />
    </>
  );
}

export default App;
