import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import heroBg from '../assets/hero.png';

const Hero = () => {
  return (
    <section id="home" className="hero" style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative', 
      overflow: 'hidden',
      color: 'white',
      paddingTop: '80px'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '700px' }}
        >
          <span className="badge badge-primary" style={{ marginBottom: '20px', background: 'var(--primary)', color: 'white' }}>
            Trusted since 2015
          </span>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
            Premium Aquarium & <br />
            <span style={{ color: 'var(--primary)' }}>Pet Supplies</span> in Vadodara
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '40px', opacity: 0.9 }}>
            Healthy fish, quality products, trusted service since 2015. 
            Everything your pet needs to thrive in their new home.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
              <ShoppingBag size={20} />
              Shop Now
            </button>
            <a href="https://wa.me/919979611397" className="btn glass" style={{ padding: '16px 32px', fontSize: '1.1rem', color: 'white' }}>
              <MessageCircle size={20} />
              Contact on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
