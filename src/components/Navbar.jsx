import { useState, useEffect } from 'react';
import { ShoppingCart, User, Fish, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar-floating glass ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          
          {/* Logo */}
          <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', textDecoration: 'none' }}>
            <Fish fill="var(--primary)" size={26} />
            <span className="glow-text" style={{ letterSpacing: '0.5px' }}>Dev Aquarium</span>
          </a>

          {/* Desktop Links */}
          <div className="nav-links" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <a href="#home" className="nav-link">Home</a>
            <a href="#shop" className="nav-link">Shop</a>
            <a href="#tools" className="nav-link">Tools</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          {/* Desktop Actions */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button className="btn-outline" style={{ padding: '8px', borderRadius: '50%', display: 'inline-flex', width: '38px', height: '38px', alignItems: 'center', justifyContent: 'center' }} title="Admin Login">
              <User size={18} />
            </button>
            
            <button 
              className="btn btn-primary" 
              style={{ position: 'relative', padding: '10px 20px', borderRadius: '30px' }}
              onClick={onOpenCart}
            >
              <ShoppingCart size={16} />
              {totalItems > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: '-3px', 
                  right: '-3px', 
                  background: 'var(--danger)', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '18px', 
                  height: '18px', 
                  fontSize: '10px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
                }}>
                  {totalItems}
                </span>
              )}
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Cart</span>
            </button>

            {/* Mobile Hamburger menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              style={{ 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid var(--surface-border)', 
                color: 'white', 
                borderRadius: '50%', 
                width: '38px', 
                height: '38px', 
                display: 'none', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              className="mobile-toggle-btn"
            >
              <Menu size={18} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(2, 6, 23, 0.9)',
              backdropFilter: 'blur(10px)',
              zIndex: 3000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Drawer Close Button */}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'absolute',
                top: '30px', right: '30px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--surface-border)',
                color: 'white',
                borderRadius: '50%',
                width: '44px', height: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            {/* Links list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
              <a href="#home" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', textDecoration: 'none' }}>Home</a>
              <a href="#shop" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', textDecoration: 'none' }}>Shop Inventory</a>
              <a href="#tools" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', textDecoration: 'none' }}>Interactive Tools</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', textDecoration: 'none' }}>Our Story</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', textDecoration: 'none' }}>Get in Touch</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 992px) {
          .mobile-toggle-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
