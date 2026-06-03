import { motion } from 'framer-motion';
import { MessageCircle, ShoppingBag, ShieldCheck, Star } from 'lucide-react';
import heroBg from '../assets/hero.png';

const Hero = () => {
  return (
    <section id="home" className="hero-split">
      
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-grid">
          
          {/* Left Text Block */}
          <div className="hero-text-side">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge badge-primary" style={{ marginBottom: '20px' }}>
                Vadodara's Premium Store
              </span>
              
              <h1 style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
                fontWeight: 800, 
                lineHeight: 1.1, 
                marginBottom: '24px', 
                color: 'white',
                letterSpacing: '-1px'
              }}>
                Premium Aquarium & <br />
                <span className="gradient-text">Pet Supplies</span>
              </h1>
              
              <p style={{ 
                fontSize: '1.15rem', 
                marginBottom: '40px', 
                color: 'var(--text-muted)',
                maxWidth: '560px',
                lineHeight: '1.6' 
              }}>
                Healthy fish, top-tier international bird supplies, and tailored glass aquarium planning since 2015. Get expert guidance directly from Mr. Kumar.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#shop" className="btn btn-primary" style={{ padding: '16px 32px' }}>
                  <ShoppingBag size={18} />
                  Shop Catalog
                </a>
                <a href="https://wa.me/919979611397" target="_blank" className="btn btn-outline" style={{ padding: '16px 32px' }}>
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Visual Image Showcase */}
          <div className="hero-visual-side">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ position: 'relative' }}
            >
              {/* Image Frame */}
              <div className="showcase-frame">
                <img 
                  src={heroBg} 
                  alt="Dev Aquarium & Pet Shop Vadodara" 
                  className="showcase-image"
                />
                
                {/* Visual Glass Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(to top, rgba(2, 6, 23, 0.4) 0%, transparent 60%)',
                  pointerEvents: 'none'
                }} />
              </div>

              {/* Floating Badge 1 - Top Right */}
              <motion.div 
                className="floating-card glass"
                style={{ top: '30px', right: '-40px', background: 'rgba(15,23,42,0.85)' }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div style={{ 
                  background: 'rgba(16, 185, 129, 0.15)', 
                  color: '#34d399', 
                  borderRadius: '50%', 
                  padding: '8px', 
                  display: 'flex' 
                }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'white' }}>100% Healthy</h4>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quarantined Stocks</p>
                </div>
              </motion.div>

              {/* Floating Badge 2 - Bottom Left */}
              <motion.div 
                className="floating-card glass"
                style={{ bottom: '40px', left: '-50px', background: 'rgba(15,23,42,0.85)' }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div style={{ 
                  background: 'rgba(245, 158, 11, 0.15)', 
                  color: '#fbbf24', 
                  borderRadius: '50%', 
                  padding: '8px', 
                  display: 'flex' 
                }}>
                  <Star fill="#fbbf24" size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'white' }}>4.1 Star Rating</h4>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>245+ Google Reviews</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
