import React from "react";
import "../styles/Footer.css";
import logo from "../assets/NestHive-logo.png"; // Placeholder logo (replace with your actual logo)
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Description */}
        <div className="footer-section logo-section">
          <img src={logo} alt="Company Logo" className="footer-logo" />
          <p>
            Your trusted real estate platform to buy, sell, and rent properties
            with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/buyers">For Buyers</a>
            </li>
            <li>
              <a href="/tenants">For Tenants</a>
            </li>
            <li>
              <a href="/owners">For Owners</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>
            Email:{" "}
            <a
              href="mailto:support@nesthive.com"
              style={{ color: "aquamarine", textDecoration: "none" }}
            >
              support@nesthive.com
            </a>
          </p>
          <p>Phone: +91 78478 67991</p>
          <p>
            Address: 15th cross Street, Sai Baba Temple Road,Marathalli,
            Bengaluru, India
          </p>
        </div>

        {/* Social Media */}
        <div className="footer-section social-media">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://www.facebook.com/">
              <FaFacebook />
            </a>
            <a href="https://x.com/">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="footer-bottom">
        <p style={{ color: "wheat" }}>
          &copy; {new Date().getFullYear()} NestHive. All Rights Reserved.
        </p>
        <ul>
        <li><a href="./Privacy-terms/privacy-policy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
        <li><a href="./Privacy-terms/terms-of-service.html" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>

        </ul>
      </div>
    </footer>
  );
};

export default Footer;
