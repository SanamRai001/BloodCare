import React, { useState, useRef, useEffect } from 'react';
import './Media.css';

const Media = () => {
  const [activeTab, setActiveTab] = useState('photoGallery');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const tabsRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    { id: 'photoGallery', label: isMobile ? 'Photos' : 'Photo Gallery' },
    { id: 'newsPress', label: isMobile ? 'News' : 'News & Press' },
    { id: 'postersFlyers', label: isMobile ? 'Posters' : 'Posters & Flyers' },
    { id: 'socialMediaWall', label: isMobile ? 'Social' : 'Social Media Wall' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsScrolling(true);
    
    const tabButtons = tabsRef.current.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      if (button.id === `tab-${tabId}`) {
        button.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    });
    
    setTimeout(() => setIsScrolling(false), 1000);
  };

  // Sample content for each tab
  const renderContent = () => {
    switch (activeTab) {
      case 'photoGallery':
        return (
          <div className="tab-content">
            <h2>Photo Gallery</h2>
            <div className="gallery-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="gallery-item">
                  <img 
                    src={`https://picsum.photos/300/200?random=${item}`} 
                    alt={`Gallery item ${item}`} 
                    loading="lazy"
                  />
                  <p>Photo {item}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'newsPress':
        return (
          <div className="tab-content">
            <h2>News & Press</h2>
            <div className="news-list">
              {[1, 2, 3].map((item) => (
                <div key={item} className="news-item">
                  <div className="news-item-content">
                    <h3>News Headline {item}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
                    <div className="news-meta">
                      <span className="news-date">May {item}, 2023</span>
                      <a href="#read-more" className="read-more">Read more →</a>
                    </div>
                  </div>
                  {!isMobile && (
                    <div className="news-image">
                      <img 
                        src={`https://picsum.photos/200/150?random=${item + 30}`} 
                        alt={`News ${item}`}
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'postersFlyers':
        return (
          <div className="tab-content">
            <h2>Posters & Flyers</h2>
            <div className="posters-grid">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="poster-item">
                  <img 
                    src={`https://picsum.photos/250/350?random=${item + 10}`} 
                    alt={`Poster ${item}`}
                    loading="lazy"
                  />
                  <div className="poster-actions">
                    <button className="download-btn">
                      {isMobile ? '↓' : 'Download'}
                    </button>
                    <button className="share-btn">
                      {isMobile ? '↗' : 'Share'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'socialMediaWall':
        return (
          <div className="tab-content">
            <h2>Social Media Wall</h2>
            <div className="social-feed">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="social-post">
                  <div className="post-header">
                    <img 
                      src={`https://i.pravatar.cc/40?img=${item}`} 
                      alt="User avatar" 
                      className="user-avatar"
                      loading="lazy"
                    />
                    <div className="user-info">
                      <span className="username">User_{item}</span>
                      <span className="post-time">2h ago</span>
                    </div>
                    <button className="more-options">⋯</button>
                  </div>
                  <p className="post-text">This is a sample social media post #{item} showing how content might appear in this section.</p>
                  <img 
                    src={`https://picsum.photos/400/300?random=${item + 20}`} 
                    alt={`Social post ${item}`} 
                    className="post-image"
                    loading="lazy"
                  />
                  <div className="post-actions">
                    <button>
                      {isMobile ? '♥' : 'Like'}
                    </button>
                    <button>
                      {isMobile ? '↻' : 'Share'}
                    </button>
                    <button>
                      {isMobile ? '✎' : 'Comment'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="media-container">
      <h1>Media</h1>
      
      <div className="tabs-container" ref={tabsRef}>
        <div className="tabs-scroll">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
              disabled={isScrolling}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default Media;