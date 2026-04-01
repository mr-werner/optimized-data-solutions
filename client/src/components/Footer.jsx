import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h3>Optimized Data Solutions</h3>
          <p>Automating your workflows so you can scale faster.</p>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-links">
          <h4>Resources</h4>
          <a href="#">Blog</a>
          <a href="#">Case Studies</a>
          <a href="#">Privacy Policy</a>
        </div>

        <div className="footer-links">
          <h4>Contact</h4>
          <p>Email: info@ods.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Optimized Data Solutions</p>
      </div>
    </footer>
  );
}