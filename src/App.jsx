import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Fish, 
  Heart, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle,
  Package,
  ShieldCheck
} from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';
import CustomTankBuilder from './components/CustomTankBuilder';
import CompatibilityChecker from './components/CompatibilityChecker';
import ProductDetailModal from './components/ProductDetailModal';

// Assets
import aquariumImg from './assets/products/aquarium.png';
import bettaImg from './assets/products/betta.png';
import birdsImg from './assets/products/birds.png';
import foodImg from './assets/products/food.png';

// Context
import { CartProvider } from './context/CartContext';

const INITIAL_PRODUCTS = [
  { 
    id: 1, 
    name: 'Rimless Premium Glass Tank', 
    price: 4500, 
    category: 'Accessories', 
    rating: 5, 
    reviews: 42, 
    image: aquariumImg,
    description: 'Professional grade low-iron rimless glass tank with diamond polished bevelled edges, offering stunning distortion-free views for high-end aquascaping.',
    stockStatus: 'in',
    specs: {
      dimensions: '24" x 12" x 14" (60 Liters)',
      power: 'N/A',
      material: 'Ultra-Clear Opti-White Glass',
      warranty: '1 Year Leakproof Warranty'
    }
  },
  { 
    id: 2, 
    name: 'Goldfish Energy Pellets', 
    price: 350, 
    category: 'Fish Food', 
    rating: 4, 
    reviews: 128, 
    image: foodImg,
    description: 'Premium slow-sinking nutrient pellets enriched with natural color-enhancers (Spirulina & Astaxanthin), highly digestible and leaves water clean.',
    stockStatus: 'in',
    specs: {
      weight: '250g',
      form: 'Slow Sinking Pellets',
      protein: '42% Crude Protein',
      expiry: '24 Months'
    }
  },
  { 
    id: 3, 
    name: 'Exotic Blue Halfmoon Betta', 
    price: 650, 
    category: 'Fish', 
    rating: 5, 
    reviews: 210, 
    image: bettaImg,
    description: 'Spectacular show-grade male Halfmoon Betta showcasing a full 180-degree caudal spread. Highly active, healthy, and quarantined.',
    stockStatus: 'in',
    specs: {
      temp: '24°C - 28°C',
      ph: '6.5 - 7.5',
      temperament: 'Territorial / Solitary',
      minTank: '19L (5 Gallon)',
      diet: 'Carnivore (Pellets & Bloodworms)'
    }
  },
  { 
    id: 4, 
    name: 'Pair of African Lovebirds', 
    price: 2800, 
    category: 'Birds', 
    rating: 5, 
    reviews: 34, 
    image: birdsImg,
    description: 'Healthy, active bonded pair of Peach-faced Lovebirds. Beautiful vibrant coloration, social, well-vocalized, and hand-tame.',
    stockStatus: 'in',
    specs: {
      lifespan: '10 - 15 Years',
      nature: 'Monogamous / Social Pair',
      cageSize: '24" x 18" x 24"',
      diet: 'Premium Seed mix, Greens & Fruits'
    }
  },
  { 
    id: 5, 
    name: 'RGB+W Planted LED Light', 
    price: 1850, 
    category: 'Accessories', 
    rating: 5, 
    reviews: 56, 
    image: aquariumImg,
    description: 'Slim profile anodized aluminum LED light fixture with extendable brackets. Features programmable spectrum, 24/7 sunrise-sunset cycle, and custom timer.',
    stockStatus: 'in',
    specs: {
      dimensions: '60cm (Extendable up to 80cm)',
      power: '24W (RGB+W)',
      material: 'Anodized Aluminum Alloy',
      warranty: '6 Months Replacement'
    }
  },
  { 
    id: 6, 
    name: 'Canister Filter Pro 1000', 
    price: 5500, 
    category: 'Accessories', 
    rating: 4, 
    reviews: 89, 
    image: aquariumImg,
    description: 'Heavy duty external canister filter with 3-stage mechanical, biological, and chemical filtration. Silent motor, high flow rate, and easy prime valve.',
    stockStatus: 'in',
    specs: {
      dimensions: '18cm x 18cm x 35cm',
      power: '15W (1000 L/H flow)',
      material: 'Heavy-Duty ABS Plastic',
      warranty: '1 Year Warranty'
    }
  },
  { 
    id: 7, 
    name: 'Friendly Fancy Budgies', 
    price: 450, 
    category: 'Birds', 
    rating: 4, 
    reviews: 76, 
    image: birdsImg,
    description: 'Playful, hand-raised budget budgerigars. Very friendly temperament, highly vocal, and easy to train. Standard yellow/blue pastel combinations.',
    stockStatus: 'in',
    specs: {
      lifespan: '5 - 8 Years',
      nature: 'Playful, Flock Bird (Needs company)',
      cageSize: '18" x 18" x 18"',
      diet: 'Foxtail Millet, greens, and fresh cuttlebone'
    }
  },
  { 
    id: 8, 
    name: 'Premium Mix Bird Seed', 
    price: 180, 
    category: 'Pet Supplies', 
    rating: 5, 
    reviews: 145, 
    image: foodImg,
    description: 'Triple-cleaned seed mixture formulated for small psittacines. Packed with yellow millet, red millet, canary seed, and oat groats to keep birds vibrant.',
    stockStatus: 'in',
    specs: {
      weight: '1kg',
      form: 'Grains & Seed Mix',
      protein: '12% Crude Protein',
      expiry: '12 Months'
    }
  },
  { 
    id: 9, 
    name: 'Red Cap Oranda Goldfish', 
    price: 850, 
    category: 'Fish', 
    rating: 5, 
    reviews: 64, 
    image: bettaImg,
    description: 'Beautiful premium quality fancy goldfish with prominent red caps. Highly active, friendly community fish, quarantined and feeding well.',
    stockStatus: 'in',
    specs: {
      temp: '18°C - 23°C',
      ph: '7.0 - 7.5',
      temperament: 'Peaceful / Social',
      minTank: '75L (20 Gallon)',
      diet: 'Omnivore (Flakes & Pellets)'
    }
  },
  { 
    id: 10, 
    name: 'Premium Spirulina Flakes', 
    price: 480, 
    category: 'Fish Food', 
    rating: 5, 
    reviews: 92, 
    image: foodImg,
    description: 'High-grade fish food flakes enriched with pure Spirulina algae to enhance fish colors, improve immunity, and support healthy development.',
    stockStatus: 'in',
    specs: {
      weight: '100g',
      form: 'Thin Dry Flakes',
      protein: '45% Crude Protein',
      expiry: '18 Months'
    }
  },
  { 
    id: 11, 
    name: 'SunSun Canister Filter HW-603B', 
    price: 2400, 
    category: 'Accessories', 
    rating: 4, 
    reviews: 110, 
    image: aquariumImg,
    description: 'Compact external canister filter ideal for nano tanks. Features quiet motor, 3-stage sponge filtration, complete piping, and quick shutoff valves.',
    stockStatus: 'in',
    specs: {
      dimensions: '16cm x 16cm x 29cm',
      power: '6W (400 L/H flow)',
      material: 'ABS Plastic',
      warranty: '6 Months Warranty'
    }
  },
  { 
    id: 12, 
    name: 'Yellow-Sided Green Cheek Conure', 
    price: 8500, 
    category: 'Birds', 
    rating: 5, 
    reviews: 18, 
    image: birdsImg,
    description: 'Beautiful hand-tamed Green Cheek Conure in yellow-sided color morph. Highly intelligent, playful, starting to mimic speech, and DNA sexed.',
    stockStatus: 'in',
    specs: {
      lifespan: '15 - 20 Years',
      nature: 'Playful, Affectionate & Curious',
      cageSize: '24" x 24" x 30"',
      diet: 'Premium Pellets, Fresh Fruits, and Vegetables'
    }
  },
];

const REVIEWS = [
  { id: 1, name: 'Sandeep Mahendrabhai Soni', text: 'Healthy pet food and a great variety of aquarium fish. Mr. Kumar is very humble and guided me carefully to set up my first planted tank. The best shop in Vadodara!', rating: 5 },
  { id: 2, name: 'Shivam Mishra', text: 'Reasonable pricing on birds and accessories. They have almost any feed and cage accessory you might need. Highly recommended.', rating: 5 },
  { id: 3, name: 'Manoj Kumar', text: 'Superb collection of rimless glass tanks and aquascaping layout materials (driftwoods and rocks). The pricing is very genuine compared to others in Gujarat.', rating: 5 },
  { id: 4, name: 'Vijay Patel', text: 'Excellent service. Got customized home delivery of my 3ft fish aquarium. The fish came quarantined and are healthy and swimming happily!', rating: 5 },
];

const BUBBLE_CONFIGS = [
  { id: 1, size: 15, left: 10, delay: 0, duration: 12 },
  { id: 2, size: 25, left: 25, delay: 2, duration: 18 },
  { id: 3, size: 12, left: 45, delay: 4, duration: 14 },
  { id: 4, size: 30, left: 60, delay: 1, duration: 20 },
  { id: 5, size: 18, left: 75, delay: 5, duration: 16 },
  { id: 6, size: 22, left: 90, delay: 3, duration: 15 },
  { id: 7, size: 14, left: 15, delay: 6, duration: 13 },
  { id: 8, size: 28, left: 35, delay: 8, duration: 19 },
  { id: 9, size: 16, left: 50, delay: 2, duration: 17 },
  { id: 10, size: 20, left: 65, delay: 7, duration: 15 },
  { id: 11, size: 26, left: 80, delay: 9, duration: 21 },
  { id: 12, size: 13, left: 95, delay: 0, duration: 14 }
];

const AppContent = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [activeReview, setActiveReview] = useState(0);
  
  // Interactive Tools tabs
  const [activeTool, setActiveTool] = useState('builder'); // 'builder' | 'compatibility'

  // Details Modal State
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);

  const CATALOG_VERSION = 'v5_more_products_and_preview';

  // Load from LocalStorage
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    const version = localStorage.getItem('catalog_version');
    if (saved && version === CATALOG_VERSION) {
      return JSON.parse(saved);
    }
    return INITIAL_PRODUCTS;
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('catalog_version', CATALOG_VERSION);
  }, [products]);

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Admin Callbacks
  const handleAddProduct = (newP) => {
    setProducts(prev => [newP, ...prev]);
  };

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Floating Bubbles Animation */}
      <div className="bubble-container">
        {BUBBLE_CONFIGS.map((b) => (
          <div 
            key={b.id} 
            className="bubble" 
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`
            }}
          />
        ))}
      </div>

      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <AnimatePresence>
        {isCartOpen && <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
      </AnimatePresence>
      
      <AnimatePresence>
        {selectedDetailProduct && (
          <ProductDetailModal 
            product={selectedDetailProduct} 
            onClose={() => setSelectedDetailProduct(null)} 
          />
        )}
      </AnimatePresence>

      <main style={{ zIndex: 1 }}>
        <Hero />

        {/* Categories Bar */}
        <section className="section container" style={{ paddingBottom: '60px' }}>
          <div className="section-title">
            <span className="badge badge-primary">Explore Categories</span>
            <h2>Find What You Need</h2>
            <p>Everything from custom aquarium setups to healthy avian feeds, curated for pet lovers.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {[
              { id: 'Fish', name: 'Live Aquarium Fish', icon: <Fish size={24} />, desc: 'Betta, Guppy, Goldfish, Cichlids' },
              { id: 'Birds', name: 'Budgies & Lovebirds', icon: <Package size={24} />, desc: 'Healthy birds, bonded pairs, cages' },
              { id: 'Fish Food', name: 'Premium Feeds', icon: <Package size={24} />, desc: 'Nutrient pellets, flakes, seeds' },
              { id: 'Accessories', name: 'Aquarium Equipment', icon: <Package size={24} />, desc: 'Canister filters, LED, CO2 sets' },
              { id: 'Pet Supplies', name: 'General Supplies', icon: <Package size={24} />, desc: 'Beddings, toys, medication' }
            ].map(cat => (
              <motion.div 
                key={cat.id} 
                className="card" 
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  setFilter(cat.id);
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{ 
                  cursor: 'pointer', 
                  textAlign: 'center', 
                  borderColor: filter === cat.id ? 'var(--primary)' : 'var(--surface-border)',
                  background: filter === cat.id ? 'rgba(14,165,233,0.1)' : 'var(--surface)'
                }}
              >
                <div style={{ 
                  background: filter === cat.id ? 'var(--primary)' : 'rgba(255,255,255,0.03)', 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 16px', 
                  color: filter === cat.id ? 'white' : 'var(--primary)',
                  border: '1px solid var(--surface-border)',
                  transition: 'all 0.3s'
                }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', color: 'white', fontWeight: 700, marginBottom: '6px' }}>{cat.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section id="shop" className="section" style={{ background: 'rgba(11, 21, 40, 0.4)', borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', textAlign: 'left', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <span className="badge badge-primary">Dev Catalog</span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginTop: '12px' }}>Featured Inventory</h2>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
                {['All', 'Fish', 'Birds', 'Fish Food', 'Accessories'].map(cat => (
                  <button 
                    key={cat}
                    className={`tab-btn ${filter === cat ? 'active' : ''}`} 
                    onClick={() => setFilter(cat)}
                    style={{ padding: '8px 18px', fontSize: '0.85rem', borderRadius: '8px' }}
                  >
                    {cat === 'Fish Food' ? 'Food' : cat === 'Accessories' ? 'Gear' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
              <AnimatePresence mode="popLayout">
                {filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard 
                      product={product} 
                      onOpenDetails={(p) => setSelectedDetailProduct(p)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Interactive Custom Aquascape & Diagnostic Tools */}
        <section id="tools" className="section container">
          <div className="section-title">
            <span className="badge badge-primary">Hobbyist Corner</span>
            <h2>Interactive Tools</h2>
            <p>Design a custom aquarium setup or verify compatibility between fish species before purchase.</p>
            
            {/* Tools Toggles */}
            <div style={{ display: 'inline-flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '50px', border: '1px solid var(--surface-border)', marginTop: '30px' }}>
              <button 
                onClick={() => setActiveTool('builder')}
                className={`tab-btn ${activeTool === 'builder' ? 'active' : ''}`}
                style={{ borderRadius: '50px', padding: '10px 24px', fontSize: '0.9rem' }}
              >
                Custom Tank Builder
              </button>
              <button 
                onClick={() => setActiveTool('compatibility')}
                className={`tab-btn ${activeTool === 'compatibility' ? 'active' : ''}`}
                style={{ borderRadius: '50px', padding: '10px 24px', fontSize: '0.9rem' }}
              >
                Fish Compatibility Guide
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTool === 'builder' ? (
              <motion.div
                key="builder-tool"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CustomTankBuilder />
              </motion.div>
            ) : (
              <motion.div
                key="compatibility-tool"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CompatibilityChecker />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Trust Ratings Vadodara Section */}
        <section className="section container" style={{ borderTop: '1px solid var(--surface-border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-primary">Vadodara's Choice</span>
              <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: '16px 0', color: 'white', lineHeight: 1.1 }}>The Most Trusted <br /> Shop in Tarsali</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                Since 2015, Dev Aquarium & Pet Shop has been serving hobbyists in Vadodara with healthy fish, premium birds, and highly durable custom glass installations.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="card" style={{ background: 'rgba(255,255,255,0.01)', padding: '20px' }}>
                  <h3 style={{ fontSize: '2.4rem', color: 'var(--primary)', fontWeight: 800 }}>
                    4.1 <Star fill="var(--primary)" size={20} style={{ verticalAlign: 'middle' }} />
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Google/Justdial Rating</p>
                </div>
                <div className="card" style={{ background: 'rgba(255,255,255,0.01)', padding: '20px' }}>
                  <h3 style={{ fontSize: '2.4rem', color: 'var(--primary)', fontWeight: 800 }}>245+</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Genuine Google Reviews</p>
                </div>
                <div className="card" style={{ background: 'rgba(255,255,255,0.01)', padding: '20px' }}>
                  <h3 style={{ fontSize: '2.4rem', color: 'var(--primary)', fontWeight: 800 }}>9+ Years</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Service Experience</p>
                </div>
                <div className="card" style={{ background: 'rgba(255,255,255,0.01)', padding: '20px' }}>
                  <h3 style={{ fontSize: '2.4rem', color: 'var(--primary)', fontWeight: 800 }}>100%</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Healthy Quarantine Guarantee</p>
                </div>
              </div>
            </div>

            {/* Testimonials Slider */}
            <div className="card glass-glow" style={{ padding: '50px', position: 'relative', overflow: 'hidden', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '6rem', opacity: 0.08, position: 'absolute', top: '10px', left: '20px', color: 'var(--primary)', fontFamily: 'serif', lineHeight: 1 }}>“</div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReview}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p style={{ fontSize: '1.25rem', fontStyle: 'italic', marginBottom: '28px', color: 'white', lineHeight: '1.6' }}>"{REVIEWS[activeReview].text}"</p>
                  <div>
                    <h4 style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>{REVIEWS[activeReview].name}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Verified Vadodara Buyer</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Review Dot Indicators */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '30px' }}>
                {REVIEWS.map((r, i) => (
                  <button 
                    key={r.id} 
                    onClick={() => setActiveReview(i)}
                    style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: activeReview === i ? 'var(--primary)' : 'rgba(255,255,255,0.1)', 
                      border: 'none', 
                      cursor: 'pointer',
                      transition: 'all 0.3s' 
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Real Story Section */}
        <section id="about" className="section" style={{ background: 'rgba(11,21,40,0.3)', borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--surface-border)', height: '400px' }}>
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800" alt="Shop Interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <span className="badge badge-primary">Meet The Owner</span>
              <h2 style={{ fontSize: '2.5rem', margin: '16px 0', color: 'white' }}>Honest Pricing & Expert Advice by Mr. Kumar</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.7' }}>
                At Dev Aquarium, we believe aquariums are a living work of art. Mr. Kumar, a veteran hobbyist and shop owner, is well-regarded in Vadodara for being helpful, humbleminded, and pricing items fairly. We don't just sell pets—we guide you in creating safe, stress-free micro-ecosystems.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white', fontWeight: 600 }}>
                  <div style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '6px', borderRadius: '50%' }}><ShieldCheck size={18} /></div> 
                  Quarantine process for all arriving fish shipments.
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white', fontWeight: 600 }}>
                  <div style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '6px', borderRadius: '50%' }}><ShieldCheck size={18} /></div> 
                  Genuine imported accessories & food brands (Sera, Hikari, Sobo).
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white', fontWeight: 600 }}>
                  <div style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '6px', borderRadius: '50%' }}><ShieldCheck size={18} /></div> 
                  On-site custom glass sizing & aquascape installations in Vadodara.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Admin Dashboard Section */}
        <section id="admin" className="section container">
          <AdminPanel 
            products={products} 
            onAdd={handleAddProduct}
            onDelete={handleDeleteProduct}
            onUpdate={handleUpdateProduct}
          />
        </section>

        {/* Contact Location Section */}
        <section id="contact" className="section container">
          <div className="card glass-glow" style={{ padding: '50px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px' }}>
            <div>
              <span className="badge badge-primary">Visit Our Store</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginTop: '12px', marginBottom: '16px' }}>Locate Dev Aquarium</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '36px' }}>We are located on the Susen-Tarsali Ring Road. Drop by to see our live fish collection or discuss your custom aquarium ideas with Mr. Kumar.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(14,165,233,0.1)', padding: '14px', borderRadius: '12px', color: 'var(--primary)', border: '1px solid var(--surface-border)' }}><MapPin size={24} /></div>
                  <div>
                    <h4 style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>Address</h4>
                    <p style={{ color: 'var(--text-muted)' }}>FF-5, Rukmani Complex, Susen - Tarsali Ring Rd, Near Tarsali Market, Tarsali, Vadodara, Gujarat 390009</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(14,165,233,0.1)', padding: '14px', borderRadius: '12px', color: 'var(--primary)', border: '1px solid var(--surface-border)' }}><Phone size={24} /></div>
                  <div>
                    <h4 style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>Contact Phone</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', fontWeight: 600 }}>+91 99796 11397</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Store Hours: 9:30 AM – 9:00 PM</p>
                  </div>
                </div>
              </div>

              <a href="https://wa.me/919979611397" target="_blank" className="btn btn-primary" style={{ marginTop: '40px', width: '100%', justifyContent: 'center', padding: '16px', background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)' }}>
                <MessageCircle size={20} /> Connect via WhatsApp
              </a>
            </div>

            <div style={{ height: '420px', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-lg)' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3692.657512141513!2d73.13477!3d22.25632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc390c4d068ee%3A0x43ee9fe52a9!2sDev%20Aquarium%20%26%20Pet%20Shop!5e0!3m2!1sen!2sin!4v1714376000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '80px 0', background: '#02050b', borderTop: '1px solid var(--surface-border)', color: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '60px' }}>
          <div>
            <div className="logo" style={{ color: 'white', marginBottom: '24px', fontSize: '1.6rem', fontWeight: 800 }}>
              <Heart fill="var(--primary)" color="var(--primary)" />
              <span>Dev Aquarium</span>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Premium custom aquariums and healthy pets in Vadodara, Gujarat. Crafting natural ecosystems since 2015.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '24px', fontWeight: 700, color: 'var(--primary)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li><a href="#home" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-link">Home Portal</a></li>
              <li><a href="#shop" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-link">Featured Shop</a></li>
              <li><a href="#tools" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-link">Interactive Tools</a></li>
              <li><a href="#about" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-link">Our Story</a></li>
              <li><a href="#admin" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-link">Admin Panel</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '24px', fontWeight: 700, color: 'var(--primary)' }}>Services We Offer</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--text-muted)' }}>
              <li>Custom Glass Tank Building</li>
              <li>Aquascaping Design & Planting</li>
              <li>Avian Supplies & Breeding Cages</li>
              <li>Pet Food & Medical Supplies</li>
              <li>Free Care Advice & Checkups</li>
            </ul>
          </div>
        </div>
        <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.03)', marginTop: '60px', paddingTop: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <p>&copy; 2026 Dev Aquarium & Pet Shop. All rights reserved. Managed with integrity in Vadodara, India.</p>
        </div>
      </footer>

      <style>{`
        .footer-link:hover {
          color: white !important;
        }
      `}</style>
    </div>
  );
};

const App = () => (
  <CartProvider>
    <AppContent />
  </CartProvider>
);

export default App;
