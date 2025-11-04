import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const FeaturedNewsCarousel = ({ newsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Get first 3 featured news
  const featuredNews = newsData.slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredNews.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredNews.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredNews.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredNews.length - 1 : prevIndex - 1
    );
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  const currentNews = featuredNews[currentIndex];

  return (
    <div className="mb-5">
      <section className="row align-items-center position-relative mb-3">
        {/* Left Side - Image (40% width) */}
        <div className="col-md-5 position-relative">
          <img
            src={currentNews.image}
            alt={currentNews.title[language]}
            className="img-fluid rounded shadow w-100"
            style={{ 
              height: "350px", 
              objectFit: "cover",
              border: "3px solid #fff",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
          />
          {/* Navigation Buttons */}
          <button
            className="btn btn-danger position-absolute top-50 start-0 translate-middle-y ms-2 rounded-circle"
            onClick={goToPrev}
            style={{ 
              zIndex: 2,
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            &lt;
          </button>
          <button
            className="btn btn-danger position-absolute top-50 end-0 translate-middle-y me-2 rounded-circle"
            onClick={goToNext}
            style={{ 
              zIndex: 2,
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            &gt;
          </button>
        </div>

        {/* Right Side - News Content (60% width) */}
        <div className="col-md-7 ps-md-4">
          <div className="d-flex align-items-center mb-3">
            <span className={`badge ${getCategoryClass(currentNews.category)} me-2`}>
              {currentNews.category}
            </span>
            <small className="text-muted">
              {new Date(currentNews.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </small>
          </div>
          
          <h2 className="mb-3 fw-bold" style={{ fontSize: "1.8rem" }}>
            {currentNews.title[language]}
          </h2>
          
          <div className="news-content mb-4" style={{ 
            fontSize: "1.1rem",
            lineHeight: "1.7",
            maxHeight: "200px",
            overflow: "hidden"
          }}>
            {currentNews.description[language]}
          </div>
          
          <button
            className="btn btn-danger px-4 py-2"
            onClick={() => navigate(`/news`)} //${currentNews.id}`
          >
            {language === 'en' ? 'Read Full Story' : 'पुरा समाचार पढ्नुहोस्'}
          </button>
        </div>
      </section>

      {/* Dot Indicators */}
      <div className="d-flex justify-content-center gap-2 mt-3">
        {featuredNews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className="btn p-0"
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? "#dc3545" : "#ced4da",
              border: "none",
              transition: "all 0.3s ease"
            }}
            aria-label={`Go to news ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Helper function for category badges
const getCategoryClass = (category) => {
  switch(category.toLowerCase()) {
    case 'event':
      return 'bg-success';
    case 'urgent':
      return 'bg-danger';
    case 'thank you':
      return 'bg-warning text-dark';
    default:
      return 'bg-primary';
  }
};

export default FeaturedNewsCarousel;