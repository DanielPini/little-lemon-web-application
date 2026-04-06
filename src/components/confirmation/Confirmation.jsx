import { useFormik } from "formik";
import * as Yup from "yup";
import "./Confirmation.css";
import "../button/Button.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Confirmation({ submitBooking }) {
  const [items] = useState(() => {
    // Iterate through localStorage to save as an object
    const stored = localStorage.getItem("formValues");
    return stored ? JSON.parse(stored) : {};
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal
  const modalRef = useRef(null); // Link to modal

  const navigate = useNavigate();

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      localStorage.removeItem("formValues");
      setIsModalOpen(false);
      navigate("/", { replace: true });
    }
  };

  const luhnCheck = (value) => {
    // Strip non-digits (we’ll refine this later)
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length < 13) return false;

    let sum = 0;
    let alternate = false;

    // Iterate from right to left
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let n = parseInt(cleaned.charAt(i), 10);
      if (alternate) {
        n *= 2;
        if (n > 9) n = (n % 10) + 1; // e.g., 14 → 1+4=5
      }
      sum += n;
      alternate = !alternate;
    }

    return sum % 10 === 0; // Valid if sum is divisible by 10
  };

  const getCardType = (value) => {
    const v = value.replace(/\D/g, "");

    if (/^4/.test(v)) return "Visa";
    if (/^(5[1-5]|2[2-7])/.test(v)) return "Mastercard";
    if (/^3[47]/.test(v)) return "Amex";

    return "Unknown";
  };

  const formik = useFormik({
    initialValues: {
      cardName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      securityCode: "",
    },
    validationSchema: Yup.object({
      cardName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("A valid name is required"),
      cardNumber: Yup.string()
        .transform((value) => value?.replace(/\D/g, ""))
        .required("Card number is required")
        .min(13, "Too short")
        .max(19, "Too long")
        .test("luhn-check", "Invalid card number", (v) => luhnCheck(v))
        .test("card-type", "Unsupported card type", (value) => {
          if (!value) return false;
          return getCardType(value) !== "Unknown";
        }),
      expiryMonth: Yup.number()
        .typeError("Invalid month")
        .required("Month required")
        .min(1)
        .max(12),
      expiryYear: Yup.number()
        .typeError("Invalid year")
        .required("Year required")
        .test("valid-year", "Card expired", function (year) {
          const { expiryMonth } = this.parent;
          if (!year || !expiryMonth) return false;

          const now = new Date();
          const currentYear = now.getFullYear();
          const currentMonth = now.getMonth() + 1;

          if (year < currentYear) return false;
          if (year === currentYear && expiryMonth < currentMonth) return false;

          return true;
        }),
      securityCode: Yup.string()
        .required("CVV is required")
        .matches(/^\d+$/, "Must be numeric")
        .test("cvv-length", "Invalid CVV length", function (value) {
          const { cardNumber } = this.parent;
          const type = getCardType(cardNumber);

          if (!value) return false;

          if (type === "Amex") return value.length === 4;
          return value.length === 3;
        }),
    }),
    onSubmit: () => {
      setIsModalOpen(true);
      submitBooking();
    },
  });

  return (
    <>
      <section className="confirmation-form">
        <form action="post" onSubmit={formik.handleSubmit}>
          <fieldset>
            <legend>Card details</legend>
            <label htmlFor="cardName">
              Name
              <input
                type="text"
                name="cardName"
                placeholder="Joseph Smith"
                id="cardName"
                {...formik.getFieldProps("cardName")}
              />
              {formik.touched.cardName && formik.errors.cardName && (
                <div className="error">{formik.errors.cardName}</div>
              )}
            </label>
            <label htmlFor="cardNumber">
              Card number
              <input
                type="text"
                name="cardNumber"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                id="cardNumber"
                {...formik.getFieldProps("cardNumber")}
              />
              {formik.touched.cardNumber && formik.errors.cardNumber && (
                <div className="error">{formik.errors.cardNumber}</div>
              )}
            </label>
            <label htmlFor="expiryMonth" className="expiry">
              Expiry
              <input
                type="text"
                name="expiryMonth"
                placeholder="MM"
                id="expiryMonth"
                {...formik.getFieldProps("expiryMonth")}
              />
              <input
                type="text"
                name="expiryYear"
                placeholder="YYYY"
                id="expiryYear"
                {...formik.getFieldProps("expiryYear")}
              />
              {(formik.touched.expiryMonth || formik.touched.expiryYear) &&
                (formik.errors.expiryMonth || formik.errors.expiryYear) && (
                  <div className="error">
                    {formik.errors.expiryMonth || formik.errors.expiryYear}
                  </div>
                )}
            </label>
            <label>
              Security Code
              <input
                type="password"
                placeholder="XXX"
                name="securityCode"
                {...formik.getFieldProps("securityCode")}
              />
              {formik.touched.securityCode && formik.errors.securityCode && (
                <div className="error">{formik.errors.securityCode}</div>
              )}
            </label>
          </fieldset>
          <button
            className="button"
            type="submit"
            style={{ background: "var(--primary2)" }}
          >
            Confirm
          </button>
        </form>
      </section>
      {isModalOpen && (
        <div className="modal-wrapper" onClick={handleCloseModal}>
          <div className="modal" ref={modalRef}>
            <h1>Congratulations</h1>
            <p>
              Your table has been reserved for{" "}
              {items.guests && (
                <>
                  {items.guests > 1 ? `${items.guests} people` : `1 person`} at{" "}
                  {items.time} on {items.date}.
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Confirmation;
