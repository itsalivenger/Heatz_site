import React, { useState, useEffect } from 'react';
import "./App.css"
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Nav/Navbar";
import LoginPage from "./pages/Login/Login";
import ResetPass from "./pages/ResetPass/ResetPass";
import SignupPage from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import CheckoutPage from "./pages/Cart/CheckoutPage";
import Favorite from "./pages/favorites/FavoritesPage/FavoritesPage.jsx";
// import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Popup from './components/popup/popup';
import LoadingSpinner from './components/LoadingSpinner/loadingSpinner';
import Shop from './pages/Shop/Shop';
import NotFound from './pages/NotFound/NotFound';
import Success from './pages/Success/Success';
import ProductPage from './pages/Product/ProductPage.js';
import AdminPage from './pages/AdminPage/AdminPage.js';
import ProfilePage from './pages/ProfilePage/ProfilePage/ProfilePage.jsx';
import ParticlesBackground from './components/particles/Particle.js';
import AboutPage from './pages/About/AboutPage.js';
import PreviewProduct from './pages/PreviewProduct/PreviewProduct.js';

// Protected Route wrapper for authenticated users
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Admin Route wrapper
const AdminRoute = ({ children, isAdmin }) => {
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const launchDate = new Date('2025-02-05');
  const contactInfo = {
    email: 'contact@heatz.ma',
    phoneNumber: '+212 (020)-9850',
    address: 'Maroc - Casablanca'
  }


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isTokenExpired = decoded.exp * 1000 < Date.now();
        if (!isTokenExpired) {
          setIsAuthenticated(true);
          setIsAdmin(decoded.role === 'admin');
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userRole', userData.role);
    setIsAuthenticated(true);
    setIsAdmin(userData.role === 'admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setContent({ title: "Success", content: "Vous avez été déconnecté." });
    setIsOpen(true);
  };

  const redirectTo = (to) => {
    window.location.href = `/${to}`;
  };

  const today = new Date();

  if (today > launchDate) {
    return <h1>Website is unavailable. Please contact support.</h1>;
  }


  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <ParticlesBackground />
      {content && <Popup onConfirm={() => redirectTo('login')} isOpen={isOpen} onClose={() => {
        setIsOpen(false);
        redirectTo('login');
      }} title={content.title} content={content.content} />}
      <Router>
        <Navbar
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          onLogout={handleLogout}
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact contactInfo={contactInfo} />} />
          <Route
            path="/login"
            element={
              isAuthenticated ?
                <Navigate to="/" replace /> :
                <LoginPage onLogin={handleLogin} />
            }
          />
          <Route path="/productPreview" element={<PreviewProduct />} />
          <Route path='/about' element={<AboutPage />} />
          <Route
            path="/signup"
            element={
              isAuthenticated ?
                <Navigate to="/" replace /> :
                <SignupPage />
            }
          />
          <Route path="/boutique" element={<Shop />} />

          <Route path="/resetPass" element={<ResetPass />} />
          <Route path='product' element={<ProductPage />} />

          {/* Protected Routes (require authentication) */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorite"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Favorite />
              </ProtectedRoute>
            }
          />

          <Route
            path="/success"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Success />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfilePage handleLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute isAdmin={isAdmin}>
                <AdminPage />
              </AdminRoute>
            }
          />

          
          {/* Catch all route - 404 */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
