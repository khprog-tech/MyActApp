import React, { useState } from "react";

export default function SalesInvoiceForm() {
  const [invoice, setInvoice] = useState({
    invoiceNo: "",
    date: "",
    customer: "",
    address: "",
  });

  const [item, setItem] = useState({
    prodId: "",
    productName: "",
    qty: "",
    rate: "",
  });

  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleInvoiceChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    if (!item.prodId || !item.productName || !item.qty || !item.rate) return;

    const newItem = {
      ...item,
      amount: (parseFloat(item.qty) * parseFloat(item.rate)).toFixed(2),
    };

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = newItem;
      setItems(updated);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    setItem({ prodId: "", productName: "", qty: "", rate: "" });
  };

  const handleEditItem = (index) => {
    setItem(items[index]);
    setEditIndex(index);
  };

  const totalQty = items.reduce((sum, i) => sum + parseFloat(i.qty || 0), 0);
  const totalAmount = items.reduce(
    (sum, i) => sum + parseFloat(i.amount || 0),
    0
  );

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 800 }}>
      <h2>Invoice Entry</h2>

      {/* Header Section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <label>Invoice No:</label>
          <input
            type="text"
            name="invoiceNo"
            value={invoice.invoiceNo}
            onChange={handleInvoiceChange}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={invoice.date}
            onChange={handleInvoiceChange}
          />
        </div>
        <div>
          <label>Customer ID:</label>
          <input
            type="text"
            name="customer"
            value={invoice.customer}
            onChange={handleInvoiceChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <textarea
            name="address"
            rows="3"
            value={invoice.address}
            onChange={handleInvoiceChange}
          />
        </div>
      </div>

      <hr />

      {/* Item Entry Section */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
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
        <button onClick={handleAddItem}>{editIndex !== null ? "Update" : "Add"}</button>
      </div>

      {/* Grid */}
      <table
        border="1"
        cellPadding="5"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
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
                <input
                  type="checkbox"
                  onChange={() => handleEditItem(index)}
                />
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
        <p>
          <strong>Total Qty:</strong> {totalQty.toFixed(2)}
        </p>
        <p>
          <strong>Total Amount:</strong> {totalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
