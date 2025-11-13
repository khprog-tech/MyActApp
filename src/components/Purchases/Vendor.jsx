import React, { useState} from "react";
import "../CSS/Purchase.css";
import cities from "../Data/cities.json"

const VendorForm = () => {
    const [financialCode, setFinancialCode] = useState("");
    const [vendorName, setVendorName] = useState("");
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
    const [vendors, setVendors] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedVendors, setselectedVendors] = useState([]);

    console.debug("Test Message");
  
const handleSubmit = (e) => {
    e.preventDefault();

    if (!financialCode.trim() || !vendorName.trim()) {
      alert("Vendor Code and Name are required.");
      return;
    }

    const newVendor = { financialCode, vendorName, address, city, dealingPerson,  phoneNo, faxNo, email, url, contactPerson, contactNo, creditLimit, perDaySale};

    if (editingIndex !== null) {
      const updated = [...vendors];
      updated[editingIndex] = newVendor;
      setVendors(updated);
      setEditingIndex(null);
    } else {
      setVendors([...vendors, newVendor]);
    }

    resetForm();
  };


  const resetForm = () => {
    setFinancialCode("");
    setVendorName("");
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
    if (selectedVendors.length !== 1) {
      alert("Please select exactly one account to edit.");
      return;
    }
    const index = selectedVendors[0];
    const cus = vendors[index];
    setFinancialCode(cus.financialCode);
    setVendorName(cus.vendorName);
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
    if (selectedVendors.includes(index)) {
      setselectedVendors([]);
    } else {
      setselectedVendors([index]);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingIndex(null);
    setselectedVendors([]);
  };

  return (
    <div className="vendor-form-container">            
      {/* Header Section */}
        <div className="header-row">
        <h2>Vendor Information</h2>
        <div className="action-buttons">
          <button
            className="btn-save"
            onClick={handleSubmit}
            disabled={!financialCode.trim() || !vendorName.trim()}
          >
            {editingIndex !== null ? "Update Vendor" : "Save Account"}
          </button>

          <button
            className="btn-edit"
            onClick={handleEdit}
            disabled={selectedVendors.length !== 1}
          >
            Edit
          </button>

          <button
            className="btn-cancel"
            onClick={handleCancel}
            disabled={
              selectedVendors.length === 0 &&
              !financialCode.trim() &&
              !vendorName.trim()
            }
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="vendor-form">
        <div className="form-row">
          <div className="form-group">
            <label>Vendor Code:</label>
            <input
              type="text"
              maxLength={8}
              value={financialCode}
              onChange={(e) => setFinancialCode(e.target.value)}
              required
            />
          </div>        
          <div className="form-group">
            <label>Vendor Name:</label>
            <input
              type="text"
              maxLength={50}
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
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
            <th>Vendor Code</th>
            <th>Name</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
            {vendors.length > 0 ? (
            vendors.map((rec, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedVendors.includes(i)}
                    onChange={() => handleCheckboxChange(i)}
                  />
                </td>
                <td>{rec.financialCode}</td>
                <td>{rec.vendorName}</td>
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

export default VendorForm;
