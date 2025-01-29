import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// @ts-ignore
import Home from './pages/Home';
// @ts-ignore
import ProductDetail from './pages/ProductDetail';
// @ts-ignore
import Login from './pages/auth/Login';
// @ts-ignore
import Register from './pages/auth/Register';
import { useSelector } from 'react-redux';

function App() {


  const userLoginReducer = useSelector((state)=>state.userLoginReducer)
  const{userInfo} = userLoginReducer
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={userInfo ? <Navigate to="/"></Navigate> : <Login />} />
        <Route path="/register" element={userInfo ? <Navigate to="/"></Navigate> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;