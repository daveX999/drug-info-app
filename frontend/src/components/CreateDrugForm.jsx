import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createDrug } from "../features/drug/drugSlice";

function CreateDrugForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    mechanism: "",
    indications: "",
    dosage: "",
    sideEffects: "",
    interactions: "",
    contraindications: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert comma-separated fields into arrays
    const payload = {
      ...formData,
      indications: formData.indications ? formData.indications.split(",").map(i => i.trim()) : [],
      sideEffects: formData.sideEffects ? formData.sideEffects.split(",").map(i => i.trim()) : [],
      interactions: formData.interactions ? formData.interactions.split(",").map(i => i.trim()) : [],
      contraindications: formData.contraindications ? formData.contraindications.split(",").map(i => i.trim()) : [],
    };

    console.log("Payload being sent:", payload)

    // Dispatch createDrug and navigate to the new drug's details page
    dispatch(createDrug(payload)).then((res) => {
        if (res.payload?._id) {
        navigate(`/drug/${res.payload._id}`);
        }
    });

    // Reset form
    setFormData({
      name: "",
      class: "",
      indications: "",
      dosage: "",
      sideEffects: "",
      interactions: "",
      contraindications: "",
    });
  };

  return (
    <form
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-8"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Drug</h2>

      <input
        type="text"
        name="name"
        placeholder="Drug Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="text"
        name="class"
        placeholder="Drug Class"
        value={formData.class}
        onChange={handleChange}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
          type="text"
          name="mechanism"
          placeholder="Mechanism of Action"
          value={formData.mechanism}
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="indications"
        placeholder="Indications (comma separated)"
        value={formData.indications}
        onChange={handleChange}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="dosage"
        placeholder="Dosage"
        value={formData.dosage}
        onChange={handleChange}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="sideEffects"
        placeholder="Side Effects (comma separated)"
        value={formData.sideEffects}
        onChange={handleChange}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="interactions"
        placeholder="Interactions (comma separated)"
        value={formData.interactions}
        onChange={handleChange}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="contraindications"
        placeholder="Contraindications (comma separated)"
        value={formData.contraindications}
        onChange={handleChange}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
      >
        Add Drug
      </button>

      {/* Back to Home Button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="w-full mt-3 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-medium transition"
      >
        Back to Home
      </button>
    </form>
  );
}

export default CreateDrugForm;