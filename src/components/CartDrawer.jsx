import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    const message = cart.map(item => `${item.name} x${item.quantity} (₹${item.price * item.quantity})`).join('%0A');
    const total = `%0ATotal: ₹${totalPrice}`;
    window.open(`https://wa.me/919979611397?text=Hello, I would like to order:%0A${message}${total}`, '_blank');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '100%',
      maxWidth: '450px',
      height: '100vh',
      backgroundColor: 'white',
      boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideLeft 0.3s ease'
    }}>
      <style>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
      
      <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Your Cart</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <X size={24} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <ShoppingBag size={64} style={{ opacity: 0.1, marginBottom: '24px' }} />
            <p style={{ color: 'var(--text-muted)' }}>Your cart is empty</p>
            <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={onClose}>Start Shopping</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <img src={item.image} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 700 }}>{item.name}</h4>
                  <p style={{ color: 'var(--primary)', fontWeight: 800 }}>₹{item.price}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                    <button className="btn-outline" style={{ padding: '4px' }} onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button className="btn-outline" style={{ padding: '4px' }} onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button style={{ color: '#EF4444', background: 'none', border: 'none' }} onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div style={{ padding: '24px', borderTop: '1px solid var(--glass-border)', background: 'var(--surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total Amount</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>₹{totalPrice}</span>
          </div>
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '16px', justifyContent: 'center' }}
            onClick={handleCheckout}
          >
            <MessageCircle size={20} />
            Order on WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
