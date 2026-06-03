import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle, AlertTriangle, HelpCircle, Thermometer, Droplet, Layers } from 'lucide-react';

const FISH_DATABASE = [
  {
    id: 'betta',
    name: 'Exotic Betta (Siamese Fighting Fish)',
    scientific: 'Betta splendens',
    temp: '24°C - 28°C',
    ph: '6.5 - 7.5',
    minTank: '19 Liters (5 Gal)',
    care: 'Easy-Medium',
    behavior: 'Highly Territorial',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'guppy',
    name: 'Fancy Guppy',
    scientific: 'Poecilia reticulata',
    temp: '22°C - 28°C',
    ph: '7.0 - 8.5',
    minTank: '19 Liters (5 Gal)',
    care: 'Very Easy',
    behavior: 'Peaceful Community',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'tetra',
    name: 'Neon Tetra',
    scientific: 'Paracheirodon innesi',
    temp: '21°C - 25°C',
    ph: '6.0 - 7.0',
    minTank: '38 Liters (10 Gal)',
    care: 'Easy',
    behavior: 'Peaceful Schooling',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'angelfish',
    name: 'Freshwater Angelfish',
    scientific: 'Pterophyllum scalare',
    temp: '24°C - 29°C',
    ph: '6.0 - 7.5',
    minTank: '113 Liters (30 Gal)',
    care: 'Medium',
    behavior: 'Semi-Aggressive',
    image: 'https://images.unsplash.com/photo-1520338258525-606b90f96b0c?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'goldfish',
    name: 'Fancy Goldfish (Ryukin/Oranda)',
    scientific: 'Carassius auratus',
    temp: '18°C - 22°C',
    ph: '7.2 - 8.0',
    minTank: '75 Liters (20 Gal)',
    care: 'Medium',
    behavior: 'Peaceful Coldwater',
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'oscar',
    name: 'Tiger Oscar',
    scientific: 'Astronotus ocellatus',
    temp: '24°C - 28°C',
    ph: '6.5 - 7.5',
    minTank: '208 Liters (55 Gal)',
    care: 'Medium-Hard',
    behavior: 'Aggressive / Predator',
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a02?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'flowerhorn',
    name: 'Exotic Flowerhorn Cichlid',
    scientific: 'Cichlasoma sp. hybrid',
    temp: '26°C - 30°C',
    ph: '7.0 - 8.0',
    minTank: '280 Liters (75 Gal)',
    care: 'Hard',
    behavior: 'Highly Aggressive / Solo',
    image: 'https://images.unsplash.com/photo-1544551763-097ef78a5814?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'barb',
    name: 'Cherry Barb',
    scientific: 'Puntius titteya',
    temp: '22°C - 27°C',
    ph: '6.0 - 7.5',
    minTank: '57 Liters (15 Gal)',
    care: 'Easy',
    behavior: 'Peaceful Schooling',
    image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=300'
  }
];

const checkCompatibility = (fishA, fishB) => {
  if (fishA.id === fishB.id) {
    if (fishA.id === 'betta') {
      return {
        status: 'danger',
        title: 'Highly Incompatible',
        desc: 'Betta fish (especially males) will fight to the death. Never house multiple male Bettas in the same tank under any circumstances.'
      };
    }
    if (fishA.id === 'flowerhorn') {
      return {
        status: 'danger',
        title: 'Highly Incompatible',
        desc: 'Flowerhorns are solitary cichlids. Housing two together in a normal tank will trigger territorial battle ending in death.'
      };
    }
    if (fishA.id === 'oscar') {
      return {
        status: 'warning',
        title: 'Caution Required',
        desc: 'Oscars can live together but need a very large tank (120+ gallons/450L) with visual barriers to define separate territories.'
      };
    }
    return {
      status: 'success',
      title: 'Fully Compatible',
      desc: `Excellent! These fish love the company of their own species. Keep them in a proper group/school.`
    };
  }

  // Solitary Aggressors
  if (fishA.id === 'flowerhorn' || fishB.id === 'flowerhorn') {
    return {
      status: 'danger',
      title: 'Incompatible (Flowerhorn Rule)',
      desc: 'Flowerhorns must live strictly alone. Their extreme aggression means they will hunt down, bully, and kill any other fish in the aquarium.'
    };
  }

  // Giant Predators
  if (fishA.id === 'oscar' || fishB.id === 'oscar') {
    const other = fishA.id === 'oscar' ? fishB : fishA;
    if (['tetra', 'guppy'].includes(other.id)) {
      return {
        status: 'danger',
        title: 'Incompatible (Predation)',
        desc: `Oscars grow up to 14 inches and will eat anything that fits in their mouth. The small ${other.name} will become an instant live snack.`
      };
    }
    if (other.id === 'angelfish') {
      return {
        status: 'warning',
        title: 'Caution / Risks Present',
        desc: 'Oscars and Angelfish are both cichlids. While they sometimes coexist in massive tanks, Oscars grow much faster and can bully or severely injure Angelfish.'
      };
    }
    if (other.id === 'goldfish') {
      return {
        status: 'danger',
        title: 'Incompatible (Temperature & Behavior)',
        desc: 'Oscars are aggressive, warm-water tropical cichlids, whereas Goldfish are peaceful, slow coldwater fish. Goldfish will get severely bullied and cannot tolerate tropical heat.'
      };
    }
    return {
      status: 'danger',
      title: 'Incompatible',
      desc: `Tiger Oscars will bully, stress out, and eventually attempt to eat ${other.name}.`
    };
  }

  // Coldwater vs Tropical
  if (fishA.id === 'goldfish' || fishB.id === 'goldfish') {
    const other = fishA.id === 'goldfish' ? fishB : fishA;
    return {
      status: 'danger',
      title: 'Incompatible (Coldwater vs. Tropical)',
      desc: `Goldfish are coldwater fish (18-22°C) and generate heavy waste. ${other.name} is a tropical fish (24-28°C). Keeping them together forces one into unhealthy, stressing temperatures.`
    };
  }

  // Bettas
  if (fishA.id === 'betta' || fishB.id === 'betta') {
    const other = fishA.id === 'betta' ? fishB : fishA;
    if (other.id === 'guppy') {
      return {
        status: 'danger',
        title: 'Incompatible (Tail Nipping & Mimicry)',
        desc: 'Male Bettas will mistake the colorful, flowing fins of Fancy Guppies for rival Bettas and attack them. Alternatively, active guppies may nip at the Betta\'s fins.'
      };
    }
    if (other.id === 'tetra') {
      return {
        status: 'warning',
        title: 'Caution (Size & Temperament)',
        desc: 'Bettas can sometimes live with Neon Tetras in heavily planted tanks (10+ Gallons). However, active tetras can nip the Betta\'s long fins, or an aggressive Betta may chase and kill them.'
      };
    }
    if (other.id === 'barb') {
      return {
        status: 'warning',
        title: 'Caution (Fin Nipping)',
        desc: 'Cherry Barbs are peaceful but fast-moving and known to occasionally nip at the slow, delicate flowing fins of Betta fish.'
      };
    }
    return {
      status: 'danger',
      title: 'Incompatible',
      desc: `Bettas are solitary and territorial. They should not be kept with larger or aggressive fish like ${other.name}.`
    };
  }

  // Angelfish
  if (fishA.id === 'angelfish' || fishB.id === 'angelfish') {
    const other = fishA.id === 'angelfish' ? fishB : fishA;
    if (other.id === 'tetra') {
      return {
        status: 'warning',
        title: 'Caution (Predation Risk)',
        desc: 'As Angelfish grow large, they become natural predators of Neon Tetras. They can coexist if raised together from a young age in a large, planted setup, but adult Angelfish will eat smaller tetras.'
      };
    }
    if (other.id === 'guppy') {
      return {
        status: 'warning',
        title: 'Caution (Nipping)',
        desc: 'Angelfish are semi-aggressive cichlids and may bully guppies or eat small guppy fry.'
      };
    }
    return {
      status: 'success',
      title: 'Fully Compatible',
      desc: `Angelfish and ${other.name} make excellent community tankmates under standard tropical water conditions.`
    };
  }

  // Peaceful community schoolers (Tetra, Guppy, Barb)
  return {
    status: 'success',
    title: 'Fully Compatible',
    desc: 'Both are peaceful, small community schoolers. They will live together happily in a standard planted community aquarium.'
  };
};

const CompatibilityChecker = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  const result = (selectedA && selectedB) ? checkCompatibility(selectedA, selectedB) : null;

  const handleSelect = (fish, slot) => {
    if (slot === 'A') {
      setSelectedA(fish);
    } else {
      setSelectedB(fish);
    }
  };

  const handleReset = () => {
    setSelectedA(null);
    setSelectedB(null);
  };

  return (
    <div className="card glass-glow" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #10b981, #3b82f6)' }} />

      <div style={{ marginBottom: '36px', textAlign: 'center' }}>
        <span className="badge badge-primary" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.25)' }}>
          Aquarium Care Toolkit
        </span>
        <h2 style={{ fontSize: '2.2rem', marginTop: '12px', fontWeight: 800 }}>Fish Compatibility Checker</h2>
        <p style={{ color: 'var(--text-muted)' }}>Select two fish breeds from our shop catalog to test if they can live harmoniously in the same aquarium.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '30px' }}>
        
        {/* Selection Slot A */}
        <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--surface-border)', borderRadius: '20px', padding: '24px' }}>
          <h4 style={{ marginBottom: '16px', fontWeight: 700, color: 'var(--primary)' }}>Select Fish Species #1</h4>
          {selectedA ? (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <img src={selectedA.image} alt={selectedA.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <h5 style={{ fontWeight: 800 }}>{selectedA.name}</h5>
                <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>{selectedA.scientific}</p>
                <button onClick={() => setSelectedA(null)} style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.8rem', cursor: 'pointer', marginTop: '6px', fontWeight: 'bold' }}>Change</button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {FISH_DATABASE.map(f => (
                <button 
                  key={f.id} 
                  className="tab-btn" 
                  style={{ fontSize: '0.8rem', padding: '10px', borderRadius: '8px' }}
                  onClick={() => handleSelect(f, 'A')}
                  disabled={selectedB?.id === f.id && f.id === 'flowerhorn'} // Just to guide
                >
                  {f.name.split(' (')[0].replace('Exotic ', '')}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selection Slot B */}
        <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--surface-border)', borderRadius: '20px', padding: '24px' }}>
          <h4 style={{ marginBottom: '16px', fontWeight: 700, color: '#34d399' }}>Select Fish Species #2</h4>
          {selectedB ? (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <img src={selectedB.image} alt={selectedB.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <h5 style={{ fontWeight: 800 }}>{selectedB.name}</h5>
                <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>{selectedB.scientific}</p>
                <button onClick={() => setSelectedB(null)} style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.8rem', cursor: 'pointer', marginTop: '6px', fontWeight: 'bold' }}>Change</button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {FISH_DATABASE.map(f => (
                <button 
                  key={f.id} 
                  className="tab-btn" 
                  style={{ fontSize: '0.8rem', padding: '10px', borderRadius: '8px' }}
                  onClick={() => handleSelect(f, 'B')}
                >
                  {f.name.split(' (')[0].replace('Exotic ', '')}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Result Display */}
      {result ? (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            background: 'rgba(3, 7, 18, 0.4)', 
            border: '1px solid var(--surface-border)', 
            borderRadius: '24px', 
            padding: '30px' 
          }}
        >
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ 
              background: result.status === 'success' ? 'rgba(16, 185, 129, 0.1)' : result.status === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
              padding: '16px', 
              borderRadius: '50%',
              color: result.status === 'success' ? '#34d399' : result.status === 'warning' ? '#fbbf24' : '#f87171'
            }}>
              {result.status === 'success' ? <CheckCircle size={36} /> : result.status === 'warning' ? <AlertTriangle size={36} /> : <ShieldAlert size={36} />}
            </div>
            <div style={{ flex: 1 }}>
              <span className={`badge ${result.status === 'success' ? 'badge-success' : result.status === 'warning' ? 'badge-warning' : 'badge-danger'}`} style={{ marginBottom: '8px' }}>
                {result.title}
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>{selectedA.name.split(' (')[0]} + {selectedB.name.split(' (')[0]}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '24px' }}>{result.desc}</p>
              
              {/* Detailed specs comparison */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <div>
                  <h5 style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Thermometer size={16} color="var(--primary)" /> Water Temperature</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedA.name.split(' (')[0]}: <strong>{selectedA.temp}</strong></p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedB.name.split(' (')[0]}: <strong>{selectedB.temp}</strong></p>
                </div>
                <div>
                  <h5 style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Droplet size={16} color="var(--primary)" /> pH Level Range</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedA.name.split(' (')[0]}: <strong>{selectedA.ph}</strong></p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedB.name.split(' (')[0]}: <strong>{selectedB.ph}</strong></p>
                </div>
                <div>
                  <h5 style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Layers size={16} color="var(--primary)" /> Min Tank Volume</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedA.name.split(' (')[0]}: <strong>{selectedA.minTank}</strong></p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedB.name.split(' (')[0]}: <strong>{selectedB.minTank}</strong></p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={handleReset}>Clear Test</button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div style={{ 
          border: '2px dashed var(--surface-border)', 
          borderRadius: '24px', 
          padding: '60px', 
          textAlign: 'center', 
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px' 
        }}>
          <HelpCircle size={48} style={{ opacity: 0.2 }} />
          <h4 style={{ fontWeight: 700 }}>Select Fish to Run Diagnostics</h4>
          <p style={{ maxWidth: '400px', fontSize: '0.9rem' }}>Choose one species in the left column and another in the right column to view compatibility analysis.</p>
        </div>
      )}
    </div>
  );
};

export default CompatibilityChecker;
