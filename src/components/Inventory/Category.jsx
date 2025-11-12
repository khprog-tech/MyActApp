import React, { useState} from "react";
import "../CSS/Inventory.css";


const CategoryForm = () => {
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedcategories, setSelectedCategories] = useState([]);

  
const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryId.trim() || !categoryName.trim()) {
      alert("Warehouse Id and Name are required.");
      return;
    }

    const newWarehouse = { categoryId, categoryName};

    if (editingIndex !== null) {
      const updated = [...categories];
      updated[editingIndex] = newWarehouse;
      setCategories(updated);
      setEditingIndex(null);
    } else {
      setCategories([...categories, newWarehouse]);
    }

    resetForm();
  };


  const resetForm = () => {
    setCategoryId("");
    setCategoryName("");        
  };

  const handleEdit = () => {
    if (selectedcategories.length !== 1) {
      alert("Please select exactly one account to edit.");
      return;
    }
    const index = selectedcategories[0];
    const category = categories[index];
    setCategoryId(category.categoryId);
    setCategoryName(category.categoryName);        
  };

  const handleCheckboxChange = (index) => {
    if (selectedcategories.includes(index)) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([index]);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingIndex(null);
    setSelectedCategories([]);
  };

  return (
    <div className="inventory-form-container">            
      {/* Header Section */}
        <div className="header-row">
        <h2>Category Information</h2>
        <div className="action-buttons">
          <button
            className="btn-save"
            onClick={handleSubmit}
            disabled={!categoryId.trim() || !categoryName.trim()}
          >
            {editingIndex !== null ? "Update category" : "Save Account"}
          </button>

          <button
            className="btn-edit"
            onClick={handleEdit}
            disabled={selectedcategories.length !== 1}
          >
            Edit
          </button>

          <button
            className="btn-cancel"
            onClick={handleCancel}
            disabled={
              selectedcategories.length === 0 &&
              !categoryId.trim() &&
              !categoryName.trim()
            }
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="inventory-form">
        <div className="form-row">          
            <label>Category Id:</label>
            <input
              type="text"
              maxLength={8}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            />
        </div>        
        <div className="form-row">
            <label>Category Name:</label>
            <input
              type="text"
              maxLength={50}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
        </div>        
      </form>     

      {/* Table Section */}
      <table className="inventory-table">
        <thead>
          <tr>
            <th></th>
            <th>Warehouse Id</th>
            <th>Warehouse Name</th>
          </tr>
        </thead>
        <tbody>
            {categories.length > 0 ? (
            categories.map((rec, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedcategories.includes(i)}
                    onChange={() => handleCheckboxChange(i)}
                  />
                </td>
                <td>{rec.categoryId}</td>
                <td>{rec.categoryName}</td>
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

export default CategoryForm;
