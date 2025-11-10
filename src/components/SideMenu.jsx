import React, { useState } from "react";
import "./SideMenu.css";

const SideMenu = ({ onToggle, onMenuSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  const handleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  return (
    <div className={`side-menu ${isOpen ? "open" : "collapsed"}`}>
      <div className="menu-header">
        {!isOpen ? (
          <button className="toggle-btn collapsed-btn" onClick={handleToggle}>
            ☰
          </button>
        ) : (
          <>
            <h3>Main Menu</h3>
            <button className="toggle-btn" onClick={handleToggle}>
              ✕
            </button>
          </>
        )}
      </div>

      {isOpen && (
        <nav className="menu-links">

           <div className="menu-item">
            <div
              className="menu-title"
              onClick={() => onMenuSelect("dashboard")} // now defined
            >
              Dashboard
            </div>
          </div>
          

          {/* ACCOUNTS MENU */}
          <div className="menu-item">
            <div
              className="menu-title"
              onClick={() => handleSubMenu("accounts")}
            >
              Accounts ▾
            </div>
            {openSubMenu === "accounts" && (
              <div className="submenu">
                <a href="#" onClick={() => onMenuSelect("mainAccount")}>Main Account</a>
                <a href="#">Control Account</a>
                <a href="#">Transaction</a>                
              </div>
            )}
          </div>

          {/* VOUCHER ENTRY MENU */}
          <div className="menu-item">
            <div
              className="menu-title"
              onClick={() => handleSubMenu("voucher")}
            >
              Voucher Entry ▾
            </div>
            {openSubMenu === "voucher" && (
              <div className="submenu">
                <a href="#">Cash Receipt Voucher</a>
                <a href="#">Cash Payment Voucher</a>
                <a href="#">Bank Receipt</a>
                <a href="#">Bank Payment</a>
                <a href="#">Journal Voucher</a>                
              </div>
            )}
          </div>

          {/* PURCHASES MENU */}
          <div className="menu-item">
            <div
              className="menu-title"
              onClick={() => handleSubMenu("purchases")}
            >
              Purchases ▾
            </div>
            {openSubMenu === "purchases" && (
              <div className="submenu">
                <a href="#">Suppliers</a>
                <a href="#">Purchase Orders</a>
                <a href="#">Goods Received</a>
                <a href="#">Supplier Invoices</a>
              </div>
            )}
          </div>

          {/* SALES MENU */}
          <div className="menu-item">
            <div
              className="menu-title"
              onClick={() => handleSubMenu("sales")}
            >
              Sales ▾
            </div>
            {openSubMenu === "sales" && (
              <div className="submenu">
                <a href="#">Customers</a>
                <a href="#">Sale Orders</a>
                <a href="#">Delivery Challan </a>
                <a href="#">Sale Invoices</a>
              </div>
            )}
          </div>

          {/* OTHER LINKS 
          <a href="#">Inventory</a>
          <a href="#">Warehouse</a>
          <a href="#">Production</a>
          <a href="#">Reports</a>
          <a href="#">Settings</a>*/}
        </nav>
      )}
    </div>
  );
};

export default SideMenu;
