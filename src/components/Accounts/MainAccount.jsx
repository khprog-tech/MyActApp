import React, { useState } from "react";
import "../CSS/Accounts.css";

const MainAccountForm = () => {
  const [mainCode, setMainCode] = useState("");
  const [description, setDescription] = useState("");
  const [accountType, setAccountType] = useState("Asset");
  const [status, setStatus] = useState("Active");
  const [accounts, setAccounts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mainCode.trim() || !description.trim()) {
      alert("Main Code and Description are required.");
      return;
    }

    const newAccount = { mainCode, description, accountType, status };

    if (editingIndex !== null) {
      const updated = [...accounts];
      updated[editingIndex] = newAccount;
      setAccounts(updated);
      setEditingIndex(null);
    } else {
      setAccounts([...accounts, newAccount]);
    }

    resetForm();
  };

  const resetForm = () => {
    setMainCode("");
    setDescription("");
    setAccountType("Asset");
    setStatus("Active");
  };

  const handleEdit = () => {
    if (selectedAccounts.length !== 1) {
      alert("Please select exactly one account to edit.");
      return;
    }
    const index = selectedAccounts[0];
    const acc = accounts[index];
    setMainCode(acc.mainCode);
    setDescription(acc.description);
    setAccountType(acc.accountType);
    setStatus(acc.status);
    setEditingIndex(index);
  };

  const handleCheckboxChange = (index) => {
    if (selectedAccounts.includes(index)) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts([index]);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingIndex(null);
    setSelectedAccounts([]);
  };

  const handleInactiveToggle = () => {
    setStatus((prev) => (prev === "Active" ? "Inactive" : "Active"));
  };

  return (
    <div className="account-container">
      {/* Header Section */}
      <div className="header-row">
        <h2>Main Account</h2>
        <div className="action-buttons">
          <button
            className="btn-save"
            onClick={handleSubmit}
            disabled={!mainCode.trim() || !description.trim()}
          >
            {editingIndex !== null ? "Update Account" : "Save Account"}
          </button>

          <button
            className="btn-edit"
            onClick={handleEdit}
            disabled={selectedAccounts.length !== 1}
          >
            Edit
          </button>

          <button
            className="btn-cancel"
            onClick={handleCancel}
            disabled={
              selectedAccounts.length === 0 &&
              !mainCode.trim() &&
              !description.trim()
            }
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="account-form-container">
        <div className="form-row">
          <label>Main Code:</label>
          <input
            type="text"
            maxLength={2}
            value={mainCode}
            onChange={(e) => setMainCode(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Account Type:</label>
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option>Asset</option>
            <option>Liability</option>
            <option>Income</option>
            <option>Expense</option>
          </select>
        </div>

        <div className="form-row">
          <label>Description:</label>
          <input
            type="text"
            maxLength={50}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {editingIndex !== null && (
          <div className="form-row checkbox-row">
            <label>
              <input
                type="checkbox"
                checked={status === "Inactive"}
                onChange={handleInactiveToggle}
              />{" "}
              Mark as Inactive
            </label>
          </div>
        )}
      </form>

      {/* Table Section */}
      <table className="account-table">
        <thead>
          <tr>
            <th></th>
            <th>Account Code</th>
            <th>Description</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {accounts.length > 0 ? (
            accounts.map((acc, i) => (
              <tr
                key={i}
                className={acc.status === "Inactive" ? "inactive-row" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedAccounts.includes(i)}
                    onChange={() => handleCheckboxChange(i)}
                  />
                </td>
                <td>{acc.mainCode}</td>
                <td>{acc.description}</td>
                <td>{acc.accountType}</td>
                <td
                  className={`status-${acc.status.toLowerCase()}`}
                >
                  {acc.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="empty">
                No accounts yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MainAccountForm;
