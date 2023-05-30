import React, { useState, useRef } from "react";
import AuthLayout from "../components/user/AuthLayout";
import "./login.css";
import PROFILE from "../Assets/profile.svg";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef(null);

  const [profileImg, setProfileImg] = useState()
  const handleRegister = () => {
    if (!fullName || !email || !password || !phoneNumber) {
      setFormError("Please fill in all fields");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    const newUser = {
      fullName,
      email,
      password,
      phoneNumber,
      profileImage: localStorage.getItem("profileImage"),
    };


    const usersDatabase = JSON.parse(localStorage.getItem("users")) || [];
    usersDatabase.push(newUser);
    localStorage.setItem("users", JSON.stringify(usersDatabase));

    navigate("/login");
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("profileImage", reader.result);
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <>
      <AuthLayout>
        <div className="form_bkp right_content">
          <div className="main_title text-center">Create New Profile</div>
          <div className="d-flex justify-content-center">
            <img
              src={profileImg || PROFILE}
              alt="PROFILE"
              className="PROFILE"
              onClick={handleProfileImageClick}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleProfileImageChange}
            />
          </div>
          <div>
            <div>
              <div className="label">Name</div>
              <input
                className="custom_input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <div className="label mt-2">Email</div>
              <input
                className="custom_input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                  setFormError("");
                }}
              />
              {emailError && <div className="error_message">{emailError}</div>}
            </div>
            <div>
              <div className="label mt-2">Password</div>
              <input
                className="custom_input"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                  setFormError("");
                }}
              />
              {passwordError && (
                <div className="error_message">{passwordError}</div>
              )}
            </div>
            <div>
              <div className="label mt-2">Phone Number</div>
              <input
                className="custom_input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {formError && <div className="error_message">{formError}</div>}
            <button className="my_btn" onClick={handleRegister}>
              Register now
            </button>
            <div className="mb-3"> 
              Already have an account?{" "}
              <span className="register_tag" onClick={() => navigate("/login")}>
                Login
              </span>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default Register;
