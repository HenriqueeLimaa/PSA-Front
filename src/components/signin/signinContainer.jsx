/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./signinContainer.css";

export const SigninContainer = (props) => {
  return (
    <div className="signin-container">
      <p className="signin-title">Sign in</p>
      <div>
        <div className="input-container">
          <label htmlFor="emailInput">Email</label>
          <input id="emailInput" type="text" />
        </div>
        <div className="input-container">
          <label htmlFor="passwordInput">Password</label>
          <input id="passwordInput" type="password" />
        </div>
        <button className="signin-button" type="submit" onClick={props.onLogin}>
          Sign in
        </button>
      </div>
    </div>
  );
};
