import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import EntryForm from "./EntryForm";
import ChartOfAccounts from "./ChartOfAccounts"

import "./MainPage.css";

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  {activePage === "mainAccount" && <EntryForm />}


  const handleMenuToggle = (open) => {
    setIsMenuOpen(open);
  };

  return (
    <div className="main-page">
      <Header />
      <SideMenu 
        onToggle={handleMenuToggle} 
        onMenuSelect={(page) => setActivePage(page)} // Pass callback
      />
      
      <main className={`content ${isMenuOpen ? "with-menu" : "full-width"}`}>
        {activePage === "mainAccount" && <EntryForm />}
        <h2>Welcome to the ERP Dashboard</h2>
        <p>
          This is the main content area where you can navigate between modules,
          view reports, and manage system configurations.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
