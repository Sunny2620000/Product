import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListProduct from './Components/ListProduct';
import CreateProduct from './Components/CreateProduct';
import NotFound from './Components/NotFound';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateProduct from './Components/UpdateProduct';

function App() {
  return (
    <Router>
    <><ToastContainer/></>
      <Routes>
        <Route path="/add-product" element={<CreateProduct/>}/>
        <Route path="/edit-product/:id" element={<UpdateProduct/>}/>
        <Route path="/" element={<ListProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
