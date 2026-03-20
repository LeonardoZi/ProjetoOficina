import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {


  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="" element={<Dashboard/>}/>
      </Routes>

    </BrowserRouter>
  )
}

export default App
