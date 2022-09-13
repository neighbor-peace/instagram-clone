import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Modules/Footer";

import appStore from "../Images/app-store.png";
import fbLogo from "../Images/fb-logo.png";
import instagramLogo from "../Images/instagram-logo.png";
import login from "../Images/login.png";
import playStore from "../Images/play-store.png"

const userData = {
  timheidecker: "iLoveEric",
  michelleobama: "firstLady44",
  nasa: "2TheMoon"
};

function Login(props) {
  const [formData, setFormData] = useState({
    userID: {value: "", validity: false},
    password: {value: "", validity: false},
    isValid() {
      return this.userID.validity && this.password.validity;
    },
    canLogin() {
      const id = this.userID.value;
      const pwd = this.password.value;
      return userData?.[id] === pwd;
    }
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [pwdButton, setPwdButton] = useState("Show");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (!formData.isValid()) return;
    if (!formData.canLogin()) {
      updateErrorMessage();
      return;
    }
    navigate(
      "/feed", 
      {
        replace: false,
        state: {userID: formData.userID.value}
      }
    );
  }

  function updateForm(event) {
    const {name, value} = event.target;
    setFormData(prevData => {
      return {
        ...prevData,
        [name]: {
          value: value,
          validity: event.target.checkValidity()
        }
      };
    });
  }

  function updatePwdButton() {
    setPwdButton(prevData => {
      return prevData === "Show" ? "Hide" : "Show";
    })
  }

  function updateErrorMessage() {
    if (!formData.isValid()) {
      return;
    }
    const usernameError = "The username you entered doesn't belong to an account. Please check your username and try again.";
    const passwordError = "Sorry, your password was incorrect. Please double-check your password.";
    const id = formData.userID.value;
    const pwd = formData.password.value;

    if (!userData[id]) {
      setErrorMessage(usernameError);
    }
    else if (userData?.[id] !== pwd) {
      setErrorMessage(passwordError);
    }
    else {
      setErrorMessage("");
    }
  }

  return (
    <div className="login">
      <main>
        <div>
          <img src={login} alt="Two phones displaying instagram" />
          <div>
            <form 
              className="white-box"
              onSubmit={handleSubmit}
            >
              <img  src={instagramLogo} alt="" />
              <label>
                <input
                  type="text"
                  name="userID"
                  id="user-id"
                  placeholder="Phone number, username, or email"
                  required
                  value={formData.userID.value}
                  onChange={updateForm}
              />
              </label>
              <label>
                <input
                  type={pwdButton === "Show" ? "password" : "text"}
                  name="password"
                  id="user-pwd"
                  placeholder="Password"
                  required
                  value={formData.password.value}
                  onChange={updateForm}
                />
                {formData.password.value.length > 0 &&
                  <button
                    type="button"
                    onClick={updatePwdButton}
                  >
                    {pwdButton}
                  </button>
                }
              </label>
              <button
                className={formData.isValid() ? "valid link" : "invalid link"}
              >
                Log In
              </button>
              <div className="divider">
                <span></span>
                <span>OR</span>
                <span></span>
              </div>
              <div className="facebook">
                <img className="fb-logo" src={fbLogo} alt="facebook logo" />
                <a>Log in with Facebook</a>
              </div>
              {errorMessage.length !== 0 &&
                <p>{errorMessage}</p>
              }
              <a>Forgot password?</a>
            </form>
            <div className="white-box">
              <p>Don't have an account? <a>Sign up</a></p>
            </div>
            <p>Get the app.</p>
            <div>
              <a></a>
              <a></a>
            </div>
            <div>
              <a><img src={appStore} className="store" alt="App store" /></a>
              <a><img src={playStore} className="store" alt="Play store" /></a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;