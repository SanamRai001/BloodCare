import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import "./Introduction.css";

const Introduction = () => {
  // Portal description data
  const portalDescription = {
    title: "Introduction",
    content:
      "Welcome to our project! This system is designed to help users easily access information about our services. It provides a seamless experience with an intuitive interface to navigate through different features of the application. It is an innovative platform developed to connect blood donors with patients and hospitals in need of life-saving blood. It serves as a bridge between willing donors and recipients by providing an organized and efficient system to manage blood donation activities. The portal allows donors to register, track their eligibility, and receive reminders, while recipients can search for available donors based on blood type, location, and urgency. By simplifying the process of finding and contacting donors, this portal not only saves valuable time during emergencies but also promotes awareness about the importance of regular blood donation. It aims to foster a sense of community and responsibility,making the act of donating blood easier, faster, and more impactful.",
    image: "/images/intro.jpg",
  };

  // Objectives data
  const objectives = {
    title: "Our Objectives",
    items: [
      "To address the critical blood shortages in Nepal by creating a centralized and reliable platform for blood donation.",
      "  To connect willing donors with patients and healthcare facilities quickly and efficiently, especially during emergencies.",
      " To promote awareness about the importance of regular blood donation and encourage more people to donate.",
      " To simplify the process of finding and contacting donors based on blood type, location, and urgency.",
      " To help reduce delays and save lives by providing real-time information about available donors and blood stock.",
      " To ensure equitable access to blood in rural and remote areas of Nepal where blood bank infrastructure is lacking.",
      "   To build a strong, active community of verified and informed donors ready to support during critical situations.",
      " To improve the overall efficiency, transparency, and trust in the blood donation and supply system of Nepal.",
    ],
    image: "/images/objective.jpg",
  };

  return (
    <Container className="introduction-container">
      {/* Portal Description Section */}
      <Row className="description-section my-5 align-items-center">
        <Col lg={6}>
          <h2 className="section-title">{portalDescription.title}</h2>
          <p className="section-content">{portalDescription.content}</p>
        </Col>
        <Col lg={6}>
          <img
            src={portalDescription.image}
            alt="Blood donation portal overview"
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>

      {/* Objectives Section */}
      <Row className="objectives-section my-5 align-items-center">
        <Col lg={6} className="order-lg-2">
          <h2 className="section-title">{objectives.title}</h2>
          <ul className="objectives-list">
            {objectives.items.map((item, index) => (
              <li key={index}>
                <span className="bullet-icon">•</span>
                {item}
              </li>
            ))}
          </ul>
        </Col>
        <Col lg={6} className="order-lg-1">
          <img
            src={objectives.image}
            alt="Blood donation objectives"
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Introduction;
