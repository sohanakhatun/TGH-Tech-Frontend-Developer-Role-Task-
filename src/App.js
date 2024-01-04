
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Bookmarks from './Bookmarks';
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4">
     <div className="flex flex-row justify-around text-white font-semibold font-Poppins">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/bookmarks")}>Bookmarks</button>
      </div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/bookmarks' element={<Bookmarks/>}/>
    </Routes>
    </div>
  );
}

export default App;
