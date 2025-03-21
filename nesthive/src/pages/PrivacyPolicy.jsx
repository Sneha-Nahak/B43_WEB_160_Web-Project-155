import React from "react";
import '../styles/Policies.css'; 

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <h2>Privacy Policy</h2>
      <p><strong>Effective Date:</strong> [Insert Date]</p>
      <p>
        Welcome to NestHive! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our property listing platform in Bangalore.
      </p>
      <h3>1. Information We Collect</h3>
      <ul>
        <li>Personal details (name, email, phone number) when you register.</li>
        <li>Property listing details, including location, images, and pricing.</li>
        <li>Payment information for transactions.</li>
        <li>Browsing data, cookies, and IP addresses to improve our services.</li>
      </ul>
      <h3>2. How We Use Your Information</h3>
      <ul>
        <li>Provide and improve our property listing services.</li>
        <li>Facilitate communication between buyers, sellers, tenants, and owners.</li>
        <li>Send notifications about property updates, offers, or service improvements.</li>
        <li>Prevent fraudulent activities and ensure platform security.</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
