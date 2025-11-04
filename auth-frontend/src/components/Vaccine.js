
import React, { useState } from 'react';
import { FaSyringe, FaUserShield, FaQuestionCircle, FaCalendarAlt, FaCalendarPlus } from 'react-icons/fa';
import './Vaccine.css';

const VaccineInfo = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedVaccine, setSelectedVaccine] = useState('');

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const addToCalendar = (dose) => {
    // Calendar integration logic would go here
    alert(`Added ${dose.timing} to your calendar`);
  };

  // FAQ data
  const faqItems = [
    {
      question: "Can I donate blood after getting a vaccine?",
      answer: "Most vaccines don't require a waiting period for blood donation. However, live attenuated vaccines like MMR or Varicella require a 4-week deferral period before you can donate blood."
    },
    {
      question: "How do vaccines affect blood components?",
      answer: "Vaccines stimulate your immune system but don't affect the safety or quality of your blood components. The components remain safe for transfusion after vaccination."
    },
    {
      question: "Are there special vaccines for frequent blood recipients?",
      answer: "Yes, frequent blood transfusion recipients should consider Hepatitis B, Pneumococcal, and annual Influenza vaccines for additional protection."
    }
  ];

  // Vaccine schedule data
  const vaccineSchedules = {
    hepb: [
      { dose: 1, timing: "Initial dose" },
      { dose: 2, timing: "1 month after first dose" },
      { dose: 3, timing: "6 months after first dose" }
    ],
    mmr: [
      { dose: 1, timing: "Initial dose" },
      { dose: 2, timing: "4 weeks after first dose" }
    ],
    flu: [
      { dose: 1, timing: "Annual dose before flu season" }
    ]
  };

  return (
    <div className="vaccine-section">
      {/* Header Section */}
      <div className="vaccine-header">
        <h1>Vaccine Information Center</h1>
        <p>Essential immunization knowledge for donors and recipients</p>
        {/* <img src="/images/vaccine-hero.jpg" alt="Vaccine illustration" className="header-image" /> */}
      </div>

      {/* Vaccines and Blood Donation */}
      <div className="info-card">
        <h2><FaSyringe /> Vaccines and Blood Donation</h2>
        <div className="content-grid">
          <div className="text-content">
            <h3>Donation Eligibility After Vaccination</h3>
            <ul>
              <li><strong>COVID-19 vaccines:</strong> No waiting period for most vaccines</li>
              <li><strong>Live vaccines (MMR, Varicella):</strong> 4-week deferral</li>
              <li><strong>Hepatitis B:</strong> No deferral if vaccine was preventive</li>
              <li><strong>Flu shots:</strong> No waiting period</li>
            </ul>
          </div>
          <div className="image-content">
            <img src="/images/VaccineTimeline.jpg" alt="Vaccine to donation timeline" />
          </div>
        </div>
      </div>

      {/* Recommended Vaccines for Blood Recipients */}
      <div className="info-card recipient-vaccines">
        <h2><FaUserShield /> Essential Vaccines for Blood Recipients</h2>
        <div className="vaccine-table">
          <table>
            <thead>
              <tr>
                <th>Vaccine</th>
                <th>Importance</th>
                <th>Schedule</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hepatitis B</td>
                <td>Critical for frequent transfusion recipients</td>
                <td>3-dose series (0, 1, 6 months)</td>
              </tr>
              <tr>
                <td>Pneumococcal</td>
                <td>Prevents serious infections</td>
                <td>1-2 doses depending on age</td>
              </tr>
              <tr>
                <td>Influenza</td>
                <td>Annual protection</td>
                <td>Yearly before flu season</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <img src="/images/recipient-care.jpg" alt="Patient receiving care" className="side-image" /> */}
      </div>

      {/* Vaccine FAQ */}
      <div className="info-card faq-section">
        <h2><FaQuestionCircle /> Vaccine FAQs</h2>
        <div className="accordion">
          {faqItems.map((item, index) => (
            <div className="accordion-item" key={index}>
              <button onClick={() => toggleAccordion(index)}>
                {item.question}
                <span>{activeIndex === index ? '-' : '+'}</span>
              </button>
              {activeIndex === index && <div className="accordion-content">{item.answer}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Vaccine Scheduler Tool */}
      <div className="scheduler-tool">
        <h3><FaCalendarAlt /> Vaccine Schedule Planner</h3>
        <div className="scheduler-form">
          <select onChange={(e) => setSelectedVaccine(e.target.value)} value={selectedVaccine}>
            <option value="">Select a vaccine</option>
            <option value="hepb">Hepatitis B</option>
            <option value="mmr">MMR</option>
            <option value="flu">Influenza</option>
          </select>
          
          {selectedVaccine && (
            <div className="schedule-results">
              <h4>Recommended Schedule:</h4>
              <ul>
                {vaccineSchedules[selectedVaccine].map((dose, i) => (
                  <li key={i}>
                    Dose {i+1}: {dose.timing} 
                    <button onClick={() => addToCalendar(dose)}>
                      <FaCalendarPlus /> Add to Calendar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaccineInfo;