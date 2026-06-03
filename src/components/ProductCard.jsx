
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onOpenDetails }) => {
  const { addToCart } = useCart();
  const isOutOfStock = product.stockStatus === 'out';

  return (
    <div 
      className="card" 
      onClick={() => onOpenDetails(product)}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Product Image Panel */}
      <div style={{ 
        height: '220px', 
        borderRadius: '12px', 
        overflow: 'hidden', 
        marginBottom: '20px',
        background: 'rgba(3,7,18,0.2)',
        position: 'relative'
      }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          className="product-card-img"
        />
        
        {/* Hover overlay indicator */}
        <div className="img-hover-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(11,21,40,0.4)',
          opacity: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.3s ease'
        }}>
          <span className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.8rem', gap: '6px' }}>
            <Eye size={14} /> Quick View
          </span>
        </div>

        {/* Category Tag */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
          <span className="badge badge-primary" style={{ background: 'rgba(3,7,18,0.7)', backdropFilter: 'blur(8px)' }}>
            {product.category}
          </span>
        </div>

        {/* Stock status tag */}
        {isOutOfStock && (
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(3,7,18,0.6)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 1
          }}>
            <span className="badge badge-danger" style={{ letterSpacing: '0.5px' }}>Out of Stock</span>
          </div>
        )}
      </div>
      
      {/* Product Content Details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px', color: 'white', lineHeight: 1.3 }}>{product.name}</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <div style={{ display: 'flex' }}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  fill={i < product.rating ? "var(--primary)" : "none"} 
                  color={i < product.rating ? "var(--primary)" : "#4b5563"} 
                />
              ))}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
              ({product.reviews || 42})
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
            ₹{product.price}
          </span>
          {!isOutOfStock ? (
            <button 
              className="btn btn-primary" 
              style={{ padding: '10px', borderRadius: '10px' }}
              onClick={(e) => {
                e.stopPropagation(); // Avoid triggering details modal
                addToCart(product);
              }}
            >
              <ShoppingCart size={16} />
            </button>
          ) : (
            <span style={{ fontSize: '0.8rem', color: 'var(--danger)', fontWeight: 600 }}>Sold Out</span>
          )}
        </div>
      </div>

      <style>{`
        .card:hover .product-card-img {
          transform: scale(1.08);
        }
        .card:hover .img-hover-overlay {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
