import React from "react";
import '../styles/Policies.css'; 

const TermsOfService = () => {
  return (
    <div className="policy-container">
      <h2>Terms of Service</h2>
      <p><strong>Effective Date:</strong> [Insert Date]</p>
      <p>
        By accessing or using our platform, you agree to these terms.
      </p>
      <h3>1. User Responsibilities</h3>
      <ul>
        <li>Users must provide accurate and lawful property details.</li>
        <li>Any fraudulent listings or misrepresentation may lead to account suspension.</li>
        <li>Users should respect the privacy of other members and avoid spamming.</li>
      </ul>
      <h3>2. Property Listings & Transactions</h3>
      <ul>
        <li>NestHive is a listing platform and does not guarantee property transactions.</li>
        <li>We do not hold responsibility for disputes between buyers, sellers, or tenants.</li>
        <li>Users must verify property details before making any transactions.</li>
      </ul>
    </div>
  );
};

export default TermsOfService;
