import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Fish, 
  ShoppingBag, 
  Heart, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle,
  Package,
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';

// Context
import { CartProvider } from './context/CartContext';

// Assets
import aquariumImg from './assets/products/aquarium.png';
import foodImg from './assets/products/food.png';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Rimless Premium Tank', price: 4500, category: 'Fish', rating: 5, reviews: 42, image: aquariumImg },
  { id: 2, name: 'Goldfish Energy Pellets', price: 350, category: 'Fish Food', rating: 4, reviews: 128, image: foodImg },
  { id: 3, name: 'LED Pro Color Light', price: 1200, category: 'Accessories', rating: 5, reviews: 56, image: aquariumImg },
  { id: 4, name: 'Internal Power Filter', price: 850, category: 'Accessories', rating: 4, reviews: 89, image: aquariumImg },
  { id: 5, name: 'Natural River Rocks (5kg)', price: 450, category: 'Accessories', rating: 5, reviews: 34, image: aquariumImg },
  { id: 6, name: 'Betta Pro Nutrition', price: 250, category: 'Fish Food', rating: 5, reviews: 210, image: foodImg },
];

const REVIEWS = [
  { id: 1, name: 'Sandeep Mahendrabhai Soni', text: 'Healthy pet food and a great variety of aquarium fish. The best shop in the area.', rating: 5 },
  { id: 2, name: 'Shivam Mishra', text: 'Reasonable pricing and they have almost any pet accessory you might need.', rating: 5 },
  { id: 3, name: 'Manoj Kumar', text: 'Very cool shop, stocks almost all types of pet items. Highly recommended.', rating: 5 },
];

const AppContent = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [filter, setFilter] = useState('All');
  const [activeReview, setActiveReview] = useState(0);

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main>
        <Hero />

        {/* Categories */}
        <section className="section container">
          <div className="section-title">
            <span className="badge badge-primary">Explore</span>
            <h2>Top Categories</h2>
            <p>Everything you need for your underwater friends and furry companions.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {['Fish', 'Fish Food', 'Accessories', 'Pet Supplies'].map(cat => (
              <motion.div 
                key={cat} 
                className="card" 
                whileHover={{ scale: 1.05 }}
                onClick={() => setFilter(cat)}
                style={{ 
                  cursor: 'pointer', 
                  textAlign: 'center', 
                  border: filter === cat ? '2px solid var(--primary)' : '1px solid transparent',
                  background: filter === cat ? 'var(--primary-light)' : 'white'
                }}
              >
                <div style={{ background: 'var(--primary-light)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--primary)' }}>
                  {cat === 'Fish' ? <Fish /> : <Package />}
                </div>
                <h3 style={{ fontSize: '1.1rem' }}>{cat}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section id="shop" className="section" style={{ background: 'var(--surface)' }}>
          <div className="container">
            <div className="section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', textAlign: 'left' }}>
              <div>
                <span className="badge badge-primary">Our Shop</span>
                <h2>Featured Products</h2>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className={`btn ${filter === 'All' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('All')}>All</button>
                <button className={`btn ${filter === 'Fish' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('Fish')}>Fish</button>
                <button className={`btn ${filter === 'Fish Food' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('Fish Food')}>Food</button>
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
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="section container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-primary">Why Choose Us</span>
              <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: '16px 0' }}>The Most Trusted <br /> Shop in Vadodara</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '40px' }}>
                <div className="card">
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>4.1 <Star fill="var(--primary)" size={24} style={{ verticalAlign: 'middle' }} /></h3>
                  <p>Google Rating</p>
                </div>
                <div className="card">
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>200+</h3>
                  <p>Happy Customers</p>
                </div>
                <div className="card">
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>9+</h3>
                  <p>Years Experience</p>
                </div>
                <div className="card">
                  <ShieldCheck size={40} color="var(--primary)" />
                  <p>Quality Verified</p>
                </div>
              </div>
            </div>

            <div className="card glass" style={{ padding: '60px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: '4rem', opacity: 0.1, position: 'absolute', top: '20px', left: '20px' }}>"</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReview}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p style={{ fontSize: '1.4rem', fontStyle: 'italic', marginBottom: '32px' }}>{REVIEWS[activeReview].text}</p>
                  <div>
                    <h4 style={{ fontWeight: 800 }}>{REVIEWS[activeReview].name}</h4>
                    <p style={{ color: 'var(--primary)' }}>Verified Customer</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section" style={{ background: 'var(--primary-light)' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img src={aquariumImg} alt="Shop Inside" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
            </div>
            <div>
              <span className="badge badge-primary" style={{ background: 'white' }}>Our Story</span>
              <h2 style={{ fontSize: '2.5rem', margin: '16px 0' }}>Passion for Pets <br /> Since 2015</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '24px' }}>
                Dev Aquarium started with a simple goal: to bring the beauty of the underwater world to every home in Vadodara. 
                Over the years, we have expanded to become a one-stop destination for all pet lovers.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', gap: '12px' }}><ShieldCheck color="var(--primary)" /> Only healthy, quarantine-cleared fish</li>
                <li style={{ display: 'flex', gap: '12px' }}><ShieldCheck color="var(--primary)" /> Top international pet food brands</li>
                <li style={{ display: 'flex', gap: '12px' }}><ShieldCheck color="var(--primary)" /> Expert advice on aquarium maintenance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Admin Panel Preview */}
        <section className="section container">
          <AdminPanel 
            products={products} 
            onAdd={(p) => setProducts([p, ...products])}
            onDelete={(id) => setProducts(products.filter(p => p.id !== id))}
          />
        </section>

        {/* Contact Section */}
        <section id="contact" className="section container">
          <div className="card glass" style={{ padding: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
            <div>
              <h2>Get in Touch</h2>
              <p style={{ marginBottom: '40px' }}>Visit our store or contact us for home delivery services.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'var(--primary-light)', padding: '12px', borderRadius: '12px', color: 'var(--primary)' }}><MapPin /></div>
                  <div>
                    <h4>Location</h4>
                    <p>FF-5, Susen - Tarsali Ring Rd, Tarsali, Vadodara, Gujarat 390009</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'var(--primary-light)', padding: '12px', borderRadius: '12px', color: 'var(--primary)' }}><Phone /></div>
                  <div>
                    <h4>Phone</h4>
                    <p>+91 99796 11397</p>
                  </div>
                </div>
              </div>

              <a href="https://wa.me/919979611397" className="btn btn-primary" style={{ marginTop: '40px', width: '100%', justifyContent: 'center', padding: '16px', background: '#25D366' }}>
                <MessageCircle /> Order on WhatsApp
              </a>
            </div>

            <div style={{ height: '400px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
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

      <footer style={{ padding: '80px 0', background: 'var(--text)', color: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px' }}>
          <div>
            <div className="logo" style={{ color: 'white', marginBottom: '24px' }}>
              <Heart fill="var(--primary)" color="var(--primary)" />
              <span>Dev Aquarium</span>
            </div>
            <p style={{ opacity: 0.7 }}>Premium aquarium and pet supplies in Vadodara. Serving healthy fish and quality products since 2015.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '24px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', opacity: 0.7 }}>
              <li><a href="#home">Home</a></li>
              <li><a href="#shop">Shop</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '24px' }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', opacity: 0.7 }}>
              <li>Shipping Policy</li>
              <li>Returns & Refunds</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '60px', paddingTop: '40px', textAlign: 'center', opacity: 0.5 }}>
          <p>&copy; 2026 Dev Aquarium & Pet Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const App = () => (
  <CartProvider>
    <AppContent />
  </CartProvider>
);

export default App;
