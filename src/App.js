
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Bookmarks from './Bookmarks';
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/bookmarks' element={<Bookmarks/>}/>
    </Routes>
    </div>
  );
}

export default App;
