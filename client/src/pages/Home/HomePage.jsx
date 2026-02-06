import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, ShieldCheck, Truck, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../style/home.css';

const HomePage = () => {
   const scrollRef = React.useRef(null);

   const categories = [
      { name: "kitchen", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop" },
      { name: "bedroom", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2070&auto=format&fit=crop" },
      { name: "living room", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop" },
      { name: "bathroom", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" },
      { name: "furniture", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop" },
      { name: "appliances", image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb363?q=80&w=1780&auto=format&fit=crop" },
      { name: "electronics", image: "https://images.unsplash.com/photo-1498049381961-a59a969b4550?q=80&w=2070&auto=format&fit=crop" },
      { name: "kitchenware", image: "https://images.unsplash.com/photo-1528740561666-dc24705f08a7?q=80&w=2070&auto=format&fit=crop" },
      { name: "laundry", image: "https://images.unsplash.com/photo-1582735689369-4fe8d75b0b32?q=80&w=1974&auto=format&fit=crop" },
      { name: "cleaning", image: "https://images.unsplash.com/photo-1581578731117-104f2a8060a7?q=80&w=1974&auto=format&fit=crop" },
      { name: "decor", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop" },
      { name: "lighting", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2074&auto=format&fit=crop" },
      { name: "storage", image: "https://images.unsplash.com/photo-1584282490214-41d6836746e5?q=80&w=2070&auto=format&fit=crop" },
      { name: "office", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" },
      { name: "tools", image: "https://images.unsplash.com/photo-1581242163695-19d0acacd465?q=80&w=2070&auto=format&fit=crop" },
      { name: "garden", image: "https://images.unsplash.com/photo-1416879895648-5d436e3bd840?q=80&w=2070&auto=format&fit=crop" },
      { name: "outdoor", image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=2187&auto=format&fit=crop" },
      { name: "fitness", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" },
      { name: "kids", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1940&auto=format&fit=crop" },
      { name: "baby", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=2070&auto=format&fit=crop" },
      { name: "party", image: "https://images.unsplash.com/photo-1464349153916-6ba927d719f2?q=80&w=2070&auto=format&fit=crop" },
      { name: "clothing", image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1935&auto=format&fit=crop" },
      { name: "seasonal", image: "https://images.unsplash.com/photo-1606925797300-0b35e9d17927?q=80&w=2056&auto=format&fit=crop" },
      { name: "misc", image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=1972&auto=format&fit=crop" }
   ];

   const scroll = (direction) => {
      if (scrollRef.current) {
         const { current } = scrollRef;
         const scrollAmount = 300;
         if (direction === 'left') {
            current.scrollLeft -= scrollAmount;
         } else {
            current.scrollLeft += scrollAmount;
         }
      }
   };

   return (
      <div className="home-container">

         {/* HERO SECTION */}
         <section className="hero-section">
            <div className="hero-content">
               <span className="hero-badge">THE #1 RENTAL MARKETPLACE</span>
               <h1 className="hero-title">
                  Own Less.<br />
                  <span className="highlight">Live More.</span>
               </h1>
               <p className="hero-description">
                  Access premium household items, electronics, and gear without the upfront cost.
                  Rent what you need, lease what you don't.
               </p>
               <div className="hero-buttons">
                  <Link to="/products" className="btn btn-primary">
                     Start Renting <ArrowRight size={18} />
                  </Link>
                  <Link to="/dashboard/items" className="btn btn-secondary">
                     List Your Items
                  </Link>
               </div>
            </div>
         </section>

         {/* STATS SECTION */}
         <div className="stats-section">
            <div className="stats-grid">
               <div className="stat-item">
                  <div className="stat-number">10k+</div>
                  <div className="stat-label">Active Listings</div>
               </div>
               <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Categories</div>
               </div>
               <div className="stat-item">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Happy Users</div>
               </div>
               <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support</div>
               </div>
            </div>
         </div>

         {/* CATEGORIES SECTION */}
         <section className="section">
            <div className="section-header">
               <h2 className="section-title">Explore Categories</h2>
               <p className="section-subtitle">Find exactly what you're looking for, from daily essentials to special occasions.</p>
            </div>

            <div className="categories-carousel-wrapper">
               <button className="nav-btn prev" onClick={() => scroll('left')}>
                  <ChevronLeft size={24} />
               </button>

               <div className="categories-grid" ref={scrollRef}>
                  {categories.map((category, index) => (
                     <Link
                        to={`/products?category=${category.name}`}
                        key={index}
                        className="category-card"
                     >
                        <img src={category.image} alt={category.name} className="category-bg" />
                        <div className="category-overlay">
                           <h3 className="category-name">
                              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                           </h3>
                           <span className="category-link">View Collection <ArrowRight size={16} /></span>
                        </div>
                     </Link>
                  ))}
               </div>

               <button className="nav-btn next" onClick={() => scroll('right')}>
                  <ChevronRight size={24} />
               </button>
            </div>
         </section>

         {/* HOW IT WORKS */}
         <section className="section" style={{ backgroundColor: 'var(--surface-secondary)' }}>
            <div className="section-header">
               <h2 className="section-title">How It Works</h2>
               <p className="section-subtitle">Renting has never been this simple and secure.</p>
            </div>

            <div className="steps-grid">
               <div className="step-card">
                  <div className="step-icon-wrapper">
                     <Search size={32} />
                  </div>
                  <h3 className="step-title">1. Find It</h3>
                  <p className="step-desc">Search through thousands of items listed by verified owners in your neighborhood.</p>
               </div>

               <div className="step-card">
                  <div className="step-icon-wrapper">
                     <Clock size={32} />
                  </div>
                  <h3 className="step-title">2. Book It</h3>
                  <p className="step-desc">Choose your dates, book instantly, and arrange a convenient pickup or delivery.</p>
               </div>

               <div className="step-card">
                  <div className="step-icon-wrapper">
                     <ShieldCheck size={32} />
                  </div>
                  <h3 className="step-title">3. Enjoy It</h3>
                  <p className="step-desc">Use the item for as long as you need. Fully insured and worry-free experience.</p>
               </div>
            </div>
         </section>

         {/* CTA SECTION */}
         <section className="cta-section">
            <div className="cta-content">
               <h2 className="cta-title">Ready to declutter & earn?</h2>
               <p className="cta-desc">Turn your idle household items into extra income today. Join thousands of owners sharing their stuff.</p>
               <Link to="/register" className="btn btn-secondary" style={{ color: 'var(--primary-color)', borderColor: 'white' }}>
                  Start Listing Now
               </Link>
            </div>
         </section>

      </div>
   );
};

export default HomePage;
