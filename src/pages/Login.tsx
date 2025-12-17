import { useState } from "react";
import { Link } from "react-router";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { logIn, error, isLoading } = useLogin();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(email, password);
    logIn({ email, password }, rememberMe).catch((err) => console.error(err));
  }

  return (
    <div className="auth-form" id="login-page">
      <form onSubmit={handleSubmit} className="auth-card" id="login-form">
        <div className="sign-form-labelBox">
          <h2>Sign In</h2>
          <p>
            If You don`t have an accout, <Link to="/signup">register here</Link>
          </p>
        </div>
        <div className="input-box">
          <label htmlFor="login-email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="login-email"
            id="login-email"
            className="advanced-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-box">
          <label htmlFor="login-password">Password</label>
          <input
            type="text"
            placeholder="Password"
            name="login-password"
            id="login-password"
            className="advanced-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <p id="login-error" style={{ color: "red" }}>
            Invalied Credentials
          </p>
        )}

        <div className="rememberme-container">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember">Remember Me</label>
        </div>

        <button className="signin-btn">
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default Login;
