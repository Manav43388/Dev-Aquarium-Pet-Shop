import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const TANK_PRESETS = [
  { name: '1 Foot Nano', l: 12, w: 8, h: 10, label: 'Perfect for Betta or Shrimp (15L)' },
  { name: '1.5 Feet Standard', l: 18, w: 10, h: 12, label: 'Great for Guppies or Small Tetras (35L)' },
  { name: '2 Feet Breeder', l: 24, w: 12, h: 12, label: 'Ideal beginner community tank (56L)' },
  { name: '3 Feet Premium', l: 36, w: 15, h: 18, label: 'Spacious planted aquascaping tank (160L)' },
  { name: '4 Feet Majestic', l: 48, w: 18, h: 20, label: 'Stunning display tank for community or Oscars (280L)' },
];

const GLASS_TYPES = [
  { id: 'normal', name: 'Normal Float Glass', desc: 'Standard glass with a subtle green tint on the edges.', multiplier: 1.0, basePriceSqIn: 1.8 },
  { id: 'ultra', name: 'Ultra-Clear Low-Iron Glass', desc: 'Premium opti-white glass offering 99% light transmission and distortion-free viewing.', multiplier: 1.8, basePriceSqIn: 3.5 }
];

const EQUIPMENT_PACKAGES = [
  { id: 'none', name: 'Tank Only', price: 0, desc: 'Just the glass tank, perfect if you already have gear.' },
  { id: 'basic', name: 'Essential Starter Kit', price: 1500, desc: 'Includes an internal power filter, basic LED light, and a thermometer.' },
  { id: 'planted', name: 'Pro Planted & Aquascape Kit', price: 5800, desc: 'Includes a Hang-on-back/Canister filter, Slim Full-Spectrum RGB Planted LED, and active soil substrate.' }
];

const AQUASCAPE_THEMES = [
  { id: 'none', name: 'Bare Bottom / No Decor', price: 0, desc: 'Clean glass bottom. Best for breeding or heavy-waste fish.' },
  { id: 'iwagumi', name: 'Zen Iwagumi Style', price: 2500, desc: 'Japanese rock arrangements (Seiryu/Dragon stones) with cosmetic sand and live carpeting plants.' },
  { id: 'jungle', name: 'Jungle Driftwood Style', price: 4200, desc: 'Natural spiderwood/driftwood structures, volcanic rocks, and low-maintenance plants (Anubias, Java Fern).' }
];

const CustomTankBuilder = () => {
  const [step, setStep] = useState(1);
  const [dimensions, setDimensions] = useState({ l: 24, w: 12, h: 12, isCustom: false });
  const [glassType, setGlassType] = useState(GLASS_TYPES[0]);
  const [equipment, setEquipment] = useState(EQUIPMENT_PACKAGES[0]);
  const [theme, setTheme] = useState(AQUASCAPE_THEMES[0]);

  // Volume in Liters = (L * W * H * 16.387) / 1000
  const volumeLiters = Math.round((dimensions.l * dimensions.w * dimensions.h * 16.387) / 1000);
  
  // Calculate Glass Surface Area = Bottom + 2 * (L * H) + 2 * (W * H)
  const glassAreaSqIn = (dimensions.l * dimensions.w) + 2 * (dimensions.l * dimensions.h) + 2 * (dimensions.w * dimensions.h);
  
  // Glass Cost = Area * BasePriceSqIn
  const glassCost = Math.round(glassAreaSqIn * glassType.basePriceSqIn);
  
  // Total cost estimate
  const totalPrice = glassCost + equipment.price + theme.price;

  const bubbles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`,
      size: `${1.5 + Math.random() * 2.5}px`
    }));
  }, []);

  const displayWidth = Math.max(220, Math.min(480, dimensions.l * 8));
  const displayHeight = Math.max(120, Math.min(220, dimensions.h * 9));

  const handlePresetSelect = (preset) => {
    setDimensions({ l: preset.l, w: preset.w, h: preset.h, isCustom: false });
  };

  const handleCustomDimensionChange = (field, val) => {
    const parsed = Math.max(4, Math.min(96, parseInt(val) || 0));
    setDimensions(prev => ({ ...prev, [field]: parsed, isCustom: true }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSendRequest = () => {
    const glassText = glassType.name;
    const equipText = equipment.name;
    const themeText = theme.name;
    
    const message = `Hello Dev Aquarium, I would like to request a quote for a custom aquarium setup:%0A%0A` +
      `- Dimensions: ${dimensions.l}" L x ${dimensions.w}" W x ${dimensions.h}" H%0A` +
      `- Calculated Volume: ~${volumeLiters} Liters%0A` +
      `- Glass Type: ${glassText}%0A` +
      `- Equipment: ${equipText}%0A` +
      `- Aquascaping Theme: ${themeText}%0A%0A` +
      `Estimated Price: ₹${totalPrice}%0A` +
      `Please let me know the availability and timeframe. Thanks!`;
      
    window.open(`https://wa.me/919979611397?text=${message}`, '_blank');
  };

  return (
    <div className="card glass-glow" style={{ position: 'relative', overflow: 'hidden', padding: '40px' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }} />
      
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <span className="badge badge-primary">Interactive 3D configurator</span>
        <h2 style={{ fontSize: '2.2rem', marginTop: '12px', fontWeight: 800 }}>Custom Aquarium Designer</h2>
        <p style={{ color: 'var(--text-muted)' }}>Configure your dream tank setup. We build, install, and landscape right in Vadodara.</p>
      </div>

      {/* Progress Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20px', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.05)', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '20px', left: 0, width: `${((step - 1) / 3) * 100}%`, height: '2px', background: 'var(--primary)', zIndex: 0, transition: 'width 0.3s ease' }} />
        
        {['Dimensions', 'Glass Selection', 'Equipment Package', 'Theme Decor'].map((title, i) => (
          <div key={title} style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20%', cursor: 'pointer' }} onClick={() => setStep(i + 1)}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: step > i ? 'var(--primary)' : 'var(--surface)', 
              border: step === i + 1 ? '2px solid white' : '1px solid var(--surface-border)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: step > i ? 'white' : 'var(--text-muted)',
              fontWeight: 700,
              boxShadow: step === i + 1 ? '0 0 15px var(--primary-glow)' : 'none',
              transition: 'all 0.3s'
            }}>
              {step > i + 1 ? <Check size={18} /> : i + 1}
            </div>
            <span style={{ fontSize: '0.8rem', color: step === i + 1 ? 'white' : 'var(--text-muted)', marginTop: '8px', textAlign: 'center', fontWeight: step === i + 1 ? '700' : '500' }}>
              {title}
            </span>
          </div>
        ))}
      </div>

      {/* Live Preview Panel */}
      <div style={{ 
        background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.8) 0%, rgba(3, 7, 18, 0.95) 100%)',
        border: '1px solid var(--surface-border)',
        borderRadius: '20px',
        padding: '30px 20px',
        marginBottom: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        minHeight: '290px',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)'
      }}>
        {/* Floating preview title tag */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '20px',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: 'var(--primary)',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', animation: 'pulse 1.5s infinite' }} />
          Live Tank Preview
        </div>

        {/* CSS Keyframes for bubbles and lights */}
        <style>{`
          @keyframes bubbleUp {
            0% { transform: translateY(100%) scale(0.3); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-160px) scale(1); opacity: 0; }
          }
          @keyframes pulse {
            0% { opacity: 0.4; }
            50% { opacity: 1; }
            100% { opacity: 0.4; }
          }
          .bubble-particle {
            position: absolute;
            background: rgba(255,255,255,0.45);
            border-radius: 50%;
            pointer-events: none;
            bottom: 0;
          }
        `}</style>

        {/* Equipment: Planted full spectrum light fixture bar (sits on top of the tank border) */}
        {equipment.id === 'planted' && (
          <div style={{
            width: `${displayWidth + 10}px`,
            height: '10px',
            background: 'linear-gradient(to bottom, #4b5563, #1f2937)',
            borderRadius: '4px 4px 0 0',
            borderBottom: '2px solid rgba(255,255,255,0.1)',
            zIndex: 10,
            marginBottom: '-6px', // mount onto glass
            position: 'relative',
            boxShadow: '0 -2px 10px rgba(14,165,233,0.3)'
          }}>
            {/* Fixture leg left */}
            <div style={{ position: 'absolute', left: 0, bottom: '-8px', width: '4px', height: '8px', background: '#374151' }} />
            {/* Fixture leg right */}
            <div style={{ position: 'absolute', right: 0, bottom: '-8px', width: '4px', height: '8px', background: '#374151' }} />
          </div>
        )}

        {/* Equipment: Basic overhead light fixture */}
        {equipment.id === 'basic' && (
          <div style={{
            width: `${displayWidth - 40}px`,
            height: '6px',
            background: '#1f2937',
            borderRadius: '2px',
            zIndex: 10,
            marginBottom: '-6px',
            position: 'relative'
          }}>
            {/* Hanging clips */}
            <div style={{ position: 'absolute', left: '10px', bottom: '-8px', width: '2px', height: '8px', background: '#4b5563' }} />
            <div style={{ position: 'absolute', right: '10px', bottom: '-8px', width: '2px', height: '8px', background: '#4b5563' }} />
          </div>
        )}

        {/* Light Ray Overlay */}
        {equipment.id === 'planted' && (
          <div style={{
            position: 'absolute',
            top: '85px',
            width: `${displayWidth}px`,
            height: `${displayHeight}px`,
            background: 'linear-gradient(to bottom, rgba(14,165,233,0.15) 0%, rgba(236,72,153,0.05) 50%, transparent 100%)',
            clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
            pointerEvents: 'none',
            zIndex: 3,
            transition: 'all 0.5s ease'
          }} />
        )}
        {equipment.id === 'basic' && (
          <div style={{
            position: 'absolute',
            top: '85px',
            width: `${displayWidth}px`,
            height: `${displayHeight}px`,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, transparent 100%)',
            clipPath: 'polygon(20% 0%, 80% 0%, 95% 100%, 5% 100%)',
            pointerEvents: 'none',
            zIndex: 3,
            transition: 'all 0.5s ease'
          }} />
        )}

        {/* Actual Glass Aquarium */}
        <div style={{
          width: `${displayWidth}px`,
          height: `${displayHeight}px`,
          position: 'relative',
          borderRadius: '2px',
          overflow: 'hidden',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          // Glass Quality borders
          border: glassType.id === 'ultra' ? '3px solid #38bdf8' : '3px solid #10b981',
          boxShadow: glassType.id === 'ultra' 
            ? '0 0 25px rgba(56, 189, 248, 0.25), inset 0 0 15px rgba(255,255,255,0.1)' 
            : '0 0 20px rgba(16, 185, 129, 0.15), inset 0 0 10px rgba(255,255,255,0.05)',
          // Background water gradient depending on Theme selection
          background: theme.id === 'none' 
            ? 'linear-gradient(to bottom, #0369a1, #0c4a6e)' 
            : theme.id === 'iwagumi'
            ? 'linear-gradient(to bottom, #115e59, #134e5e, #0c2c3e)'
            : 'linear-gradient(to bottom, #14532d, #1e3a8a, #0c1c3e)',
          zIndex: 2
        }}>
          {/* Glass Highlights Overlay */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)',
            pointerEvents: 'none',
            zIndex: 6
          }} />

          {/* Water Surface Line */}
          <div style={{
            position: 'absolute',
            top: '8px', left: 0, right: 0,
            height: '1px',
            background: 'rgba(255,255,255,0.3)',
            boxShadow: '0 1px 3px rgba(255,255,255,0.1)',
            zIndex: 4
          }} />

          {/* Theme SVG Layouts */}
          {theme.id === 'iwagumi' && (
            <svg viewBox="0 0 400 200" width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 3, pointerEvents: 'none' }}>
              <path d="M 0 178 Q 120 165 240 182 T 400 172 L 400 200 L 0 200 Z" fill="#10b981" />
              <path d="M 0 184 Q 160 172 320 188 T 400 182 L 400 200 L 0 200 Z" fill="#047857" opacity="0.85" />
              <polygon points="110,185 140,95 175,115 185,185" fill="#4b5563" stroke="#374151" strokeWidth="0.5" />
              <polygon points="110,185 140,95 155,185" fill="#6b7280" opacity="0.6" />
              <polygon points="205,185 225,120 255,135 265,185" fill="#374151" stroke="#1f2937" strokeWidth="0.5" />
              <polygon points="80,190 95,160 110,190" fill="#4b5563" />
              <polygon points="275,190 290,165 305,190" fill="#4b5563" />
            </svg>
          )}

          {theme.id === 'jungle' && (
            <svg viewBox="0 0 400 200" width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 3, pointerEvents: 'none' }}>
              <path d="M 0 186 Q 200 175 400 188 L 400 200 L 0 200 Z" fill="#2d1a10" />
              <polygon points="65,190 85,145 115,190" fill="#1f1610" stroke="#000000" strokeWidth="0.5" />
              <polygon points="275,190 305,130 335,190" fill="#1f1610" stroke="#000000" strokeWidth="0.5" />
              <path d="M 50 190 Q 100 140 140 70 Q 150 60 170 75 Q 130 110 100 190 Z" fill="#3c2212" />
              <path d="M 110 115 Q 150 100 190 110 Q 200 115 180 125 Q 150 115 110 120 Z" fill="#3c2212" opacity="0.9" />
              <path d="M 320 190 Q 260 120 220 80 Q 210 70 230 65 Q 270 105 310 190 Z" fill="#27150a" />
              <circle cx="80" cy="155" r="14" fill="#047857" opacity="0.85" />
              <circle cx="100" cy="165" r="16" fill="#065f46" opacity="0.75" />
              <circle cx="70" cy="170" r="10" fill="#065f46" />
              <circle cx="130" cy="90" r="10" fill="#059669" opacity="0.85" />
              <circle cx="140" cy="85" r="12" fill="#047857" opacity="0.75" />
              <circle cx="285" cy="145" r="15" fill="#047857" opacity="0.85" />
              <circle cx="265" cy="160" r="13" fill="#065f46" opacity="0.75" />
              <circle cx="300" cy="155" r="18" fill="#065f46" />
            </svg>
          )}

          {/* Bubbles Generator */}
          {equipment.id !== 'none' && bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className="bubble-particle"
              style={{
                left: bubble.left,
                width: bubble.size,
                height: bubble.size,
                animation: `bubbleUp ${bubble.duration} infinite linear`,
                animationDelay: bubble.delay
              }}
            />
          ))}

          {/* Equipment inside: Basic Internal corner filter */}
          {equipment.id === 'basic' && (
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '8px',
              width: '18px',
              height: '45px',
              background: 'linear-gradient(to right, #1f2937, #111827)',
              borderRadius: '2px',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              zIndex: 4,
              boxShadow: '0 2px 5px rgba(0,0,0,0.5)'
            }}>
              {/* Filter grid lines */}
              <div style={{ width: '100%', height: '3px', background: '#374151', margin: '6px 0 3px' }} />
              <div style={{ width: '100%', height: '3px', background: '#374151', margin: '3px 0' }} />
            </div>
          )}

          {/* Equipment inside: Planted canister intake/outflow pipe */}
          {equipment.id === 'planted' && (
            <>
              {/* Outflow Pipe Left */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '6px',
                width: '6px',
                height: '35px',
                border: '2px solid rgba(255,255,255,0.15)',
                borderBottom: 'none',
                borderRadius: '4px 4px 0 0',
                background: 'rgba(255,255,255,0.05)',
                zIndex: 4
              }} />
              {/* Outflow nozzle */}
              <div style={{
                position: 'absolute',
                top: '40px',
                left: '6px',
                width: '10px',
                height: '6px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '0 4px 4px 0',
                zIndex: 4
              }} />
            </>
          )}
        </div>

        {/* Cabinet Stand */}
        <div style={{
          width: `${displayWidth + 24}px`,
          height: '22px',
          background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
          borderTop: '2px solid rgba(255,255,255,0.1)',
          borderRadius: '4px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
          zIndex: 5,
          marginTop: '-4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Handle details */}
          <div style={{ width: '30px', height: '3px', background: '#475569', borderRadius: '2px' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '40px' }}>
        
        {/* Step Contents */}
        <div style={{ minHeight: '350px' }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', fontWeight: 700 }}>Choose Dimensions</h3>
                
                {/* Presets */}
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Presets</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '30px' }}>
                  {TANK_PRESETS.map(preset => {
                    const isSelected = !dimensions.isCustom && dimensions.l === preset.l && dimensions.w === preset.w && dimensions.h === preset.h;
                    return (
                      <div 
                        key={preset.name}
                        onClick={() => handlePresetSelect(preset)}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          background: isSelected ? 'rgba(14, 165, 233, 0.1)' : 'rgba(255,255,255,0.02)',
                          border: isSelected ? '2px solid var(--primary)' : '1px solid var(--surface-border)',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <h5 style={{ fontWeight: 700, color: isSelected ? 'white' : 'var(--text)' }}>{preset.name}</h5>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{preset.l}"x{preset.w}"x{preset.h}" ({preset.label})</p>
                      </div>
                    );
                  })}
                </div>

                {/* Custom sliders */}
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>Custom Sizing (Inches)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {['l', 'w', 'h'].map(field => {
                    const fieldLabel = field === 'l' ? 'Length' : field === 'w' ? 'Width' : 'Height';
                    const maxVal = field === 'l' ? 72 : 36;
                    const minVal = 8;
                    return (
                      <div key={field} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span style={{ width: '80px', fontWeight: 600 }}>{fieldLabel}</span>
                        <input 
                          type="range" 
                          min={minVal} 
                          max={maxVal} 
                          value={dimensions[field]} 
                          onChange={(e) => handleCustomDimensionChange(field, e.target.value)}
                          style={{ flex: 1, accentColor: 'var(--primary)' }}
                        />
                        <div style={{ width: '70px', display: 'flex', alignItems: 'center' }}>
                          <input 
                            type="number" 
                            value={dimensions[field]} 
                            onChange={(e) => handleCustomDimensionChange(field, e.target.value)}
                            style={{ 
                              width: '100%', 
                              background: 'rgba(255,255,255,0.03)', 
                              border: '1px solid var(--surface-border)', 
                              padding: '6px', 
                              borderRadius: '6px', 
                              color: 'white',
                              textAlign: 'center' 
                            }}
                          />
                          <span style={{ marginLeft: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>in</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', fontWeight: 700 }}>Choose Glass Quality</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {GLASS_TYPES.map(g => {
                    const isSelected = glassType.id === g.id;
                    return (
                      <div
                        key={g.id}
                        onClick={() => setGlassType(g)}
                        style={{
                          padding: '24px',
                          borderRadius: '16px',
                          background: isSelected ? 'rgba(14, 165, 233, 0.1)' : 'rgba(255,255,255,0.02)',
                          border: isSelected ? '2px solid var(--primary)' : '1px solid var(--surface-border)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '20px'
                        }}
                      >
                        <div style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          border: '2px solid var(--primary)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          background: isSelected ? 'var(--primary)' : 'transparent' 
                        }}>
                          {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'white' }} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontWeight: 700 }}>{g.name}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{g.desc}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Glass Rate:</span>
                          <p style={{ fontWeight: 800, color: 'var(--primary)' }}>₹{g.basePriceSqIn}/sq.in</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', fontWeight: 700 }}>Select Filtration & Lights</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {EQUIPMENT_PACKAGES.map(eq => {
                    const isSelected = equipment.id === eq.id;
                    return (
                      <div
                        key={eq.id}
                        onClick={() => setEquipment(eq)}
                        style={{
                          padding: '20px',
                          borderRadius: '16px',
                          background: isSelected ? 'rgba(14, 165, 233, 0.1)' : 'rgba(255,255,255,0.02)',
                          border: isSelected ? '2px solid var(--primary)' : '1px solid var(--surface-border)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '20px'
                        }}
                      >
                        <div style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          border: '2px solid var(--primary)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          background: isSelected ? 'var(--primary)' : 'transparent' 
                        }}>
                          {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'white' }} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontWeight: 700 }}>{eq.name}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{eq.desc}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.2rem' }}>{eq.price > 0 ? `+₹${eq.price}` : 'Free'}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', fontWeight: 700 }}>Choose Aquascaping Theme Layout</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {AQUASCAPE_THEMES.map(th => {
                    const isSelected = theme.id === th.id;
                    return (
                      <div
                        key={th.id}
                        onClick={() => setTheme(th)}
                        style={{
                          padding: '20px',
                          borderRadius: '16px',
                          background: isSelected ? 'rgba(14, 165, 233, 0.1)' : 'rgba(255,255,255,0.02)',
                          border: isSelected ? '2px solid var(--primary)' : '1px solid var(--surface-border)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '20px'
                        }}
                      >
                        <div style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          border: '2px solid var(--primary)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          background: isSelected ? 'var(--primary)' : 'transparent' 
                        }}>
                          {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'white' }} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontWeight: 700 }}>{th.name}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{th.desc}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.2rem' }}>{th.price > 0 ? `+₹${th.price}` : 'Free'}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Summary Card */}
        <div style={{ 
          background: 'rgba(3, 7, 18, 0.4)', 
          border: '1px solid var(--surface-border)', 
          borderRadius: '20px', 
          padding: '24px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          height: '100%' 
        }}>
          <div>
            <h4 style={{ fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', marginBottom: '20px' }}>Setup Summary</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Dimensions</span>
                <p style={{ fontWeight: 700, marginTop: '2px' }}>{dimensions.l}" L × {dimensions.w}" W × {dimensions.h}" H</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Volume</span>
                  <p style={{ fontWeight: 700, marginTop: '2px', color: 'var(--primary)' }}>~{volumeLiters} Liters</p>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Glass Area</span>
                  <p style={{ fontWeight: 700, marginTop: '2px' }}>{glassAreaSqIn} sq.in</p>
                </div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Glass Quality</span>
                <p style={{ fontWeight: 700, marginTop: '2px' }}>{glassType.name}</p>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Equipment Pack</span>
                <p style={{ fontWeight: 700, marginTop: '2px' }}>{equipment.name}</p>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Theme Design</span>
                <p style={{ fontWeight: 700, marginTop: '2px' }}>{theme.name}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Estimated Total:</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>₹{totalPrice}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSendRequest}>
              <MessageCircle size={18} /> Request Custom Quote
            </button>
          </div>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
        <button 
          className="btn btn-outline" 
          onClick={prevStep} 
          disabled={step === 1}
          style={{ opacity: step === 1 ? 0.3 : 1, cursor: step === 1 ? 'not-allowed' : 'pointer' }}
        >
          <ChevronLeft size={18} /> Back
        </button>
        {step < 4 ? (
          <button className="btn btn-primary" onClick={nextStep}>
            Continue <ChevronRight size={18} />
          </button>
        ) : (
          <button className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, #059669 100%)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }} onClick={handleSendRequest}>
            Submit Configuration <MessageCircle size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomTankBuilder;
