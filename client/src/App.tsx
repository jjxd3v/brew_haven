import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation } from
'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Menu } from './pages/Menu';
import { Contact } from './pages/Contact';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Orders } from './pages/Orders';
import { AuthProvider } from './context/AuthContext';
function ConditionalFooter() {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/register'];
  if (hideFooterRoutes.includes(location.pathname)) return null;
  return <Footer />;
}
export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
          <ConditionalFooter />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#3E2723',
                color: '#F5EFE6',
                border: 'none'
              },
              className: 'font-sans'
            }} />
          
        </div>
      </Router>
    </AuthProvider>);

}