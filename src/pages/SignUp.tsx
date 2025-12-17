import { useState } from "react";
import { Link } from "react-router";
import { useSignupForm } from "../hooks/useSignUp";

function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const { handleSubmit, errorMessage, isLoading } = useSignupForm();

  return (
    <div className="auth-form" id="signup-page">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
        className="auth-card"
        id="signup-form"
      >
        <div className="sign-form-labelBox">
          <h2>Sign Up</h2>
          <p>
            If You have an accout, <Link to="/login">login here</Link>
          </p>
        </div>
        <div className="input-box">
          <label htmlFor="reg-firstName">First Name</label>
          <input
            type="text"
            placeholder="Rocky"
            // name="firstName"
            id="firstName"
            className="advanced-input"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <label htmlFor="reg-lastName">ELast Name</label>
          <input
            type="text"
            placeholder="Balboa"
            // name="lastName"
            id="lastName"
            className="advanced-input"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <label htmlFor="reg-email">Email</label>
          <input
            type="text"
            placeholder="Email"
            // name="reg-email"
            id="email"
            className="advanced-input"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <label htmlFor="reg-password">Password</label>
          <input
            type="text"
            placeholder="Password"
            // name="reg-password"
            id="password"
            className="advanced-input"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <p id="signup-error" style={{ color: "red" }}>
          {errorMessage}
        </p>

        <button className="signin-btn">
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
