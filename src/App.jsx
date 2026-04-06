import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import AboutPage from "./components/aboutPage/AboutPage";
import Menu from "./components/menu/Menu";
import Reservations from "./components/reservations/Reservations";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Confirmation from "./components/confirmation/confirmation";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { fetchTimes, submitBooking } from "./api";
import * as Yup from "yup";

const DINING_DURATION = 120; // minutes

const OPENING_HOURS = {
  0: { open: 16, close: 20 }, // Sunday
  1: null, // Monday
  2: { open: 18, close: 22 }, // Tuesday
  3: { open: 16, close: 22 }, // Wednesday
  4: { open: 16, close: 22 }, // Thursday
  5: { open: 16, close: 22 }, // Friday
  6: { open: 16, close: 22 }, // Saturday
};

function App() {
  const navigate = useNavigate();

  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const formik = useFormik({
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
      localStorage.setItem("formValues", JSON.stringify(values, null, 2));
      resetForm({
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
      navigate("/confirmation", { replace: true });
    },
  });

  useEffect(() => {
    if (!formik.values.date) return;
    console.log(formik.values.date);

    let ignore = false;

    async function loadTimes() {
      setLoading(true);

      const result = await fetchTimes(formik.values.date);

      if (!ignore) {
        setTimes(result);
        setLoading(false);
      }
    }

    loadTimes();

    return () => {
      ignore = true;
    };
  }, [formik.values.date]);

  const handleDateChange = (e) => {
    const value = e.target.value;
    const day = new Date(value).getDay();

    if (OPENING_HOURS[day] === null) {
      formik.setFieldTouched("date", true);
      formik.setFieldError("date", "Restaurant is closed on Mondays");
      formik.setFieldValue("date", "");
      return;
    }

    formik.handleChange(e);
  };
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
              handleDateChange={handleDateChange}
              times={times}
              loading={loading}
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
