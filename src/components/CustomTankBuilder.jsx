import { useState } from 'react';
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
