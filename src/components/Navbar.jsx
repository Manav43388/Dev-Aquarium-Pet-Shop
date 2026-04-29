import React, { useState } from 'react';
import { ShoppingCart, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = ({ onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '80px', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
          <Heart fill="var(--primary)" />
          <span>Dev Aquarium</span>
        </div>

        <div className="nav-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="#home" className="nav-link" style={{ fontWeight: 600 }}>Home</a>
          <a href="#shop" className="nav-link" style={{ fontWeight: 600 }}>Shop</a>
          <a href="#about" className="nav-link" style={{ fontWeight: 600 }}>About</a>
          <a href="#contact" className="nav-link" style={{ fontWeight: 600 }}>Contact</a>
        </div>

        <div className="nav-actions" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button className="btn-outline" style={{ padding: '8px', borderRadius: '50%' }}>
            <User size={20} />
          </button>
          <button 
            className="btn-primary" 
            style={{ position: 'relative', padding: '10px 16px' }}
            onClick={onOpenCart}
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: '-5px', 
                right: '-5px', 
                background: '#EF4444', 
                color: 'white', 
                borderRadius: '50%', 
                width: '20px', 
                height: '20px', 
                fontSize: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                {totalItems}
              </span>
            )}
            <span style={{ marginLeft: '8px', fontWeight: 600 }}>Cart</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
