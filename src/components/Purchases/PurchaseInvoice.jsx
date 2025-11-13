import React, { useState } from "react";
import "../CSS/Purchase.css";

const PurchaseInvoiceForm = () => {
  const [invoice, setInvoice] = useState({
    purchaseId: "",
    invoicePurchaseId: "",
    vendorId: "",
    vendorName: "",
    address: "",
  });

  const [item, setItem] = useState({
    prodId: "",
    productName: "",
    qty: "",
    rate: "",
  });

  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!invoice.invoicePurchaseId.trim() || !invoice.vendorId.trim()) {
      alert("Customer Code and Name are required.");
      return;
    }
};


  // Handle form field change
  const handleInvoiceChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  // Handle line item change
  const handleItemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  // Add or edit line item
  const handleAddItem = () => {
    if (!item.prodId || !item.productName || !item.qty || !item.rate) return;

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

    setItem({ prodId: "", productName: "", qty: "", rate: "" });
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
    setInvoice({
      purchaseId: "",
      invoicePurchaseId: "",
      vendorId: "",
      address: "",      
    });
    setItems([]);
    alert("Form cleared.");
  };

  const totalQty = items.reduce((sum, i) => sum + parseFloat(i.qty || 0), 0);
  const totalAmount = items.reduce(
    (sum, i) => sum + parseFloat(i.amount || 0),
    0
  );

  return (
    <div className="vendor-form-container">
      {/* Header Section */}
        <div className="header-row">
        <h2>Purchase Invoice</h2>
        <div className="action-buttons">
          <button
            className="btn-save"
            onClick={handleSubmit}
            disabled={!invoice.invoicePurchaseId.trim() || !invoice.vendorId.trim()}
          >
            
            {editingIndex !== null ? "Update Customer" : "Save Purchase"}
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
              !invoice.invoicePurchaseId.trim() &&
              !invoice.vendorId.trim()
            }
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="vendor-form">
        <div className="form-row">
            <div className="form-group">
                <label>Purchase Id:</label>
                <input
                type="text"
                name="purchaseId"
                value={invoice.purchaseId}
                onChange={handleInvoiceChange}
                />          
            </div>
          <div className="form-group">
            <label>Purchase Date:</label>
            <input
              type="date"
              name="invoicePurchaseId"
              value={invoice.invoicePurchaseId}
              onChange={handleInvoiceChange}
            />
          </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label>Vendor Id:</label>
                <input
                type="text"
                name="vendorId"
                value={invoice.purchaseId}
                onChange={handleInvoiceChange}
                />          
            </div>
          <div className="form-group">
            <label>Vendor Name:</label>
            <input
              type="text"
              name="vendorName"
              value={invoice.invoicePurchaseId}
              onChange={handleInvoiceChange}
            />
          </div>
        </div>

        <div className="form-row">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={invoice.address}
            onChange={handleInvoiceChange}
            style={{ width: "100%" }}
          />
        </div>
      </div>


      {/* Line Items Section */}

      <div class="form-row">
        <input
          placeholder="Prod ID"
          name="prodId"
          value={item.prodId}
          onChange={handleItemChange}
        />
        <input
          placeholder="Product Name"
          name="productName"
          value={item.productName}
          onChange={handleItemChange}
        />
        <input
          placeholder="Qty"
          type="number"
          name="qty"
          value={item.qty}
          onChange={handleItemChange}
        />
        <input
          placeholder="Rate"
          type="number"
          name="rate"
          value={item.rate}
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
            <th>Prod ID</th>
            <th>Product Name</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input type="checkbox" onChange={() => handleEditItem(index)} />
              </td>
              <td>{it.prodId}</td>
              <td>{it.productName}</td>
              <td>{it.qty}</td>
              <td>{it.rate}</td>
              <td>{it.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ marginTop: 10, textAlign: "right" }}>
        <p><strong>Total Qty:</strong> {totalQty.toFixed(2)}</p>
        <p><strong>Total Amount:</strong> {totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default PurchaseInvoiceForm;