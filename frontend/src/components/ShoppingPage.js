import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import shoppingCatalog from '../shoppingCatalog';
import API_BASE_URL from '../api';

const STORAGE_KEY = 'kaamwallah_shopping_products';

function readProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const products = Array.isArray(saved) ? saved : shoppingCatalog;
    return products.map(product => ({ ...product, stock: product.stock ?? 10, available: product.available !== false }));
  } catch (error) {
    return shoppingCatalog.map(product => ({ ...product, stock: product.stock ?? 10, available: true }));
  }
}

function ShoppingPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState(readProducts);
  const [catalogLoading, setCatalogLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/products`)
      .then(response => setProducts(response.data))
      .catch(() => setProducts(readProducts()))
      .finally(() => setCatalogLoading(false));
  }, []);

  useEffect(() => {
    const originalTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const originalDescription = description?.getAttribute('content');
    document.title = 'Furniture Shopping India | Beds, Tables, Chairs & UPVC Furniture | Kaam Wallah';
    description?.setAttribute('content', 'Shop ready-made beds, palang, chairs, tables, bedroom furniture, kitchen units and UPVC cupboards from Furniture Kaam Wallah. Call 63621074008 for custom furniture work.');

    return () => {
      document.title = originalTitle;
      if (description && originalDescription) description.setAttribute('content', originalDescription);
    };
  }, []);

  const publishedProducts = useMemo(() => products.filter(product => product.published !== false), [products]);
  const categories = ['All', ...new Set(publishedProducts.map(product => product.category))];
  const filteredProducts = useMemo(() => publishedProducts.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const searchText = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return matchesCategory && searchText.includes(search.toLowerCase());
  }), [activeCategory, search, publishedProducts]);

  const addToCart = product => {
    if (product.available === false || (product.stock ?? 0) < 1) return;
    setCart(previous => {
      const existing = previous.find(item => item.id === product.id);
      if (existing && existing.quantity >= (product.stock ?? 0)) return previous;
      if (existing) return previous.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...previous, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (id, amount) => {
    setCart(previous => previous
      .map(item => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter(item => item.quantity > 0));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const formatPrice = price => `₹${price.toLocaleString('en-IN')}`;

  return (
    <main className="shopping-page">
      {catalogLoading && <div className="shopping-loading">Loading furniture catalog...</div>}
      <section className="shopping-hero">
        <div className="shopping-container">
          <div className="shopping-breadcrumb"><Link to="/">Furniture Kaam Wallah</Link><span>/</span> Shopping</div>
          <div className="shopping-hero-content">
            <div>
              <p className="shopping-kicker"><i className="bi bi-stars"></i> FURNITURE KAAM WALLAH SHOPPING</p>
              <h1>Furniture that fits <span>your everyday.</span></h1>
              <p>Ready-made beds, chairs, tables, UPVC cupboards and kitchen furniture, selected for your home.</p>
            </div>
            <div className="shopping-support"><i className="bi bi-headset"></i><span>Need a custom size?<strong>Call 63621074008</strong></span></div>
          </div>
          <div className="shopping-search-wrap"><i className="bi bi-search"></i><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search beds, chairs, tables, UPVC cupboards..." aria-label="Search products" /><button type="button" onClick={() => setCartOpen(true)}><i className="bi bi-bag"></i><span>Cart</span><b>{cartCount}</b></button></div>
        </div>
      </section>

      <section className="shopping-container shopping-content">
        <div className="shopping-toolbar"><div className="shopping-categories">{categories.map(category => <button type="button" key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><span>{filteredProducts.length} products</span></div>
        <div className="shopping-grid">
          {filteredProducts.map(product => { const isAvailable = product.available !== false && (product.stock ?? 0) > 0; return <article className="product-card" key={product.id}><div className="product-image-wrap"><img src={product.image} alt={product.name} /><span>{product.category}</span></div><div className="product-card-body"><h2>{product.name}</h2><p>{product.description}</p><div className="product-stock">{isAvailable ? (product.stock <= 3 ? `Only ${product.stock} left` : 'In stock') : 'Out of stock'}</div><div className="product-buy"><strong>{formatPrice(product.price)}</strong><button type="button" disabled={!isAvailable} onClick={() => addToCart(product)}><i className="bi bi-plus-lg"></i> {isAvailable ? 'Add to cart' : 'Unavailable'}</button></div></div></article>; })}
        </div>
        {filteredProducts.length === 0 && <div className="shopping-empty"><i className="bi bi-search"></i><h2>No furniture found</h2><p>Try another product or category.</p></div>}
      </section>

      {cartOpen && <div className="cart-backdrop" onClick={() => setCartOpen(false)}></div>}
      <aside className={`cart-drawer ${cartOpen ? 'open' : ''}`} aria-label="Shopping cart"><div className="cart-heading"><div><p>YOUR CART</p><h2>Ready to order?</h2></div><button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart"><i className="bi bi-x-lg"></i></button></div>{cart.length === 0 ? <div className="cart-empty"><i className="bi bi-bag"></i><p>Your cart is empty.</p><span>Add a piece you love to get started.</span></div> : <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><span>{formatPrice(item.price)}</span><div className="quantity"><button type="button" onClick={() => changeQuantity(item.id, -1)}>-</button><b>{item.quantity}</b><button type="button" onClick={() => changeQuantity(item.id, 1)}>+</button></div></div></div>)}</div><div className="cart-total"><span>Total</span><strong>{formatPrice(cartTotal)}</strong></div><a href="tel:63621074008" className="cart-order"><i className="bi bi-telephone"></i> Call to order</a></>}</aside>
    </main>
  );
}

export default ShoppingPage;
