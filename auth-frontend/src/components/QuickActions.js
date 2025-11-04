import React from "react";
import { Link } from "react-router-dom";
import {
  FaHandHoldingHeart,
  FaTint,
  FaSearchLocation,
  FaHospital,
} from "react-icons/fa";
import "../App.css";

const QuickActions = () => {
  const actions = [
    {
      icon: (
        <FaHandHoldingHeart
          className="icon-volunteer"
          style={{ fontSize: "2rem" }}
        />
      ),
      title: "Become a Volunteer",
      subtitle: "Join our life-saving team",
      to: "/become-volunteer",
    },
    {
      icon: <FaTint className="icon-donate" style={{ fontSize: "2rem" }} />,
      title: "Donate Blood",
      subtitle: "Give the gift of life",
      to: "/donate",
    },
    {
      icon: (
        <FaSearchLocation className="icon-find" style={{ fontSize: "2rem" }} />
      ),
      title: "Find Blood Bank Near You",
      subtitle: "Locate nearby centers",
      to: "/blood-search",
    },
    {
      icon: <FaHospital className="icon-bank" style={{ fontSize: "2rem" }} />,
      title: "Blood Bank",
      subtitle: "Check real-time availability",
      to: "/blood-banks",
    },
  ];

  return (
    <div className="container py-4">
      <div className="row text-center g-4">
        {actions.map((item, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
            <Link to={item.to} className="text-decoration-none">
              <div className="card quick-action-card border-0 rounded-4 h-100">
                <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
                  <div className="icon-container mb-3">{item.icon}</div>
                  <h6 className="fw-bold mb-2">{item.title}</h6>
                  <small className="text-muted">{item.subtitle}</small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
