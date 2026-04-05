import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateDrug } from "../features/drug/drugSlice";

// ✅ Moved outside — stable references, no focus loss
const ViewField = ({ label, value }) =>
  value ? (
    <div className="mb-4">
      <h2 className="font-semibold mb-1">{label}:</h2>
      <p>{value}</p>
    </div>
  ) : null;

const EditField = ({ label, name, value, onChange, textarea }) => (
  <div className="mb-4">
    <label className="font-semibold mb-1 block">{label}:</label>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    ) : (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    )}
  </div>
);

function DrugDetailsCard({ drug, isEditMode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isEditing, setIsEditing] = useState(isEditMode);
  const [form, setForm] = useState({
    name: drug.name || "",
    class: drug.class || "",
    indications: drug.indications?.join(", ") || "",
    dosage: drug.dosage || "",
    sideEffects: drug.sideEffects?.join(", ") || "",
    interactions: drug.interactions?.join(", ") || "",
    contraindications: drug.contraindications?.join(", ") || "",
  });

  if (!drug) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toArray = (str) =>
    str.split(",").map((s) => s.trim()).filter(Boolean);

  const handleSave = () => {
    const drugData = {
      name: form.name,
      class: form.class,
      dosage: form.dosage,
      indications: toArray(form.indications),
      sideEffects: toArray(form.sideEffects),
      interactions: toArray(form.interactions),
      contraindications: toArray(form.contraindications),
    };

    dispatch(updateDrug({ id, drugData }));
    setIsEditing(false);
    navigate(`/drug/${id}`, { replace: true });
  };

  const handleCancel = () => {
    setIsEditing(false);
    navigate(`/drug/${id}`, { replace: true });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="text-4xl font-bold text-gray-800 border-b-2 border-blue-400 focus:outline-none w-full mb-1"
            />
          ) : (
            <h1 className="text-4xl font-bold text-gray-800">{drug.name}</h1>
          )}
          {isEditing ? (
            <input
              type="text"
              name="class"
              value={form.class}
              onChange={handleChange}
              className="text-lg text-gray-500 border-b border-gray-300 focus:outline-none w-full"
            />
          ) : (
            <p className="text-lg text-gray-500">{drug.class}</p>
          )}
        </div>

        <div className="flex gap-2 ml-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <div>
          {isEditing ? (
            <>
              <EditField label="Indications (comma-separated)" name="indications" value={form.indications} onChange={handleChange} />
              <EditField label="Dosage" name="dosage" value={form.dosage} onChange={handleChange} textarea />
            </>
          ) : (
            <>
              <ViewField label="Indications" value={drug.indications?.join(", ")} />
              <ViewField label="Dosage" value={drug.dosage} />
            </>
          )}
        </div>

        <div>
          {isEditing ? (
            <>
              <EditField label="Side Effects (comma-separated)" name="sideEffects" value={form.sideEffects} onChange={handleChange} />
              <EditField label="Interactions (comma-separated)" name="interactions" value={form.interactions} onChange={handleChange} />
              <EditField label="Contraindications (comma-separated)" name="contraindications" value={form.contraindications} onChange={handleChange} />
            </>
          ) : (
            <>
              <ViewField label="Side Effects" value={drug.sideEffects?.join(", ")} />
              <ViewField label="Interactions" value={drug.interactions?.join(", ")} />
              <ViewField label="Contraindications" value={drug.contraindications?.join(", ")} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DrugDetailsCard;