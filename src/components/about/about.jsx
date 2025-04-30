import React from 'react';
import './about.css'; // Import the CSS file for styling

const About = () => {
  return (
    <div className="about-container !mt-30">
      <div className="about-header">
        <h1 className="about-title">Bhartiya Capitals</h1>
        <p className="about-subtitle">Building Wealth Through Smart Real Estate Investments</p>
      </div>

      <div className="about-content">
        <section className="who-we-are">
          <h2>🏡 Who We Are</h2>
          <p>
            Bhartiya Capitals is a privately managed real estate investment firm, founded with a vision to create
            profitable real estate opportunities for investors. Unlike traditional real estate firms, we enable direct
            participation in property development, ensuring transparent investments and high ROI.
          </p>
        </section>

        <section className="what-makes-us-different">
          <h2>What Makes Us Different?</h2>
          <ul>
            <li>✅ Direct Investment in Real Estate – Investors fund specific projects, not pooled funds.</li>
            <li>✅ Higher Returns – Offering 15-25% returns, outperforming traditional real estate funds.</li>
            <li>✅ Trusted Builder & Broker Partnerships – Ensuring fast property development & sales.</li>
            <li>✅ Transparent & Secure Process – All investments backed by legal agreements and detailed reports.</li>
          </ul>
        </section>

        <section className="what-we-do">
          <h2>📈 What We Do</h2>
          <div className="card">
            <h3>Real Estate Development & Investment</h3>
            <p>
              We identify high-growth locations, acquire land, and develop individual houses, premium residences, and
              large-scale housing projects. Our model ensures that investors profit once properties are sold.
            </p>
          </div>
          <div className="card">
            <h3>Private Real Estate Crowdfunding</h3>
            <p>
              Investors participate in specific property developments, earning returns after project completion.
              Unlike REITs, our investors own a share in a real estate project, not just stocks.
            </p>
          </div>
          <div className="card">
            <h3>Strategic Market Expansion</h3>
            <p>
              Starting with affordable homes, we plan to expand into premium flats, luxury properties, and large-scale
              developments.
            </p>
          </div>
        </section>

        <section className="our-business-classification">
          <h2>📜 Our Business Classification</h2>
          <p>
            Bhartiya Capitals operates as a:
            <ul>
              <li>✔ Private Real Estate Investment & Development Firm</li>
              <li>✔ Bullet Payment Debt Crowdfunding (Lump-Sum Debt Crowdfunding or Balloon Payment Model)</li>
            </ul>
          </p>
        </section>

        <section className="vision-goals">
          <h2>🚀 Our Vision & Future Goals</h2>
          <ul>
            <li>🔹 Expand into premium housing, commercial spaces, and smart city projects.</li>
            <li>🔹 Develop large-scale real estate projects in Tier 1 & Tier 2 cities.</li>
            <li>🔹 Create a trusted real estate investment platform for both local & NRI investors.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
