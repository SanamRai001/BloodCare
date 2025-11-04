import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuickActions from "./QuickActions";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import Draggable from "react-draggable";
import config from "../chatbot/config";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";
import "../App.css";
import "./Home.css";
import { useLanguage } from "../context/LanguageContext";
import Footer from "./Footer";
import newsData from "../data/newsData.json";
import FeaturedNewsCarousel from "./FeaturedNewsCarousel";

const Home = () => {
  const [showBot, setShowBot] = useState(false);
  const buttonRef = useRef(null);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);
  const [stats] = useState([
    { value: "1000+", label: "Daily Donors", icon: "❤️" },
    { value: "500+", label: "Monthly Requests", icon: "🩸" },
    { value: "50+", label: "Partner Hospitals", icon: "🏥" },
    { value: "24/7", label: "Support Available", icon: "⏰" },
  ]);
  const [activeStat, setActiveStat] = useState(0);

  const toggleChat = () => {
    setShowBot((prevState) => !prevState);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div className="d-flex flex-column min-vh-100 home-page">
      <div className="container pt-4 flex-grow-1">
        {/* Featured News First */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="section-title">
              {t("featuredNews") || "Latest Updates"}
            </h2>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => navigate("/request-blood")}
            >
              {t("Request-blood") || "Request-Blood"}
            </button>
          </div>
          <FeaturedNewsCarousel newsData={newsData} />
        </section>

        {/* Quick Actions Second */}
        <section className="mb-5">
          <QuickActions />
        </section>

        {/* About Section */}
        <section className="mb-5 row align-items-start g-4">
          <div className="col-lg-6">
            <div className="about-card p-4 h-100 rounded-3 shadow-sm">
              <div className="row mb-3 g-3">
                <div className="col-md-6">
                  <img
                    src="/images/intro.jpg"
                    alt="Blood donation"
                    className="img-fluid rounded shadow w-100"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-6">
                  <img
                    src="/images/107.jpeg"
                    alt="Blood donation camp"
                    className="img-fluid rounded shadow w-100"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                </div>
              </div>
              <div>
                <h4 className="text-danger">About Our Platform</h4>
                <p className="text-muted">
                  We connect blood donors with recipients through an efficient
                  digital platform. Our network spans across Nepal, ensuring
                  timely access to safe blood when needed most.
                </p>
                <button
                  className="btn btn-outline-danger mt-2"
                  onClick={() => navigate("/about/introduction")}
                >
                  {t("learnMore") || "Our Story"}
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="accordion-section h-100">
              {["vision", "mission", "values"].map((sectionKey) => (
                <div className="mb-3" key={sectionKey}>
                  <div
                    className={`d-flex justify-content-between align-items-center p-3 rounded shadow-sm accordion-header ${
                      openSection === sectionKey
                        ? "bg-danger text-white"
                        : "bg-light"
                    }`}
                    onClick={() =>
                      setOpenSection(
                        openSection === sectionKey ? null : sectionKey
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <strong>
                      {
                        {
                          vision: t("ourVision") || "Our Vision",
                          mission: t("ourMission") || "Our Mission",
                          values: t("ourValues") || "Core Values",
                        }[sectionKey]
                      }
                    </strong>
                    <span>{openSection === sectionKey ? "−" : "+"}</span>
                  </div>
                  {openSection === sectionKey && (
                    <div className="p-3 bg-white rounded-bottom shadow-sm border-top-0">
                      {
                        {
                          vision:
                            t("visionText") ||
                            "A Nepal where no life is lost due to blood shortage.",
                          mission:
                            t("missionText") ||
                            "To leverage technology for creating a reliable blood donation ecosystem.",
                          values: (
                            <ul className="mb-0">
                              <li>Compassion for those in need</li>
                              <li>Commitment to service excellence</li>
                              <li>Community partnership</li>
                              <li>Continuous innovation</li>
                            </ul>
                          ),
                        }[sectionKey]
                      }
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Impact Statistics */}
        <section className="mb-3 py-2 bg-white rounded-2 shadow-sm">
          <div className="row text-center">
            {stats.map((stat, index) => (
              <div className="col-md-3 col-6 mb-3" key={stat.label}>
                <div
                  className={`stat-item p-3 ${
                    index === activeStat ? "active" : ""
                  }`}
                >
                  <div className="stat-icon mb-2" style={{ fontSize: "2rem" }}>
                    {stat.icon}
                  </div>
                  <h3 className="text-danger fw-bold mb-1">{stat.value}</h3>
                  <p className="mb-0 text-muted small">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-5 py-5">
          <div className="container">
            <h2 className="section-title text-center mb-5">
              {t("testimonials") || "Life-Saving Stories"}
            </h2>

            <div className="row g-4">
              {[
                {
                  name: "Raj Tharu",
                  role: "Blood Recipient",
                  quote:
                    "Found a matching donor within 2 hours during emergency when my daughter needed urgent surgery. The quick response saved her life.",
                  img: "/images/user1.jpeg",
                  rating: 5,
                },
                {
                  name: "Sita Gurung",
                  role: "Regular Donor",
                  quote:
                    "I've donated 7 times through this platform. The process is so seamless and the team makes you feel like a true lifesaver every time.",
                  img: "/images/user2.jpg",
                  rating: 5,
                },
                {
                  name: "Dr. Sanam Rai",
                  role: "Medical Director",
                  quote:
                    "BloodCare has reduced our blood bank shortages by 60%. Their real-time matching system is revolutionary for healthcare in Nepal.",
                  img: "/images/user3.jpg",
                  rating: 4,
                },
              ].map((testimonial, index) => (
                <div className="col-lg-4 col-md-6" key={index}>
                  <div
                    className="testimonial-card h-100 p-4 rounded-4 shadow-sm bg-white position-relative"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    {/* Rating Stars */}
                    <div className="mb-3">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${
                            i < testimonial.rating
                              ? "text-warning"
                              : "text-light"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="mb-4 position-relative">
                      <i className="fas fa-quote-left text-danger opacity-25 fs-1 position-absolute top-0 start-0"></i>
                      <p className="ps-4 mb-0 fst-italic text-dark">
                        {testimonial.quote}
                      </p>
                      <i className="fas fa-quote-right text-danger opacity-25 fs-1 position-absolute bottom-0 end-0"></i>
                    </blockquote>

                    {/* Author */}
                    <div className="d-flex align-items-center mt-auto">
                      <img
                        src={testimonial.img}
                        alt={testimonial.name}
                        className="rounded-circle me-3 shadow-sm"
                        width="60"
                        height="60"
                        style={{ objectFit: "cover" }}
                      />
                      <div>
                        <h5 className="mb-0 fw-bold">{testimonial.name}</h5>
                        <small className="text-muted d-block">
                          {testimonial.role}
                        </small>
                        <div className="text-danger small">
                          <i className="fas fa-map-marker-alt me-1"></i>{" "}
                          Kathmandu, Nepal
                        </div>
                      </div>
                    </div>

                    {/* Decorative Element */}
                    <div className="position-absolute bottom-0 end-0 me-4 mb-3 opacity-10">
                      <i className="fas fa-heartbeat text-danger fs-1"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-5">
              <button
                className="btn btn-outline-danger px-4 py-2"
                onClick={() => navigate("/testimonials")}
              >
                {t("viewAllStories") || "View All Stories"}{" "}
                <i className="fas fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-5 text-center py-5 bg-danger text-white rounded-3">
          <h2 className="display-5 fw-bold mb-3">
            {t("readyToHelp") || "Ready to Save Lives?"}
          </h2>
          <p className="lead mb-4">
            {t("ctaText") ||
              "Join thousands of donors making a difference every day."}
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-light btn-lg px-4 py-2 fw-bold text-danger"
              onClick={() => navigate("/become-member")}
            >
              {t("joinNow") || "Register Now"}
            </button>
            <button
              className="btn btn-outline-light btn-lg px-4 py-2"
              onClick={() => navigate("/about/introduction")}
            >
              {t("learnHow") || "Learn How It Works"}
            </button>
          </div>
        </section>
      </div>

      {/* Chatbot */}
      <Draggable nodeRef={buttonRef}>
        <div ref={buttonRef} className="chatbot-container">
          <button
            className="btn btn-danger rounded-circle p-3 shadow chat-button pulse-animation"
            onClick={toggleChat}
            title="Chat with BloodBot"
            aria-label="Open chatbot"
          >
            💬
          </button>
          {showBot && (
            <div className="chatbox shadow-lg">
              <div className="chatbox-header bg-danger text-white d-flex justify-content-between align-items-center">
                <span>BloodBot Assistant</span>
                <button
                  onClick={toggleChat}
                  className="close-chat bg-transparent border-0 text-white fs-4"
                  title="Close Chat"
                  aria-label="Close chatbot"
                >
                  &times;
                </button>
              </div>
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            </div>
          )}
        </div>
      </Draggable>

      <Footer />
    </div>
  );
};

export default Home;
