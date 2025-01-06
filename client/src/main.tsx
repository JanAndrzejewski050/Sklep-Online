import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
// @ts-ignore
import ProductDetail from './pages/ProductDetail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/detail" element={<ProductDetail />} />
      </Routes>
    </Router>
  </StrictMode>
);
