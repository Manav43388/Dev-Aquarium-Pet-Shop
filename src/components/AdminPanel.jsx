import { useState } from 'react';
import { Plus, Trash2, Edit, Save, X, Search, ShieldCheck, PieChart, List, Check } from 'lucide-react';

// Assets
import aquariumImg from '../assets/products/aquarium.png';
import bettaImg from '../assets/products/betta.png';
import birdsImg from '../assets/products/birds.png';
import foodImg from '../assets/products/food.png';

const PRESET_IMAGES = [
  { name: 'Aquarium Tank', url: aquariumImg },
  { name: 'Betta Fish', url: bettaImg },
  { name: 'Goldfish', url: bettaImg },
  { name: 'Lovebirds / Parrots', url: birdsImg },
  { name: 'Fish Food / Seeds', url: foodImg },
  { name: 'Filter / Accessories', url: aquariumImg }
];

const AdminPanel = ({ products, onAdd, onDelete, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Add Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Fish',
    rating: 5,
    reviews: 12,
    image: PRESET_IMAGES[0].url,
    description: '',
    stockStatus: 'in',
    specs: {
      temp: '',
      ph: '',
      temperament: '',
      minTank: '',
      diet: '',
      lifespan: '',
      nature: '',
      cageSize: '',
      weight: '',
      form: '',
      protein: '',
      expiry: '',
      dimensions: '',
      power: '',
      material: '',
      warranty: ''
    }
  });

  // Inline Edit State
  const [editingId, setEditingId] = useState(null);
  const [editFields, setEditFields] = useState({ name: '', price: '', stockStatus: 'in' });

  // Calculation Metrics
  const totalValuation = products.reduce((sum, p) => sum + (parseInt(p.price) || 0), 0);
  const outOfStockCount = products.filter(p => p.stockStatus === 'out').length;
  const categoriesCount = new Set(products.map(p => p.category)).size;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    
    // Clean up specifications based on category
    const cleanSpecs = {};
    if (newProduct.category === 'Fish') {
      cleanSpecs.temp = newProduct.specs.temp || '24°C - 28°C';
      cleanSpecs.ph = newProduct.specs.ph || '6.5 - 7.5';
      cleanSpecs.temperament = newProduct.specs.temperament || 'Peaceful';
      cleanSpecs.minTank = newProduct.specs.minTank || '19L (5 Gal)';
      cleanSpecs.diet = newProduct.specs.diet || 'Omnivore';
    } else if (newProduct.category === 'Birds') {
      cleanSpecs.lifespan = newProduct.specs.lifespan || '8 - 15 Years';
      cleanSpecs.nature = newProduct.specs.nature || 'Must live in pairs';
      cleanSpecs.cageSize = newProduct.specs.cageSize || '18"x18"x24"';
      cleanSpecs.diet = newProduct.specs.diet || 'Seeds & Greens';
    } else if (['Fish Food', 'Pet Supplies'].includes(newProduct.category)) {
      cleanSpecs.weight = newProduct.specs.weight || '250g';
      cleanSpecs.form = newProduct.specs.form || 'Floating Pellets';
      cleanSpecs.protein = newProduct.specs.protein || '42% Crude Protein';
      cleanSpecs.expiry = newProduct.specs.expiry || '24 Months';
    } else {
      cleanSpecs.dimensions = newProduct.specs.dimensions || '20cm x 15cm x 15cm';
      cleanSpecs.power = newProduct.specs.power || '12W';
      cleanSpecs.material = newProduct.specs.material || 'Durable Acrylic';
      cleanSpecs.warranty = newProduct.specs.warranty || '6 Months Warranty';
    }

    onAdd({
      ...newProduct,
      id: Date.now(),
      price: parseInt(newProduct.price) || 0,
      rating: parseInt(newProduct.rating) || 5,
      reviews: parseInt(newProduct.reviews) || 12,
      specs: cleanSpecs
    });

    // Reset Form
    setNewProduct({
      name: '',
      price: '',
      category: 'Fish',
      rating: 5,
      reviews: 12,
      image: PRESET_IMAGES[0].url,
      description: '',
      stockStatus: 'in',
      specs: {
        temp: '',
        ph: '',
        temperament: '',
        minTank: '',
        diet: '',
        lifespan: '',
        nature: '',
        cageSize: '',
        weight: '',
        form: '',
        protein: '',
        expiry: '',
        dimensions: '',
        power: '',
        material: '',
        warranty: ''
      }
    });
    
    setActiveTab('inventory');
  };

  const handleStartEdit = (p) => {
    setEditingId(p.id);
    setEditFields({ name: p.name, price: p.price, stockStatus: p.stockStatus || 'in' });
  };

  const handleSaveEdit = (id) => {
    onUpdate(id, {
      name: editFields.name,
      price: parseInt(editFields.price) || 0,
      stockStatus: editFields.stockStatus
    });
    setEditingId(null);
  };

  const handleToggleStock = (id, currentStatus) => {
    onUpdate(id, { stockStatus: currentStatus === 'in' ? 'out' : 'in' });
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card glass-glow" style={{ padding: '40px', marginTop: '60px' }}>
      
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <span className="badge badge-primary">Store Control Center</span>
          <h2 style={{ fontSize: '2rem', marginTop: '8px', fontWeight: 800 }}>Store Inventory & Settings</h2>
        </div>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{ 
              background: activeTab === 'overview' ? 'var(--primary)' : 'transparent',
              border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, transition: 'all 0.2s'
            }}
          >
            <PieChart size={16} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            style={{ 
              background: activeTab === 'inventory' ? 'var(--primary)' : 'transparent',
              border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, transition: 'all 0.2s'
            }}
          >
            <List size={16} /> Products ({products.length})
          </button>
          <button 
            onClick={() => setActiveTab('add')}
            style={{ 
              background: activeTab === 'add' ? 'var(--primary)' : 'transparent',
              border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, transition: 'all 0.2s'
            }}
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Tabs panels */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)', padding: '24px', borderRadius: '16px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Total Catalog Items</span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginTop: '6px' }}>{products.length}</h3>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)', padding: '24px', borderRadius: '16px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Unique Categories</span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#34d399', marginTop: '6px' }}>{categoriesCount}</h3>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)', padding: '24px', borderRadius: '16px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Out Of Stock Items</span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f87171', marginTop: '6px' }}>{outOfStockCount}</h3>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)', padding: '24px', borderRadius: '16px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Sum Value of Single Stock</span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginTop: '6px' }}>₹{totalValuation}</h3>
            </div>
          </div>
          
          {/* Quick instructions / Help */}
          <div style={{ background: 'rgba(14, 165, 233, 0.05)', border: '1px solid var(--primary-glow)', borderRadius: '16px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <ShieldCheck size={40} color="var(--primary)" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontWeight: 700, color: 'white', marginBottom: '4px' }}>Administrative Mode Active</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Any product added, updated, or deleted here updates the website local catalog. Since it uses `localStorage` data management, changes persist on this browser session and won't get cleared on page reload.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Search bar */}
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by product name or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input"
              style={{ paddingLeft: '48px' }}
            />
          </div>

          {/* Table List */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '16px 8px' }}>Product Detail</th>
                  <th style={{ padding: '16px 8px' }}>Category</th>
                  <th style={{ padding: '16px 8px' }}>Price</th>
                  <th style={{ padding: '16px 8px' }}>Stock Availability</th>
                  <th style={{ padding: '16px 8px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => {
                  const isEditing = editingId === p.id;
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', height: '70px' }}>
                      {/* Image + Title */}
                      <td style={{ padding: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={p.image} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                          {isEditing ? (
                            <input 
                              type="text" 
                              value={editFields.name} 
                              onChange={(e) => setEditFields({ ...editFields, name: e.target.value })}
                              className="admin-input"
                              style={{ padding: '6px 12px' }}
                            />
                          ) : (
                            <span style={{ fontWeight: 600, color: 'white' }}>{p.name}</span>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td style={{ padding: '8px' }}>
                        <span className="badge badge-primary">{p.category}</span>
                      </td>

                      {/* Price */}
                      <td style={{ padding: '8px' }}>
                        {isEditing ? (
                          <input 
                            type="number" 
                            value={editFields.price} 
                            onChange={(e) => setEditFields({ ...editFields, price: e.target.value })}
                            className="admin-input"
                            style={{ padding: '6px 12px', width: '90px' }}
                          />
                        ) : (
                          <strong style={{ color: 'var(--primary)' }}>₹{p.price}</strong>
                        )}
                      </td>

                      {/* Stock Switch */}
                      <td style={{ padding: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <label className="switch">
                            <input 
                              type="checkbox" 
                              checked={isEditing ? editFields.stockStatus === 'in' : p.stockStatus !== 'out'}
                              onChange={() => {
                                if (isEditing) {
                                  setEditFields({ ...editFields, stockStatus: editFields.stockStatus === 'in' ? 'out' : 'in' });
                                } else {
                                  handleToggleStock(p.id, p.stockStatus || 'in');
                                }
                              }}
                            />
                            <span className="slider"></span>
                          </label>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: (isEditing ? editFields.stockStatus === 'in' : p.stockStatus !== 'out') ? '#34d399' : '#f87171' }}>
                            {(isEditing ? editFields.stockStatus === 'in' : p.stockStatus !== 'out') ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          {isEditing ? (
                            <>
                              <button onClick={() => handleSaveEdit(p.id)} style={{ padding: '8px', borderRadius: '8px', background: 'var(--secondary)', border: 'none', color: 'white', cursor: 'pointer' }} title="Save">
                                <Save size={16} />
                              </button>
                              <button onClick={() => setEditingId(null)} style={{ padding: '8px', borderRadius: '8px', background: '#374151', border: 'none', color: 'white', cursor: 'pointer' }} title="Cancel">
                                <X size={16} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleStartEdit(p)} style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)', color: 'var(--text-muted)', cursor: 'pointer' }} title="Edit Product">
                                <Edit size={16} />
                              </button>
                              <button onClick={() => onDelete(p.id)} style={{ padding: '8px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', cursor: 'pointer' }} title="Delete Product">
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No products found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {activeTab === 'add' && (
        <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Grid fields */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>Product Title/Name</label>
              <input 
                type="text" 
                placeholder="e.g. Premium Canister Filter" 
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="admin-input"
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>Retail Price (INR ₹)</label>
              <input 
                type="number" 
                placeholder="e.g. 3500" 
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="admin-input"
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>Product Category</label>
              <select 
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="admin-input"
                style={{ background: '#0b1528' }}
              >
                <option value="Fish">Fish (Live)</option>
                <option value="Birds">Birds (Live)</option>
                <option value="Fish Food">Fish Food</option>
                <option value="Accessories">Accessories (Equipment)</option>
                <option value="Pet Supplies">Pet Supplies</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>Google Ratings Preset (1 - 5 stars)</label>
              <input 
                type="number" 
                min="1" 
                max="5"
                value={newProduct.rating}
                onChange={(e) => setNewProduct({...newProduct, rating: e.target.value})}
                className="admin-input"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>Item Description</label>
            <textarea 
              rows="3"
              placeholder="Provide a detailed description of the item, features, and suitability..."
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              className="admin-input"
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Preset Images picker */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: 600 }}>Product Image selection</label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {PRESET_IMAGES.map(img => {
                const isSelected = newProduct.image === img.url;
                return (
                  <button 
                    key={img.name}
                    type="button"
                    onClick={() => setNewProduct({...newProduct, image: img.url})}
                    style={{ 
                      padding: '8px 14px', 
                      borderRadius: '8px', 
                      background: isSelected ? 'rgba(14, 165, 233, 0.15)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '1px solid var(--primary)' : '1px solid var(--surface-border)',
                      color: isSelected ? 'white' : 'var(--text-muted)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {isSelected && <Check size={12} color="var(--primary)" />} {img.name}
                  </button>
                );
              })}
            </div>
            <input 
              type="text" 
              placeholder="Or enter custom Image URL..." 
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              className="admin-input"
            />
          </div>

          {/* Dynamic Specifications depending on Category selection */}
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--surface-border)', padding: '24px', borderRadius: '16px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px', color: 'white' }}>Product Specifications (For {newProduct.category} Category)</h4>
            
            {newProduct.category === 'Fish' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Temperature</label>
                  <input type="text" placeholder="e.g. 24°C - 28°C" value={newProduct.specs.temp} onChange={(e) => setNewProduct({...newProduct, specs: {...newProduct.specs, temp: e.target.value}})} className="admin-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>pH Level</label>
                  <input type="text" placeholder="e.g. 6.5 - 7.5" value={newProduct.specs.ph} onChange={(e) => setNewProduct({...newProduct, specs: {...newProduct.specs, ph: e.target.value}})} className="admin-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Temperament</label>
                  <input type="text" placeholder="e.g. Semi-Aggressive" value={newProduct.specs.temperament} onChange={(e) => setNewProduct({...newProduct, specs: {...newProduct.specs, temperament: e.target.value}})} className="admin-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Min Tank Size</label>
                  <input type="text" placeholder="e.g. 19L (5 Gal)" value={newProduct.specs.minTank} onChange={(e) => setNewProduct({...newProduct, specs: {...newProduct.specs, minTank: e.target.value}})} className="admin-input" />
                </div>
              </div>
            )}

            {newProduct.category === 'Birds' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Average Lifespan</label>
                  <input type="text" placeholder="e.g. 10 - 15 Years" value={newProduct.specs.lifespan} onChange={(e) => setNewProduct({...newProduct, specs: {...newProduct.specs, lifespan: e.target.value}})} className="admin-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Social Nature</label>
                  <input type="text" placeholder="e.g. Must live in pairs" value={newProduct.specs.nature} onChange={(e) => setNewProduct({...newProduct, specs: {...newProduct.specs, nature: e.target.value}})} className="admin-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Min Cage Dimensions</label>
                  <input type="text" placeholder="e.g. 18x18x24 inches" value={newProduct.specs.cageSize} onChange={(e) => setNewProduct({...newProduct, specs: {...newProduct.specs, cageSize: e.target.value}})} className="admin-input" />
                </div>
              </div>
            )}

            {['Fish Food', 'Pet Supplies'].includes(newProduct.category) && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Net Weight</label>
                  <input type="text" placeholder="e.g. 250g" value={newProduct.specs.weight} onChange={(e) => setNewProduct({...newProduct, specs: {...newProduct.specs, weight: e.target.value}})} className="admin-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Form Factor</label>
                  <input type="text" placeholder="e.g. Floating Pellets" value={newProduct.specs.form} onChange={(e) => setNewProduct({...newProduct, specs: {...newProduct.specs, form: e.target.value}})} className="admin-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Nutrition Values</label>
                  <input type="text" placeholder="e.g. 42% Protein" value={newProduct.specs.protein} onChange={(e) => setNewProduct({...newProduct, specs: {...newProduct.specs, protein: e.target.value}})} className="admin-input" />
                </div>
              </div>
            )}

            {newProduct.category === 'Accessories' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Dimensions</label>
                  <input type="text" placeholder="e.g. 20cm x 15cm" value={newProduct.specs.dimensions} onChange={(e) => setNewProduct({...newProduct, specs: {...newProduct.specs, dimensions: e.target.value}})} className="admin-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Power Output</label>
                  <input type="text" placeholder="e.g. 12W" value={newProduct.specs.power} onChange={(e) => setNewProduct({...newProduct, specs: {...newProduct.specs, power: e.target.value}})} className="admin-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Warranty</label>
                  <input type="text" placeholder="e.g. 6 Months" value={newProduct.specs.warranty} onChange={(e) => setNewProduct({...newProduct, specs: {...newProduct.specs, warranty: e.target.value}})} className="admin-input" />
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '14px 40px' }}>
              <Plus size={18} /> Register Product
            </button>
            <button type="button" className="btn btn-outline" onClick={() => setActiveTab('inventory')}>
              Cancel
            </button>
          </div>
        </form>
      )}

    </div>
  );
};

export default AdminPanel;
