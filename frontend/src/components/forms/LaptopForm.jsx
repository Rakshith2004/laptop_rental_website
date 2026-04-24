import React, { useState } from "react";
import API from "../../api/axios";
import "./LaptopForm.css";

const LaptopForm = () => {
  const [formData, setFormData] = useState({
    model: "",
    brand: "",
    ram: "",
    storage: "",
    processor: "",
    gpu: "",
    display: "",
    os: "",
    securityDeposit: "",
    totalUnits: "",
    availableUnits: "",
    category: "Office",
    condition: "good",
    status: "available",
    tags: "",
  });

  const [pricing, setPricing] = useState({
    perDay: "",
    perWeek: "",
    perMonth: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setPricing((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("model", formData.model);
    data.append("brand", formData.brand);
    data.append("category", formData.category);
    data.append("condition", formData.condition);
    data.append("status", formData.status);
    data.append("securityDeposit", formData.securityDeposit);
    data.append("totalUnits", formData.totalUnits);
    data.append(
      "availableUnits",
      formData.availableUnits || formData.totalUnits,
    );

    const tagsArray = formData.tags.split(",").map((tag) => tag.trim());
    data.append("tags", JSON.stringify(tagsArray));

    const specs = {
      ram: formData.ram,
      storage: formData.storage,
      processor: formData.processor,
      gpu: formData.gpu,
      display: formData.display,
      os: formData.os,
    };

    data.append("specs", JSON.stringify(specs));
    data.append("pricing", JSON.stringify(pricing));

    if (imageFile) data.append("image", imageFile);

    try {
      await API.post("/laptops", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Laptop added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error");
    }
  };

  return (
    <div className="laptop-form-container">
      <h2>Add New Laptop</h2>

      <form onSubmit={handleSubmit}>
        {/* BASIC */}
        <div className="section-title">Basic Info</div>
        <div className="grid-2">
          <div className="field-group">
            <label>Model</label>
            <input name="model" onChange={handleChange} />
          </div>

          <div className="field-group">
            <label>Brand</label>
            <input name="brand" onChange={handleChange} />
          </div>
        </div>

        {/* SPECS */}
        <div className="section-title">Specifications</div>
        <div className="grid-3">
          <div className="field-group">
            <label>RAM</label>
            <input name="ram" onChange={handleChange} />
          </div>

          <div className="field-group">
            <label>Storage</label>
            <input name="storage" onChange={handleChange} />
          </div>

          <div className="field-group">
            <label>Processor</label>
            <input name="processor" onChange={handleChange} />
          </div>

          <div className="field-group">
            <label>GPU</label>
            <input name="gpu" onChange={handleChange} />
          </div>

          <div className="field-group">
            <label>Display</label>
            <input name="display" onChange={handleChange} />
          </div>

          <div className="field-group">
            <label>OS</label>
            <input name="os" onChange={handleChange} />
          </div>
        </div>

        {/* CATEGORY */}
        <div className="section-title">Category</div>
        <div className="grid-2">
          <div className="field-group">
            <label>Category</label>
            <select
              name="category"
              className="form-select"
              onChange={handleChange}
            >
              <option value="Office">Office</option>
              <option value="Gaming">Gaming</option>
              <option value="Student">Student</option>
              <option value="Workstation">Workstation</option>
            </select>
          </div>

          <div className="field-group">
            <label>Tags</label>
            <input
              name="tags"
              placeholder="gaming, rtx, lightweight"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* CONDITION */}
        <div className="section-title">Condition & Status</div>
        <div className="grid-2">
          <div className="field-group">
            <label>Condition</label>
            <select
              name="condition"
              className="form-select"
              onChange={handleChange}
            >
              <option value="new">New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>

          <div className="field-group">
            <label>Status</label>
            <select
              name="status"
              className="form-select"
              onChange={handleChange}
            >
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* INVENTORY */}
        <div className="section-title">Inventory</div>
        <div className="grid-2">
          <div className="field-group">
            <label>Total Units</label>
            <input type="number" name="totalUnits" onChange={handleChange} />
          </div>

          <div className="field-group">
            <label>Available Units</label>
            <input
              type="number"
              name="availableUnits"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* PRICING */}
        <div className="section-title">Pricing</div>
        <div className="grid-3">
          <div className="field-group">
            <label>Per Day</label>
            <input type="number" name="perDay" onChange={handlePricingChange} />
          </div>

          <div className="field-group">
            <label>Per Week</label>
            <input
              type="number"
              name="perWeek"
              onChange={handlePricingChange}
            />
          </div>

          <div className="field-group">
            <label>Per Month</label>
            <input
              type="number"
              name="perMonth"
              onChange={handlePricingChange}
            />
          </div>
        </div>

        {/* SECURITY */}
        <div className="section-title">Security Deposit</div>
        <div className="field-group">
          <label>Deposit (₹)</label>
          <input type="number" name="securityDeposit" onChange={handleChange} />
        </div>

        {/* IMAGE */}
        <div className="section-title">Image</div>
        <div className="image-upload-box">
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        <button className="publish-btn">🚀 Publish Laptop</button>
      </form>
    </div>
  );
};

export default LaptopForm;
