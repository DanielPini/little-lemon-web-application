import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import AboutPage from "./components/aboutPage/AboutPage";
import Menu from "./components/menu/Menu";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/menu" element={<Menu />} />
          {/* <Route path="/reservations" element={<Reservations />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} /> */}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
