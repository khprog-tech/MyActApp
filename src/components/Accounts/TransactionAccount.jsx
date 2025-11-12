import React, { useState } from "react";
import "../CSS/Accounts.css";

const TransactionAccountForm = ({ controlAccounts }) => {
    const [selectedControlCode, setSelectedMainCode] = useState("");
      const [controlDescription, setMainDescription] = useState(""); 
      
      const [transactionCode, setTransactionCode] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("Active");

  const [transactionAccounts, setTransactionAccounts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Save / Update handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!transactionCode.trim() || !transactionDescription.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    const newRecord = {
      transactionCode,
      transactionDescription,
      transactionStatus,
    };

    if (editingIndex !== null) {
      const updated = [...transactionAccounts];
      updated[editingIndex] = newRecord;
      setTransactionAccounts(updated);
      setEditingIndex(null);
    } else {
      setTransactionAccounts([...transactionAccounts, newRecord]);
    }

    resetForm();    
  };

  const resetForm = () => {    
    setTransactionCode("");
    setTransactionDescription("");
    setTransactionStatus("Active");
    setSelectedRows([]);
  };

  const handleEdit = () => {
    if (selectedRows.length !== 1) {
      alert("Select exactly 1 row to edit.");
      return;
    }

    const index = selectedRows[0];
    const rec = transactionAccounts[index];

    
    setTransactionCode(rec.transactionCode);
    setTransactionDescription(rec.transactionDescription);
    setTransactionStatus(rec.transactionStatus);
    setEditingIndex(index);

  };

  const handleCheckboxChange = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows([]);
    } else {
      setSelectedRows([index]);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingIndex(null);
    setSelectedRows([]);
  };
  const handleInactiveToggle = () => {
    setTransactionStatus((prev) => (prev === "Active" ? "Inactive" : "Active"));
  };

  return (
    <div className="account-container">
      {/* Header Buttons */}
      <div className="header-row">
        <h2>Transaction Account</h2>

        <div className="action-buttons">
          <button
            className="btn-save"
            onClick={handleSubmit}
            disabled={!transactionCode || !transactionDescription}
          >
            {editingIndex !== null ? "Update" : "Save"}
          </button>

          <button
            className="btn-edit"
            onClick={handleEdit}
            disabled={selectedRows.length !== 1}
          >
            Edit
          </button>

          <button
            className="btn-cancel"
            onClick={handleCancel}
            disabled={
              selectedRows.length === 0 &&              
              !transactionCode &&
              !transactionDescription
            }
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Form Section */}
      <form className="account-form" onSubmit={handleSubmit}>
        
        {/* Main Account Dropdown 
        <div className="form-row">
          <label>Main Account:</label>
          <select value={selectedMainCode} onChange={handleMainSelect}>
            <option value="">-- Select Main Account --</option>
            {mainAccounts.map((acc, idx) => (
              <option key={idx} value={acc.mainCode}>
                {acc.mainCode} - {acc.description}
              </option>
            ))}
          </select>
        </div>*/}

        {/* Auto Display Fields 
        <div className="form-row">
          <label>Account Type:</label>
          <input type="text" value={mainAccountType} readOnly />
        </div>

        <div className="form-row">
          <label>Description:</label>
          <input type="text" value={mainDescription} readOnly />
        </div>*/}

        {/* Transaction Account Code */}
        <div className="form-row">
          <label>Code:</label>
          <input
            type="text"
            maxLength={4}
            value={transactionCode}
            onChange={(e) => setTransactionCode(e.target.value)}
            required
          />
        </div>

        {/* Transaction Description */}
        <div className="form-row">
          <label>Description:</label>
          <input
            type="text"
            maxLength={50}
            value={transactionDescription}
            onChange={(e) => setTransactionDescription(e.target.value)}
            required
          />
        </div>

        {editingIndex !== null && (
          <div className="form-row checkbox-row">
            <label>
              <input
                type="checkbox"
                checked={transactionStatus === "Inactive"}
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactionAccounts.length > 0 ? (
            transactionAccounts.map((rec, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(i)}
                    onChange={() => handleCheckboxChange(i)}
                  />
                </td>
                <td>{rec.transactionCode}</td>
                <td>{rec.transactionDescription}</td>
                <td
                  className={`status-${String(rec.transactionStatus || 'default').toLowerCase()}`}

                >
                  {rec.transactionStatus}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="empty">No transaction accounts added.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default TransactionAccountForm;