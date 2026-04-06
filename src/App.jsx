import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import AboutPage from "./components/aboutPage/AboutPage";
import Menu from "./components/menu/Menu";
import Reservations from "./components/reservations/Reservations";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Confirmation from "./components/confirmation/confirmation";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { fetchTimes, submitBooking } from "./api";
import * as Yup from "yup";

function App() {
  /********************************* */
  // Logic for Reservation and API use
  /********************************* */
  const navigate = useNavigate();

  const [times, setTimes] = useState([]); // State for times for reservation
  const [loading, setLoading] = useState(false); // Loading state during fetch call to API

  const handleDateChange = async (e) => {
    // Custom formik handle change for date value
    formik.handleChange(e);
    const newDate = e.target.value;

    if (!newDate) return;

    setLoading(true);
    const result = await fetchTimes(newDate);
    setTimes(result);
    setLoading(false);
  };

  const today = new Date().toISOString().split("T")[0]; // What day is it so that date isn't bookable in retrospect
  const formik = useFormik({
    // Formik field validation
    initialValues: {
      occasion: "",
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      guests: "1",
      date: "",
      time: "",
      location: false,
      requirements: "",
    },
    validationSchema: Yup.object({
      // Using Yup to show user errors
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("A valid first name is required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("A valid last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("An email address is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
        .required("A phone number is required"),
      guests: Yup.number().min(1, "At least 1 guest"),
      date: Yup.date().required("A date must be provided"),
      time: Yup.string().required("A time must be provided"),
      location: Yup.bool(),
      requirements: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      localStorage.setItem("formValues", JSON.stringify(values, null, 2)); // Save values to localStorage
      resetForm({
        // Reset form to initial state
        values: {
          occasion: "",
          title: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          guests: "1",
          date: "",
          time: "",
          location: false,
          requirements: "",
        },
      });
      navigate("/confirmation", { replace: true }); // Navigate the user to the homepage
    },
  });

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/reservations"
          element={
            <Reservations
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              handleChange={formik.handleChange}
              setFieldValue={formik.setFieldValue}
              getFieldProps={formik.getFieldProps}
              handleSubmit={formik.handleSubmit}
              today={today}
              formik={formik}
              times={times}
              loading={loading}
              handleDateChange={handleDateChange}
            />
          }
        />
        <Route
          path="/confirmation"
          element={<Confirmation submitBooking={submitBooking} />}
        />
        {/* 
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} /> 
          */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
