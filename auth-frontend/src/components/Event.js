import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Event.css";

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Sample event data
  const events = [
    {
      id: 1,
      title: "Tech Conference 2023",
      date: "2023-11-15",
      time: "09:00 - 17:00",
      location: "Convention Center, New York",
      description:
        "Annual technology conference featuring the latest innovations in AI, blockchain, and cloud computing.",
      image: "https://source.unsplash.com/random/800x450/?conference",
      registrationLink: "#register",
      past: false,
      attendees: 350,
      photos: [
        "https://source.unsplash.com/random/300x200/?conference1",
        "https://source.unsplash.com/random/300x200/?conference2",
      ],
    },
    {
      id: 2,
      title: "Product Launch",
      date: "2023-12-05",
      time: "14:00 - 16:00",
      location: "Virtual Event",
      description:
        "Launch of our newest product line with live demonstrations and Q&A session.",
      image: "https://source.unsplash.com/random/800x450/?product",
      registrationLink: "#register",
      past: false,
      attendees: null,
      photos: [],
    },
    {
      id: 3,
      title: "Annual Meetup",
      date: "2023-09-20",
      time: "18:00 - 21:00",
      location: "Downtown Club, Chicago",
      description:
        "Our yearly community gathering with networking opportunities and guest speakers.",
      image: "https://source.unsplash.com/random/800x450/?meetup",
      registrationLink: null,
      past: true,
      attendees: 120,
      photos: [
        "https://source.unsplash.com/random/300x200/?meetup1",
        "https://source.unsplash.com/random/300x200/?meetup2",
        "https://source.unsplash.com/random/300x200/?meetup3",
      ],
    },
    {
      id: 4,
      title: "Workshop: Advanced React",
      date: "2023-10-10",
      time: "10:00 - 15:00",
      location: "Tech Hub, San Francisco",
      description:
        "Hands-on workshop covering advanced React patterns and performance optimization.",
      image: "https://source.unsplash.com/random/800x450/?workshop",
      registrationLink: "#register",
      past: false,
      attendees: null,
      photos: [],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const upcomingEvents = events.filter((event) => !event.past);
  const pastEvents = events.filter((event) => event.past);

  const renderEventCard = (event) => (
    <div key={event.id} className="event-card">
      <div className="event-image-container">
        <img
          src={event.image}
          alt={event.title}
          className="event-image"
          loading="lazy"
        />
        <div className="event-date-badge">
          {format(parseISO(event.date), "MMM dd")}
        </div>
      </div>
      <div className="event-content">
        <h3>{event.title}</h3>
        <div className="event-meta">
          <span className="event-time">{event.time}</span>
          <span className="event-location">{event.location}</span>
        </div>
        <p className="event-description">{event.description}</p>
        {!event.past && event.registrationLink && (
          <a href={event.registrationLink} className="register-btn">
            Register Now
          </a>
        )}
      </div>
    </div>
  );

  const renderPastEventCard = (event) => (
    <div key={event.id} className="past-event-card">
      <h3>{event.title}</h3>
      <div className="past-event-meta">
        <span>{format(parseISO(event.date), "MMMM d, yyyy")}</span>
        {event.attendees && <span>{event.attendees} attendees</span>}
      </div>
      {event.photos.length > 0 && (
        <div className="event-gallery">
          {event.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`${event.title} ${index + 1}`}
              className="gallery-image"
              loading="lazy"
            />
          ))}
        </div>
      )}
      <button className="view-more-btn">
        View Event Recap {isMobile ? "→" : ""}
      </button>
    </div>
  );

  return (
    <div className="events-container">
      <h1>Events</h1>

      <div className="events-tabs">
        <button
          className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Events
        </button>
        <button
          className={`tab-button ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          Past Events
        </button>
        <button
          className={`tab-button ${activeTab === "calendar" ? "active" : ""}`}
          onClick={() => setActiveTab("calendar")}
        >
          Event Calendar
        </button>
      </div>

      <div className="events-content">
        {activeTab === "upcoming" && (
          <div className="upcoming-events">
            {upcomingEvents.length > 0 ? (
              <div className="events-grid">
                {upcomingEvents.map(renderEventCard)}
              </div>
            ) : (
              <div className="no-events">
                <p>No upcoming events scheduled. Check back later!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "past" && (
          <div className="past-events">
            {pastEvents.length > 0 ? (
              <div className="past-events-grid">
                {pastEvents.map(renderPastEventCard)}
              </div>
            ) : (
              <div className="no-events">
                <p>No past events to display.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "calendar" && (
          <div className="event-calendar">
            <div className="calendar-container">
              <Calendar
                onChange={setCalendarDate}
                value={calendarDate}
                className="custom-calendar"
                tileClassName={({ date }) => {
                  const hasEvent = events.some(
                    (event) =>
                      format(parseISO(event.date), "yyyy-MM-dd") ===
                      format(date, "yyyy-MM-dd")
                  );
                  return hasEvent ? "has-event" : "";
                }}
                tileContent={({ date }) => {
                  const eventOnDate = events.find(
                    (event) =>
                      format(parseISO(event.date), "yyyy-MM-dd") ===
                      format(date, "yyyy-MM-dd")
                  );
                  return eventOnDate ? <div className="event-dot"></div> : null;
                }}
              />
            </div>
            <div className="calendar-events">
              <h3>Events on {format(calendarDate, "MMMM d, yyyy")}</h3>
              {events.filter(
                (event) =>
                  format(parseISO(event.date), "yyyy-MM-dd") ===
                  format(calendarDate, "yyyy-MM-dd")
              ).length > 0 ? (
                events
                  .filter(
                    (event) =>
                      format(parseISO(event.date), "yyyy-MM-dd") ===
                      format(calendarDate, "yyyy-MM-dd")
                  )
                  .map((event) => (
                    <div key={event.id} className="calendar-event-item">
                      <h4>{event.title}</h4>
                      <p>
                        {event.time} • {event.location}
                      </p>
                      {!event.past && event.registrationLink && (
                        <a
                          href={event.registrationLink}
                          className="calendar-register-btn"
                        >
                          Register
                        </a>
                      )}
                    </div>
                  ))
              ) : (
                <p>No events scheduled for this date.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
