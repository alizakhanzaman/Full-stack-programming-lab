import { useState } from "react";
import "./App.css";

function UserForm() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(form);
    setForm({ name: "", email: "" });
  };

  return (
    <div className="layout">
      {/* Left side: Form */}
      <div className="form-wrapper">
        <div className="form-card">
          <h1 className="form-title">- Create your Shopify Account -</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <label>Name</label>
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <label>Email</label>
            </div>
            <button type="submit" className="submit-btn">Register</button>
          </form>
          {submitted && (
            <div className="output">
              <h3>Account created successfully!</h3>
              <p><strong>Name:</strong> {submitted.name}</p>
              <p><strong>Email:</strong> {submitted.email}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Background panel */}
      <div className="side-panel">
        <p>
          Let's Shop Hop! <br />
          <br />
          And have a fantastic Shopping Experience.
        </p>
      </div>
    </div>
  );
}

export default UserForm;
