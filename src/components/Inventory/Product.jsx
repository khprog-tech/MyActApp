import React, { useState} from "react";
import "../CSS/Inventory.css";
import cities from "../Data/cities.json"

const ProductForm = () => {
    const [productId, setProductID] = useState("");
    const [productName, setProductName] = useState("");
    const [productName1,  setProductName1] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [warehouseId, setWarehouseId] = useState("");
    const [salesPrice, setSalePrice] = useState("");
    const [openingStock, setOpeningStock] = useState("");
    const [openingCostPrice, setOpeningCostPrice] = useState("");
    const [products, setProducts] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedproducts, setSelectedProducts] = useState([]);

  
const handleSubmit = (e) => {
    e.preventDefault();

    if (!productId.trim() || !productName.trim()) {
      alert("Product Code and Name are required.");
      return;
    }

    const newProduct = { productId, productName, productName1, categoryId, warehouseId,  salesPrice, openingStock, openingCostPrice};

    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = newProduct;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }

    resetForm();
  };


  const resetForm = () => {
    setProductID("");
    setProductName("");
    setProductName1("");
    setCategoryId("");
    setWarehouseId("");
    setSalePrice("");
    setOpeningStock("");
    setOpeningCostPrice("");    
  };

  const handleEdit = () => {
    if (selectedproducts.length !== 1) {
      alert("Please select exactly one account to edit.");
      return;
    }
    const index = selectedproducts[0];
    const product = products[index];
    setProductID(product.productId);
    setProductName(product.productName);
    setProductName1(product.productName1);
    setCategoryId(product.categoryId);
    setWarehouseId(product.warehouseId);
    setSalePrice(product.salesPrice);
    setOpeningStock(product.openingStock);
    setOpeningCostPrice(product.openingCostPrice);    
  };

  const handleCheckboxChange = (index) => {
    if (selectedproducts.includes(index)) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts([index]);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingIndex(null);
    setSelectedProducts([]);
  };

  return (
    <div className="inventory-form-container">            
      {/* Header Section */}
        <div className="header-row">
        <h2>Product Information</h2>
        <div className="action-buttons">
          <button
            className="btn-save"
            onClick={handleSubmit}
            disabled={!productId.trim() || !productName.trim()}
          >
            {editingIndex !== null ? "Update Product" : "Save Account"}
          </button>

          <button
            className="btn-edit"
            onClick={handleEdit}
            disabled={selectedproducts.length !== 1}
          >
            Edit
          </button>

          <button
            className="btn-cancel"
            onClick={handleCancel}
            disabled={
              selectedproducts.length === 0 &&
              !productId.trim() &&
              !productName.trim()
            }
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="inventory-form">
        <div className="form-row">          
            <label>Product Id:</label>
            <input
              type="text"
              maxLength={8}
              value={productId}
              onChange={(e) => setProductID(e.target.value)}
              required
            />
        </div>        
        <div className="form-row">
            <label>Product Name 1:</label>
            <input
              type="text"
              maxLength={50}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
        </div>
        
        <div className="form-row">
          <label>Product Name 2:</label>
          <input
            type="text"
            maxLength={50}
            value={productName1}
            onChange={(e) => setProductName1(e.target.value)}
          />
        </div>

        <div className="form-row">
            <label>Category:</label>            
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">-- Select categoryId --</option>
              {cities.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>Warehouse:</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">-- Select categoryId --</option>
              {cities.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>
          </div>              
        
        <div className="form-row">
          <div className="form-group">
            <label>Sales Price:</label>
            <input
              type="text"
              maxLength={50}
              value={salesPrice}
              onChange={(e) => setSalePrice(e.target.value)}
            />
          </div>                  
          <div className="form-group">
            <label>Opening Stock:</label>
            <input
              type="text"
              maxLength={50}
              value={openingStock}
              onChange={(e) => setOpeningStock(e.target.value)}
            />
          </div>
        </div>    
    
        <div className="form-row">
          <label>Opening Cost Price:</label>
          <input
            type="text"
            maxLength={50}
            value={openingCostPrice}
            onChange={(e) => setOpeningCostPrice(e.target.value)}
          />
        </div>            
      </form>     

      {/* Table Section */}
      <table className="account-table">
        <thead>
          <tr>
            <th></th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>CategoryId</th>
          </tr>
        </thead>
        <tbody>
            {products.length > 0 ? (
            products.map((rec, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedproducts.includes(i)}
                    onChange={() => handleCheckboxChange(i)}
                  />
                </td>
                <td>{rec.productId}</td>
                <td>{rec.productName}</td>
                <td>{rec.categoryId}</td>                
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

export default ProductForm;
