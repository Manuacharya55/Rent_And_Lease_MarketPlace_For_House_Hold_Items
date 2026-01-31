import React from 'react';
import '../../style/home.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
         <div className="hero-content">
            <h1 className="hero-title">
               <span className="line-1">THE RENT &</span>
               <span className="line-2">LEASE CULTURE</span>
               <span className="line-3">MARKETPLACE</span>
            </h1>
            <p className="hero-subtitle">
                Don't Buy. Just Experience. <br/>
                From household essentials to luxury items.
            </p>
         </div>
         <div className="hero-image-container">
            {/* Placeholder for a cool hero image - maybe a lifestyle shot of a living room or someone using a camera */}
            <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop" alt="Modern Living" className="hero-image" />
            <div className="hero-overlay-text">EST. 2026</div>
         </div>
      </section>

      {/* Marquee Ticker */}
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker__item">FURNITURE • ELECTRONICS • CAMERAS • APPLIANCES • TOOLS • </div>
          <div className="ticker__item">FURNITURE • ELECTRONICS • CAMERAS • APPLIANCES • TOOLS • </div>
          <div className="ticker__item">FURNITURE • ELECTRONICS • CAMERAS • APPLIANCES • TOOLS • </div>
        </div>
      </div>

      {/* Categories Grid (Masonry Style) */}
      <section className="categories-section">
         <div className="section-header">
            <h2>CURATED COLLECTIONS</h2>
            <Link to="/products" className="view-all-link">VIEW ALL ITEMS &rarr;</Link>
         </div>
         
         <div className="bento-grid">
            <div className="bento-item large-item">
               <img src="https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=2070&auto=format&fit=crop" alt="Furniture" />
               <div className="bento-content">
                  <h3>LIVING SPACES</h3>
                  <p>Elevate the everyday.</p>
               </div>
            </div>
            <div className="bento-item tall-item">
                <img src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=1925&auto=format&fit=crop" alt="Electronics" />
               <div className="bento-content">
                  <h3>TECH HAVEN</h3>
               </div>
            </div>
             <div className="bento-item small-item">
               <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop" alt="Appliances" />
               <div className="bento-content">
                  <h3>ESSENTIALS</h3>
               </div>
            </div>
             <div className="bento-item wide-item">
               <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop" alt="Cameras" />
               <div className="bento-content">
                  <h3>CAPTURE MOMENTS</h3>
                  <p>Professional gear for lease.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Story / Mission Section */}
      <section className="story-section">
         <div className="story-grid">
            <div className="story-text">
               <h2>WE HELP YOU <span className="highlight-text">OWN LESS</span> <br/> AND <span className="highlight-text">LIVE MORE</span>.</h2>
               <p>
                  Why commit to things you only use once? In a world of fast consumption, we offer a sustainable alternative. 
                  Experience the best products without the burden of ownership.
               </p>
               <button className="cta-button outline">OUR MISSION</button>
            </div>
            <div className="story-visual">
               <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2080&auto=format&fit=crop" alt="Sustainability" />
            </div>
         </div>
      </section>

       {/* Testimonials / Feature */}
       <section className="feature-section">
          <h2>FEATURED IN</h2>
          <div className="logos-grid">
             <span>VOGUE</span>
             <span>WIRED</span>
             <span>ELLE DECOR</span>
             <span>GQ</span>
          </div>
       </section>
       
       {/* Footer CTA */}
      <section className="footer-cta">
         <h1>READY TO START?</h1>
         <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">JOIN THE CLUB</Link>
            <Link to="/login" className="cta-button secondary">BROWSE CATALOG</Link>
         </div>
      </section>
    </div>
  );
};

export default HomePage;
