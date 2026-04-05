import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getDrugById, reset } from "../features/drug/drugSlice";
import DrugDetailsCard from "../components/DrugDetailsCard";
import Navbar from '../components/Navbar'

function DrugDetails() {
  const { id } = useParams(); // Get drug ID from URL
  const [searchParams] = useSearchParams()
  const isEditMode = searchParams.get('edit') === 'true'
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { drug, isLoading, isError, message } = useSelector(
    (state) => state.drug
  );

  // Fetch the drug by ID when page loads
  useEffect(() => {
    dispatch(getDrugById(id));

    return () => dispatch(reset()); // Clean up Redux state on unmount
  }, [dispatch, id]);

  // Handle errors
  useEffect(() => {
    if (isError) {
      alert(message || "Error fetching drug.");
      navigate("/"); // Go back to Home
    }
  }, [isError, message, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  if (!drug) return null; // Safety check

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Back Button */}
        <button
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/* Drug Details Card */}
        <DrugDetailsCard drug={drug} isEditMode={isEditMode} />
      </div>
    </>
  );
}

export default DrugDetails;