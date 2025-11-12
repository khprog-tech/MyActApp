import React, { useState} from "react";
import "../CSS/Sales.css";
import cities from "../Data/cities.json"

const CustomerForm = () => {
    const [financialCode, setFinancialCode] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [address,  setAddress] = useState("");
    const [city, setCity] = useState("");
    const [dealingPerson, setDealingPerson] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [faxNo, setFaxNo] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");
    const [contactPerson, SetContactPerson ] = useState("");
    const [contactNo, setContactNo ] = useState("");
    const [creditLimit, setCreditLimit] = useState("");
    const [perDaySale, setPerDaySale] = useState("");
    const [customers, setCustomers] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedCustomers, setSelectedCustomers] = useState([]);

  
const handleSubmit = (e) => {
    e.preventDefault();

    if (!financialCode.trim() || !customerName.trim()) {
      alert("Customer Code and Name are required.");
      return;
    }

    const newCustomer = { financialCode, customerName, address, city, dealingPerson,  phoneNo, faxNo, email, url, contactPerson, contactNo, creditLimit, perDaySale};

    if (editingIndex !== null) {
      const updated = [...customers];
      updated[editingIndex] = newCustomer;
      setCustomers(updated);
      setEditingIndex(null);
    } else {
      setCustomers([...customers, newCustomer]);
    }

    resetForm();
  };


  const resetForm = () => {
    setFinancialCode("");
    setCustomerName("");
    setAddress("");
    setCity("");
    setDealingPerson("");
    setPhoneNo("");
    setFaxNo("");
    setEmail("");
    setUrl("");
    SetContactPerson("");
    setContactNo("");
    setCreditLimit("");
    setPerDaySale("");
  };

  const handleEdit = () => {
    if (selectedCustomers.length !== 1) {
      alert("Please select exactly one account to edit.");
      return;
    }
    const index = selectedCustomers[0];
    const cus = customers[index];
    setFinancialCode(cus.financialCode);
    setCustomerName(cus.customerName);
    setAddress(cus.address);
    setCity(cus.city);
    setDealingPerson(cus.dealingPerson);
    setPhoneNo(cus.phoneNo);
    setFaxNo(cus.faxNo);
    setEmail(cus.email);
    setUrl(cus.url);
    SetContactPerson(cus.contactPerson);
    setContactNo(cus.contactNo);
    setCreditLimit(cus.creditLimit);
    setPerDaySale(cus.perDaySale);
    setEditingIndex(index);
  };

  const handleCheckboxChange = (index) => {
    if (selectedCustomers.includes(index)) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers([index]);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingIndex(null);
    setSelectedCustomers([]);
  };

  return (
    <div className="customer-form-container">            
      {/* Header Section */}
        <div className="header-row">
        <h2>Customer Information</h2>
        <div className="action-buttons">
          <button
            className="btn-save"
            onClick={handleSubmit}
            disabled={!financialCode.trim() || !customerName.trim()}
          >
            {editingIndex !== null ? "Update Customer" : "Save Account"}
          </button>

          <button
            className="btn-edit"
            onClick={handleEdit}
            disabled={selectedCustomers.length !== 1}
          >
            Edit
          </button>

          <button
            className="btn-cancel"
            onClick={handleCancel}
            disabled={
              selectedCustomers.length === 0 &&
              !financialCode.trim() &&
              !customerName.trim()
            }
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-row">
          <div className="form-group">
            <label>Customer Code:</label>
            <input
              type="text"
              maxLength={8}
              value={financialCode}
              onChange={(e) => setFinancialCode(e.target.value)}
              required
            />
          </div>        
          <div className="form-group">
            <label>Customer Name:</label>
            <input
              type="text"
              maxLength={50}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <label>Address:</label>
          <input
            type="text"
            maxLength={50}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City:</label>

            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">-- Select City --</option>
              {cities.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>            
          </div>

          <div className="form-group">
            <label>Dealing Person:</label>
            <input
              type="text"
              maxLength={50}
              value={dealingPerson}
              onChange={(e) => setDealingPerson(e.target.value)}
            />
          </div>              
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone No:</label>
            <input
              type="text"
              maxLength={50}
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>                  
          <div className="form-group">
            <label>Fax:</label>
            <input
              type="text"
              maxLength={50}
              value={faxNo}
              onChange={(e) => setFaxNo(e.target.value)}
            />
          </div>
        </div>    
    
        <div className="form-row">
          <label>Email:</label>
          <input
            type="text"
            maxLength={50}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>    

        <div className="form-row">
          <label>URL:</label>
          <input
            type="text"
            maxLength={50}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>        

        <div className="form-row">
          <div className="form-group">
            <label>Contact Person:</label>
            <input
              type="text"
              maxLength={50}
              value={contactPerson}
              onChange={(e) => SetContactPerson(e.target.value)}
            />
          </div>            
          <div className="form-group">
            <label>Contact No:</label>
            <input
              type="text"
              maxLength={50}
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>        
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Credit Limit:</label>
            <input
              type="text"
              maxLength={50}
              value={creditLimit}
              onChange={(e) => setCreditLimit(e.target.value)}
            />
          </div>        
          <div className="form-group">
            <label>Per Day Sale:</label>
            <input
              type="text"
              maxLength={50}
              value={perDaySale}
              onChange={(e) => setPerDaySale(e.target.value)}
            />
          </div>
        </div>                        
      </form>     

      {/* Table Section */}
      <table className="account-table">
        <thead>
          <tr>
            <th></th>
            <th>Customer Code</th>
            <th>Name</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
            {customers.length > 0 ? (
            customers.map((rec, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(i)}
                    onChange={() => handleCheckboxChange(i)}
                  />
                </td>
                <td>{rec.financialCode}</td>
                <td>{rec.customerName}</td>
                <td>{rec.city}</td>                
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

export default CustomerForm;
