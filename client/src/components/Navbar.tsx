import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Coffee, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  const navLinks = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Contact',
    path: '/contact'
  }];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-espresso transition-shadow duration-300 ${scrolled ? 'shadow-lg py-3' : 'py-4'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Coffee className="w-8 h-8 text-beige transition-colors" />
            <span className="font-serif text-2xl font-bold tracking-tight text-cream transition-colors">
              Brew Haven
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium text-cream hover:text-beige transition-colors relative">
                  
                  {link.name}
                  {isActive &&
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-beige"
                    initial={false} />

                  }
                </Link>);

            })}

            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-cream/20">
              {user ?
              <>
                  <Link
                  to="/orders"
                  className="text-sm font-medium text-cream hover:text-beige transition-colors flex items-center gap-1.5">
                  
                    <UserIcon className="w-4 h-4" />
                    Orders
                  </Link>
                  <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-cream/70 hover:text-red-300 transition-colors flex items-center gap-1.5">
                  
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </> :

              <>
                  <Link
                  to="/login"
                  className="text-sm font-medium text-cream hover:text-beige transition-colors">
                  
                    Sign In
                  </Link>
                  <Link
                  to="/register"
                  className="text-sm font-medium bg-beige text-espresso px-4 py-2 rounded-full hover:bg-cream transition-colors">
                  
                    Register
                  </Link>
                </>
              }
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-cream"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu">
            
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="md:hidden bg-espresso border-t border-cream/10 overflow-hidden">
          
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-4 text-base font-medium rounded-lg transition-colors ${isActive ? 'bg-coffee text-cream' : 'text-cream/80 hover:bg-coffee/50 hover:text-cream'}`}>
                  
                    {link.name}
                  </Link>);

            })}

              <div className="pt-4 mt-4 border-t border-cream/10 space-y-1">
                {user ?
              <>
                    <Link
                  to="/orders"
                  className="px-3 py-3 text-base font-medium rounded-lg text-cream/80 hover:bg-coffee/50 hover:text-cream flex items-center gap-2">
                  
                      <UserIcon className="w-5 h-5" />
                      My Orders
                    </Link>
                    <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-3 text-base font-medium rounded-lg text-red-300/80 hover:bg-red-900/30 hover:text-red-300 flex items-center gap-2">
                  
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </> :

              <>
                    <Link
                  to="/login"
                  className="block px-3 py-3 text-base font-medium rounded-lg text-cream/80 hover:bg-coffee/50 hover:text-cream">
                  
                      Sign In
                    </Link>
                    <Link
                  to="/register"
                  className="block px-3 py-3 text-base font-medium rounded-lg bg-beige text-espresso hover:bg-cream text-center mt-2">
                  
                      Create Account
                    </Link>
                  </>
              }
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}