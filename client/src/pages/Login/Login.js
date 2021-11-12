import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../../components/context";
import Button from "../../components/Button/Button";

function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { dispatch, state } = useContext(AppContext);

  const login = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "https://moviesdb-react.herokuapp.com/login",
        data: {
          email,
          password,
        },
      });
      localStorage.setItem("jwt", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: "USER", payload: user });
      history.push("/movies");
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    if (state) {
      history.push("/movies");
    }
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

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
          }}
          type="text"
          placeholder="Enter your email"
        />
      </div>
      <div className="input">
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Enter your password"
        />
      </div>
      <div
        style={error ? { display: "block" } : { display: "none" }}
        className="error"
      >
        <p style={{ marginTop: "1rem", fontSize: "1rem" }}>
          email or password invalid
        </p>
      </div>
      <div onClick={login} className="form-btn">
        <Button name="Log In" />
      </div>
      <li>
        Don't have an account?
        <Link
          style={{
            marginLeft: "0.5rem",
            color: "var(--Blue)",
            fontWeight: "bold",
          }}
          to="/signup"
        >
          Sign Up
        </Link>
      </li>
    </form>
  );
}

export default Login;
