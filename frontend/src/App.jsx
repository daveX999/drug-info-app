import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import DrugDetails from "./pages/DrugDetails"
import NotFound from "./pages/NotFound"
import AddDrug from './pages/AddDrug';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/drug/:id' element={<DrugDetails />}/>
        <Route path="/add-drug" element={<AddDrug />} />
        <Route path='*' element={<NotFound />}/>
        <></>
      </Routes>
    </Router>
  );
}

export default App;