import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaLaptopCode,
  FaHandsHelping,
  FaBullhorn,
  FaUsers,
} from "react-icons/fa";
import "./StructureDevelopment.css";

const StructureDevelopment = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const organizationalChart = {
    name: "Board of Directors / Founder",
    children: [
      {
        name: "Portal Administrator",
        children: [
          {
            name: "IT & Technical Team",
            icon: <FaLaptopCode />,
          },
          {
            name: "Content & Communication Team",
            icon: <FaBullhorn />,
          },
          {
            name: "Outreach & Events Team",
            icon: <FaUsers />,
          },
          {
            name: "Donor & Recipient Support Team",
            icon: <FaHandsHelping />,
          },
        ],
      },
    ],
  };

  // Main hero image
  const heroImage = {
    src: "/images/Team and Responsibilities.png",
    alt: "Blood donation team",
    // caption: "Our Dedicated Team Working Together to Save Lives"
  };

  // Image grid items
  const imageGrid = [
    {
      id: 1,
      src: "/images/Founder.png",
      alt: "Director/Founder",
      title: "Director/Founder",
      description:
        "The visionary leader who initiated the portal to promote and manage blood donation effectively. Responsible for setting the mission, building partnerships, overseeing major decisions, and ensuring the portal aligns with its goals of saving lives through efficient blood donation services.",
    },
    {
      id: 2,
      src: "/images/Administrator.png",
      alt: "Administrator",
      title: "Administrator",
      description:
        "Manages the daily operations of the portal, ensures smooth functioning, and coordinates between teams and users.",
    },
    {
      id: 3,
      src: "/images/Technical Team1.jpg",
      alt: "Technical Team",
      title: "Technical Team",
      description:
        "Responsible for developing, maintaining, and securing the portal. They handle website updates, fix technical issues, and ensure the platform is reliable, user-friendly, and available at all times.",
    },
    {
      id: 4,
      src: "/images/Support Team.png",
      alt: "Support Team",
      title: "Support Team",
      description:
        "Provides assistance to donors and recipients by answering their questions, helping them navigate the portal, resolving any problems they face, and offering guidance throughout the blood donation process. They ensure users feel supported and valued at every step.",
    },
    {
      id: 5,
      src: "/images/Outreach Team.jpg",
      alt: "Outreach Team",
      title: "Outreach Team",
      description:
        "Plans and organizes blood donation drives, awareness campaigns, and partnerships with hospitals, schools, and organizations. They work to engage the community, recruit new donors, and promote the importance of blood donation through events, social media, and other channels. Their goal is to increase participation and build strong relationships with stakeholders.",
    },
    {
      id: 6,
      src: "/images/Volunteer.jpg",
      alt: "Volunteer",
      title: "Volunteer",
      description:
        "Support the portal’s activities by helping at blood donation events, spreading awareness, and assisting donors and recipients. They play a vital role in engaging the community and ensuring events and campaigns run smoothly.",
    },
  ];

  const renderOrgChart = (node, level = 0) => {
    return (
      <div
        className={`org-node level-${level} ${isVisible ? "visible" : ""}`}
        key={node.name}
        style={{ transitionDelay: `${level * 100}ms` }}
      >
        <div className="org-node-content">
          {node.icon && <div className="node-icon">{node.icon}</div>}
          <div className="org-node-name">{node.name}</div>
        </div>
        {node.children && (
          <div className="org-children">
            {node.children.map((child) => renderOrgChart(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Container className="structure-development my-5">
      <h2 className="text-center mb-4">Our Organizational Structure</h2>
      <p className="text-center mb-5">
        A dedicated team working together to make blood donation accessible and
        efficient
      </p>

      <Row className="mb-5 justify-content-center">
        <Col lg={10}>
          <div className="org-chart-container">
            <div className="org-chart">
              {renderOrgChart(organizationalChart)}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="hero-image-card mb-4">
            <Card.Img variant="top" src={heroImage.src} alt={heroImage.alt} />
            <Card.ImgOverlay className="d-flex align-items-center justify-content-center">
              <Card.Text className="hero-caption">
                {heroImage.caption}
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>

      <Row className="image-grid-section">
        {imageGrid.map((item) => (
          <Col md={4} className="mb-4" key={item.id}>
            <Card className="image-grid-card h-100">
              <Card.Img variant="top" src={item.src} alt={item.alt} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="contact-card">
            <Card.Body>
              <Card.Title>Get Involved</Card.Title>
              <Card.Text>
                Interested in joining our team or volunteering? Contact us at{" "}
                <strong>join@bloodportal.org</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StructureDevelopment;
