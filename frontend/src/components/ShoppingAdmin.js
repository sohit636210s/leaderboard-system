import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shoppingCatalog from '../shoppingCatalog';

const STORAGE_KEY = 'kaamwallah_shopping_products';
const blankProduct = { name: '', category: 'Bedroom', price: '', image: '', description: '', published: true };

function readProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : shoppingCatalog;
  } catch (error) {
    return shoppingCatalog;
  }
}

function ShoppingAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ userId: '', password: '' });
  const [products, setProducts] = useState(readProducts);
  const [form, setForm] = useState(blankProduct);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const saveProducts = nextProducts => {
    setProducts(nextProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
  };

  const handleLogin = event => {
    event.preventDefault();
    if (!credentials.userId.trim() || !credentials.password.trim()) {
      setMessage('Please enter a user ID and password.');
      return;
    }
    setIsAuthenticated(true);
    setMessage('Admin panel is ready.');
  };

  const handleChange = event => setForm(previous => ({ ...previous, [event.target.name]: event.target.value }));

  const handleSubmit = event => {
    event.preventDefault();
    const product = {
      ...form,
      id: editingId || `product-${Date.now()}`,
      price: Number(form.price),
      published: form.published !== false
    };
    const nextProducts = editingId ? products.map(item => item.id === editingId ? product : item) : [product, ...products];
    saveProducts(nextProducts);
    setForm(blankProduct);
    setEditingId(null);
    setMessage(editingId ? 'Product updated successfully.' : 'Product added successfully.');
  };

  const editProduct = product => {
    setEditingId(product.id);
    setForm({ ...product, price: String(product.price) });
    setMessage('Editing product details.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteProduct = id => {
    if (!window.confirm('Delete this product from the shopping page?')) return;
    saveProducts(products.filter(product => product.id !== id));
    setMessage('Product deleted.');
  };

  const togglePublished = product => saveProducts(products.map(item => item.id === product.id ? { ...item, published: !item.published } : item));

  if (!isAuthenticated) {
    return <main className="admin-page admin-login-page"><div className="admin-login-box"><p className="admin-kicker">FURNITURE KAAM WALLAH / ADMIN</p><h1>Manage your <span>shopping catalog.</span></h1><p>Enter any user ID and password for this temporary frontend-only admin panel.</p><form onSubmit={handleLogin}><label>User ID<input value={credentials.userId} onChange={event => setCredentials(previous => ({ ...previous, userId: event.target.value }))} placeholder="Enter user ID" /></label><label>Password<input type="password" value={credentials.password} onChange={event => setCredentials(previous => ({ ...previous, password: event.target.value }))} placeholder="Enter password" /></label><button className="admin-primary" type="submit"><i className="bi bi-box-arrow-in-right"></i> Open Admin Panel</button></form>{message && <div className="admin-message error">{message}</div>}<Link className="admin-back-link" to="/shopping">Back to shopping</Link></div></main>;
  }

  return <main className="admin-page"><div className="admin-container"><header className="admin-header"><div><p className="admin-kicker">FURNITURE KAAM WALLAH / ADMIN</p><h1>Shopping catalog</h1><p>Add beds, chairs, tables, kitchens and UPVC furniture for your customers.</p></div><div className="admin-header-actions"><Link to="/shopping" className="admin-outline"><i className="bi bi-shop"></i> View shop</Link><button type="button" className="admin-outline" onClick={() => setIsAuthenticated(false)}><i className="bi bi-box-arrow-right"></i> Sign out</button></div></header>{message && <div className="admin-message success"><i className="bi bi-check-circle"></i>{message}</div>}<div className="admin-layout"><section className="admin-form-panel"><div className="admin-panel-title"><div><p className="admin-kicker">PRODUCT DETAILS</p><h2>{editingId ? 'Edit product' : 'Add new product'}</h2></div>{editingId && <button type="button" className="admin-cancel" onClick={() => { setEditingId(null); setForm(blankProduct); }}>Cancel</button>}</div><form onSubmit={handleSubmit}><label>Product title<input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ready-Made Palang" required /></label><label>Category<select name="category" value={form.category} onChange={handleChange}><option>Bedroom</option><option>Living Room</option><option>Dining</option><option>Kitchen</option><option>UPVC Furniture</option><option>Wardrobe</option><option>Other</option></select></label><label>Price in rupees<input name="price" type="number" min="0" value={form.price} onChange={handleChange} placeholder="14999" required /></label><label>Image URL<input name="image" value={form.image} onChange={handleChange} placeholder="https://... or /images/product.jpg" required /></label><label>Description<textarea name="description" value={form.description} onChange={handleChange} placeholder="Short product description" rows="4" required /></label><label className="admin-checkbox"><input name="published" type="checkbox" checked={form.published !== false} onChange={event => setForm(previous => ({ ...previous, published: event.target.checked }))} /> Show this product on the shopping page</label><button className="admin-primary" type="submit"><i className={editingId ? 'bi bi-save' : 'bi bi-plus-lg'}></i> {editingId ? 'Save changes' : 'Add product'}</button></form></section><section className="admin-list-panel"><div className="admin-panel-title"><div><p className="admin-kicker">CATALOG INVENTORY</p><h2>{products.length} products</h2></div><span className="admin-storage"><i className="bi bi-hdd"></i> Saved locally</span></div><div className="admin-product-list">{products.map(product => <article className={`admin-product-row ${product.published ? '' : 'unpublished'}`} key={product.id}><img src={product.image} alt="" /><div className="admin-product-info"><h3>{product.name}</h3><p>{product.category} · ₹{product.price.toLocaleString('en-IN')}</p><span>{product.published ? 'Published on shopping page' : 'Hidden from shopping page'}</span></div><div className="admin-row-actions"><button type="button" onClick={() => togglePublished(product)} title={product.published ? 'Hide product' : 'Publish product'}><i className={product.published ? 'bi bi-eye' : 'bi bi-eye-slash'}></i></button><button type="button" onClick={() => editProduct(product)} title="Edit product"><i className="bi bi-pencil"></i></button><button type="button" onClick={() => deleteProduct(product.id)} title="Delete product"><i className="bi bi-trash"></i></button></div></article>)}</div></section></div><p className="admin-future-note"><i className="bi bi-info-circle"></i> Temporary mode: products are stored in this browser. A future backend can use the same product fields and replace the local save function.</p></div></main>;
}

export default ShoppingAdmin;
