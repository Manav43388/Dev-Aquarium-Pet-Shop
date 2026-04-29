import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dog, 
  Fish, 
  ShoppingBag, 
  Heart, 
  ArrowRight, 
  MessageCircle, 
  Menu, 
  X,
  PlusCircle,
  Star,
  CheckCircle2
} from 'lucide-react';
import './App.css';

// Asset imports
import heroImg from './assets/hero.png';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      id: 'dogs',
      title: 'Dogs World',
      description: 'Premium food, toys, and luxury accessories for your best friend.',
      icon: <Dog size={32} />,
      className: 'dog',
      tags: ['Food', 'Products', 'Breeding']
    },
    {
      id: 'fish',
      title: 'Aqua Paradise',
      description: 'Exotic fish food and high-tech aquarium maintenance supplies.',
      icon: <Fish size={32} />,
      className: 'fish',
      tags: ['Food', 'Filters', 'Plants']
    },
    {
      id: 'breeding',
      title: 'Expert Breeding',
      description: 'Professional dog breeding services with a focus on health and pedigree.',
      icon: <PlusCircle size={32} />,
      className: 'breeding',
      tags: ['Inquiry', 'Health Care', 'Pedigree']
    }
  ];

  const products = [
    { id: 1, name: 'Royal Canine Adult', price: '$89.99', category: 'Dog Food', rating: 5 },
    { id: 2, name: 'Premium Fish Flakes', price: '$24.50', category: 'Fish Food', rating: 4 },
    { id: 3, name: 'LED Aquarium Light', price: '$120.00', category: 'Fish Product', rating: 5 },
    { id: 4, name: 'Luxury Orthopedic Bed', price: '$145.00', category: 'Dog Product', rating: 5 },
    { id: 5, name: 'Interactive Chew Toy', price: '$19.99', category: 'Dog Product', rating: 4 },
    { id: 6, name: 'Advanced Water Filter', price: '$55.00', category: 'Fish Product', rating: 5 },
  ];

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
        <div className="container">
          <div className="logo">
            <Heart size={28} fill="var(--primary)" />
            <span>Dev Aquarium & Pet Shop</span>
          </div>
          
          <div className="nav-links">
            <a href="#home" className="nav-link active">Home</a>
            <a href="#categories" className="nav-link">Shop</a>
            <a href="#breeding" className="nav-link">Breeding</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <div className="btn-group">
            <button className="btn btn-secondary glass">Login</button>
            <button className="btn btn-primary">Join Now</button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <img src={heroImg} alt="Happy Dog and Vibrant Fish" className="hero-image" />
          <div className="hero-overlay"></div>
          <div className="container">
            <motion.div 
              className="hero-content"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>Everything Your <span>Pet Deserves</span> & More</h1>
              <p>From premium dog nutrition to exotic underwater worlds. We provide the best for your furry and finned companions.</p>
              <div className="btn-group">
                <button className="btn btn-primary">Explore Shop</button>
                <button className="btn btn-secondary glass">Breeding Inquiries</button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="section container">
          <div className="section-header">
            <h2>Our Specialized Categories</h2>
            <p>Tailored products and services for every pet lover.</p>
          </div>
          
          <div className="category-grid">
            {categories.map((cat, index) => (
              <motion.div 
                key={cat.id}
                className={`category-card ${cat.className}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="icon">{cat.icon}</div>
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {cat.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'rgba(255,255,255,0.2)', borderRadius: '20px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <button style={{ marginTop: 'auto', background: 'none', border: 'none', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Explore <ArrowRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="section glass" style={{ background: 'var(--surface)' }}>
          <div className="container">
            <div className="section-header">
              <h2>Trending Products</h2>
              <p>Top-rated items loved by pets and owners alike.</p>
            </div>

            <div className="product-grid">
              {products.map((product, index) => (
                <motion.div 
                  key={product.id} 
                  className="product-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="product-image">
                    {product.category.includes('Dog') ? <Dog size={48} color="var(--primary)" /> : <Fish size={48} color="var(--secondary)" />}
                  </div>
                  <div className="product-info">
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{product.category}</p>
                    <h3>{product.name}</h3>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                      {[...Array(product.rating)].map((_, i) => <Star key={i} size={14} fill="var(--primary)" color="var(--primary)" />)}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="product-price">{product.price}</span>
                      <button className="btn-primary" style={{ padding: '8px', borderRadius: '50%' }}>
                        <ShoppingBag size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Breeding Trust Section */}
        <section id="breeding" className="section container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
            >
              <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Ethical Dog <span>Breeding</span></h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px' }}>
                We take pride in our breeding program, ensuring healthy, happy, and genetically sound companions for your family.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                  <CheckCircle2 color="var(--accent)" /> <span>Health Certified</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                  <CheckCircle2 color="var(--accent)" /> <span>Champion Bloodline</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                  <CheckCircle2 color="var(--accent)" /> <span>Veterinary Checked</span>
                </div>
              </div>
              <button className="btn btn-primary" style={{ padding: '16px 48px' }}>
                View Available Puppies
              </button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>Real reviews from our community in Vadodara.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className="glass" style={{ padding: '30px', borderRadius: 'var(--radius)' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--primary)" color="var(--primary)" />)}
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>"Healthy pet food and a great variety of aquarium fish. The best shop in the area."</p>
              <p style={{ fontWeight: '600' }}>- Sandeep Mahendrabhai Soni</p>
            </div>
            <div className="glass" style={{ padding: '30px', borderRadius: 'var(--radius)' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--primary)" color="var(--primary)" />)}
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>"Reasonable pricing and they have almost any pet accessory you might need."</p>
              <p style={{ fontWeight: '600' }}>- Shivam Mishra</p>
            </div>
            <div className="glass" style={{ padding: '30px', borderRadius: 'var(--radius)' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--primary)" color="var(--primary)" />)}
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>"Very cool shop, stocks almost all types of pet items. Highly recommended."</p>
              <p style={{ fontWeight: '600' }}>- Manoj Kumar</p>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section id="contact" className="section" style={{ background: 'var(--background)' }}>
          <div className="container glass" style={{ borderRadius: 'var(--radius-lg)', padding: '60px', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--accent)', borderRadius: '20px', marginBottom: '24px', fontWeight: 'bold' }}>
              <CheckCircle2 size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
              Delivery Available in Vadodara
            </div>
            <br />
            <MessageCircle size={64} color="#25D366" style={{ marginBottom: '24px' }} />
            <h2 style={{ marginBottom: '16px' }}>Have Questions? Chat with Us!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
              Visit us at: FF-5, Susen - Tarsali Ring Rd, Tarsali, Vadodara
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
              Call us: +91 99796 11397
            </p>
            <a href="https://wa.me/919979611397" className="btn btn-primary" style={{ background: '#25D366', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
              Contact on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer style={{ padding: '60px 0', borderTop: '1px solid var(--glass-border)', background: 'var(--background)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'left', marginBottom: '40px' }}>
            <div>
              <div className="logo" style={{ marginBottom: '20px' }}>
                <Heart size={24} fill="var(--primary)" />
                <span>Dev Aquarium</span>
              </div>
              <p style={{ color: 'var(--text-muted)' }}>Premium pet shop in Vadodara specializing in healthy food and exotic fish.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '20px' }}>Location</h4>
              <p style={{ color: 'var(--text-muted)' }}>FF-5, Susen - Tarsali Ring Rd,<br />near Market Sussen, Tarsali,<br />Vadodara, Gujarat 390009</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '20px' }}>Contact</h4>
              <p style={{ color: 'var(--text-muted)' }}>Phone: +91 99796 11397<br />Email: info@devaquarium.com</p>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--glass-border)', paddingTop: '40px' }}>
            &copy; 2026 Dev Aquarium & Pet Shop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
