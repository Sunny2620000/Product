import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListProduct from './Components/ListProducts';
import CreateProduct from './Components/CreateProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-product" element={<CreateProduct/>}/>
        <Route path="/" element={<ListProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
