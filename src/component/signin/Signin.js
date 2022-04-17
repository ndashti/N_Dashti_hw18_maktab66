import React, { useState, useContext } from "react";

import axios from "axios";
import { Formik } from "formik";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

//context
import { UserContext } from "../../context/ContextAuth";

import "./signin.scss";
export default function Signin() {
  const { setUserInfo } = useContext(UserContext);
  const [show, setShow] = useState(false);

  return (
    <>
      <h2>خوش آمديد</h2>
      {/* //formik */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
            console.log(errors);
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (values.password.length === 0) {
            errors.password = "کلمه عبور الزامی است";
          }else if(values.password.length < 6){
            errors.password="کلمه عبور باید 6 کاراکتر و بیشتر باشد";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .get(`http://localhost:3002/users?email=${values.email}`)
            .then((res) => {
              const info = res.data;
              // console.log(info);
              const isExistUser = info.some(
                (user) => user.password === values.password
              );
              if (isExistUser) {
                alert("ورود با موفقیت انجام شد.");
                console.log(info[0].firstname)
                setUserInfo(info[0].firstname);
                setUserInfo(values.email)
              }else{
                alert("کاربر وجود ندارد")
              }
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="form-signin" onSubmit={handleSubmit}>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="پست الكترونيك "
              value={values.email || ""}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <small className="error">
              {errors.email && touched.email && errors.email}
            </small>
            <div className="password-box">
              <input
                type={show ? "text" : "password"}
                name="password"
                id="password"
                placeholder="کلمه عبور*"
                value={values.password || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors}
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
            <small className="error">
              {errors.password && touched.password && errors.password}
            </small>
            <a href="#">فراموش كرديد؟</a>
            <input
              className="form-btn"
              disabled={isSubmitting}
              type="submit"
              value="ورود"
            />
          </form>
        )}
      </Formik>
    </>
  );
}
