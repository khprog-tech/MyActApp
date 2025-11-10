import React, { useState } from "react";
import "./EntryForm.css";

const ControlAccountForm = ({ mainAccounts }) => {
  // mainAccounts must come from MainAccount table (passed as props)
  // Format: [{ mainCode, description, accountType, status }]

  const [selectedMainCode, setSelectedMainCode] = useState("");
  const [mainDescription, setMainDescription] = useState("");
  const [mainAccountType, setMainAccountType] = useState("");

  const [controlCode, setControlCode] = useState("");
  const [controlDescription, setControlDescription] = useState("");
  const [controlstatus, setControlStatus] = useState("Active");

  const [controlAccounts, setControlAccounts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // When main account dropdown changes
  const handleMainSelect = (e) => {
    const code = e.target.value;
    setSelectedMainCode(code);

    if (code !== "") {
      const selected = mainAccounts.find((acc) => acc.mainCode === code);
      setMainDescription(selected.description);
      setMainAccountType(selected.accountType);
    } else {
      setMainDescription("");
      setMainAccountType("");
    }
  };

  // Save / Update handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedMainCode || !controlCode.trim() || !controlDescription.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    const newRecord = {
      mainCode: selectedMainCode,
      mainDescription,
      mainAccountType,
      controlCode,
      controlDescription,
      controlstatus,
    };

    if (editingIndex !== null) {
      const updated = [...controlAccounts];
      updated[editingIndex] = newRecord;
      setControlAccounts(updated);
      setEditingIndex(null);
    } else {
      setControlAccounts([...controlAccounts, newRecord]);
    }

    resetForm();
  };

  const resetForm = () => {
    setSelectedMainCode("");
    setMainDescription("");
    setMainAccountType("");
    setControlCode("");
    setControlDescription("");
    setControlStatus("Active");
    setSelectedRows([]);
  };

  const handleEdit = () => {
    if (selectedRows.length !== 1) {
      alert("Select exactly 1 row to edit.");
      return;
    }

    const index = selectedRows[0];
    const rec = controlAccounts[index];

    setSelectedMainCode(rec.mainCode);
    setMainDescription(rec.mainDescription);
    setMainAccountType(rec.mainAccountType);
    setControlCode(rec.controlCode);
    setControlDescription(rec.controlDescription);
    setControlStatus(rec.controlstatus);
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
    setControlStatus((prev) => (prev === "Active" ? "Inactive" : "Active"));
  };

  return (
    <div className="main-account-container">
      {/* Header Buttons */}
      <div className="header-row">
        <h2>Control Account</h2>

        <div className="action-buttons">
          <button
            className="btn-save"
            onClick={handleSubmit}
            disabled={!selectedMainCode || !controlCode || !controlDescription}
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
              !selectedMainCode &&
              !controlCode &&
              !controlDescription
            }
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Form Section */}
      <form className="account-form" onSubmit={handleSubmit}>
        
        {/* Main Account Dropdown */}
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
        </div>

        {/* Auto Display Fields */}
        <div className="form-row">
          <label>Account Type:</label>
          <input type="text" value={mainAccountType} readOnly />
        </div>

        <div className="form-row">
          <label>Description:</label>
          <input type="text" value={mainDescription} readOnly />
        </div>

        {/* Control Account Code */}
        <div className="form-row">
          <label>Code:</label>
          <input
            type="text"
            maxLength={2}
            value={controlCode}
            onChange={(e) => setControlCode(e.target.value)}
            required
          />
        </div>

        {/* Control Description */}
        <div className="form-row">
          <label>Description:</label>
          <input
            type="text"
            maxLength={50}
            value={controlDescription}
            onChange={(e) => setControlDescription(e.target.value)}
            required
          />
        </div>

        {editingIndex !== null && (
          <div className="form-row checkbox-row">
            <label>
              <input
                type="checkbox"
                checked={controlstatus === "Inactive"}
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
          {controlAccounts.length > 0 ? (
            controlAccounts.map((rec, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(i)}
                    onChange={() => handleCheckboxChange(i)}
                  />
                </td>
                <td>{rec.controlCode}</td>
                <td>{rec.controlDescription}</td>
                <td>{rec.mainAccountType}</td>
                <td
                  className={`status-${String(rec.controlstatus || 'default').toLowerCase()}`}

                >
                  {rec.controlstatus}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="empty">No control accounts added.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ControlAccountForm;
