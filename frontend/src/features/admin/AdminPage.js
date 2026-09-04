import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import shoppingCatalog from '../shopping/shoppingCatalog';
import API_BASE_URL from '../../api';

const PRODUCT_KEY = 'kaamwallah_shopping_products';
const ADMIN_KEY = 'kaamwallah_admin_session';
const emptyProduct = { name: '', category: 'Bedroom', price: '', stock: 1, available: true, image: '', description: '', published: true };

function loadProducts() {
  try {
    const products = JSON.parse(localStorage.getItem(PRODUCT_KEY));
    const catalog = Array.isArray(products) ? products : shoppingCatalog;
    return catalog.map(product => ({ ...product, stock: product.stock ?? 10, available: product.available !== false }));
  } catch (error) {
    return shoppingCatalog.map(product => ({ ...product, stock: product.stock ?? 10, available: true }));
  }
}

function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem(ADMIN_KEY) === 'true');
  const [selectedModule, setSelectedModule] = useState(() => sessionStorage.getItem('kaamwallah_admin_module') || (sessionStorage.getItem(ADMIN_KEY) === 'true' ? 'shopping' : ''));
  const [credentials, setCredentials] = useState({ userId: '', password: '' });
  const [products, setProducts] = useState(loadProducts);
  const [product, setProduct] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const [notice, setNotice] = useState('');
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    document.body.classList.toggle('admin-shopping-mode', selectedModule === 'shopping' && loggedIn);
    return () => document.body.classList.remove('admin-shopping-mode');
  }, [selectedModule, loggedIn]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/products?admin=true`)
      .then(async response => {
        if (response.data.length > 0) {
          setProducts(response.data);
          return;
        }

        const localProducts = loadProducts();
        const migratedProducts = await Promise.all(localProducts.map(localProduct => {
          const productData = { ...localProduct };
          delete productData.id;
          delete productData._id;
          return axios.post(`${API_BASE_URL}/api/products`, productData).then(result => result.data);
        }));
        setProducts(migratedProducts);
        localStorage.setItem(PRODUCT_KEY, JSON.stringify(migratedProducts));
        setNotice(migratedProducts.length ? 'Your local products were synced to the shared catalog.' : 'Shared catalog is ready.');
      })
      .catch(() => setNotice('Could not load shared products. Local products are shown.'));
  }, []);

  const persistProducts = nextProducts => {
    setProducts(nextProducts);
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(nextProducts));
    Promise.all(nextProducts.filter(product => product._id).map(product => axios.put(`${API_BASE_URL}/api/products/${product._id}`, product)))
      .catch(() => setNotice('Shared product storage is unavailable.'));
    axios.get(`${API_BASE_URL}/api/products?admin=true`)
      .then(response => Promise.all(response.data
        .filter(serverProduct => !nextProducts.some(localProduct => localProduct.id === serverProduct._id))
        .map(serverProduct => axios.delete(`${API_BASE_URL}/api/products/${serverProduct._id}`))))
      .catch(() => setNotice('Shared product storage is unavailable.'));
  };

  const handleLogin = event => {
    event.preventDefault();
    if (!credentials.userId.trim() || !credentials.password.trim()) {
      setNotice('Please enter both User ID and Password.');
      return;
    }
    sessionStorage.setItem(ADMIN_KEY, 'true');
    sessionStorage.setItem('kaamwallah_admin_module', selectedModule);
    setLoggedIn(true);
    if (selectedModule === 'bookings') {
      setShowBookings(true);
      axios.get(`${API_BASE_URL}/api/bookings/list`)
        .then(response => setBookings(Array.isArray(response.data) ? response.data : []))
        .catch(() => setBookingError('Bookings could not be loaded. Please check the backend connection.'));
    }
    setNotice('Welcome to your admin dashboard.');
  };

  if (!selectedModule && !loggedIn) {
    return <main className="admin-page admin-module-page"><section className="admin-module-box"><div className="admin-brand-mark"><i className="bi bi-grid-1x2-fill"></i></div><p className="admin-kicker">FURNITURE KAAM WALLAH / CONTROL ROOM</p><h1>Choose your <span>workspace.</span></h1><p>Open one admin area at a time to keep your work simple and focused.</p><div className="admin-module-grid"><button type="button" onClick={() => setSelectedModule('shopping')}><i className="bi bi-shop"></i><strong>Shopping Admin</strong><span>Add products, update prices, stock and availability.</span><b>Open workspace <i className="bi bi-arrow-right"></i></b></button><button type="button" onClick={() => setSelectedModule('bookings')}><i className="bi bi-journal-check"></i><strong>Work Booking Admin</strong><span>View customer requests and assigned carpenters.</span><b>Open workspace <i className="bi bi-arrow-right"></i></b></button></div><Link className="admin-back-link" to="/"><i className="bi bi-arrow-left"></i> Back to website</Link></section></main>;
  }

  const handleProductSubmit = async event => {
    event.preventDefault();
    const stock = Math.max(0, Number(product.stock));
    const nextProduct = { ...product, id: editingId || `product-${Date.now()}`, price: Number(product.price), stock, available: product.available !== false && stock > 0, published: product.published !== false };
    try {
      const response = editingId
        ? await axios.put(`${API_BASE_URL}/api/products/${editingId}`, nextProduct)
        : await axios.post(`${API_BASE_URL}/api/products`, nextProduct);
      const nextProducts = editingId ? products.map(item => item.id === editingId ? response.data : item) : [response.data, ...products];
      persistProducts(nextProducts);
      setProduct(emptyProduct);
      setEditingId(null);
      setNotice(editingId ? 'Product updated successfully.' : 'Product added successfully on all devices.');
    } catch (error) {
      setNotice(error.response?.data?.error || 'Product could not be saved. Please check the backend.');
    }
  };

  const editProduct = item => {
    setEditingId(item.id);
    setProduct({ ...item, price: String(item.price), stock: item.stock ?? 0, available: item.available !== false && (item.stock ?? 0) > 0 });
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

  if (loggedIn && selectedModule === 'bookings') {
    return <main className="admin-page admin-booking-only"><div className="admin-container"><header className="admin-topbar"><Link to="/" className="admin-logo"><span><i className="bi bi-hammer"></i></span> Furniture Kaam Wallah <small>BOOKING ADMIN</small></Link><div className="admin-top-actions"><button type="button" className="admin-outline" onClick={() => { sessionStorage.removeItem(ADMIN_KEY); sessionStorage.removeItem('kaamwallah_admin_module'); setLoggedIn(false); setSelectedModule(''); }}>Sign out</button></div></header><section className="admin-welcome"><div><p className="admin-kicker">WORK BOOKING ADMIN</p><h1>Customer bookings.</h1><p>Review every furniture request and the carpenter matched to it.</p></div><button type="button" className="admin-primary admin-bookings-button" onClick={loadBookings}><i className="bi bi-arrow-clockwise"></i> Refresh bookings</button></section>{bookingError && <div className="admin-message error">{bookingError}</div>}<section className="admin-bookings-panel"><div className="admin-panel-title"><div><p className="admin-kicker">CUSTOMER ACTIVITY</p><h2>{bookings.length} booking{bookings.length === 1 ? '' : 's'}</h2></div><Link to="/" className="admin-cancel">Website</Link></div><div className="admin-booking-table">{bookings.length ? bookings.map((booking, index) => <article key={booking._id || index}><div className="booking-number">{String(index + 1).padStart(2, '0')}</div><div><strong>{booking.customerName}</strong><span>{booking.jobDescription}</span></div><div><strong>{booking.contact}</strong><span>{booking.address} · {booking.pincode}</span></div><span className={booking.matchedWorker ? 'booking-status assigned' : 'booking-status'}>{booking.matchedWorker ? `Assigned: ${booking.matchedWorker.name}` : 'Awaiting carpenter'}</span></article>) : <div className="admin-no-bookings"><i className="bi bi-inbox"></i><p>No bookings found yet.</p><button type="button" className="admin-primary" onClick={loadBookings}>Load bookings</button></div>}</div></section></div></main>;
  }

  if (!loggedIn) {
    return <main className="admin-page admin-login-page"><section className="admin-login-box"><button type="button" className="admin-switch-module" onClick={() => setSelectedModule('')}><i className="bi bi-arrow-left"></i> Choose another workspace</button><p className="admin-kicker">FURNITURE KAAM WALLAH / {selectedModule === 'shopping' ? 'SHOPPING ADMIN' : 'WORK BOOKING ADMIN'}</p><h1>Admin <span>sign in.</span></h1><p>Enter any user ID and password for this temporary frontend-only panel.</p><form onSubmit={handleLogin}><label>User ID<input value={credentials.userId} onChange={event => setCredentials({ ...credentials, userId: event.target.value })} placeholder="Enter user ID" /></label><label>Password<input type="password" value={credentials.password} onChange={event => setCredentials({ ...credentials, password: event.target.value })} placeholder="Enter password" /></label><button type="submit" className="admin-primary"><i className="bi bi-arrow-right-circle"></i> Enter {selectedModule === 'shopping' ? 'Shopping' : 'Booking'} Admin</button></form>{notice && <div className="admin-message error">{notice}</div>}</section></main>;
  }

  const publishedCount = products.filter(item => item.published !== false).length;
  const availableCount = products.filter(item => item.available !== false && (item.stock ?? 0) > 0).length;
  return <main className="admin-page"><div className="admin-container"><header className="admin-topbar"><Link to="/" className="admin-logo"><span><i className="bi bi-hammer"></i></span> Furniture Kaam Wallah <small>ADMIN</small></Link><div className="admin-top-actions"><Link to="/shopping" className="admin-outline"><i className="bi bi-shop"></i> View shop</Link><button type="button" className="admin-outline" onClick={() => { sessionStorage.removeItem(ADMIN_KEY); setLoggedIn(false); }}>Sign out</button></div></header><section className="admin-welcome"><div><p className="admin-kicker">OVERVIEW / TODAY</p><h1>Good work starts here.</h1><p>Manage your furniture catalog and stay close to every customer booking.</p></div><button type="button" className="admin-primary admin-bookings-button" onClick={loadBookings}><i className="bi bi-journal-check"></i> View booking list</button></section>{notice && <div className="admin-message success"><i className="bi bi-check-circle"></i>{notice}</div>}<section className="admin-stat-grid"><article><i className="bi bi-box-seam"></i><span>Total products</span><strong>{products.length}</strong></article><article><i className="bi bi-eye"></i><span>Published products</span><strong>{publishedCount}</strong></article><article><i className="bi bi-boxes"></i><span>Available products</span><strong>{availableCount}</strong></article><article><i className="bi bi-calendar2-check"></i><span>Customer bookings</span><strong>{bookings.length}</strong></article></section><div className="admin-layout"><section className="admin-form-panel"><div className="admin-panel-title"><div><p className="admin-kicker">CATALOG MANAGER</p><h2>{editingId ? 'Edit product' : 'Add new product'}</h2></div>{editingId && <button type="button" className="admin-cancel" onClick={() => { setEditingId(null); setProduct(emptyProduct); }}>Cancel</button>}</div><form onSubmit={handleProductSubmit}><label>Product title<input value={product.name} onChange={event => setProduct({ ...product, name: event.target.value })} placeholder="Ready-Made Palang" required /></label><div className="admin-form-row"><label>Category<select value={product.category} onChange={event => setProduct({ ...product, category: event.target.value })}><option>Bedroom</option><option>Living Room</option><option>Dining</option><option>Kitchen</option><option>UPVC Furniture</option><option>Wardrobe</option><option>Other</option></select></label><label>Price (INR)<input type="number" min="0" value={product.price} onChange={event => setProduct({ ...product, price: event.target.value })} placeholder="14999" required /></label></div><label>Products left<input type="number" min="0" value={product.stock} onChange={event => setProduct({ ...product, stock: event.target.value })} required /></label><label className="admin-checkbox"><input type="checkbox" checked={product.available !== false} onChange={event => setProduct({ ...product, available: event.target.checked })} /> Product is available</label><label>Image URL<input value={product.image} onChange={event => setProduct({ ...product, image: event.target.value })} placeholder="https://... or /images/product.jpg" required /></label><label>Description<textarea value={product.description} onChange={event => setProduct({ ...product, description: event.target.value })} placeholder="Short product description" rows="3" required /></label><label className="admin-checkbox"><input type="checkbox" checked={product.published !== false} onChange={event => setProduct({ ...product, published: event.target.checked })} /> Publish on shopping page</label><button type="submit" className="admin-primary"><i className={editingId ? 'bi bi-save' : 'bi bi-plus-lg'}></i> {editingId ? 'Save product' : 'Add product'}</button></form></section><section className="admin-list-panel"><div className="admin-panel-title"><div><p className="admin-kicker">INVENTORY</p><h2>Your products</h2></div><span className="admin-storage">Saved in this browser</span></div><div className="admin-product-list">{products.map(item => <article className={`admin-product-row ${item.published === false ? 'unpublished' : ''}`} key={item.id}><img src={item.image} alt="" /><div className="admin-product-info"><h3>{item.name}</h3><p>{item.category} · ₹{Number(item.price).toLocaleString('en-IN')}</p><span className={item.available === false || (item.stock ?? 0) < 1 ? 'stock-out' : 'stock-live'}>{item.available === false || (item.stock ?? 0) < 1 ? 'Out of stock' : `${item.stock} left · Available`}</span></div><div className="admin-row-actions"><button type="button" onClick={() => persistProducts(products.map(entry => entry.id === item.id ? { ...entry, available: !(entry.available !== false && (entry.stock ?? 0) > 0) } : entry))} title="Change availability"><i className={item.available === false || (item.stock ?? 0) < 1 ? 'bi bi-toggle-off' : 'bi bi-toggle-on'}></i></button><button type="button" onClick={() => editProduct(item)} title="Edit"><i className="bi bi-pencil"></i></button><button type="button" onClick={() => persistProducts(products.filter(entry => entry.id !== item.id))} title="Delete"><i className="bi bi-trash"></i></button></div></article>)}</div></section></div>{showBookings && <section className="admin-bookings-panel"><div className="admin-panel-title"><div><p className="admin-kicker">CUSTOMER ACTIVITY</p><h2>Booking list</h2></div><button type="button" className="admin-cancel" onClick={() => setShowBookings(false)}>Close</button></div>{bookingError && <div className="admin-message error">{bookingError}</div>}<div className="admin-booking-table">{bookings.length ? bookings.map((booking, index) => <article key={booking._id || index}><div className="booking-number">{String(index + 1).padStart(2, '0')}</div><div><strong>{booking.customerName}</strong><span>{booking.jobDescription}</span></div><div><strong>{booking.contact}</strong><span>{booking.address} · {booking.pincode}</span></div><span className={booking.matchedWorker ? 'booking-status assigned' : 'booking-status'}>{booking.matchedWorker ? `Assigned: ${booking.matchedWorker.name}` : 'Awaiting carpenter'}</span></article>) : !bookingError && <div className="admin-no-bookings"><i className="bi bi-inbox"></i><p>No bookings found yet.</p></div>}</div></section>}<p className="admin-future-note"><i className="bi bi-info-circle"></i> Temporary admin mode: product data is stored in this browser. Backend authentication and product storage can be connected later.</p></div></main>;
}

export default AdminPage;
