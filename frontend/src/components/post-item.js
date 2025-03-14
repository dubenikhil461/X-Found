import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload ,faImage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./post-item.css";

const PostItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "exchange", // default to exchange
    price: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && value === "lost-found" && { price: "" }),
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }
      if (!file.type.match("image.*")) {
        setError("Please select an image file");
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const token = localStorage.getItem("token");

      // First upload the image if selected
      let imageUrl = "";
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const imageResponse = await axios.post(
          "http://localhost:5000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        imageUrl = imageResponse.data.url;
      }

      // Then create the item with the image URL
      await axios.post(
        "http://localhost:5000/api/items",
        { ...formData, imageUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Error posting item");
    } finally {
      setUploading(false);
    }
  };
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="post-item-container">
      <h2>Post New Item</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="post-item-form">
        <div className="form-group">
          <label>Item Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="exchange">Exchange/Sell</option>
            <option value="lost-found">Lost and Found</option>
          </select>
        </div>

        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter item name"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe your item"
            rows="4"
          />
        </div>

        {formData.type === "exchange" && (
          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Enter price"
              min="0"
            />
          </div>
        )}

        <div className="form-group">
          <label>Item Image</label>
          <div className="image-upload-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              id="image-upload"
              className="image-input"
            />
            <label htmlFor="image-upload" className="image-upload-label">
              <FontAwesomeIcon icon={faImage} />
              <span>{selectedImage ? "Change Image" : "Select Image"}</span>
            </label>
          </div>
          {previewUrl && (
            <div className="image-preview">
              <img src={previewUrl} alt="Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="submit-button" disabled={uploading}>
          <FontAwesomeIcon icon={faUpload} />
          {uploading ? "Uploading..." : "Post Item"}
        </button>
      </form>
    </div>
  );
};

export default PostItem;
