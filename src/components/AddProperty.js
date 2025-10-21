import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_BASE_URL;

const AddProperty = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    propertyType: "",
    image: null,
  });

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${API}/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setForm({ ...res.data, image: null }))
      .catch((err) => console.error(err));
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, image: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null) data.append(key, form[key]);
    });

    try {
      if (id) {
        await axios.put(`${API}/api/properties/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Property updated!");
      } else {
        await axios.post(`${API}/api/properties`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Property added!");
      }
      navigate("/my-properties");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save property");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
          {id ? "Edit Property" : "Add Property"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter property title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter property description"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm resize-none"
              rows="4"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <input
              type="text"
              id="propertyType"
              name="propertyType"
              placeholder="e.g., Apartment, House"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm"
              value={form.propertyType}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {id ? "Update Property" : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
