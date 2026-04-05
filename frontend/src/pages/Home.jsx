import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"
import DrugList from "../components/DrugList"

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />

      <button onClick={() => navigate('/add-drug')} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition">+ Add Drug</button>

      <div className="max-w-5xl mx-auto p-4">
        <SearchBar />
        <DrugList />
      </div>
    </>
  )
}

export default Home