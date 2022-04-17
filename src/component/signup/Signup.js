import React, { useEffect, useContext, useState, useMemo } from "react";

import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { v4 as uuidv4 } from 'uuid';

import { UserContext } from "../../context/ContextAuth";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import "./signup.scss";


const Signup = () => {
  const { setUserInfo } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [states, setStates] = useState([]);
  const [{ state, city }, setSateCity] = useState({
    state: "آذربایجان شرقی",
    city: "",
  });

  //fetch state & city
  useEffect(() => {
    fetch("./iranstates.json")
      .then((res) => res.json())
      .then((response) => {
        setStates(response);
      });
  }, []);

  const stateOptions = Object.keys(states).map((state) => (
    <option key={state} value={state}>
      {state}
    </option>
  ));

  const cityOptions = useMemo(() => {
    for (const [key, value] of Object.entries(states)) {
      if (key === state) {
        console.log(key);
        return value.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ));
      }
    }
  }, [state]);

  function handleStateChange(event) {
    setSateCity((data) => ({ city: "", state: event.target.value }));
  }

  function handleCityChange(event) {
    setSateCity((data) => ({ ...data, city: event.target.value }));
    formik.handleChange(event);
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password:"",
      city:""
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "نام باید از 15 کاراکتر کمتر باشد")
        .required("ورود فیلد نام الزامی است"),
      lastName: Yup.string()
        .max(20, "نام خانوادگی باید از 20 کاراکتر کمتر باشد")
        .required("ورود نام خانوادگی الزامی است"),
      email: Yup.string().email("آدرس ایمیل اشتباه است").required("وردود ایمیل الزامی است"),
      password: Yup.string().min(6,"کلمه عبور باید 6 کاراکتر و بیشتر باشد")
        .required("کلمه عبور الزامی است"),
      city:Yup.string().required("انتخاب شهر الزامی است"),
      // educationPlace:Yup.string().required("educationPlace is required")
    }),

    onSubmit: (values) => {
      values.id=uuidv4();
      axios.post("http://localhost:3002/users",values)
      .then((val) => {
        alert(JSON.stringify(val, null, 2));
        setUserInfo(values.firstName);
     }).catch(err => {
         console.log(err.response.status);
         console.log(err.response.data);
     });

    },

  });
  return (
    <>
      <h2>ثبت نام كنيد</h2>
      <form className="form-signup" onSubmit={formik.handleSubmit}>
        <div className="row">
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="نام "
            value={formik.values.firstName || ""}
            onChange={formik.handleChange}
          />

          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="نام خانوادگي "
            value={formik.values.lastName || ""}
            onChange={formik.handleChange}
          />
        </div>
        <div style={{display:"flex",justifyContent:"space-evenly"}}>
          {formik.touched.firstName && formik.errors.firstName ? (
            <small className="error">{formik.errors.firstName}</small>
          ) : null}

          {formik.touched.lastName && formik.errors.lastName ? (
            <small className="error">{formik.errors.lastName}</small>
          ) : null}
        </div>

        <input
          type="text"
          name="email"
          id="email"
          placeholder="پست الكترونيك "
          value={formik.values.email || ""}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (
          <small className="error">{formik.errors.email}</small>
        ) : null}
        <div className="password-box">
          <input
            type={show ? "text" : "password"}
            name="password"
            id="password"
            value={formik.values.password || ""}
            onChange={formik.handleChange}
            placeholder="کلمه عبور"
          />
          <span className="password-box__show-icon">
            {!show ? (
              <BsFillEyeFill
                className="show-icon"
                onClick={() => setShow(true)}
              />
            ) : (
              <BsFillEyeSlashFill
                className="show-icon"
                onClick={() => setShow(false)}
              />
            )}
          </span>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <small className="error">{formik.errors.password}</small>
        ) : null}

        <div className="row">
          <select value={state} onChange={handleStateChange}>
            {stateOptions}
          </select>
          <select
            className="form-state__state"
            name="city"
            id="city"
            value={formik.values.city || ""}
            onChange={handleCityChange}
          >
            {cityOptions}
          </select>
        </div>
        {formik.touched.city && formik.errors.city ? (
            <small className="error">{formik.errors.city}</small>
          ) : null}

        <div className="row">
          <select
            name="education"
            id="education"
            value={formik.values.education || ""}
            onChange={formik.handleChange}
          >
            <option value="">تحصیلات</option>
            <option value="کارشناسی ارشد">کارشناسی ارشد</option>
            <option value="کارشناسی">کارشناسی</option>
            <option value="فوق دیپلم">فوق دیپلم</option>
            <option value="دیپلم">دیپلم</option>
          </select>
          {formik.values.education ? (
            <input
              type="text"
              name="educationPlace"
              id="educationPlace"
              placeholder="محل تحصیل"
              value={formik.values.educationPlace || ""}
              onChange={formik.handleChange}
            />
          ) 
          : (
            <span></span>
          )}
        </div>
        <input className="form-btn" type="submit" value="ثبت نام" />
      </form>
    </>
  );
};
export default Signup;
