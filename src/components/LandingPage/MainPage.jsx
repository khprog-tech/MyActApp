import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import MainAccount from "../Accounts/MainAccount";
import ControlAccount from "../Accounts/ControlAccount";
import TransactionAccount from "../Accounts/TransactionAccount";
import JournalVoucher from "../Accounts/JournalVoucher";
import Product from "../Inventory/Product";
import Category from "../Inventory/Category";
import Warehouse from "../Inventory/Warehouse";
import Vendor from "../Purchases/Vendor"
import PurchaseInvoice from "../Purchases/PurchaseInvoice"
import Customer from "../Sales/Customer"
import SalesInvoice from "../Sales/SalesInvoice"
import Dashboard from "./Dashboard";
import EntryForm from "../Accounts/EntryForm"

import "../CSS/MainPage.css";


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
            <Route path="/accounts/main" element={<MainAccount />} />
            <Route path="/accounts/control" element={<ControlAccount mainAccounts={fixedMainAccounts}/>} />
            <Route path="/accounts/transactions" element={<TransactionAccount />} />
            <Route path="/voucher/journal" element={<JournalVoucher />} />
            <Route path="/inventory/products" element={<Product />} />
            <Route path="/inventory/categories" element={<Category />} />
            <Route path="/inventory/warehouse" element={<Warehouse />} />            
            <Route path="/purchases/vendors" element={<Vendor />} />
            <Route path="/purchases/invoices" element={<PurchaseInvoice />} />
            <Route path="/Sales/Customers" element={<Customer />} />
            <Route path="/Sales/orders" element={<EntryForm />} />
            <Route path="/sales/invoices" element={<SalesInvoice />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default MainPage;
