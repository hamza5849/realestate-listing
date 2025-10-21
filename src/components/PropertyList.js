import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_BASE_URL;

const PropertyList = ({ token }) => {
  const [properties, setProperties] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API}/api/properties`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to fetch properties");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await axios.delete(`${API}/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(properties.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete property");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-indigo-700">
          My Properties
        </h2>
        {properties.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
              >
                {p.image && (
                  <img
                    src={`${API}/uploads/${p.image}`}
                    alt={p.title}
                    className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => setModalImage(`${API}/uploads/${p.image}`)}
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{p.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-3">{p.description}</p>
                  <p className="text-2xl font-bold text-indigo-600 mb-1">${p.price}</p>
                  <p className="text-gray-500 mb-1">{p.location}</p>
                  <p className="text-gray-500 italic">{p.propertyType}</p>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => (window.location.href = `/add-property/${p._id}`)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {modalImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setModalImage(null)}
          >
            <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
              <button
                className="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition duration-200"
                onClick={() => setModalImage(null)}
              >
                ×
              </button>
              <img src={modalImage} alt="Property" className="w-full h-auto rounded-xl shadow-2xl" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
