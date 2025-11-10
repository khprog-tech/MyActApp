import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import EntryForm from "./EntryForm";
import Dashboard from "./Dashboard";
import ControlAccount from "./ControlAccount";
import "./MainPage.css";


const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
    

  const fixedMainAccounts = [
    { mainCode: "10", description: "Cash & Bank", accountType: "Asset", status: "Active" },
    { mainCode: "20", description: "Accounts Payable", accountType: "Liability", status: "Active" },
    { mainCode: "30", description: "Sales Revenue", accountType: "Income", status: "Active" },
    { mainCode: "40", description: "Operating Expense", accountType: "Expense", status: "Active" }
  ];

  const handleMenuToggle = (open) => {
    setIsMenuOpen(open);
  };

  return (
    <Router>
      <div className="main-page">
        <Header />
        <SideMenu 

        /*
          onToggle={handleMenuToggle} 
          onMenuSelect={(page) => setActivePage(page)} // Pass callback*/

        />      
        <main className={`content ${isMenuOpen ? "with-menu" : "full-width"}`}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts/main" element={<EntryForm />} />
            <Route path="/accounts/control" element={<ControlAccount mainAccounts={fixedMainAccounts}/>} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default MainPage;
