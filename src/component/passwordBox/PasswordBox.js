import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import "./PasswordBox.scss";


export default function PasswordBox({ name, value, onChange, onBlur, errors }) {
  const [show, setShow] = useState(false);
  console.log(errors);
  return (
    <>
      <div className="password-box">
        <input
          type={show ? "text" : "password"}
          name={name}
          id={name}
          placeholder="کلمه عبور*"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
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
    </>
  );
}
