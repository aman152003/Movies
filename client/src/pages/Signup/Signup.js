import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

import Button from "../../components/Button/Button";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const history = useHistory();

  function ValidateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  }

  const isEmailValid = ValidateEmail(email);

  const signUp = async () => {
    if (!isEmailValid) {
      setError1(true);
    }
    if (username.length < 6) {
      setError2(true);
    }
    if (password.length < 8) {
      setError3(true);
    } else {
      try {
        await axios({
          method: "post",
          url: "https://moviesdb-react.herokuapp.com/signup",
          data: {
            username,
            password,
            email,
          },
        });
        history.push("/login");
      } catch (err) {
        console.log("could not signup, please try again");
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="form"
    >
      <div className="input">
        <input
          onChange={(e) => {
            setEmail(e.target.value);
            if (isEmailValid) {
              setError1(false);
            }
          }}
          type="text"
          placeholder="Enter your email"
        />
        <p style={error1 ? { display: "block" } : { display: "none" }}>
          Please enter a valid email address
        </p>
      </div>
      <div className="input">
        <input
          onChange={(e) => {
            setUsername(e.target.value);
            if (e.target.value.length >= 6) {
              setError2(false);
            }
          }}
          type="text"
          placeholder="Enter your username"
        />
        <p style={error2 ? { display: "block" } : { display: "none" }}>
          Username must be minimum 6 characters
        </p>
      </div>
      <div className="input">
        <input
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value.length >= 8) {
              setError3(false);
            }
          }}
          type="password"
          placeholder="Enter your password"
        />
        <p style={error3 ? { display: "block" } : { display: "none" }}>
          Password must be minimum 8 characters
        </p>
      </div>
      <div onClick={signUp} className="form-btn">
        <Button name="Sign Up" />
      </div>
      <li>
        Already have an account?
        <Link
          style={{
            marginLeft: "0.5rem",
            color: "var(--Blue)",
            fontWeight: "bold",
          }}
          to="/login"
        >
          Log In
        </Link>
      </li>
    </form>
  );
}

export default Signup;
