import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="page">
      <h2>🏠 Welcome to Our Store</h2>
      <p>Discover amazing products and enjoy seamless navigation with React Router.</p>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h2>About Us</h2>
      <p>
        This website demonstrates React Routing. It allows smooth navigation
        between pages without reloading, making the user experience faster and
        more interactive.
      </p>
    </div>
  );
}

function Contact() {
  return (
    <div className="page">
      <h2>Contact Us</h2>
      <form className="contact-form">
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

function Products() {
  return (
    <div className="page">
      <h2> Shop our Products</h2>
      <div className="products">
        <div className="card">
          <h3>Co-Ord Sets</h3>
          <p>High-quality item with modern design.</p>
          <button>Add to Cart</button>
        </div>
        <div className="card">
          <h3>Clothing Bags</h3>
          <p>Eco-friendly and durable product.</p>
          <button>Add to Cart</button>
        </div>
        <div className="card">
          <h3>Sleeping Suit</h3>
          <p>Affordable and comfortable everyday product.</p>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="page">
      <h2>❌ 404 - Page Not Found</h2>
      <p>Oops! The page you are looking for doesn’t exist.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="nav-container">
        <h1>- Shopify Website -</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/products">Products</Link>
          
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Page */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
