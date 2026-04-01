import { useState, useEffect, useRef } from "react";
import "./App.css";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { id: 1, name: "Emerald Bay XL TV DVD Stereo Hot Tub", desc: "6 Person Spa, 90 Jets, TV Entertainment System", price: 1979, capacity: "6-7", priceRange: "$2,000 - $4,000", brand: "HotSpring", jets: "50-100", bg: "#e8f0f5" },
  { id: 2, name: "XS SCYBA X Series 119 Hot Tub", desc: "4-5 Person Spa, 119 Jets, Energy Efficient", price: 2499, capacity: "4-5", priceRange: "$2,000 - $4,000", brand: "HotSpring", jets: "100+", bg: "#eef3ee" },
  { id: 3, name: "Cabaret 3 Person Hot Tub 110V", desc: "3 Person Compact Spa, 41 Jets, Plug-In Ready", price: 1299, capacity: "2-3", priceRange: "Under $2,000", brand: "Oceanic Spa", jets: "Under 50", bg: "#f3eeee" },
  { id: 4, name: "Island Spas Deluxe Series 8-Person", desc: "8 Person Spa, 158 Jets, Home Theater System", price: 4899, capacity: "8+", priceRange: "$4,000 - $6,000", brand: "Island Spas", jets: "100+", bg: "#eef1f5" },
  { id: 5, name: "Caldera Spas Martinique 7-Person", desc: "7 Person Spa, 71 Jets, LED Lighting", price: 3199, capacity: "6-7", priceRange: "$2,000 - $4,000", brand: "Caldera Spas", jets: "50-100", bg: "#f0edf3" },
  { id: 6, name: "HotSpring Vanguard 5-Person Spa", desc: "5 Person Spa, 37 Jets, Energy Smart", price: 5499, capacity: "4-5", priceRange: "Over $6,000", brand: "HotSpring", jets: "Under 50", bg: "#eef5ee" },
  { id: 7, name: "Barrier Reef 158 Jet TV-Stereo", desc: "Extra Large 8 Person, 158 Jets, TV Home Theater", price: 4599, capacity: "8+", priceRange: "$4,000 - $6,000", brand: "Island Spas", jets: "100+", bg: "#f5f0ec" },
  { id: 8, name: "TV Theater Spa Ultimate", desc: "6 Person, 90 Jets, Entertainment Technology", price: 5499, capacity: "6-7", priceRange: "Over $6,000", brand: "Caldera Spas", jets: "50-100", bg: "#ecf5f5" },
];

const SLIDES = [
  { title: ["Barrier Reef 158 Jet", "TV-Stereo Home Theater", "Super Spa"], desc: ["Extra Large and Deep. 8 Person.", "158 Jet Super Spa, TV-Home Theater Spa System."], price: "$4,899.00", cta: "More Details", ctaPage: "product" },
  { title: ["TV Theater Spa", "Ultimate Entertainment"], desc: ["Experience ultimate relaxation combined", "with cutting-edge entertainment technology."], price: "$5,499.00", cta: "More Details", ctaPage: "product" },
  { title: ["SAVE 50%", "On Selected Spas"], desc: ["Limited time offer. Don't miss out on", "incredible savings on top spa brands."], price: "From $2,499.00", cta: "Shop Now", ctaPage: "category" },
];

const ORDERS = [
  { id: "#10029", date: "Mar 15, 2024", ship: "Pending", total: "$1,979.00", status: "pending" },
  { id: "#10028", date: "Feb 22, 2024", ship: "Shipped", total: "$2,499.00", status: "shipped" },
  { id: "#10021", date: "Jan 10, 2024", ship: "Complete", total: "$4,899.00", status: "complete" },
];

// ─── TOAST HOOK ──────────────────────────────────────────────────────────────

function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = (msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };
  return { toasts, show };
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function Toasts({ toasts }) {
  return (
    <div className="toasts-container">
      {toasts.map(t => (
        <div key={t.id} className={"toast toast-enter toast-" + t.type}>{t.msg}</div>
      ))}
    </div>
  );
}

function Breadcrumb({ items, navigate }) {
  return (
    <div className="breadcrumb">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span style={{ margin: "0 4px" }}>&gt;</span>}
          {item.page
            ? <a onClick={() => navigate(item.page)}>{item.label}</a>
            : <span>{item.label}</span>}
        </span>
      ))}
    </div>
  );
}

function ProductCard({ product, onAddToCart, navigate, delay }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  return (
    <div className="product-card fade-up" style={{ animationDelay: (delay || 0) + "s" }}>
      <div className="prod-img" style={{ background: product.bg }} onClick={() => navigate("product")}>🛁</div>
      <div className="prod-name">{product.name}</div>
      <div className="prod-desc">{product.desc}</div>
      <div className="prod-price">${product.price.toLocaleString()}.00</div>
      <button className={"btn btn-cart" + (added ? " added" : "")} onClick={handleAdd}>
        🛒 {added ? "Added!" : "ADD TO CART"}
      </button>
      <div className="prod-links">
        <a>ADD TO WISHLIST</a>
        <a onClick={() => navigate("product")}>MORE DETAILS</a>
      </div>
    </div>
  );
}

function RelatedCarousel({ navigate }) {
  const [pos, setPos] = useState(0);
  const items = PRODUCTS.slice(0, 6);
  return (
    <div className="related-products">
      <h3>Customers Who Viewed This Item Also</h3>
      <div style={{ position: "relative" }}>
        <button className="carousel-btn" style={{ left: 0 }} onClick={() => setPos(p => Math.max(0, p - 1))}>&lt;</button>
        <div className="carousel-wrapper">
          <div className="carousel-track" style={{ transform: "translateX(-" + (pos * 25) + "%)" }}>
            {items.map(p => (
              <div key={p.id} className="carousel-item">
                <div style={{ background: p.bg, height: 80, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: "1px solid #e0e0e0", marginBottom: 6, cursor: "pointer" }} onClick={() => navigate("product")}>🛁</div>
                <div style={{ color: "var(--red)", fontWeight: 700, fontSize: 13 }}>${p.price.toLocaleString()}.00</div>
                <div style={{ fontSize: 12, color: "#555" }}>{p.name.slice(0, 22)}…</div>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-btn" style={{ right: 0 }} onClick={() => setPos(p => Math.min(items.length - 4, p + 1))}>&gt;</button>
      </div>
    </div>
  );
}

// ─── HEADER & FOOTER ─────────────────────────────────────────────────────────

function SiteHeader({ cartCount, navigate, page, searchQuery, setSearchQuery }) {
  const navLinks = [
    { label: "HOME", page: "home" },
    { label: "PRODUCTS", page: "category" },
    { label: "SPECIAL OFFERS", page: "category" },
    { label: "CUSTOM SERVICE", page: "contact" },
  ];
  return (
    <>
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-inner">
            <span style={{ color: "#333" }}>Call for Customer support: <a href="tel:02038989565" style={{ color: "var(--red)", fontWeight: 600 }}>020 38989565</a></span>
            <div className="top-bar-links">
              <a onClick={() => navigate("account")}>My Account</a>
              <a>Wishlist</a>
              <a onClick={() => navigate("checkout")}>To Checkout</a>
            </div>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container">
          <div className="site-header-inner">
            <div className="logo" onClick={() => navigate("home")}>
              <span className="logo-brand">HOTSPRING<sup style={{ fontSize: 14 }}>®</sup></span>
              <span className="logo-sub">Portable Spas</span>
            </div>
            <div className="header-cart" onClick={() => navigate("cart")}>
              <span style={{ color: "var(--red)", fontSize: 18 }}>🛒</span>
              My Cart: &nbsp;<strong>{cartCount} Item(s)</strong>
              <span style={{ fontSize: 11, color: "#888" }}>▼</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="main-nav">
        <div className="container">
          <ul>
            {navLinks.map(({ label, page: p }) => (
              <li key={label}>
                <a onClick={() => navigate(p)} className={page === p ? "active" : ""}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="search-bar">
        <div className="container">
          <div className="search-bar-inner">
            <div className="search-cats">
              <a onClick={() => navigate("category")}>CATEGORY</a>
              <a>BRAND</a>
              <a>INFO</a>
            </div>
            <form className="search-form" onSubmit={e => { e.preventDefault(); navigate("category"); }}>
              <input type="text" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <button type="submit">SEARCH</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function SiteFooter({ navigate }) {
  const [email, setEmail] = useState("");
  const socialColors = ["#1da1f2", "#3b5998", "#0077b5", "#dd4b39", "#ff0000", "#bd081c"];
  const socialLabels = ["T", "f", "in", "G", "▶", "P"];
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Contact Us</h4>
            <p>yoursite.com<br />CALL 24/7: 888-201-8899<br />Your Address, Street<br />Email: <a href="mailto:service@yoursite.com">service@yoursite.com</a></p>
            <div className="social-icons">
              {socialLabels.map((icon, i) => (
                <a key={i} className="social-icon" style={{ background: socialColors[i] }}>{icon}</a>
              ))}
            </div>
          </div>
          <div>
            <h4>Information</h4>
            <ul>
              <li><a onClick={() => navigate("about")}>About Us</a></li>
              <li><a onClick={() => navigate("contact")}>Customer Service</a></li>
              <li><a>Privacy Policy</a></li>
              <li><a>Site Map</a></li>
              <li><a onClick={() => navigate("contact")}>Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4>My Account</h4>
            <ul>
              <li><a onClick={() => navigate("login")}>Sign In</a></li>
              <li><a onClick={() => navigate("cart")}>View Cart</a></li>
              <li><a>My Wishlist</a></li>
            </ul>
          </div>
          <div>
            <h4>Newsletter</h4>
            <p style={{ marginBottom: 8, fontSize: 12 }}>Sign up for our newsletter:</p>
            <form className="newsletter-form" onSubmit={e => { e.preventDefault(); setEmail(""); }}>
              <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
              <button type="submit">GO</button>
            </form>
            <p style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>PAYMENT SOLUTIONS</p>
            <div className="payment-icons">
              <span className="pay-icon">VISA</span>
              <span className="pay-icon" style={{ color: "#1a4f9e", fontWeight: 900 }}>MC</span>
              <span className="pay-icon" style={{ color: "#2676be" }}>AMEX</span>
              <span className="pay-icon" style={{ color: "#0070ba" }}>PayPal</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">&copy; 2024 HotSpring Portable Spas. All Rights Reserved.</div>
    </footer>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────

function HomePage({ navigate, onAddToCart }) {
  const [slide, setSlide] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  const goSlide = i => {
    clearInterval(timerRef.current);
    setSlide(i);
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 4000);
  };

  const banners = [
    { title: ["5-7 Person", "Spa"], bg: "linear-gradient(135deg, #2a4a6a, #1a3a5a)" },
    { title: ["TV Theater Spa"], bg: "linear-gradient(135deg, #3a5a7a, #2a4a6a)" },
    { save: ["SAVE", "50%"], bg: "var(--red)" },
  ];

  return (
    <main>
      {/* Hero Slider */}
      <div className="hero-slider">
        {SLIDES.map((s, i) => (
          <div key={i} className={"slide" + (slide === i ? " active" : "")}>
            <div className="container">
              <div className="slide-inner">
                <div className="slide-content">
                  <h2>{s.title.map((line, j) => <span key={j}>{line}<br /></span>)}</h2>
                  <p>{s.desc.map((line, j) => <span key={j}>{line}<br /></span>)}</p>
                  <div className="slide-price">{s.price}</div>
                  <button className="btn btn-primary" onClick={() => navigate(s.ctaPage)}>{s.cta}</button>
                </div>
                <div className="slide-image">
                  <div className="slide-image-box">🛁</div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="slider-dots">
          {SLIDES.map((_, i) => (
            <span key={i} className={"dot" + (slide === i ? " active" : "")} onClick={() => goSlide(i)} />
          ))}
        </div>
      </div>

      {/* Feature Banners */}
      <div className="container" style={{ marginTop: 6 }}>
        <div className="feature-banners">
          {banners.map((b, i) => (
            <div key={i} className="feat-banner" style={{ background: b.bg }} onClick={() => navigate("category")}>
              {b.save
                ? <div className="feat-banner-save">{b.save.map((l, j) => <div key={j}>{l}</div>)}</div>
                : <h3>{b.title.map((l, j) => <div key={j}>{l}</div>)}</h3>}
              <p>Proin gravida nibh vel velit auctor aliquet.</p>
            </div>
          ))}
        </div>
      </div>

      {/* New Products */}
      <div className="container" style={{ marginTop: 24 }}>
        <div className="section-title">NEW PRODUCTS</div>
        <div className="product-grid">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} navigate={navigate} delay={i * 0.05} />
          ))}
        </div>
      </div>

      {/* Brand Logos */}
      <div className="container">
        <div className="brand-logos">
          <div className="brand-logo-item">
            <div style={{ background: "#fff3e0", padding: "10px 16px", borderRadius: 4, textAlign: "center" }}>
              <span style={{ fontWeight: 900, fontSize: 13, color: "#e31", letterSpacing: 1 }}>SAVE $1,000s</span><br />
              <span style={{ fontSize: 10, color: "#555" }}>ON THE TOP SPA BRANDS</span>
            </div>
          </div>
          {[["OceanicSpa", "#1a7ab5"], ["CalderaSpas", "#e67"], ["IslandSpas", "#2a8"]].map(([name, color]) => (
            <div key={name} className="brand-logo-item">
              <span style={{ fontFamily: "Oswald, sans-serif", fontSize: 22, fontWeight: 700, color }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// ─── CATEGORY PAGE ────────────────────────────────────────────────────────────

function CategoryPage({ navigate, onAddToCart }) {
  const [filters, setFilters] = useState({ capacity: [], price: [], brand: [], jets: [] });
  const [sort, setSort] = useState("Featured");
  const [open, setOpen] = useState({ capacity: true, price: true, brand: true, jets: true });

  const toggleFilter = (group, val) => {
    setFilters(f => ({
      ...f,
      [group]: f[group].includes(val) ? f[group].filter(x => x !== val) : [...f[group], val],
    }));
  };

  let filtered = PRODUCTS.filter(p =>
    (!filters.capacity.length || filters.capacity.includes(p.capacity)) &&
    (!filters.price.length    || filters.price.includes(p.priceRange)) &&
    (!filters.brand.length    || filters.brand.includes(p.brand)) &&
    (!filters.jets.length     || filters.jets.includes(p.jets))
  );

  if (sort === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);

  const groups = [
    { key: "capacity", title: "Seating Capacity", options: ["2-3", "4-5", "6-7", "8+"] },
    { key: "price",    title: "Price Range",       options: ["Under $2,000", "$2,000 - $4,000", "$4,000 - $6,000", "Over $6,000"] },
    { key: "brand",    title: "Brand",             options: ["HotSpring", "Caldera Spas", "Island Spas", "Oceanic Spa"] },
    { key: "jets",     title: "Jet Count",         options: ["Under 50", "50-100", "100+"] },
  ];

  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: "Home", page: "home" }, { label: "Products" }]} navigate={navigate} />
        <div className="category-layout">
          <div>
            <div className="sidebar-filter">
              <h4>Browse By</h4>
            </div>
            {groups.map(g => (
              <div key={g.key} className="filter-group">
                <div className="filter-group-title" onClick={() => setOpen(o => ({ ...o, [g.key]: !o[g.key] }))}>
                  {g.title} {open[g.key] ? "▲" : "▼"}
                </div>
                {open[g.key] && (
                  <ul>
                    {g.options.map(opt => (
                      <li key={opt}>
                        <label>
                          <input type="checkbox" checked={filters[g.key].includes(opt)} onChange={() => toggleFilter(g.key, opt)} />
                          {opt}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div>
            <div className="category-header">
              <h2>All Hot Tubs &amp; Spas</h2>
              <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                {["Featured", "Price: Low to High", "Price: High to Low", "Newest First", "Best Reviewed"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            {filtered.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
                No products match your filters. <a onClick={() => setFilters({ capacity: [], price: [], brand: [], jets: [] })}>Clear filters</a>
              </div>
            ) : (
              <div className="product-grid">
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} navigate={navigate} delay={i * 0.04} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT PAGE ─────────────────────────────────────────────────────────────

function ProductPage({ navigate, onAddToCart, toast }) {
  const product = PRODUCTS[0];
  const [activeTab, setActiveTab] = useState("details");
  const [options, setOptions] = useState({ interior: 0, shell: 0, pump: 0, foam: 0, cover: 0, tv: 0, jets: 0 });
  const [added, setAdded] = useState(false);
  const total = product.price + Object.values(options).reduce((a, b) => a + Number(b), 0);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const tabs = [
    { key: "details", label: "Details" },
    { key: "specs", label: "Quick Specs" },
    { key: "accessories", label: "Accessories" },
    { key: "reviews", label: "Reviews" },
    { key: "qa", label: "Q & A" },
  ];

  const calcOptions = [
    { label: "Interior Color",        key: "interior", opts: [[0, "Standard"], [100, "Premium (+$100)"]] },
    { label: "Outside Shell Color",   key: "shell",    opts: [[0, "Standard"], [150, "Custom (+$150)"]] },
    { label: "Circulation Pump",      key: "pump",     opts: [[0, "Standard"], [200, "Upgraded (+$200)"]] },
    { label: "Polar Foam",            key: "foam",     opts: [[0, "Standard"], [80, "Full Foam (+$80)"]] },
    { label: "Cover / Steps",         key: "cover",    opts: [[0, "None"], [120, "Included (+$120)"]] },
    { label: "TV/DVD/Entertainment",  key: "tv",       opts: [[0, "None"], [500, "Include (+$500)"]] },
    { label: "Jets",                  key: "jets",     opts: [[0, "Standard 90"], [200, "Premium 120 (+$200)"]] },
  ];

  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: "Home", page: "home" }, { label: "Products", page: "category" }, { label: "Emerald Bay XL" }]} navigate={navigate} />
        <div className="content-box">
          <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Emerald Bay XL TV DVD Stereo Hot Tub with 90 Jets</h2>
          <p style={{ fontSize: 11, color: "#888", marginBottom: 16 }}>Abt Model: B22CS309NSS | UPC Code: J522253669723</p>
          <div className="product-detail-grid">
            {/* Gallery */}
            <div>
              <div className="prod-main-img">🛁</div>
              <div className="prod-thumbnails">
                {["#f0f4f8", "#eff3f0", "#f2f2f0", "#eff5f8"].map((bg, i) => (
                  <div key={i} className={"prod-thumbnail" + (i === 0 ? " active" : "")} style={{ background: bg }}>🛁</div>
                ))}
              </div>
              <a style={{ fontSize: 12, display: "block", marginTop: 6 }}>+ Larger View</a>
            </div>
            {/* Info */}
            <div>
              <div className="rating">★★★★★ <span style={{ color: "#888", fontSize: 12 }}>(14 reviews)</span></div>
              <div className="retail-price">Retail Price: $2,199.00</div>
              <div className="sale-label">Sale price</div>
              <div className="sale-price">$1,979.00</div>
              <a style={{ fontSize: 12, display: "block", marginBottom: 12 }}>Low Price Guarantee</a>
              <table className="specs-table" style={{ marginBottom: 12 }}>
                <tbody>
                  {[
                    ["Size/Seating Capacity", '77", 77", 32" / 6 Persons'],
                    ["Seating Design", "Bucket, Lounge, Chair, Bench"],
                    ["Water Capacity / Dry Weight", "305 Gallons / 573 lbs"],
                    ["Number of Pumps", "2 X 5HP"],
                    ["Electrical", "5.5 KW Heavy Heater, 220V, 50 amp"],
                  ].map(([k, v]) => (
                    <tr key={k}><td>{k}</td><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
              <div className="in-stock">✔ In Stock (available)</div>
              <button className={"btn btn-cart" + (added ? " added" : "")} style={{ padding: "10px 24px", fontSize: 13 }} onClick={handleAdd}>
                🛒 {added ? "Added!" : "ADD TO CART"}
              </button>
            </div>
            {/* Price Calc */}
            <div className="price-calc-box">
              <h4>Price Calculator</h4>
              {calcOptions.map(({ label, key, opts }) => (
                <div key={key} className="price-calc-row">
                  <label>{label}:</label>
                  <select value={options[key]} onChange={e => setOptions(o => ({ ...o, [key]: Number(e.target.value) }))}>
                    {opts.map(([val, text]) => <option key={val} value={val}>{text}</option>)}
                  </select>
                </div>
              ))}
              <div className="total-price-display">Total Price: ${total.toLocaleString()}.00</div>
              <button className="btn btn-cart" style={{ width: "100%", justifyContent: "center" }} onClick={handleAdd}>🛒 ADD TO CART</button>
              <div style={{ marginTop: 16 }}>
                <h5 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Download Resources</h5>
                {["Full Line Brochure", "Owner's Manual", "Specifications Sheet"].map(name => (
                  <a key={name} style={{ display: "block", fontSize: 12, marginBottom: 4 }}>📄 {name}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ margin: "24px 0" }}>
            <div className="tabs-nav">
              {tabs.map(t => (
                <button key={t.key} className={activeTab === t.key ? "active" : ""} onClick={() => setActiveTab(t.key)}>{t.label}</button>
              ))}
            </div>
            <div className={"tab-content" + (activeTab === "details" ? " active" : "")}>
              <h4 style={{ fontWeight: 700, marginBottom: 8 }}>Product Details</h4>
              <p>This spa features premium construction with full-foam insulation, a 5.5 KW heavy heater, and 90 therapeutic jets designed for maximum relaxation.</p>
            </div>
            <div className={"tab-content" + (activeTab === "specs" ? " active" : "")}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {[['Dimensions','77" x 77" x 32"'],['Seating Capacity','6 Persons'],['Jet Count','90 Jets'],['Water Capacity','305 Gallons'],['Dry Weight','573 lbs'],['Heater','5.5 KW']].map(([k, v], i) => (
                    <tr key={k} style={{ background: i % 2 === 0 ? "#f5f5f5" : "#fff" }}>
                      <td style={{ padding: 8, fontWeight: 700, border: "1px solid #ddd" }}>{k}</td>
                      <td style={{ padding: 8, border: "1px solid #ddd" }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={"tab-content" + (activeTab === "accessories" ? " active" : "")}>
              <p>Accessories available include spa steps, covers, cover lifters, and aromatherapy kits. Contact us for pricing.</p>
            </div>
            <div className={"tab-content" + (activeTab === "reviews" ? " active" : "")}>
              {[["John D.", "Great purchase!", "★★★★★", "Absolutely love this hot tub. Installation was easy and the jets are amazing."],
                ["Sarah M.", "Very satisfied", "★★★★☆", "Great quality and fast delivery. The TV entertainment system is a nice bonus."]].map(([name, title, stars, text]) => (
                <div key={name} style={{ borderBottom: "1px solid #eee", paddingBottom: 14, marginBottom: 14 }}>
                  <div style={{ color: "#f5a623", marginBottom: 4 }}>{stars}</div>
                  <strong>{title}</strong> — <em style={{ color: "#888", fontSize: 12 }}>{name}</em>
                  <p style={{ fontSize: 13, marginTop: 6 }}>{text}</p>
                </div>
              ))}
            </div>
            <div className={"tab-content" + (activeTab === "qa" ? " active" : "")}>
              <p><strong>Q: What is the warranty?</strong><br />A: 5-year limited warranty on the shell and 2 years on components.</p>
              <p style={{ marginTop: 12 }}><strong>Q: Can it be used indoors?</strong><br />A: Yes, with proper ventilation.</p>
            </div>
          </div>
        </div>
        <RelatedCarousel navigate={navigate} />
      </div>
    </div>
  );
}

// ─── CART PAGE ────────────────────────────────────────────────────────────────

function CartPage({ navigate, cart, onUpdateQty, onRemoveItem }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: "Home", page: "home" }, { label: "Shopping Cart" }]} navigate={navigate} />
        <div className="page-title">Shopping Cart</div>
        <div className="content-box">
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
              Your cart is empty. <a onClick={() => navigate("category")}>Continue Shopping</a>
            </div>
          ) : (
            <>
              <div className="cart-success">✅ Items in your cart</div>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th><th></th><th>Quantity</th><th>Ship Time</th><th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td><div style={{ background: item.bg, width: 70, height: 60, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: "1px solid #e0e0e0" }}>🛁</div></td>
                      <td>
                        <div className="cart-item-name"><a onClick={() => navigate("product")}>{item.name}</a></div>
                        <div className="cart-item-desc">{item.desc}</div>
                        <div className="cart-actions">
                          <a onClick={() => onRemoveItem(item.id)}>Remove</a> | <a onClick={() => navigate("product")}>Edit</a>
                        </div>
                      </td>
                      <td>
                        <select className="sort-select" value={item.qty} onChange={e => onUpdateQty(item.id, Number(e.target.value))}>
                          {[1, 2, 3, 5, 10].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </td>
                      <td style={{ fontSize: 12, color: "#666" }}>Standard (7-10 business days)</td>
                      <td><strong>${(item.price * item.qty).toLocaleString()}.00</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="cart-summary">
                <div>Cart summary ({cart.length} items)</div>
                <div className="cart-total">Total: ${total.toLocaleString()}.00</div>
                <div className="cart-btns">
                  <button className="btn btn-secondary" onClick={() => navigate("category")}>CONTINUE SHOPPING</button>
                  <button className="btn btn-primary" onClick={() => navigate("checkout")}>PROCEED TO CHECKOUT</button>
                </div>
              </div>
            </>
          )}
        </div>
        <RelatedCarousel navigate={navigate} />
      </div>
    </div>
  );
}

// ─── CHECKOUT PAGE ────────────────────────────────────────────────────────────

function CheckoutPage({ navigate, cart, toast }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", zip: "", cardType: "", cardNumber: "", cvv: "", terms: false });
  const [errors, setErrors] = useState({});
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const validate = () => {
    const e = {};
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName)  e.lastName  = "Required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone)     e.phone     = "Required";
    if (!form.address)   e.address   = "Required";
    if (!form.city)      e.city      = "Required";
    if (!form.state)     e.state     = "Required";
    if (!form.zip)       e.zip       = "Required";
    if (!form.cardType)  e.cardType  = "Required";
    if (!form.cardNumber || form.cardNumber.replace(/\s/g, "").length < 13) e.cardNumber = "Valid card number required";
    if (!form.cvv)       e.cvv       = "Required";
    if (!form.terms)     e.terms     = "You must accept terms";
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (!Object.keys(errs).length) {
      toast("Order placed successfully! Thank you for your purchase.", "success");
      setTimeout(() => navigate("account"), 2000);
    }
  };

  const Field = ({ label, field, type = "text", placeholder }) => (
    <div className="form-row">
      <label>{label} <em style={{ color: "var(--red)", fontStyle: "normal" }}>*</em></label>
      <div style={{ flex: 1 }}>
        <input
          type={type}
          className={errors[field] ? "error" : ""}
          value={form[field] || ""}
          onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
          placeholder={placeholder}
        />
        {errors[field] && <div className="field-error" style={{ marginLeft: 0 }}>{errors[field]}</div>}
      </div>
    </div>
  );

  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: "Home", page: "home" }, { label: "Checkout" }]} navigate={navigate} />
        <div className="page-title">Secure Checkout</div>
        <div className="content-box">
          <form onSubmit={handleSubmit}>
            <div className="checkout-grid">
              <div>
                <div className="checkout-step-title">Step 1. <span>Billing Address</span></div>
                <Field label="First Name" field="firstName" />
                <Field label="Last Name"  field="lastName" />
                <Field label="Email"      field="email"    type="email" />
                <Field label="Phone"      field="phone"    type="tel" />
                <Field label="Address"    field="address" />
                <Field label="City"       field="city"     placeholder="New York" />
                <Field label="State"      field="state"    placeholder="New York" />
                <Field label="Zip Code"   field="zip" />
              </div>
              <div>
                <div className="checkout-step-title">Step 2. <span>Card Details</span></div>
                <Field label="Card Type"   field="cardType"   placeholder="Visa / MasterCard" />
                <Field label="Card Number" field="cardNumber" placeholder="1234 5678 9123 4567" />
                <Field label="CVV"         field="cvv" />
                <div className="form-check">
                  <input type="checkbox" id="terms" checked={form.terms} onChange={e => setForm(f => ({ ...f, terms: e.target.checked }))} />
                  <label htmlFor="terms">I Accept <a onClick={() => navigate("terms")}>Terms and Conditions</a></label>
                </div>
                {errors.terms && <div style={{ color: "var(--red)", fontSize: 11, marginBottom: 8 }}>{errors.terms}</div>}

                <div style={{ marginTop: 24 }}>
                  <div className="checkout-step-title">Step 3. <span>Review Your Order</span></div>
                  {cart.length === 0
                    ? <p style={{ color: "#888", fontSize: 13 }}>No items in cart.</p>
                    : <>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                          <thead>
                            <tr>{["Item", "Price", "Qty", "Total"].map(h => <th key={h} style={{ borderBottom: "1px solid #ddd", padding: "8px 6px", textAlign: "left", fontSize: 12, color: "#666" }}>{h}</th>)}</tr>
                          </thead>
                          <tbody>
                            {cart.map(item => (
                              <tr key={item.id}>
                                <td style={{ padding: "8px 6px", borderBottom: "1px solid #f0f0f0" }}>{item.name.slice(0, 28)}…</td>
                                <td style={{ padding: "8px 6px", borderBottom: "1px solid #f0f0f0" }}>${item.price.toLocaleString()}</td>
                                <td style={{ padding: "8px 6px", borderBottom: "1px solid #f0f0f0" }}>{item.qty}</td>
                                <td style={{ padding: "8px 6px", borderBottom: "1px solid #f0f0f0" }}>${(item.price * item.qty).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div style={{ textAlign: "right", fontSize: 14, fontWeight: 600, padding: "10px 0" }}>
                          Total: <strong>${total.toLocaleString()}.00</strong>
                        </div>
                      </>
                  }
                  <button type="submit" className="place-order-btn">🔒 Place Your Order ›</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────

function LoginPage({ navigate, toast }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    const errs = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) errs.email = "Valid email required";
    if (!pass) errs.pass = "Password required";
    setErrors(errs);
    if (!Object.keys(errs).length) {
      toast("Login successful! Redirecting…", "success");
      setTimeout(() => navigate("account"), 1500);
    }
  };

  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: "Home", page: "home" }, { label: "My Account" }]} navigate={navigate} />
        <div className="page-title">Login Or Create Account</div>
        <div className="content-box">
          <div className="login-grid">
            <div className="login-col">
              <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 6 }}>User Login Details</div>
              <p style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>Please sign in with your login information.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>Email <em style={{ color: "var(--red)", fontStyle: "normal" }}>*</em></label>
                  <div style={{ flex: 1 }}>
                    <input type="email" className={errors.email ? "error" : ""} value={email} onChange={e => setEmail(e.target.value)} />
                    {errors.email && <div className="field-error" style={{ marginLeft: 0 }}>{errors.email}</div>}
                  </div>
                </div>
                <div className="form-row">
                  <label>Password <em style={{ color: "var(--red)", fontStyle: "normal" }}>*</em></label>
                  <div style={{ flex: 1 }}>
                    <input type="password" className={errors.pass ? "error" : ""} value={pass} onChange={e => setPass(e.target.value)} />
                    {errors.pass && <div className="field-error" style={{ marginLeft: 0 }}>{errors.pass}</div>}
                  </div>
                </div>
                <div style={{ marginLeft: 160, marginTop: 12, display: "flex", alignItems: "center", gap: 16 }}>
                  <button type="submit" className="btn btn-primary">SIGN IN</button>
                  <a onClick={() => navigate("forgot")}>Forgot your password?</a>
                </div>
              </form>
            </div>
            <div className="login-col">
              <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 6 }}>New Customer</div>
              <p style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>As a registered customer you can:</p>
              <ul className="new-customer-perks">
                <li>Store billing &amp; shipping information</li>
                <li>Check your order status</li>
                <li>Track your delivery status</li>
                <li>View your order history</li>
              </ul>
              <button className="btn btn-primary" onClick={() => navigate("register")}>CREATE NEW ACCOUNT</button>
            </div>
          </div>
        </div>
        <RelatedCarousel navigate={navigate} />
      </div>
    </div>
  );
}

// ─── REGISTER PAGE ────────────────────────────────────────────────────────────

function RegisterPage({ navigate, toast }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", pass: "", confirm: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    const errs = {};
    if (!form.firstName) errs.firstName = "Required";
    if (!form.lastName)  errs.lastName  = "Required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (!form.pass || form.pass.length < 6) errs.pass = "Password must be at least 6 characters";
    if (form.pass !== form.confirm) errs.confirm = "Passwords do not match";
    setErrors(errs);
    if (!Object.keys(errs).length) {
      toast("Account created successfully!", "success");
      navigate("login");
    }
  };

  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: "Home", page: "home" }, { label: "Create Account" }]} navigate={navigate} />
        <div className="page-title">Create New Account</div>
        <div className="content-box">
          <form onSubmit={handleSubmit}>
            {[["First Name", "firstName", "text"], ["Last Name", "lastName", "text"], ["Email", "email", "email"], ["Password", "pass", "password"], ["Confirm Password", "confirm", "password"]].map(([label, field, type]) => (
              <div key={field} className="form-row">
                <label>{label} <em style={{ color: "var(--red)", fontStyle: "normal" }}>*</em></label>
                <div style={{ flex: 1 }}>
                  <input type={type} className={errors[field] ? "error" : ""} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} />
                  {errors[field] && <div className="field-error" style={{ marginLeft: 0 }}>{errors[field]}</div>}
                </div>
              </div>
            ))}
            <div style={{ marginLeft: 160, marginTop: 12, display: "flex", gap: 10 }}>
              <button type="submit" className="btn btn-primary">CREATE ACCOUNT</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("login")}>BACK TO LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── ACCOUNT PAGE ─────────────────────────────────────────────────────────────

function AccountPage({ navigate }) {
  const [section, setSection] = useState("dashboard");
  const links = [
    ["dashboard", "My Dashboard"],
    ["orders",    "My Orders"],
    ["wishlist",  "My Wishlist"],
    ["account",   "Account Information"],
    ["billing",   "Billing Addresses"],
    ["shipping",  "Shipping Addresses"],
  ];

  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: "Home", page: "home" }, { label: "My Account" }]} navigate={navigate} />
        <div className="account-grid">
          <div className="account-sidebar">
            <ul>
              {links.map(([key, label]) => (
                <li key={key}>
                  <a className={section === key ? "active" : ""} onClick={() => setSection(key)}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="content-box" style={{ marginBottom: 0 }}>
            {section === "dashboard" && (
              <>
                <div className="account-section-title">My Dashboard</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  {[
                    ["Contact Information", "John Doe\njohndoe@email.com\n+1 888 201 8899"],
                    ["Default Billing Address", "John Doe\n123 Main Street\nNew York, NY 10001\nUSA"],
                  ].map(([title, content]) => (
                    <div key={title} style={{ fontSize: 13, lineHeight: 1.7, color: "#555" }}>
                      <h5 style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 6 }}>{title}</h5>
                      {content.split("\n").map((line, i) => <div key={i}>{line}</div>)}
                      <a style={{ fontSize: 12 }}>Edit</a>
                    </div>
                  ))}
                </div>
              </>
            )}
            {section === "orders" && (
              <>
                <div className="account-section-title">My Orders</div>
                <table className="orders-table">
                  <thead>
                    <tr>
                      {["Order #", "Date", "Status", "Total", ""].map(h => <th key={h}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERS.map((o, i) => (
                      <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.date}</td>
                        <td><span className={"status-badge status-" + o.status}>{o.ship}</span></td>
                        <td>{o.total}</td>
                        <td><a>View Order</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
            {!["dashboard", "orders"].includes(section) && (
              <div className="account-section-title">{links.find(([k]) => k === section)?.[1]}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────

function ContactPage({ navigate, toast }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    const errs = {};
    if (!form.name) errs.name = "Required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (!form.message) errs.message = "Required";
    setErrors(errs);
    if (!Object.keys(errs).length) {
      toast("Your message has been sent! We will contact you shortly.", "success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: "Home", page: "home" }, { label: "Contact Us" }]} navigate={navigate} />
        <div className="page-title">Contact Us</div>
        <div className="content-box">
          <div className="contact-info-grid">
            {[
              ["Customer Service", "CALL 24/7: 888-201-8899\nEmail: service@yoursite.com\nHours: Mon-Fri 9AM - 6PM EST"],
              ["Our Address", "HotSpring Portable Spas\n123 Spa Boulevard\nNew York, NY 10001\nUnited States"],
            ].map(([title, content]) => (
              <div key={title} style={{ paddingRight: 20, borderRight: "1px solid #e0e0e0" }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#333", marginBottom: 8 }}>{title}</h4>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>
                  {content.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            {[["Name", "name", "text"], ["Email", "email", "email"], ["Subject", "subject", "text"]].map(([label, field, type]) => (
              <div key={field} className="form-row">
                <label>{label}</label>
                <div style={{ flex: 1 }}>
                  <input type={type} value={form[field]} className={errors[field] ? "error" : ""} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} />
                  {errors[field] && <div className="field-error" style={{ marginLeft: 0 }}>{errors[field]}</div>}
                </div>
              </div>
            ))}
            <div className="form-row">
              <label>Message</label>
              <div style={{ flex: 1 }}>
                <textarea value={form.message} className={errors.message ? "error" : ""} style={{ maxWidth: 320, width: "100%", padding: "7px 10px", border: "1px solid #ccc", fontSize: 13, outline: "none", height: 100, resize: "vertical" }} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                {errors.message && <div className="field-error" style={{ marginLeft: 0 }}>{errors.message}</div>}
              </div>
            </div>
            <div style={{ marginLeft: 160, marginTop: 12 }}>
              <button type="submit" className="btn btn-primary">SEND MESSAGE</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────

function AboutPage({ navigate }) {
  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: "Home", page: "home" }, { label: "About Us" }]} navigate={navigate} />
        <div className="page-title">About Us</div>
        <div className="content-box">
          <div style={{ width: "100%", height: 200, background: "linear-gradient(135deg, #c8dae8, #a0c0d8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, marginBottom: 20, borderRadius: 2 }}>🛁</div>
          <div style={{ fontSize: 14, color: "#444", lineHeight: 1.8 }}>
            <h3 style={{ fontFamily: "Oswald, sans-serif", fontSize: 20, color: "#222", margin: "20px 0 10px" }}>Our Story</h3>
            <p>HotSpring Portable Spas has been a leader in the hot tub and portable spa industry for over 20 years, providing high-quality, affordable spa solutions for families seeking relaxation and wellness.</p>
            <h3 style={{ fontFamily: "Oswald, sans-serif", fontSize: 20, color: "#222", margin: "20px 0 10px" }}>Our Mission</h3>
            <p>Our mission is to make premium spa experiences accessible to everyone. We believe relaxation and wellness should not be a luxury — it should be a daily pleasure.</p>
          </div>
          <div className="about-grid">
            {[
              ["Quality Guarantee", "All our spas come with comprehensive warranties and are built to the highest manufacturing standards."],
              ["Customer Service", "Our dedicated support team is available 24/7 to help with any questions about your spa."],
            ].map(([title, text]) => (
              <div key={title} className="about-card">
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TERMS PAGE ───────────────────────────────────────────────────────────────

function TermsPage({ navigate }) {
  const sections = [
    ["Acceptance of Terms", "By using this website, you agree to be bound by these Terms and Conditions."],
    ["Products and Pricing", "All prices are in US dollars and subject to change without notice."],
    ["Shipping and Delivery", "Shipping times are estimates and not guaranteed."],
    ["Returns and Refunds", "We accept returns within 30 days of purchase for items in original condition."],
    ["Privacy Policy", "We collect and use your personal information to process orders and improve our services."],
  ];
  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: "Home", page: "home" }, { label: "Terms & Conditions" }]} navigate={navigate} />
        <div className="page-title">Terms &amp; Conditions</div>
        <div className="content-box" style={{ fontSize: 13, color: "#444", lineHeight: 1.8 }}>
          {sections.map(([title, content]) => (
            <div key={title}>
              <h3 style={{ fontFamily: "Oswald, sans-serif", fontSize: 17, color: "#222", margin: "20px 0 8px" }}>{title}</h3>
              <p style={{ marginBottom: 12 }}>{content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FORGOT PASSWORD PAGE ─────────────────────────────────────────────────────

function ForgotPage({ navigate, toast }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email address."); return; }
    setError("");
    toast("Password reset instructions sent to " + email, "success");
    setEmail("");
  };

  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: "Home", page: "home" }, { label: "Forgot Password" }]} navigate={navigate} />
        <div className="page-title">Forgot Password</div>
        <div className="content-box" style={{ maxWidth: 500 }}>
          <p style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>Enter your email and we'll send you instructions to reset your password.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Email <em style={{ color: "var(--red)", fontStyle: "normal" }}>*</em></label>
              <div style={{ flex: 1 }}>
                <input type="email" value={email} className={error ? "error" : ""} onChange={e => setEmail(e.target.value)} />
                {error && <div className="field-error" style={{ marginLeft: 0 }}>{error}</div>}
              </div>
            </div>
            <div style={{ marginLeft: 160, marginTop: 12, display: "flex", gap: 10 }}>
              <button type="submit" className="btn btn-primary">RESET PASSWORD</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("login")}>BACK TO LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { toasts, show: toast } = useToast();

  const navigate = p => { setPage(p); window.scrollTo(0, 0); };

  const onAddToCart = product => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    toast(product.name.slice(0, 30) + "… added to cart!", "success");
  };

  const onRemoveItem = id => setCart(prev => prev.filter(i => i.id !== id));
  const onUpdateQty  = (id, qty) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const pageComponents = {
    home:     <HomePage     navigate={navigate} onAddToCart={onAddToCart} />,
    category: <CategoryPage navigate={navigate} onAddToCart={onAddToCart} />,
    product:  <ProductPage  navigate={navigate} onAddToCart={onAddToCart} toast={toast} />,
    cart:     <CartPage     navigate={navigate} cart={cart} onUpdateQty={onUpdateQty} onRemoveItem={onRemoveItem} />,
    checkout: <CheckoutPage navigate={navigate} cart={cart} toast={toast} />,
    login:    <LoginPage    navigate={navigate} toast={toast} />,
    register: <RegisterPage navigate={navigate} toast={toast} />,
    account:  <AccountPage  navigate={navigate} />,
    contact:  <ContactPage  navigate={navigate} toast={toast} />,
    about:    <AboutPage    navigate={navigate} />,
    terms:    <TermsPage    navigate={navigate} />,
    forgot:   <ForgotPage   navigate={navigate} toast={toast} />,
  };

  return (
    <div>
      <Toasts toasts={toasts} />
      <SiteHeader
        cartCount={cartCount}
        navigate={navigate}
        page={page}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {pageComponents[page] || pageComponents.home}
      <SiteFooter navigate={navigate} />
    </div>
  );
}