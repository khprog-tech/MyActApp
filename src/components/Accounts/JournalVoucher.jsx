import React, { useState } from "react";
import "../CSS/Vocher.css";

const JournalVoucherForm = () => {
  const [voucher, setVoucher] = useState({
    voucherNo: "",
    voucherDate: "",
    voucherType: "",
    voucherDescription: "",
  });

  const [item, setItem] = useState({
    accountId: "",
    accountDescription: "",
    accountParticulars: "",
    accountDebit: "",
    accountCredit: "",
  });

  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!voucher.voucherDate.trim() || !voucher.voucherType.trim()) {
      alert("Customer Code and Name are required.");
      return;
    }
};


  // Handle form field change
  const handlevoucherChange = (e) => {
    setVoucher({ ...voucher, [e.target.name]: e.target.value });
  };

  // Handle line item change
  const handleItemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  // Add or edit line item
  const handleAddItem = () => {
    if (!item.accountId || !item.accountDescription) return;

    const newItem = {
      ...item,
      amount: (parseFloat(item.qty) * parseFloat(item.rate)).toFixed(2),
    };

    if (editingIndex !== null) {
      const updated = [...items];
      updated[editingIndex] = newItem;
      setItems(updated);
      setEditingIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    setItem({ accountId: "", accountDescription: "", accountParticulars: "", accountDebit: "", accountCredit: "" });
  };

  // Edit existing item
  const handleEditItem = (index) => {
    setItem(items[index]);
    setEditingIndex(index);
  };

  // Button handlers
  const handleSave = () => {
    alert("Account saved successfully!");
  };

  const handleEdit = () => {
    alert("You can now edit the customer information.");
  };

  const handleCancel = () => {
    setVoucher({
      voucherNo: "",
      voucherDate: "",
      voucherType: "",
      address: "",      
    });
    setItems([]);
    alert("Form cleared.");
  };

  const totalDebit = items.reduce((sum, i) => sum + parseFloat(i.accountDebit || 0), 0);
  const totalCredit = items.reduce(
    (sum, i) => sum + parseFloat(i.accountCredit || 0), 0
  );

  return (
    <div className="voucher-form-container">
      {/* Header Section */}
        <div className="header-row">
        <h2>Journal Voucher</h2>
        <div className="action-buttons">
          <button
            className="btn-save"
            onClick={handleSubmit}
            disabled={!voucher.voucherDate.trim() || !voucher.voucherType.trim()}
          >
            
            {editingIndex !== null ? "Update Customer" : "Save voucher"}
          </button>

          <button
            className="btn-edit"
            onClick={handleEdit}
            /*disabled={selectedCustomers.length !== 1}*/
          >
            Edit
          </button>

          <button
            className="btn-cancel"
            onClick={handleCancel}
            disabled={              
              !voucher.voucherDate.trim() &&
              !voucher.voucherType.trim()
            }
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="voucher-form">
        <div className="form-row">
            <div className="form-group">
                <label>Voucher No:</label>
                <input
                type="text"
                name="voucherNo"
                value={voucher.voucherNo}
                onChange={handlevoucherChange}
                />          
            </div>
          <div className="form-group">
            <label>Voucher Date:</label>
            <input
              type="date"
              name="voucherDate"
              value={voucher.voucherDate}
              onChange={handlevoucherChange}
            />
          </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label>Voucher Type:</label>
                <input
                type="text"
                name="voucherType"
                value={voucher.voucherType}
                onChange={handlevoucherChange}
                />          
            </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              name="voucherDescription"
              value={voucher.voucherDescription}
              onChange={handlevoucherChange}
            />
          </div>
        </div>
      </div>


      {/* Line Items Section */}

      <div class="form-row">
        <input
          placeholder="Account ID"
          name="accountId"
          value={item.accountId}
          onChange={handleItemChange}
        />
        <input
          placeholder="Account Description"
          name="accountDescription"
          value={item.accountDescription}
          onChange={handleItemChange}
        />
        <input
          placeholder="Particulars"
          type="text"
          name="accountParticulars"
          value={item.accountParticulars}
          onChange={handleItemChange}
        />
        <input
          placeholder="Debit  "
          type="number"
          name="accountDebit"
          value={item.accountDebit}
          onChange={handleItemChange}
        />
        <input
          placeholder="Credit  "
          type="number"
          name="accountCredit"
          value={item.accountCredit}
          onChange={handleItemChange}
        />

        <button onClick={handleAddItem}>
          {editingIndex !== null ? "Update" : "+"}
        </button>
      </div>

      {/* Line Item Table */}
      <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#eee" }}>
            <th>#</th>
            <th>Select</th>
            <th>Account ID</th>
            <th>Account Description</th>
            <th>Particulars</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input type="checkbox" onChange={() => handleEditItem(index)} />
              </td>
              <td>{it.accountId}</td>
              <td>{it.accountDescription}</td>
              <td>{it.accountParticulars}</td>
              <td>{it.accountDebit}</td>
              <td>{it.accountCredit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ marginTop: 10, textAlign: "right" }}>
        <p><strong>Total Debit:</strong> {totalDebit.toFixed(2)}</p>
        <p><strong>Total Credit:</strong> {totalCredit.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default JournalVoucherForm;