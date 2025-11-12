import React, { useState } from "react";

const EntryForm = () => {
  const [accounts, setAccounts] = useState([
    { code: "1001", description: "Cash in Hand", type: "Asset", status: "Active" },
  ]);

  const [formVisible, setFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    code: "",
    type: "Asset",
    description: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Show form for adding a new account
  const handleAddNew = () => {
    setFormData({ code: "", type: "Asset", description: "" });
    setEditIndex(null);
    setFormVisible(true);
  };

  // Show form for editing an existing account
  const handleEdit = (index) => {
    setFormData({
      code: accounts[index].code,
      type: accounts[index].type,
      description: accounts[index].description,
    });
    setEditIndex(index);
    setFormVisible(true);
  };

  // Save new or edited account
  const handleSave = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update existing
      const updated = [...accounts];
      updated[editIndex] = { ...formData, status: "Active" };
      setAccounts(updated);
    } else {
      // Add new
      setAccounts([...accounts, { ...formData, status: "Active" }]);
    }
    setFormVisible(false);
  };

  // Cancel and return to list
  const handleCancel = () => {
    setFormVisible(false);
  };

  return (
    <div className="container mt-4">
      <h4 className="text-danger mb-3">Main Account</h4>

      {!formVisible ? (
        <>
          <div className="d-flex justify-content-between mb-3">
            <h5>Account List</h5>
            <button className="btn btn-primary btn-sm" onClick={handleAddNew}>
              Add New
            </button>
          </div>

          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Account Code</th>
                <th>Description</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No accounts yet.
                  </td>
                </tr>
              ) : (
                accounts.map((acc, index) => (
                  <tr key={index}>
                    <td>{acc.code}</td>
                    <td>{acc.description}</td>
                    <td>{acc.type}</td>
                    <td>{acc.status}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      ) : (
        <div className="card p-3">
          <h5>{editIndex !== null ? "Edit Account" : "Add New Account"}</h5>
          <form onSubmit={handleSave}>
            <div className="mb-3">
              <label className="form-label">Main Code</label>
              <input
                type="text"
                className="form-control"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Account Type</label>
              <select
                className="form-select"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Asset">Asset</option>
                <option value="Liability">Liability</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success me-2">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EntryForm;
