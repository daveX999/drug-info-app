import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function DrugCard({ drug, onDelete }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await onDelete(drug._id)
      setShowModal(false)
    } catch (err) {
      alert('Something went wrong. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <div
        onClick={() => navigate(`/drug/${drug._id}`)}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col justify-between"
      >
        {/* Drug Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{drug.name}</h2>
          <p className="text-sm text-gray-500 mb-2">{drug.class}</p>
          {drug.indications && (
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Indications:</span> {drug.indications.join(', ')}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/drug/${drug._id}`) }}
            className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600 transition"
          >
            View
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/drug/${drug._id}?edit=true`) }}
            className="bg-green-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-green-600 transition"
          >
            Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setShowModal(true) }}
            className="bg-red-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Drug</h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to delete{' '}
              <span className="font-medium text-gray-800">{drug.name}</span>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={deleting}
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DrugCard