import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useCookies } from "react-cookie";
import "./AuthForm.css";

const AuthForm = ({ type = "login", darkMode = false, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { language = "en" } = useLanguage();
  const [cookies, setCookie] = useCookies(["auth"]);

  const translations = {
    en: {
      signup: "Sign Up",
      login: "Login",
      username: "Username",
      email: "Email",
      password: "Password",
      submitSignup: "Create Account",
      submitLogin: "Log In",
      switchToLogin: "Already have an account? Login",
      switchToSignup: "Don't have an account? Sign Up",
      serverError: "Server error",
      invalidCredentials: "Invalid credentials",
      userExists: "User already exists",
    },
    np: {
      signup: "दर्ता गर्नुहोस्",
      login: "लगइन गर्नुहोस्",
      username: "प्रयोगकर्ता नाम",
      email: "इमेल",
      password: "पासवर्ड",
      submitSignup: "खाता खोल्नुहोस्",
      submitLogin: "लगइन गर्नुहोस्",
      switchToLogin: "पहिले नै खाता छ? लगइन गर्नुहोस्",
      switchToSignup: "खाता छैन? दर्ता गर्नुहोस्",
      serverError: "सर्भर त्रुटि",
      invalidCredentials: "अमान्य प्रमाणहरू",
      userExists: "प्रयोगकर्ता पहिले नै अवस्थित छ",
    },
  };

  const translate = (key) => {
    const currentLang = translations[language] || translations.en;
    return currentLang[key] || translations.en[key] || key;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const url = `http://localhost:5000/api/auth/${type}`;
      const { data } = await axios.post(url, formData);

      setCookie("auth", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
      });

      login(data.token, data.userId, data.username);

      if (onClose) {
        onClose();
      } else {
        navigate("/dashboard");
      }
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      if (errorMessage === "User already exists") {
        setError(translate("userExists"));
      } else if (errorMessage === "Invalid credentials") {
        setError(translate("invalidCredentials"));
      } else {
        setError(translate("serverError"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchAuthType = () => {
    setError("");
    setFormData({ username: "", email: "", password: "" });
    if (onClose) {
      window.location.hash = type === "login" ? "signup" : "login";
    } else {
      navigate(type === "login" ? "/signup" : "/login");
    }
  };

  return (
    <div className={`auth-form ${darkMode ? "dark-mode" : ""}`}>
      <div className="auth-form-container">
        <h2>{translate(type === "login" ? "login" : "signup")}</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {type === "signup" && (
            <div className="form-group">
              <label htmlFor="username">{translate("username")}</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                minLength="3"
                className={darkMode ? "dark-input" : ""}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">{translate("email")}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={darkMode ? "dark-input" : ""}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{translate("password")}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className={darkMode ? "dark-input" : ""}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`auth-submit ${darkMode ? "dark-button" : ""}`}
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              translate(type === "login" ? "submitLogin" : "submitSignup")
            )}
          </button>
        </form>

        <div className="auth-switch">
          <button
            type="button"
            onClick={switchAuthType}
            className={`auth-switch-btn ${darkMode ? "dark-link" : ""}`}
          >
            {translate(type === "login" ? "switchToSignup" : "switchToLogin")}
          </button>
        </div>

        {onClose && (
          <button
            className={`auth-close-btn ${darkMode ? "dark-button" : ""}`}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
