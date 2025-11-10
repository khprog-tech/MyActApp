// ==========================
// Chart of Account Multi-Form Structure
// ==========================
import React, { useState } from "react";
import "./ChartOfAccounts.css";

const MainAccountForm = () => {
  const [mainCode, setMainCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Main Account Created: ${mainCode}`);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Main Account</h2>

      <div className="form-group">
        <label>Enter Main Account Code</label>
        <input
          type="text"
          maxLength={2}
          className="form-input"
          value={mainCode}
          onChange={(e) => setMainCode(e.target.value)}
        />
      </div>

      <button className="submit-btn">Create Main Account</button>
    </form>
  );
};

const ControlAccountForm = () => {
  const [mainCode, setMainCode] = useState("");
  const [controlCode, setControlCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Control Account Created: ${mainCode}${controlCode}`);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Control Account (2 + 2 Digits)</h2>

      <div className="form-group">
        <label>Main Account (2 digits)</label>
        <input
          type="text"
          maxLength={2}
          className="form-input"
          value={mainCode}
          onChange={(e) => setMainCode(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Control Center (2 digits)</label>
        <input
          type="text"
          maxLength={2}
          className="form-input"
          value={controlCode}
          onChange={(e) => setControlCode(e.target.value)}
        />
      </div>

      <button className="submit-btn">Create Control Account</button>
    </form>
  );
};

const TransactionAccountForm = () => {
  const [mainCode, setMainCode] = useState("");
  const [controlCode, setControlCode] = useState("");
  const [transCode, setTransCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Transaction Account Created: ${mainCode}${controlCode}${transCode}`);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Transaction Account (2 + 2 + 4 Digits)</h2>

      <div className="form-group">
        <label>Main Account (2 digits)</label>
        <input
          type="text"
          maxLength={2}
          className="form-input"
          value={mainCode}
          onChange={(e) => setMainCode(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Control Center (2 digits)</label>
        <input
          type="text"
          maxLength={2}
          className="form-input"
          value={controlCode}
          onChange={(e) => setControlCode(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Transaction Code (4 digits)</label>
        <input
          type="text"
          maxLength={4}
          className="form-input"
          value={transCode}
          onChange={(e) => setTransCode(e.target.value)}
        />
      </div>

      <button className="submit-btn">Create Transaction Account</button>
    </form>
  );
};

const COAForms = () => {
  const [activeTab, setActiveTab] = useState("main");

  return (
    <div className="main-wrapper">
      <div className="tabs">
        <button
          className={activeTab === "main" ? "tab active" : "tab"}
          onClick={() => setActiveTab("main")}
        >
          Main Account
        </button>

        <button
          className={activeTab === "control" ? "tab active" : "tab"}
          onClick={() => setActiveTab("control")}
        >
          Control Account
        </button>

        <button
          className={activeTab === "transaction" ? "tab active" : "tab"}
          onClick={() => setActiveTab("transaction")}
        >
          Transaction Account
        </button>
      </div>

      {activeTab === "main" && <MainAccountForm />}
      {activeTab === "control" && <ControlAccountForm />}
      {activeTab === "transaction" && <TransactionAccountForm />}
    </div>
  );
};

export default COAForms;
