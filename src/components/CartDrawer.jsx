import { X, Trash2, ShoppingBag, MessageCircle, Minus, Plus } from 'lucide-react';
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
      backgroundColor: 'var(--surface)',
      borderLeft: '1px solid var(--surface-border)',
      boxShadow: '-10px 0 40px rgba(0,0,0,0.5)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    }}>
      <style>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .quantity-btn:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          border-color: var(--primary) !important;
        }
      `}</style>
      
      {/* Drawer Header */}
      <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>Your Cart</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <X size={24} />
        </button>
      </div>

      {/* Cart Items List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <ShoppingBag size={64} style={{ opacity: 0.1, color: 'var(--primary)' }} />
            <p style={{ color: 'var(--text-muted)' }}>Your cart is empty</p>
            <button className="btn btn-primary" style={{ marginTop: '12px' }} onClick={onClose}>Start Shopping</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px' }}>
                <img src={item.image} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem', lineHeight: '1.3', marginBottom: '4px' }}>{item.name}</h4>
                  <p style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.95rem' }}>₹{item.price}</p>
                  
                  {/* Quantity controls with minus and plus buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--surface-border)',
                        color: 'white',
                        borderRadius: '6px',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'background 0.2s, border-color 0.2s'
                      }}
                      className="quantity-btn"
                      title="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ color: 'white', fontWeight: 700, minWidth: '18px', textAlign: 'center', fontSize: '0.9rem' }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--surface-border)',
                        color: 'white',
                        borderRadius: '6px',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'background 0.2s, border-color 0.2s'
                      }}
                      className="quantity-btn"
                      title="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                
                {/* Remove button */}
                <button 
                  style={{ 
                    color: 'var(--danger)', 
                    background: 'rgba(239, 68, 68, 0.1)', 
                    border: '1px solid rgba(239, 68, 68, 0.2)', 
                    borderRadius: '8px', 
                    width: '36px', 
                    height: '36px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }} 
                  onClick={() => removeFromCart(item.id)}
                  title="Remove from Cart"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Footer */}
      {cart.length > 0 && (
        <div style={{ padding: '24px', borderTop: '1px solid var(--surface-border)', background: 'rgba(15,23,42,0.95)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'white' }}>Total Amount</span>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>₹{totalPrice}</span>
          </div>
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '16px', justifyContent: 'center' }}
            onClick={handleCheckout}
          >
            <MessageCircle size={18} />
            Order on WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
