import "./Button.css";

function Button(props) {
  const { text, color = "black", bg = "white" } = props;
  return (
    <button className="button" style={{ color: color, background: bg }}>
      {text}
    </button>
  );
}

export default Button;
