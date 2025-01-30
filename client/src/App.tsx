import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// @ts-ignore
import Home from './pages/Home';
// @ts-ignore
import ProductDetail from './pages/ProductDetail';
// @ts-ignore
import Login from './pages/auth/Login';
// @ts-ignore
import Register from './pages/auth/Register';
// @ts-ignore
import Profile from './pages/Profile'
// @ts-ignore
import UsersList from './pages/admin/UsersList'
// @ts-ignore
import Orders from './pages/admin/Orders'
// @ts-ignore
import ProductCreate from './pages/admin/ProductCreate'
// @ts-ignore
import ProductEdit from './pages/admin/ProductEdit'
// @ts-ignore
import ProductDelete from './pages/admin/ProductDelete'


function App() {
  const userLoginReducer = useSelector((state: any) => state.userLoginReducer);
  const { userInfo } = userLoginReducer || {};

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={userInfo ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={userInfo ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/userslist" element={<UsersList />} />
        <Route path="/admin/listorders" element={<Orders />} />
        <Route path="/admin/productcreate" element={<ProductCreate />} />
        <Route path="/admin/productedit" element={<ProductEdit />} />
        <Route path="/admin/productdelete" element={<ProductDelete />} />
      </Routes>
    </Router>
  );
}

export default App;
