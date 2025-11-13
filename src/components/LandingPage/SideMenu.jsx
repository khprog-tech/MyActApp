import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../CSS/SideMenu.css";

const SideMenu = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (onToggle) onToggle(!isOpen);
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
          {/* DASHBOARD */}
          <div className="menu-item">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `menu-title ${isActive ? "active" : ""}`}
            >
              Dashboard
            </NavLink>
          </div>

          {/* ACCOUNTS MENU */}
          <div className="menu-item">
            <div className="menu-title" onClick={() => handleSubMenu("accounts")}>
              Accounts ▾
            </div>
            {openSubMenu === "accounts" && (
              <div className="submenu">
                <NavLink to="/accounts/main" className={({ isActive }) => (isActive ? "active" : "")}>
                  Main Account
                </NavLink>
                <NavLink to="/accounts/control" className={({ isActive }) => (isActive ? "active" : "")}>
                  Control Account
                </NavLink>
                <NavLink to="/accounts/transactions" className={({ isActive }) => (isActive ? "active" : "")}>
                  Transaction Account
                </NavLink>
              </div>
            )}
          </div>

          {/* VOUCHER ENTRY MENU */}
          <div className="menu-item">
            <div className="menu-title" onClick={() => handleSubMenu("voucher")}>
              Voucher Entry ▾
            </div>
            {openSubMenu === "voucher" && (
              <div className="submenu">
                <NavLink to="/voucher/cash-receipt" className={({ isActive }) => (isActive ? "active" : "")}>
                  Cash Receipt Voucher
                </NavLink>
                <NavLink to="/voucher/cash-payment" className={({ isActive }) => (isActive ? "active" : "")}>
                  Cash Payment Voucher
                </NavLink>
                <NavLink to="/voucher/bank-receipt" className={({ isActive }) => (isActive ? "active" : "")}>
                  Bank Receipt
                </NavLink>
                <NavLink to="/voucher/bank-payment" className={({ isActive }) => (isActive ? "active" : "")}>
                  Bank Payment
                </NavLink>
                <NavLink to="/voucher/journal" className={({ isActive }) => (isActive ? "active" : "")}>
                  Journal Voucher
                </NavLink>
              </div>
            )}
          </div>

          {/* INVENTORY MENU */}
          <div className="menu-item">
            <div className="menu-title" onClick={() => handleSubMenu("inventory")}>
              Inventory ▾
            </div>
            {openSubMenu === "inventory" && (
              <div className="submenu">
                <NavLink to="/inventory/products" className={({ isActive }) => (isActive ? "active" : "")}>
                  Products
                </NavLink>
                <NavLink to="/inventory/categories" className={({ isActive }) => (isActive ? "active" : "")}>
                  Categories
                </NavLink>
                <NavLink to="/inventory/warehouse" className={({ isActive }) => (isActive ? "active" : "")}>
                  Warehouse
                </NavLink>
              </div>
            )}
          </div>

          {/* PURCHASES MENU */}
          <div className="menu-item">
            <div className="menu-title" onClick={() => handleSubMenu("purchases")}>
              Purchases ▾
            </div>
            {openSubMenu === "purchases" && (
              <div className="submenu">
                <NavLink to="/purchases/vendors" className={({ isActive }) => (isActive ? "active" : "")}>
                  Vendors
                </NavLink>
                <NavLink to="/purchases/orders" className={({ isActive }) => (isActive ? "active" : "")}>
                  Purchase Orders
                </NavLink>
                <NavLink to="/purchases/goods-received" className={({ isActive }) => (isActive ? "active" : "")}>
                  Goods Received
                </NavLink>
                <NavLink to="/purchases/invoices" className={({ isActive }) => (isActive ? "active" : "")}>
                  Purchase Invoices
                </NavLink>
              </div>
            )}
          </div>

          {/* SALES MENU */}
          <div className="menu-item">
            <div className="menu-title" onClick={() => handleSubMenu("sales")}>
              Sales ▾
            </div>
            {openSubMenu === "sales" && (
              <div className="submenu">
                <NavLink to="/sales/customers" className={({ isActive }) => (isActive ? "active" : "")}>
                  Customers
                </NavLink>
                <NavLink to="/sales/orders" className={({ isActive }) => (isActive ? "active" : "")}>
                  Sale Orders
                </NavLink>
                <NavLink to="/sales/delivery" className={({ isActive }) => (isActive ? "active" : "")}>
                  Delivery Challan
                </NavLink>
                <NavLink to="/sales/invoices" className={({ isActive }) => (isActive ? "active" : "")}>
                  Sale Invoices
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      )}
    </div>
  );
};

export default SideMenu;
