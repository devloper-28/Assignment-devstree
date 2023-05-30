import React, { useState } from "react";
import "./login.css";
import AuthLayout from "../components/user/AuthLayout";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleRegister = () => navigate("/register");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((u) => u.email === email);

    if (user) {
      if (user.password === password) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        setLoggedInUser(user);

        navigate("/users");
      } else {
        setError("Incorrect password");
      }
    } else {
      setError("User not found");
    }
  };
console.log(loggedInUser)
  return (
    <>
      <AuthLayout>
        <div className="form_bkp">
          <div className="small_tag">Welcome to</div>
          <div className="main_title">Login to your account</div>
          <div>
            <div>
              <div className="label">Email</div>
              <input
                className="custom_input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="label mt-2">Password</div>
              <input
                className="custom_input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="error_message" style={{ color: "red", marginTop: "15px" }}>{error}</div>}
            <button className="my_btn" onClick={handleLogin}>
              Login
            </button>
            <div>
              Don't have an account?{" "}
              <span className="register_tag" onClick={handleRegister}>
                Register
              </span>
            </div>
          </div>
        </div>
      </AuthLayout>
 
      {loggedInUser && (
        <div className="user_profile">
          <h2>Welcome, {loggedInUser.fullName}!</h2>
          <p>Email: {loggedInUser.email}</p>
          <p>Phone Number: {loggedInUser.phoneNumber}</p>
        </div>
      )}
    </>
  );
};

export default Login;
