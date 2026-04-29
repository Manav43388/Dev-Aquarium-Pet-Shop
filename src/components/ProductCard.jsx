import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ 
        height: '240px', 
        borderRadius: 'var(--radius)', 
        overflow: 'hidden', 
        marginBottom: '20px',
        background: 'var(--surface)',
        position: 'relative'
      }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <span className="badge badge-primary" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)' }}>
            {product.category}
          </span>
        </div>
      </div>
      
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{product.name}</h3>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              fill={i < product.rating ? "var(--primary)" : "none"} 
              color={i < product.rating ? "var(--primary)" : "#CBD5E1"} 
            />
          ))}
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
            ({product.reviews || 0})
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
            ₹{product.price}
          </span>
          <button 
            className="btn btn-primary" 
            style={{ padding: '10px' }}
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
