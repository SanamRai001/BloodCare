import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, User, Bell, LogOut } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useCookies } from "react-cookie";
import { useNotifications } from "../context/NotificationContext";
import "./Navbar.css";

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { isLoggedIn, logout, user } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    removeCookie("auth", { path: "/" });
    logout();
    setUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

  const handleNotificationClick = (id) => markAsRead(id);
  const handleMarkAllAsRead = () => markAllAsRead();

  const customTranslations = {
    en: {
      searchPlaceholder: "Search donors...",
      home: "HOME",
      donate: "DONATE BLOOD",
      involved: "GET INVOLVED",
      member: "Become a Member",
      volunteer: "Become a Volunteer",
      donateToUs: "Donate to BloodCare",
      banks: "BLOOD BANKS",
      news: "NEWS & UPDATES",
      media: "Media",
      tips: "Tips",
      events: "Events",
      about: "ABOUT US",
      introduction: "Introduction",
      structure: "Organizational Structure",
      vaccineInfo: "Vaccination Info",
      contact: "CONTACT",
      contactUs: "Contact Us",
      findBank: "Find Blood Bank",
      loginSignup: "Login / Signup",
      profile: "Profile",
      notifications: "Notifications",
      logout: "Logout",
      toggleDarkMode: "Toggle Dark Mode",
      markAllRead: "Mark all as read",
      noNotifications: "No notifications yet",
    },
    np: {
      searchPlaceholder: "रक्तदाता खोज्नुहोस्...",
      home: "गृहपृष्ठ",
      donate: "रक्त दान गर्नुहोस्",
      involved: "संलग्न हुनुहोस्",
      member: "सदस्य बन्नुहोस्",
      volunteer: "स्वयंसेवक बन्नुहोस्",
      donateToUs: "ब्लडकेयरलाई दान गर्नुहोस्",
      banks: "रक्त बैंकहरू",
      news: "समाचार र अपडेटहरू",
      media: "मिडिया",
      tips: "सुझावहरू",
      events: "कार्यक्रमहरू",
      about: "हाम्रो बारेमा",
      introduction: "परिचय",
      structure: "संगठनात्मक संरचना",
      vaccineInfo: "वैक्सिन जानकारी",
      contact: "सम्पर्क",
      contactUs: "हामीलाई सम्पर्क गर्नुहोस्",
      findBank: "रक्त बैंक खोज्नुहोस्",
      loginSignup: "लगइन / साइन अप",
      profile: "प्रोफाइल",
      notifications: "सूचनाहरू",
      logout: "लगआउट",
      toggleDarkMode: "डार्क मोड टगल गर्नुहोस्",
      markAllRead: "सबै पढिएको चिन्ह लगाउनुहोस्",
      noNotifications: "अहिले सम्म कुनै सूचना छैन",
    },
  };

  const translate = (key) => customTranslations[language][key] || key;

  return (
    <nav
      className={`navbar navbar-expand-lg shadow fixed-top px-4 ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <Link
        className="navbar-brand fw-bold d-flex align-items-center gap-2"
        to="/"
      >
        <img
          src="/images/logo.webp"
          alt=""
          width="67"
          height="67"
          className="d-inline-block align-text-top rounded-circle"
        />
        BloodCare
      </Link>

      <button
        className="navbar-toggler border-0"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>&times;</span>
        ) : (
          <span className="navbar-toggler-icon"></span>
        )}
      </button>

      <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item me-3 d-flex align-items-center">
            <div
              className={`d-flex align-items-center rounded-pill px-2 ${
                darkMode ? "bg-secondary" : "bg-light"
              }`}
            >
              <FiSearch size={16} className="me-2 text-muted" />
              <input
                type="text"
                placeholder={translate("searchPlaceholder")}
                className={`form-control form-control-sm border-0 bg-transparent text-${
                  darkMode ? "light" : "dark"
                }`}
                style={{ maxWidth: "200px", boxShadow: "none" }}
              />
            </div>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>
              {translate("home")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/donate"
              onClick={() => setIsOpen(false)}
            >
              {translate("donate")}
            </Link>
          </li>

          <li
            className={`nav-item dropdown ${
              openDropdown === "involved" ? "show" : ""
            }`}
            onMouseEnter={() => setOpenDropdown("involved")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <span
              className="nav-link dropdown-toggle"
              onClick={() =>
                setOpenDropdown(openDropdown === "involved" ? null : "involved")
              }
            >
              {translate("involved")}
            </span>
            <ul
              className={`dropdown-menu ${
                openDropdown === "involved" ? "show" : ""
              } ${darkMode ? "dropdown-menu-dark" : ""}`}
            >
              <li>
                <Link
                  className="dropdown-item"
                  to="/become-member"
                  onClick={() => setIsOpen(false)}
                >
                  {translate("member")}
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/become-volunteer"
                  onClick={() => setIsOpen(false)}
                >
                  {translate("volunteer")}
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/BloodForm"
                  onClick={() => setIsOpen(false)}
                >
                  {translate("Blood-match Checker")}
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/blood-banks"
              onClick={() => setIsOpen(false)}
            >
              {translate("banks")}
            </Link>
          </li>

          <li
            className={`nav-item dropdown ${
              openDropdown === "news" ? "show" : ""
            }`}
            onMouseEnter={() => setOpenDropdown("news")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <span
              className="nav-link dropdown-toggle"
              onClick={() =>
                setOpenDropdown(openDropdown === "news" ? null : "news")
              }
            >
              {translate("news")}
            </span>
            <ul
              className={`dropdown-menu ${
                openDropdown === "news" ? "show" : ""
              } ${darkMode ? "dropdown-menu-dark" : ""}`}
            >
              <li>
                <Link
                  className="dropdown-item"
                  to="/news"
                  onClick={() => setIsOpen(false)}
                >
                  📰 {translate("news")}
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/media"
                  onClick={() => setIsOpen(false)}
                >
                  📷 {translate("media")}
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/events"
                  onClick={() => setIsOpen(false)}
                >
                  📅 {translate("events")}
                </Link>
              </li>
            </ul>
          </li>

          <li
            className={`nav-item dropdown ${
              openDropdown === "about" ? "show" : ""
            }`}
            onMouseEnter={() => setOpenDropdown("about")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <span
              className="nav-link dropdown-toggle"
              onClick={() =>
                setOpenDropdown(openDropdown === "about" ? null : "about")
              }
            >
              {translate("about")}
            </span>
            <ul
              className={`dropdown-menu ${
                openDropdown === "about" ? "show" : ""
              } ${darkMode ? "dropdown-menu-dark" : ""}`}
            >
              <li>
                <Link
                  className="dropdown-item"
                  to="/about/introduction"
                  onClick={() => setIsOpen(false)}
                >
                  {translate("introduction")}
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/about/structure-development"
                  onClick={() => setIsOpen(false)}
                >
                  {translate("structure")}
                </Link>
              </li>
            </ul>
          </li>

          {isLoggedIn ? (
            <li className="nav-item dropdown ms-2" ref={userDropdownRef}>
              <div
                className="nav-link user-avatar-container"
                onClick={toggleUserDropdown}
                onMouseEnter={() => setUserDropdownOpen(true)}
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <div className="user-avatar">
                  <User size={20} />
                  <span className="ms-2 d-none d-lg-inline">
                    {user?.username || "User"}
                  </span>
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </div>
              </div>
              <ul
                className={`dropdown-menu dropdown-menu-end ${
                  userDropdownOpen ? "show" : ""
                } ${darkMode ? "dropdown-menu-dark" : ""}`}
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={16} className="me-2" />
                    {translate("profile")}
                  </Link>
                </li>
                <li className="dropdown-divider"></li>
                <li className="notification-section">
                  <div className="notification-header d-flex justify-content-between align-items-center px-3 py-2">
                    <h6 className="mb-0">{translate("notifications")}</h6>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="btn btn-sm btn-link p-0"
                      >
                        {translate("markAllRead")}
                      </button>
                    )}
                  </div>
                  <div className="notification-list">
                    {notifications.length === 0 ? (
                      <div className="px-3 py-2 text-muted small">
                        {translate("noNotifications")}
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`notification-item ${
                            !notification.read ? "unread" : ""
                          }`}
                          onClick={() =>
                            handleNotificationClick(notification.id)
                          }
                        >
                          <div className="d-flex align-items-start p-2">
                            <Bell
                              size={16}
                              className="mt-1 me-2 flex-shrink-0"
                            />
                            <div>
                              <p className="mb-1 small">
                                {notification.message}
                              </p>
                              <small className="text-muted">
                                {new Date(
                                  notification.timestamp
                                ).toLocaleString()}
                              </small>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </li>
                <li className="dropdown-divider"></li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut size={16} className="me-2" />
                    {translate("logout")}
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm btn-outline-success d-flex align-items-center gap-1 ms-2"
              onClick={() => setIsOpen(false)}
            >
              <i className="bi bi-person-circle"></i> {translate("loginSignup")}
            </Link>
          )}

          <li className="nav-item d-flex align-items-center ms-2">
            <button
              onClick={toggleDarkMode}
              className="btn btn-sm btn-outline-secondary"
              title={translate("toggleDarkMode")}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </li>

          <li className="nav-item d-flex align-items-center ms-2">
            <button
              onClick={() => setLanguage(language === "en" ? "np" : "en")}
              className="btn btn-sm btn-outline-primary"
            >
              {language === "en" ? "नेपाली" : "English"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
