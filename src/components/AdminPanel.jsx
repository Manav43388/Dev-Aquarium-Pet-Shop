import React, { useState } from 'react';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

const AdminPanel = ({ products, onAdd, onDelete, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', rating: 5, image: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...newProduct, id: Date.now() });
    setNewProduct({ name: '', price: '', category: '', rating: 5, image: '' });
    setIsAdding(false);
  };

  return (
    <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', marginTop: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2>Product Management Panel</h2>
        <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
          <Plus size={20} /> Add New Product
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="card" style={{ marginBottom: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <input 
            type="text" 
            placeholder="Product Name" 
            className="glass" 
            style={{ padding: '12px', borderRadius: '8px' }}
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            required
          />
          <input 
            type="number" 
            placeholder="Price (₹)" 
            className="glass" 
            style={{ padding: '12px', borderRadius: '8px' }}
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            required
          />
          <select 
            className="glass" 
            style={{ padding: '12px', borderRadius: '8px' }}
            value={newProduct.category}
            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            required
          >
            <option value="">Select Category</option>
            <option value="Fish">Fish</option>
            <option value="Fish Food">Fish Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Pet Supplies">Pet Supplies</option>
          </select>
          <input 
            type="text" 
            placeholder="Image URL" 
            className="glass" 
            style={{ padding: '12px', borderRadius: '8px' }}
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
          />
          <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary">Save Product</button>
            <button type="button" className="btn btn-outline" onClick={() => setIsAdding(false)}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '16px' }}>Product</th>
              <th style={{ padding: '16px' }}>Category</th>
              <th style={{ padding: '16px' }}>Price</th>
              <th style={{ padding: '16px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={product.image} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                  {product.name}
                </td>
                <td style={{ padding: '16px' }}>{product.category}</td>
                <td style={{ padding: '16px' }}>₹{product.price}</td>
                <td style={{ padding: '16px' }}>
                  <button style={{ color: '#EF4444', background: 'none', border: 'none' }} onClick={() => onDelete(product.id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
