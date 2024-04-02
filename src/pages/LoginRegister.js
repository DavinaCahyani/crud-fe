import React from "react";

function LoginRegister() {
  function SwitchContent() {
    const content = document.getElementById("content");
    const registerBtn = document.getElementById("register");
    const login = document.getElementById("login");

    registerBtn.addEventListener("click", () => {
      content.classList.add("active");
    });

    login.addEventListener("click", () => {
      content.classList.remove("active");
    });
  }
  return (
    <div
      className="content justify-content-center align-items-center d-flex shadow-lg"
      id="content"
    >
      {/* Register form */}
      <div className="col-md-6 d-flex justify-content-center">
        <form>
          <div className="header-text mb-4">
            <h1>Register</h1>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              placeholder="Username"
              className="form-control form-control-lg bg-light fs-6"
            ></input>
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control form-control-lg bg-light fs-6"
            ></input>
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control form-control-lg bg-light fs-6"
            ></input>
          </div>
          <div className="input-group mb-3 justify-content-center">
            <button className="btn border-white-text w-50 fs-6">
              Register
            </button>
          </div>
        </form>
      </div>

      {/* Login form */}
      <div className="col-md-6 right-box">
        <form>
          <div className="header-text mb-4">
            <h1>Login</h1>
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control form-control-lg bg-light fs-6"
            ></input>
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control form-control-lg bg-light fs-6"
            ></input>
          </div>
          <div className="input-group mb-5 d-flex justify-content-between">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" />
              <label
                htmlFor="formcheck"
                className="form-check-label text-secondary"
              >
                <small>Remember me</small>
              </label>
            </div>
          </div>
          <div className="input-group mb-3 justify-content-center">
            <button className="btn border-white-text w-50 fs-6">Login</button>
          </div>
        </form>
      </div>

      {/* Swatch panel */}
      <div className="switch-content">
        <div className="switch">
          <div className="switch-panel switch-left">
            <h3>Sudah punya akun?</h3>
            <button
              className="hidden btn text-white w-50 fs-6"
              id="login"
              onClick={SwitchContent}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="switch-content">
        <div className="switch">
          <div className="switch-panel switch-right">
            <h3>Belum punya akun?</h3>
            <button
              className="hidden btn border-white text-white w-50 fs-6"
              id="register"
              onClick={SwitchContent}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
