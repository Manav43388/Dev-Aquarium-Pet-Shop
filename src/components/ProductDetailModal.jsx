import { motion } from 'framer-motion';
import { X, ShoppingCart, MessageCircle, Star, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetailModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  
  if (!product) return null;

  // Custom specifications based on categories
  const getSpecs = () => {
    switch (product.category) {
      case 'Fish':
        return [
          { name: 'Water Temperature', val: product.specs?.temp || '24°C - 28°C' },
          { name: 'pH Level Range', val: product.specs?.ph || '6.5 - 7.5' },
          { name: 'Temperament', val: product.specs?.temperament || 'Territorial' },
          { name: 'Min Tank Size', val: product.specs?.minTank || '19L (5 Gallon)' },
          { name: 'Diet Type', val: product.specs?.diet || 'Omnivore' }
        ];
      case 'Birds':
        return [
          { name: 'Average Lifespan', val: product.specs?.lifespan || '8 - 15 Years' },
          { name: 'Social Nature', val: product.specs?.nature || 'Must live in pairs' },
          { name: 'Min Cage Size', val: product.specs?.cageSize || '18"x18"x24"' },
          { name: 'Primary Diet', val: product.specs?.diet || 'Seeds, Fruits & Veggies' }
        ];
      case 'Fish Food':
      case 'Pet Supplies':
        return [
          { name: 'Net Weight', val: product.specs?.weight || '250g' },
          { name: 'Form Factor', val: product.specs?.form || 'Floating Pellets' },
          { name: 'Nutritional Value', val: product.specs?.protein || '42% Crude Protein' },
          { name: 'Shelf Life', val: product.specs?.expiry || '24 Months' }
        ];
      case 'Accessories':
      default:
        return [
          { name: 'Dimensions', val: product.specs?.dimensions || 'N/A' },
          { name: 'Power Usage', val: product.specs?.power || 'N/A' },
          { name: 'Material Quality', val: product.specs?.material || 'Premium/Durable' },
          { name: 'Warranty Period', val: product.specs?.warranty || 'No Warranty' }
        ];
    }
  };

  const specifications = getSpecs();

  const handleWhatsAppInquiry = () => {
    const text = `Hello Dev Aquarium & Pet Shop, I am interested in inquiring about the following product:%0A%0A` +
      `*Product:* ${product.name}%0A` +
      `*Category:* ${product.category}%0A` +
      `*Price:* ₹${product.price}%0A%0A` +
      `Is this item currently available in stock at your Tarsali road shop?`;
    window.open(`https://wa.me/919979611397?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        style={{ maxWidth: '780px', display: 'flex', flexDirection: 'column' }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute', 
            top: '20px', 
            right: '20px', 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid var(--glass-border)',
            color: 'white',
            borderRadius: '50%', 
            width: '40px', 
            height: '40px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0px', height: '100%' }}>
          
          {/* Image Panel */}
          <div style={{ background: 'rgba(3, 7, 18, 0.3)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '380px' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
              <span className="badge badge-primary" style={{ background: 'rgba(3,7,18,0.7)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255,255,255,0.1)' }}>
                {product.category}
              </span>
            </div>
            {product.stockStatus === 'out' && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(3,7,18,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="badge badge-danger" style={{ fontSize: '1.2rem', padding: '10px 24px' }}>OUT OF STOCK</span>
              </div>
            )}
          </div>

          {/* Details Panel */}
          <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '1px solid var(--surface-border)' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '12px' }}>{product.name}</h2>
              
              {/* Rating & Reviews */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
                <div style={{ display: 'flex' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < product.rating ? "var(--primary)" : "none"} 
                      color={i < product.rating ? "var(--primary)" : "#4b5563"} 
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>({product.reviews || 42} Verified Reviews)</span>
              </div>

              {/* Price */}
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '24px' }}>
                ₹{product.price}
              </div>

              {/* Description */}
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.6' }}>
                {product.description || `Premium quality ${product.name.toLowerCase()} sourced from trusted breeding farms and international manufacturers. Tested and approved by Dev Aquarium's pet experts for safety and longevity.`}
              </p>

              {/* Specifications */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '30px' }}>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Info size={14} color="var(--primary)" /> Specifications
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {specifications.map((spec) => (
                    <div key={spec.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '6px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{spec.name}</span>
                      <span style={{ fontWeight: 600 }}>{spec.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.stockStatus !== 'out' ? (
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              ) : (
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1, justifyContent: 'center', background: '#374151', color: '#9ca3af', cursor: 'not-allowed', boxShadow: 'none' }}
                  disabled
                >
                  Sold Out
                </button>
              )}
              <button 
                className="btn btn-outline" 
                style={{ flex: 1, justifyContent: 'center', borderColor: '#25D366', color: '#25D366' }}
                onClick={handleWhatsAppInquiry}
              >
                <MessageCircle size={18} /> WhatsApp Inquiry
              </button>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailModal;
