import React, { useState, useEffect } from 'react';
import { FaHeartbeat, FaMapMarkerAlt, FaClock, FaUsers, FaInfoCircle, FaArrowRight } from 'react-icons/fa';


const donationCamps = [
  {
    day: 'Sunday',
    locations: [
      {
        name: 'NRCS Central Blood Bank, Bhrikuti Mandap',
        time: '7 AM to 7 PM',
        organizer: 'Blood Care',
        link: 'https://goo.gl/maps/97d2GukQwyjsfJxU8',
        contact: '01-4240485'
      },
      {
        name: 'Charumati Bihar, Chabahil',
        time: '11:30 AM to 3:30 PM',
        organizer: 'Blood Care - Chabahil Pashupati Sub-Chapter',
        link: 'https://goo.gl/maps/qfjQjrVzmqWw3Nx7A',
        contact: '01-4465732'
      },
      {
        name: 'Bhugol Park, New Road',
        time: '11 AM to 3 PM',
        organizer: 'Dev Corner Sewa Samiti',
        link: 'https://goo.gl/maps/AHYpprpgeLp7RMMF9',
        contact: '01-4265321'
      },
    ],
  },
  {
    day: 'Monday',
    locations: [
      {
        name: 'NRCS Central Blood Bank, Bhrikuti Mandap',
        time: '7 AM to 7 PM',
        organizer: 'Blood Care',
        link: 'https://goo.gl/maps/97d2GukQwyjsfJxU8',
        contact: '01-4240485'
      },
    ],
  },
  {
    day: 'Tuesday',
    locations: [
      {
        name: 'Lampokhari, Chabahil',
        time: '10 AM to 2 PM',
        organizer: 'Lions Club of Kathmandu Chabahil',
        link: 'https://goo.gl/maps/6HYkVZuhpGjBmvZXA',
        contact: '01-4478123'
      },
      {
        name: 'Teaching Hospital, Maharajgunj',
        time: '9 AM to 4 PM',
        organizer: 'Nepal Red Cross Society',
        link: 'https://goo.gl/maps/8JzLJvJ4XJj2',
        contact: '01-4412403'
      },
    ],
  },
];

const benefits = [
  "Free health checkup",
  "Reduces risk of heart disease",
  "Burns calories (approx. 650 per donation)",
  "Stimulates blood cell production",
  "May reduce risk of cancer",
  "Saves up to 3 lives"
];

const preparationTips = [
  "Eat iron-rich foods 2 weeks before donation",
  "Drink extra 500ml water before donating",
  "Have a healthy meal 2-3 hours before",
  "Avoid fatty foods 24 hours before",
  "Bring ID with photo and signature",
  "Wear comfortable clothing"
];

const DonateBlood = () => {
  const [showModal, setShowModal] = useState(false);
 
  const [activeDay, setActiveDay] = useState(getCurrentDay());
  const [form, setForm] = useState({
    age: '',
    weight: '',
    recentDonation: '',
    illness: '',
    hemoglobin: '',
    pregnancy: ''
  });
  const [result, setResult] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  function getCurrentDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  }

  useEffect(() => {
    setActiveDay(getCurrentDay());
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkEligibility = () => {
    const { age, weight, recentDonation, illness, hemoglobin, pregnancy } = form;
    
    if (!age || !weight || !recentDonation || !illness || !hemoglobin || !pregnancy) {
      setResult('⚠️ Please answer all questions to check eligibility');
      return;
    }

    if (age === 'yes' && weight === 'yes' && recentDonation === 'no' && 
        illness === 'no' && hemoglobin === 'yes' && pregnancy === 'no') {
      setResult('✅ You meet the basic eligibility criteria for blood donation!');
    } else {
      let reasons = [];
      if (age === 'no') reasons.push("must be 18-65 years old");
      if (weight === 'no') reasons.push("must weigh at least 45kg");
      if (recentDonation === 'yes') reasons.push("must wait 3 months between donations");
      if (illness === 'yes') reasons.push("must be in good health");
      if (hemoglobin === 'no') reasons.push("must have adequate hemoglobin levels");
      if (pregnancy === 'yes') reasons.push("cannot donate during pregnancy");
      
      setResult(`❌ You may not be eligible because you ${reasons.join(', ')}. Please consult with medical staff.`);
    }
  };

  const filteredCamps = donationCamps
    .filter(camp => camp.day === activeDay)
    .flatMap(camp => camp.locations)
    .filter(loc => 
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="text-center mb-5 py-4 bg-light rounded-3">
        <FaHeartbeat className="text-danger mb-3" size="3em" />
        <h1 className="text-danger fw-bold">Donate Blood, Save Lives</h1>
        <p className="lead text-muted">
          Every blood donation can save up to 3 lives. Join the lifesaving mission today!
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button 
            className="btn btn-danger btn-lg px-4"
            onClick={() => setShowModal(true)}
          >
            Check Eligibility
          </button>
          <a href="#donation-camps" className="btn btn-outline-danger btn-lg px-4">
            Find Donation Centers
          </a>
        </div>
      </div>

      {/* Stats Section */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <h2 className="text-danger">4.5M</h2>
              <p className="text-muted">Blood units needed annually in Nepal</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <h2 className="text-danger">15%</h2>
              <p className="text-muted">Of donations come from voluntary donors</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <h2 className="text-danger">3</h2>
              <p className="text-muted">Lives saved per donation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="row mb-5">
        <div className="col-lg-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h3 className="text-danger mb-4">
                <FaHeartbeat className="me-2" />
                Benefits of Blood Donation
              </h3>
              <ul className="list-group list-group-flush">
                {benefits.map((benefit, index) => (
                  <li key={index} className="list-group-item border-0 py-2">
                    <FaArrowRight className="text-danger me-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mt-4 mt-lg-0">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h3 className="text-danger mb-4">
                <FaInfoCircle className="me-2" />
                Preparation Tips
              </h3>
              <ul className="list-group list-group-flush">
                {preparationTips.map((tip, index) => (
                  <li key={index} className="list-group-item border-0 py-2">
                    <FaArrowRight className="text-danger me-2" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Blood Donation Eligibility Check</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Are you between 18 and 65 years old?</label>
                      <select className="form-select" name="age" onChange={handleChange} value={form.age}>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Do you weigh more than 45 kg?</label>
                      <select className="form-select" name="weight" onChange={handleChange} value={form.weight}>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Have you donated blood in the last 3 months?</label>
                      <select className="form-select" name="recentDonation" onChange={handleChange} value={form.recentDonation}>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Are you currently ill or taking medication?</label>
                      <select className="form-select" name="illness" onChange={handleChange} value={form.illness}>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Is your hemoglobin level above 12.5g/dL (for women) or 13.5g/dL (for men)?</label>
                      <select className="form-select" name="hemoglobin" onChange={handleChange} value={form.hemoglobin}>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Are you pregnant or have you given birth in the last 6 months?</label>
                      <select className="form-select" name="pregnancy" onChange={handleChange} value={form.pregnancy}>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {result && (
                  <div className={`alert ${result.includes('✅') ? 'alert-success' : result.includes('❌') ? 'alert-warning' : 'alert-info'} mt-3`}>
                    {result}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button className="btn btn-danger" onClick={checkEligibility}>
                  Check Eligibility
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Donation Camps Section */}
      <div id="donation-camps" className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-danger">
            <FaMapMarkerAlt className="me-2" />
            Blood Donation Centers
          </h2>
          <div className="w-25">
            <input
              type="text"
              className="form-control"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Day Selector */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {donationCamps.map((camp, index) => (
            <button
              key={index}
              className={`btn ${activeDay === camp.day ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => setActiveDay(camp.day)}
            >
              {camp.day}
            </button>
          ))}
        </div>

        {/* Camps List */}
        {filteredCamps.length > 0 ? (
          <div className="row g-4">
            {filteredCamps.map((loc, i) => (
              <div key={i} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <h5 className="card-title text-danger">{loc.name}</h5>
                    <div className="d-flex align-items-center mb-2">
                      <FaClock className="text-muted me-2" />
                      <span className="text-muted">{loc.time}</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <FaUsers className="text-muted me-2" />
                      <span className="text-muted">{loc.organizer}</span>
                    </div>
                    {loc.contact && (
                      <div className="mb-3">
                        <strong>Contact:</strong> {loc.contact}
                      </div>
                    )}
                  </div>
                  <div className="card-footer bg-transparent border-top-0">
                    <a
                      href={loc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
                    >
                      <FaMapMarkerAlt className="me-2" />
                      View on Map
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info">
            No donation centers found for {activeDay}. Please check other days or contact Nepal Red Cross Society.
          </div>
        )}
      </div>

      {/* Organize Camp Section */}
      <div className="card border-0 shadow-sm bg-light mb-5">
        <div className="card-body p-5 text-center">
          <h3 className="text-danger mb-3">Want to Organize a Blood Donation Camp?</h3>
          <p className="lead mb-4">
            Partner with Nepal Red Cross Society to host your own blood donation drive in your community or organization.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-danger px-4">
              Contact Us
            </button>
            <button className="btn btn-outline-danger px-4">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-5">
        <h2 className="text-danger mb-4">Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h3 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                How often can I donate blood?
              </button>
            </h3>
            <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                You can donate whole blood every 3 months (for men) and 4 months (for women). Platelet donations can be made more frequently, up to 24 times a year.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h3 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                Does blood donation hurt?
              </button>
            </h3>
            <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                You may feel a slight pinch when the needle is inserted, but the donation process itself is generally painless. Most donors compare it to a mild discomfort similar to a blood test.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h3 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                How long does the process take?
              </button>
            </h3>
            <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                The entire process takes about 45 minutes to an hour. The actual blood donation only takes 8-10 minutes. The rest is for registration, health screening, and refreshments.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateBlood;