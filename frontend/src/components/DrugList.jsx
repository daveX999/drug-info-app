import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getDrugs, deleteDrug } from "../features/drug/drugSlice"
import DrugCard from './DrugCard'

function DrugList() {
  const dispatch = useDispatch()
  const { drugs, isLoading, isError, message, searchTerm } = useSelector((state) => state.drug)

  useEffect(() => {
    dispatch(getDrugs())
  }, [dispatch])

  if (isLoading) return <p className="text-center mt-10">Loading...</p>
  if (isError) return <p className="text-center text-red-500 mt-10">{message}</p>

  const filteredDrugs = (drugs || []).filter((drug) =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.class.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="px-4">
      {filteredDrugs.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          {searchTerm ? `No drugs found for "${searchTerm}"` : "No drugs available."}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredDrugs.map((drug) => (
            <DrugCard
              key={drug._id}
              drug={drug}
              onDelete={(id) => dispatch(deleteDrug(id))}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DrugList