import "./TestimonialCards.css";

function TestimonialCards() {
  const testimonials = [
    {
      userName: "Bruce",
      userImg: "/src/assets/user-profile.avif",
      starRating: 45,
      testimonial: "Wow! Upon eating here, the dragon entered me.",
    },
    {
      userName: "Jacky",
      userImg: "/src/assets/user-profile.avif",
      starRating: 50,
      testimonial:
        "I could finally be the drunken master I have always wished to be.",
    },
    {
      userName: "Michelle",
      userImg: "/src/assets/user-profile.avif",
      starRating: 40,
      testimonial:
        "I ordered everything, everywhere, all at once. It was good.",
    },
    {
      userName: "Chuck",
      userImg: "/src/assets/user-profile.avif",
      starRating: 50,
      testimonial: "Underneath my meal is a fist. Just how I like it.",
    },
  ];

  const cards = testimonials.map((testimonial) => (
    <div className="testimonial-card" key={testimonial.userName}>
      <h3 className="user-name">{testimonial.userName}</h3>
      <div className="middle-group">
        <div className="image-group">
          <img className="user-image" src={testimonial.userImg} alt="" />
          <p className="star-rating">{testimonial.starRating / 10}★</p>
        </div>
        <p className="testimonial-text">"{testimonial.testimonial}"</p>
      </div>
    </div>
  ));
  return <div className="cards-wrapper">{cards}</div>;
}

export default TestimonialCards;
