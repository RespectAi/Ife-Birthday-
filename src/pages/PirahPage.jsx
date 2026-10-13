import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWhatsAppInquiryUrl } from '../config/business';
import { CATEGORIES, PRODUCTS } from '../data/products';
import '../styles/pirah-store.css';

export default function PirahPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Set page title for Pirah Storefront
  useEffect(() => {
    document.title = 'Pirah Store — Premium Style. Quality Wears. Stay Stylish';
  }, []);

  // Filter products based on active category selection
  const filteredProducts =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.categories.includes(activeCategory));

  const generalWhatsAppUrl =
    getWhatsAppInquiryUrl() || 'https://wa.me/2347055125187';

  return (
    <div className="pirah-store-app">
      {/* 1. Sticky Navigation Header */}
      <header className="pirah-navbar">
        <div className="pirah-container navbar-inner">
          <Link to="/" className="brand-brandmark">
            <img
              src="/images/pirah-logo.jpg"
              alt="Pirah Logo"
              className="brandmark-logo-img"
              width="38"
              height="50"
            />
            <div className="brandmark-text">
              <span className="brandmark-name">PIRAH</span>
              <span className="brandmark-tag">Store</span>
            </div>
          </Link>

          <nav className="nav-desktop" aria-label="Primary Navigation">
            <ul className="nav-links-desktop">
              <li>
                <a href="#collections">Collections</a>
              </li>
              <li>
                <a href="#catalogue">Catalogue</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#order-guide">How to Order</a>
              </li>
            </ul>
          </nav>

          <div className="nav-actions-desktop">
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-nav-enquiry"
            >
              <span>WhatsApp Orders</span>
            </a>
          </div>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
          <a
            href="#collections"
            onClick={() => setMobileMenuOpen(false)}
          >
            Collections
          </a>
          <a
            href="#catalogue"
            onClick={() => setMobileMenuOpen(false)}
          >
            Catalogue
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Pirah
          </a>
          <a
            href="#order-guide"
            onClick={() => setMobileMenuOpen(false)}
          >
            How to Order
          </a>
          <Link
            to="/birthday"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#dfbe68' }}
          >
            Birthday Letter (Private) &rarr;
          </Link>
          <a
            href={generalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-nav-enquiry"
            style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            WhatsApp Orders
          </a>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="pirah-hero-section">
        <div className="hero-ambient-glow" aria-hidden="true" />
        <div className="pirah-container hero-layout-grid">
          <div className="hero-content">
            <h1 className="hero-headline">
              Premium Style. Quality Wears. <br />
              <em>Stay Stylish with Pirah</em>
            </h1>
            <p className="hero-subhead">
              Quality knitwear, everyday clothes, and comfortable footwear selected for clean fits and lasting wear.
            </p>
            <div className="hero-cta-group">
              <a href="#catalogue" className="btn-hero-primary">
                <span>Explore Catalogue</span>
                <span aria-hidden="true">&darr;</span>
              </a>
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-secondary"
              >
                <span>WhatsApp Orders</span>
              </a>
            </div>
          </div>

          {/* Hero Visual Collage */}
          <div className="hero-visual-collage" aria-hidden="true">
            <div className="collage-card-main">
              <img
                src="/images/IMG-20261008-WA0001.jpg"
                alt="Signature Textured Knit Polo Collection"
                className="collage-img"
                loading="eager"
              />
              <span className="collage-badge">Knitwear Series</span>
            </div>
            <div className="collage-card-secondary">
              <img
                src="/images/IMG-20261008-WA0004.jpg"
                alt="Curated Retro Low-Top Sneakers"
                className="collage-img"
                loading="eager"
              />
              <span className="collage-badge">Heritage Court</span>
            </div>
            <div className="collage-card-tertiary">
              <img
                src="/images/IMG-20261008-WA0000.jpg"
                alt="Chrome Split-Toe Leather Mules"
                className="collage-img"
                loading="eager"
              />
              <span className="collage-badge">Leather Mules</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Brand Pillars */}
      <section className="pirah-pillars-section" aria-label="Brand Pillars">
        <div className="pirah-container pillars-grid">
          <div className="pillar-item">
            <span className="pillar-icon" aria-hidden="true">✦</span>
            <h3 className="pillar-title">Clean Tailoring</h3>
            <p className="pillar-desc">
              Every piece is chosen for a balanced fit, versatile colours, and easy everyday pairing.
            </p>
          </div>
          <div className="pillar-item">
            <span className="pillar-icon" aria-hidden="true">◈</span>
            <h3 className="pillar-title">Durable Fabrics</h3>
            <p className="pillar-desc">
              From structured cotton knitwear to genuine suede and durable outsoles.
            </p>
          </div>
          <div className="pillar-item">
            <span className="pillar-icon" aria-hidden="true">✧</span>
            <h3 className="pillar-title">Direct Orders</h3>
            <p className="pillar-desc">
              Message directly on WhatsApp to confirm your size, stock, and delivery.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Featured Collections */}
      <section id="collections" className="pirah-collections-section">
        <div className="pirah-container">
          <div className="catalogue-header">
            <span className="section-eyebrow">Categories</span>
            <h2 className="section-title">Featured Collections</h2>
            <p className="section-subtitle">
              Key wardrobe essentials, court sneakers, and slip-on footwear.
            </p>
          </div>

          <div className="collections-grid">
            <div className="collection-card">
              <img
                src="/images/IMG-20261008-WA0001.jpg"
                alt="The Knitwear Edit"
                className="collection-card-img"
                loading="lazy"
              />
              <div className="collection-overlay">
                <h3 className="collection-title">The Knitwear Edit</h3>
                <p className="collection-meta">Collared knit polos and cotton essentials</p>
              </div>
            </div>

            <div className="collection-card">
              <img
                src="/images/IMG-20261008-WA0004.jpg"
                alt="Curated Footwear"
                className="collection-card-img"
                loading="lazy"
              />
              <div className="collection-overlay">
                <h3 className="collection-title">Footwear</h3>
                <p className="collection-meta">Low-top court sneakers and gum soles</p>
              </div>
            </div>

            <div className="collection-card">
              <img
                src="/images/IMG-20261008-WA0008.jpg"
                alt="Slides &amp; Palm Mules"
                className="collection-card-img"
                loading="lazy"
              />
              <div className="collection-overlay">
                <h3 className="collection-title">Slides &amp; Mules</h3>
                <p className="collection-meta">Suede clogs and slip-on mules</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Product Catalogue Section */}
      <section id="catalogue" className="pirah-catalogue-section">
        <div className="pirah-container">
          <div className="catalogue-header">
            <span className="section-eyebrow">Stock</span>
            <h2 className="section-title">Product Catalogue</h2>
            <p className="section-subtitle">
              Select any item to confirm your size and order on WhatsApp.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="category-filter-bar" role="tablist" aria-label="Filter products by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`filter-pill-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const productWhatsAppUrl =
                getWhatsAppInquiryUrl(product.name) || generalWhatsAppUrl;

              return (
                <article key={product.id} className="product-card">
                  <div className="product-media-frame">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-photo"
                      loading="lazy"
                    />
                    <span className="product-category-tag">{product.categoryLabel}</span>
                  </div>

                  <div className="product-info-body">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-tagline">{product.tagline}</p>
                    <p className="product-desc">{product.description}</p>

                    <ul className="product-specs-list" aria-label="Key features">
                      {product.specs.map((spec) => (
                        <li key={spec}>
                          <span className="spec-bullet" aria-hidden="true">&bull;</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="product-price-note">{product.enquiryHint}</p>

                    <div className="product-card-actions">
                      <a
                        href={productWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-card-enquire"
                      >
                        <span>Enquire on WhatsApp</span>
                        <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. About Pirah Section */}
      <section id="about" className="pirah-about-section">
        <div className="pirah-container about-layout">
          <div className="about-brand-visual">
            <div className="about-logo-frame">
              <img
                src="/images/pirah-logo.jpg"
                alt="Official Pirah Brand Identity"
                className="about-logo-img"
                width="859"
                height="1145"
                loading="lazy"
              />
            </div>
          </div>

          <div className="about-content">
            <span className="section-eyebrow">About Us</span>
            <h2 className="section-title">About Pirah Store</h2>
            <div className="about-body-text">
              <p>
                Pirah Store is built on straightforward, reliable style. We focus on clothes and footwear that look good, fit well, and hold up over time without unnecessary fuss.
              </p>
              <p>
                From textured knit polos and structured tees to classic court trainers and everyday mules, every item is chosen for comfort and clean presentation.
              </p>
              <p>
                We keep customer service personal: chat directly on WhatsApp to confirm your size, ask questions, and arrange delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. How to Order Guide */}
      <section id="order-guide" className="pirah-order-guide">
        <div className="pirah-container">
          <div className="catalogue-header">
            <span className="section-eyebrow">Order Process</span>
            <h2 className="section-title">How to Order</h2>
            <p className="section-subtitle">
              Three simple steps to select, confirm, and receive your items.
            </p>
          </div>

          <div className="guide-steps-grid">
            <div className="guide-step-card">
              <span className="step-num">01</span>
              <h3 className="step-title">Select an Item</h3>
              <p className="step-desc">
                Browse our catalogue above and choose the pieces, colours, or styles you want.
              </p>
            </div>

            <div className="guide-step-card">
              <span className="step-num">02</span>
              <h3 className="step-title">Message on WhatsApp</h3>
              <p className="step-desc">
                Click any enquiry button to message us with the item name. We will confirm your size and availability.
              </p>
            </div>

            <div className="guide-step-card">
              <span className="step-num">03</span>
              <h3 className="step-title">Confirm and Receive</h3>
              <p className="step-desc">
                Confirm payment details and arrange delivery straight to your location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="pirah-footer">
        <div className="pirah-container">
          <div className="footer-inner-grid">
            <div className="footer-brand-col">
              <h3 className="footer-brand-title">PIRAH STORE</h3>
              <p className="footer-tagline">PREMIUM STYLE. QUALITY WEARS. STAY STYLISH.</p>
              <p style={{ fontSize: '0.82rem', color: 'var(--pirah-text-muted)', marginTop: '0.5rem' }}>
                Quality knitwear, clothes, and footwear for everyday wear.
              </p>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-heading">Navigation</h4>
              <ul className="footer-links-list">
                <li><a href="#collections">Featured Collections</a></li>
                <li><a href="#catalogue">Full Catalogue</a></li>
                <li><a href="#about">About the Brand</a></li>
                <li><a href="#order-guide">How to Order</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-heading">Special Pages</h4>
              <ul className="footer-links-list">
                <li>
                  <Link to="/birthday" className="footer-birthday-tribute-link">
                    Private Birthday Tribute 🌹
                  </Link>
                </li>
                <li>
                  <a
                    href={generalWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--pirah-text-muted)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                    }}
                  >
                    Direct WhatsApp Desk (+234 705 512 5187)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <span>&copy; 2026 Pirah Store. All rights reserved.</span>
            <span>Crafted with love for Ifeoluwa Rose Bamidele.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
