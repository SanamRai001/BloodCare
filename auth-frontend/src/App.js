import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { NotificationProvider } from "./context/NotificationContext";
import { io } from "socket.io-client";
import Navbar from "./container/Navbar";
import "./App.css";

// Import all components
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import BecomeVolunteer from "./components/BecomeVolunteer";
import Contact from "./components/Contact";
import BloodBank from "./components/BloodBank";
import DonateBlood from "./components/DonateBlood";
import News from "./components/News";
import Media from "./components/Media";
import Tips from "./components/Tips";
import VaccineInfo from "./components/Vaccine";
import BecomeMember from "./components/BecomeMember";
import BloodRequestForm from "./components/BloodRequestForm";
import BloodRequestList from "./components/BloodRequestList";
import BloodRequestDetail from "./components/BloodRequestDetail";
import BloodForm from "./components/BloodForm";
import NearbyBloodBanks from "./pages/NearbyBloodBanks";
import BloodSearch from "./components/BloodSearch";
import Introduction from "./components/Introduction ";
import Events from "./components/Event";
import StructureDevelopment from "./components/StructureDevelopment ";

function AppWrapper() {
  return (
    <CookiesProvider>
      <Router>
        <AuthProvider>
          <LanguageProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </LanguageProvider>
        </AuthProvider>
      </Router>
    </CookiesProvider>
  );
}

function App() {
  // Socket.IO setup
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Socket.IO connected successfully");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket.IO connection error:", err);
    });

    socket.on("new-blood-request", (data) => {
      if (window.Notification && Notification.permission === "granted") {
        new Notification(`Urgent Blood Need (${data.bloodType})`, {
          body: `${data.units} units needed at ${data.hospital}`,
          icon: "/blood-drop.png",
        });
      }
    });

    const requestNotificationPermission = async () => {
      if ("Notification" in window && Notification.permission !== "granted") {
        try {
          await Notification.requestPermission();
        } catch (err) {
          console.error("Notification permission error:", err);
        }
      }
    };
    requestNotificationPermission();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blood-banks" element={<BloodBank />} />
        <Route path="/news" element={<News />} />
        <Route
          path="/about/structure-development"
          element={<StructureDevelopment />}
        />
        <Route path="/events" element={<Events />} />
        <Route path="/media" element={<Media />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/about/vaccine" element={<VaccineInfo />} />
        <Route path="/about/introduction" element={<Introduction />} />
        <Route path="/BloodForm" element={<BloodForm />} />
        <Route path="/blood-search" element={<BloodSearch />} />
        <Route path="/nearby-blood-banks" element={<NearbyBloodBanks />} />
        {/* Authenticated Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/become-volunteer" element={<BecomeVolunteer />} />
        <Route path="/become-member" element={<BecomeMember />} />
        <Route path="/donate" element={<DonateBlood />} />
        <Route path="/request-blood" element={<BloodRequestForm />} />
        <Route path="/requests" element={<BloodRequestList />} />
        <Route path="/requests/:id" element={<BloodRequestDetail />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;
