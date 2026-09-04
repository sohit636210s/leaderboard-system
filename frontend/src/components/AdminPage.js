import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import shoppingCatalog from '../shoppingCatalog';
import API_BASE_URL from '../api';

const PRODUCT_KEY = 'kaamwallah_shopping_products';
const ADMIN_KEY = 'kaamwallah_admin_session';
const emptyProduct = { name: '', category: 'Bedroom', price: '', image: '', description: '', published: true };

function loadProducts() {
  try {
    const products = JSON.parse(localStorage.getItem(PRODUCT_KEY));
    return Array.isArray(products) ? products : shoppingCatalog;
  } catch (error) {
    return shoppingCatalog;
  }
}

function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem(ADMIN_KEY) === 'true');
  const [credentials, setCredentials] = useState({ userId: '', password: '' });
  const [products, setProducts] = useState(loadProducts);
  const [product, setProduct] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const [notice, setNotice] = useState('');
  const [bookingError, setBookingError] = useState('');

  const persistProducts = nextProducts => {
    setProducts(nextProducts);
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(nextProducts));
  };

  const handleLogin = event => {
    event.preventDefault();
    if (!credentials.userId.trim() || !credentials.password.trim()) {
      setNotice('Please enter both User ID and Password.');
      return;
    }
    sessionStorage.setItem(ADMIN_KEY, 'true');
    setLoggedIn(true);
    setNotice('Welcome to your admin dashboard.');
  };

  const handleProductSubmit = event => {
    event.preventDefault();
    const nextProduct = { ...product, id: editingId || `product-${Date.now()}`, price: Number(product.price), published: product.published !== false };
    persistProducts(editingId ? products.map(item => item.id === editingId ? nextProduct : item) : [nextProduct, ...products]);
    setProduct(emptyProduct);
    setEditingId(null);
    setNotice(editingId ? 'Product updated successfully.' : 'Product added successfully.');
  };

  const editProduct = item => {
    setEditingId(item.id);
    setProduct({ ...item, price: String(item.price) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadBookings = async () => {
    setShowBookings(true);
    setBookingError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings/list`);
      setBookings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setBookingError('Bookings could not be loaded. Please check the backend connection.');
    }
  };

  if (!loggedIn) {
    return <main className="admin-page admin-login-page"><section className="admin-login-box"><div className="admin-brand-mark"><i className="bi bi-grid-1x2-fill"></i></div><p className="admin-kicker">FURNITURE KAAM WALLAH / CONTROL ROOM</p><h1>Welcome to your <span>admin panel.</span></h1><p>Manage your shopping products and customer bookings from one simple workspace.</p><form onSubmit={handleLogin}><label>User ID<input value={credentials.userId} onChange={event => setCredentials({ ...credentials, userId: event.target.value })} placeholder="Enter user ID" /></label><label>Password<input type="password" value={credentials.password} onChange={event => setCredentials({ ...credentials, password: event.target.value })} placeholder="Enter password" /></label><button type="submit" className="admin-primary"><i className="bi bi-arrow-right-circle"></i> Enter Admin Panel</button></form>{notice && <div className="admin-message error">{notice}</div>}<Link className="admin-back-link" to="/shopping"><i className="bi bi-arrow-left"></i> Back to shopping</Link></section></main>;
  }

  const publishedCount = products.filter(item => item.published !== false).length;
  return <main className="admin-page"><div className="admin-container"><header className="admin-topbar"><Link to="/" className="admin-logo"><span><i className="bi bi-hammer"></i></span> Furniture Kaam Wallah <small>ADMIN</small></Link><div className="admin-top-actions"><Link to="/shopping" className="admin-outline"><i className="bi bi-shop"></i> View shop</Link><button type="button" className="admin-outline" onClick={() => { sessionStorage.removeItem(ADMIN_KEY); setLoggedIn(false); }}>Sign out</button></div></header><section className="admin-welcome"><div><p className="admin-kicker">OVERVIEW / TODAY</p><h1>Good work starts here.</h1><p>Manage your furniture catalog and stay close to every customer booking.</p></div><button type="button" className="admin-primary admin-bookings-button" onClick={loadBookings}><i className="bi bi-journal-check"></i> View booking list</button></section>{notice && <div className="admin-message success"><i className="bi bi-check-circle"></i>{notice}</div>}<section className="admin-stat-grid"><article><i className="bi bi-box-seam"></i><span>Total products</span><strong>{products.length}</strong></article><article><i className="bi bi-eye"></i><span>Published products</span><strong>{publishedCount}</strong></article><article><i className="bi bi-calendar2-check"></i><span>Customer bookings</span><strong>{bookings.length}</strong></article><article><i className="bi bi-telephone"></i><span>Support line</span><strong>24 hrs</strong></article></section><div className="admin-layout"><section className="admin-form-panel"><div className="admin-panel-title"><div><p className="admin-kicker">CATALOG MANAGER</p><h2>{editingId ? 'Edit product' : 'Add new product'}</h2></div>{editingId && <button type="button" className="admin-cancel" onClick={() => { setEditingId(null); setProduct(emptyProduct); }}>Cancel</button>}</div><form onSubmit={handleProductSubmit}><label>Product title<input value={product.name} onChange={event => setProduct({ ...product, name: event.target.value })} placeholder="Ready-Made Palang" required /></label><div className="admin-form-row"><label>Category<select value={product.category} onChange={event => setProduct({ ...product, category: event.target.value })}><option>Bedroom</option><option>Living Room</option><option>Dining</option><option>Kitchen</option><option>UPVC Furniture</option><option>Wardrobe</option><option>Other</option></select></label><label>Price (INR)<input type="number" min="0" value={product.price} onChange={event => setProduct({ ...product, price: event.target.value })} placeholder="14999" required /></label></div><label>Image URL<input value={product.image} onChange={event => setProduct({ ...product, image: event.target.value })} placeholder="https://... or /images/product.jpg" required /></label><label>Description<textarea value={product.description} onChange={event => setProduct({ ...product, description: event.target.value })} placeholder="Short product description" rows="3" required /></label><label className="admin-checkbox"><input type="checkbox" checked={product.published !== false} onChange={event => setProduct({ ...product, published: event.target.checked })} /> Publish on shopping page</label><button type="submit" className="admin-primary"><i className={editingId ? 'bi bi-save' : 'bi bi-plus-lg'}></i> {editingId ? 'Save product' : 'Add product'}</button></form></section><section className="admin-list-panel"><div className="admin-panel-title"><div><p className="admin-kicker">INVENTORY</p><h2>Your products</h2></div><span className="admin-storage">Saved in this browser</span></div><div className="admin-product-list">{products.map(item => <article className={`admin-product-row ${item.published === false ? 'unpublished' : ''}`} key={item.id}><img src={item.image} alt="" /><div className="admin-product-info"><h3>{item.name}</h3><p>{item.category} · ₹{Number(item.price).toLocaleString('en-IN')}</p><span>{item.published === false ? 'Hidden' : 'Live in shopping'}</span></div><div className="admin-row-actions"><button type="button" onClick={() => persistProducts(products.map(entry => entry.id === item.id ? { ...entry, published: !entry.published } : entry))} title="Publish or hide"><i className={item.published === false ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></button><button type="button" onClick={() => editProduct(item)} title="Edit"><i className="bi bi-pencil"></i></button><button type="button" onClick={() => persistProducts(products.filter(entry => entry.id !== item.id))} title="Delete"><i className="bi bi-trash"></i></button></div></article>)}</div></section></div>{showBookings && <section className="admin-bookings-panel"><div className="admin-panel-title"><div><p className="admin-kicker">CUSTOMER ACTIVITY</p><h2>Booking list</h2></div><button type="button" className="admin-cancel" onClick={() => setShowBookings(false)}>Close</button></div>{bookingError && <div className="admin-message error">{bookingError}</div>}<div className="admin-booking-table">{bookings.length ? bookings.map((booking, index) => <article key={booking._id || index}><div className="booking-number">{String(index + 1).padStart(2, '0')}</div><div><strong>{booking.customerName}</strong><span>{booking.jobDescription}</span></div><div><strong>{booking.contact}</strong><span>{booking.address} · {booking.pincode}</span></div><span className={booking.matchedWorker ? 'booking-status assigned' : 'booking-status'}>{booking.matchedWorker ? `Assigned: ${booking.matchedWorker.name}` : 'Awaiting carpenter'}</span></article>) : !bookingError && <div className="admin-no-bookings"><i className="bi bi-inbox"></i><p>No bookings found yet.</p></div>}</div></section>}<p className="admin-future-note"><i className="bi bi-info-circle"></i> Temporary admin mode: product data is stored in this browser. Backend authentication and product storage can be connected later.</p></div></main>;
}

export default AdminPage;
