import "../specialsList/SpecialsList.css";
import "./Card.css";

function Card({ props }) {
  const { image, name, priceCents, description, link } = props;
  return (
    <div className="specials-card" key={name}>
      <img src={image} alt={description} />
      <div className="name-price">
        <h3 className="specials-item">{name}</h3>
        <p className="item-price">${priceCents / 100}</p>
      </div>
      <p className="item-description">{description}</p>
      <div className="order-link-wrapper">
        <a className="order-link" href={link}>
          Order a delivery
        </a>
      </div>
    </div>
  );
}

export default Card;
