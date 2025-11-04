import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp, FaHeartbeat, FaRegClock, FaCheckCircle, FaRegTimesCircle, FaQuestionCircle } from 'react-icons/fa';
import './Tips.css';

const Tips = () => {
  const [activeTab, setActiveTab] = useState('before');
  const [expandedItems, setExpandedItems] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const tabsRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      checkScrollPosition();
    };

    window.addEventListener('resize', handleResize);
    checkScrollPosition();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const tabsContainer = tabsRef.current;
    tabsContainer.addEventListener('scroll', checkScrollPosition);
    return () => tabsContainer.removeEventListener('scroll', checkScrollPosition);
  }, []);

  const checkScrollPosition = () => {
    const tabsContainer = tabsRef.current;
    if (!tabsContainer) return;
    
    setShowLeftArrow(tabsContainer.scrollLeft > 0);
    setShowRightArrow(
      tabsContainer.scrollLeft < tabsContainer.scrollWidth - tabsContainer.clientWidth - 1
    );
  };

  const scrollTabs = (direction) => {
    const tabsContainer = tabsRef.current;
    if (!tabsContainer) return;
    
    const scrollAmount = 200; // Adjust this value as needed
    tabsContainer.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const tabs = [
    { id: 'before', label: 'Before Donation', icon: <FaRegClock /> },
    { id: 'during', label: 'During Donation', icon: <FaHeartbeat /> },
    { id: 'after', label: 'After Donation', icon: <FaCheckCircle /> },
    { id: 'canDonate', label: 'Who Can Donate', icon: <FaCheckCircle /> },
    { id: 'shouldWait', label: 'Who Should Wait', icon: <FaRegTimesCircle /> },
    { id: 'myths', label: 'Myths & Facts', icon: <FaQuestionCircle /> },
    { id: 'faqs', label: 'FAQs', icon: <FaQuestionCircle /> }
  ];

  const content = {
    before: [
      {
        id: 'before1',
        title: 'Hydrate Well',
        content: 'Drink an extra 16 oz. of water before your donation. Avoid alcohol 24 hours before donating.'
      },
      {
        id: 'before2',
        title: 'Eat Healthy Meals',
        content: 'Eat iron-rich foods like spinach, red meat, fish, poultry, beans, and iron-fortified cereals.'
      },
      {
        id: 'before3',
        title: 'Get Good Sleep',
        content: 'Have at least 6 hours of sleep the night before your donation.'
      },
      {
        id: 'before4',
        title: 'Bring Required Items',
        content: 'Bring your donor card, driver\'s license or two other forms of identification.'
      }
    ],
    during: [
      {
        id: 'during1',
        title: 'Relax',
        content: 'Listen to music, read, or talk to other donors to help pass the time.'
      },
      {
        id: 'during2',
        title: 'Communicate',
        content: 'Let staff know if you feel any discomfort during the donation process.'
      },
      {
        id: 'during3',
        title: 'Squeeze Regularly',
        content: 'Squeeze the provided ball every few seconds to help the blood flow.'
      },
      {
        id: 'during4',
        title: 'Time Estimate',
        content: 'Whole blood donation typically takes about 8-10 minutes.'
      }
    ],
    after: [
      {
        id: 'after1',
        title: 'Rest Briefly',
        content: 'Stay seated for 10-15 minutes after donating and enjoy the refreshment provided.'
      },
      {
        id: 'after2',
        title: 'Hydrate',
        content: 'Drink plenty of fluids over the next 24-48 hours to replenish lost fluids.'
      },
      {
        id: 'after3',
        title: 'Avoid Strenuous Activity',
        content: 'Avoid heavy lifting or vigorous exercise for the rest of the day.'
      },
      {
        id: 'after4',
        title: 'Leave Bandage On',
        content: 'Keep the bandage on for several hours to prevent bleeding and reduce bruising.'
      }
    ],
    canDonate: [
      {
        id: 'can1',
        title: 'Age Requirement',
        content: 'In most states, donors must be at least 17 years old (16 with parental consent in some states).'
      },
      {
        id: 'can2',
        title: 'Weight Requirement',
        content: 'Donors must weigh at least 110 pounds (50kg). Additional requirements apply for donors under 18.'
      },
      {
        id: 'can3',
        title: 'Health Status',
        content: 'Generally in good health and feeling well on the day of donation.'
      },
      {
        id: 'can4',
        title: 'Frequency',
        content: 'Whole blood donors can donate every 56 days (8 weeks).'
      }
    ],
    shouldWait: [
      {
        id: 'wait1',
        title: 'Recent Illness',
        content: 'Wait until you\'ve fully recovered from cold, flu, or other infections.'
      },
      {
        id: 'wait2',
        title: 'Pregnancy',
        content: 'Wait 6 weeks after giving birth before donating blood.'
      },
      {
        id: 'wait3',
        title: 'Recent Travel',
        content: 'Some travel to malaria-risk areas may require a waiting period.'
      },
      {
        id: 'wait4',
        title: 'Certain Medications',
        content: 'Some medications require waiting periods (antibiotics, acne medications, etc.).'
      }
    ],
    myths: [
      {
        id: 'myth1',
        title: 'Myth: Donating blood is painful',
        content: 'Fact: You may feel a slight pinch when the needle is inserted, but the donation itself is not painful.'
      },
      {
        id: 'myth2',
        title: 'Myth: Donating blood makes you weak',
        content: 'Fact: Most people feel perfectly fine after donating. Your body replaces the fluid within 24 hours.'
      },
      {
        id: 'myth3',
        title: 'Myth: You can get diseases from donating blood',
        content: 'Fact: All equipment is sterile and used only once, eliminating any risk of disease transmission.'
      },
      {
        id: 'myth4',
        title: 'Myth: Vegetarians can\'t donate blood',
        content: 'Fact: Vegetarians can donate as long as they meet the hemoglobin requirements.'
      }
    ],
    faqs: [
      {
        id: 'faq1',
        title: 'How often can I donate blood?',
        content: 'You can donate whole blood every 56 days (8 weeks). Platelet donors can donate more frequently.'
      },
      {
        id: 'faq2',
        title: 'How long does the donation process take?',
        content: 'The entire process takes about an hour, but the actual blood donation only takes 8-10 minutes.'
      },
      {
        id: 'faq3',
        title: 'Will donating blood affect my athletic performance?',
        content: 'You may want to avoid strenuous exercise for 24 hours after donating, but it won\'t affect long-term performance.'
      },
      {
        id: 'faq4',
        title: 'Can I donate if I have tattoos or piercings?',
        content: 'Yes, as long as they were done at a licensed facility in a state that regulates them, and they\'re fully healed.'
      }
    ]
  };

  const renderTabContent = () => {
    const currentContent = content[activeTab] || [];
    
    return (
      <div className="tips-content">
        {currentContent.map(item => (
          <div key={item.id} className={`tip-item ${expandedItems[item.id] ? 'expanded' : ''}`}>
            <div 
              className="tip-header"
              onClick={() => toggleItem(item.id)}
            >
              <div className="tip-title">
                {item.title}
              </div>
              <div className="tip-toggle">
                {expandedItems[item.id] ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
            {expandedItems[item.id] && (
              <div className="tip-body">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="tips-container">
      <h1>Blood Donation Tips & Information</h1>
      
      <div className="tabs-scroll-container">
        {showLeftArrow && (
          <button 
            className="scroll-button left"
            onClick={() => scrollTabs('left')}
            aria-label="Scroll tabs left"
          >
            &lt;
          </button>
        )}
        
        <div className="tabs-container" ref={tabsRef}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                // Scroll the tab into view
                document.getElementById(`tab-${tab.id}`)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center'
                });
              }}
              id={`tab-${tab.id}`}
            >
              {!isMobile && tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        {showRightArrow && (
          <button 
            className="scroll-button right"
            onClick={() => scrollTabs('right')}
            aria-label="Scroll tabs right"
          >
            &gt;
          </button>
        )}
      </div>
      {renderTabContent()}
    </div>
  );
};

export default Tips;