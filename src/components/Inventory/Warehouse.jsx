import React, { useState} from "react";
import "../CSS/Inventory.css";


const WarehouseForm = () => {
    const [warehouseId, setWarehouseId] = useState("");
    const [warehouseName, setWarehouseName] = useState("");
    const [location, setLocation] = useState("");
    const [warehouses, setWarehouses] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedWarehouses, setselectedWarehouses] = useState([]);

  
const handleSubmit = (e) => {
    e.preventDefault();

    if (!warehouseId.trim() || !warehouseName.trim()) {
      alert("Warehouse Id and Name are required.");
      return;
    }

    const newWarehouse = { warehouseId, warehouseName, location};

    if (editingIndex !== null) {
      const updated = [...warehouses];
      updated[editingIndex] = newWarehouse;
      setWarehouses(updated);
      setEditingIndex(null);
    } else {
      setWarehouses([...warehouses, newWarehouse]);
    }

    resetForm();
  };


  const resetForm = () => {
    setWarehouseId("");
    setWarehouseName("");    
    setLocation("");
  };

  const handleEdit = () => {
    if (selectedWarehouses.length !== 1) {
      alert("Please select exactly one account to edit.");
      return;
    }
    const index = selectedWarehouses[0];
    const warehouse = warehouses[index];
    setWarehouseId(warehouse.warehouseId);
    setWarehouseName(warehouse.warehouseName);    
    setLocation(warehouse.location);    
  };

  const handleCheckboxChange = (index) => {
    if (selectedWarehouses.includes(index)) {
      setselectedWarehouses([]);
    } else {
      setselectedWarehouses([index]);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingIndex(null);
    setselectedWarehouses([]);
  };

  return (
    <div className="inventory-form-container">            
      {/* Header Section */}
        <div className="header-row">
        <h2>Warehouse Information</h2>
        <div className="action-buttons">
          <button
            className="btn-save"
            onClick={handleSubmit}
            disabled={!warehouseId.trim() || !warehouseName.trim()}
          >
            {editingIndex !== null ? "Update warehouse" : "Save Account"}
          </button>

          <button
            className="btn-edit"
            onClick={handleEdit}
            disabled={selectedWarehouses.length !== 1}
          >
            Edit
          </button>

          <button
            className="btn-cancel"
            onClick={handleCancel}
            disabled={
              selectedWarehouses.length === 0 &&
              !warehouseId.trim() &&
              !warehouseName.trim()
            }
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="inventory-form">
        <div className="form-row">          
            <label>Warehouse Id:</label>
            <input
              type="text"
              maxLength={8}
              value={warehouseId}
              onChange={(e) => setWarehouseId(e.target.value)}
              required
            />
        </div>        
        <div className="form-row">
            <label>Warehouse Name:</label>
            <input
              type="text"
              maxLength={50}
              value={warehouseName}
              onChange={(e) => setWarehouseName(e.target.value)}
              required
            />
        </div>
            
        <div className="form-row">
          <label>Location:</label>
          <input
            type="text"
            maxLength={50}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>            
      </form>     

      {/* Table Section */}
      <table className="account-table">
        <thead>
          <tr>
            <th></th>
            <th>Warehouse Id</th>
            <th>Warehouse Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
            {warehouses.length > 0 ? (
            warehouses.map((rec, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedWarehouses.includes(i)}
                    onChange={() => handleCheckboxChange(i)}
                  />
                </td>
                <td>{rec.warehouseId}</td>
                <td>{rec.warehouseName}</td>
                <td>{rec.location}</td>                
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

export default WarehouseForm;
