import "./Specials.css";
import SpecialsList from "../specialsList/SpecialsList";

function Specials() {
  const foodOptions = [
    {
      image: "/src/assets/greek_salad.jpg",
      name: "Greek Salad",
      priceCents: 1299,
      description:
        "Salad with tomato, cucumber, lettuce, olives, and feta with a vinagrette.",
      link: "google.com",
    },
    {
      image: "/src/assets/bruschetta.svg",
      name: "Bruschetta",
      priceCents: 599,
      description:
        "Toast with tomato and basil salsa, drizzled with balsamic vinegar and oil.",
      link: "google.com",
    },
    {
      image: "/src/assets/lemon_dessert.jpg",
      name: "Lemon Dessert",
      priceCents: 800,
      description: "Tart with layered lemon sponge and cream.",
      link: "google.com",
    },
    {
      image: "/src/assets/restaurant_chef.jpg",
      name: "Knefe",
      priceCents: 1917,
      description: "Delicious pastry with stuff inside.",
      link: "google.com",
    },
  ];
  return (
    <div className="specials-content-wrapper">
      <h1 className="section-title">This week's specials!</h1>
      <SpecialsList items={foodOptions} />
    </div>
  );
}
export default Specials;
