import Blurb from "../blurb/Blurb";
import About from "../about/About";
import Specials from "../specials/Specials";
import Testimonials from "../testimonials/Testimonials";
import "./Home.css";

function Home() {
  return (
    <main>
      <Blurb />
      <Specials />
      <Testimonials />
      <About />
    </main>
  );
}
export default Home;
