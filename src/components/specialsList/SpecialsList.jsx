import "./SpecialsList.css";

function SpecialsList({ items }) {
  const listItems = items.map((item) => (
    <div className="specials-card" key={item.name}>
      <img src={item.image} alt={item.description} />
      <div className="name-price">
        <h3 className="specials-item">{item.name}</h3>
        <p className="item-price">${item.priceCents / 100}</p>
      </div>
      <p className="item-description">{item.description}</p>
      <div className="order-link-wrapper">
        <a className="order-link" href={item.link}>
          Order a delivery
        </a>
      </div>
    </div>
  ));
  return <div className="specials-list">{listItems}</div>;
}

export default SpecialsList;
