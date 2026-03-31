import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryCard from '../components/CategoryCard.jsx';
import ProductSection from '../components/ProductSection.jsx';
import BrandSection from '../components/BrandSection.jsx';
import PartsAccessories from '../components/PartsAccessories.jsx';
import Newsletter from '../components/Newsletter.jsx';
import categories from '../data/categories.js';
import products from '../data/products.js';
import './Home.css';

function Home() {
  const [catPage, setCatPage] = useState(0);
  const catsPerPage = 12;
  const totalCatPages = Math.ceil(categories.length / catsPerPage);
  const displayCategories = categories.slice(
    catPage * catsPerPage,
    (catPage + 1) * catsPerPage
  );

  return (
    <div className="home">
      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-title">
            <h2>
              Explore <span className="highlight">Categories</span>
            </h2>
            <div className="section-title-actions">
              <button
                className="nav-arrow"
                onClick={() => setCatPage(Math.max(0, catPage - 1))}
                disabled={catPage === 0}
                aria-label="Previous categories"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="nav-arrow"
                onClick={() => setCatPage(Math.min(totalCatPages - 1, catPage + 1))}
                disabled={catPage >= totalCatPages - 1}
                aria-label="Next categories"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="categories-grid">
            {displayCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
          <div className="carousel-dots">
            {Array.from({ length: totalCatPages }).map((_, i) => (
              <button
                key={i}
                className={`dot ${i === catPage ? 'active' : ''}`}
                onClick={() => setCatPage(i)}
                aria-label={`Go to category page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Sections */}
      <ProductSection
        title="New Listings"
        highlightWord="Listings"
        products={products.newListings}
        viewAllLink="/search?q=new"
      />

      <ProductSection
        title="Medical Consumables"
        highlightWord="Consumables"
        products={products.medicalConsumables}
        viewAllLink="/search?q=consumables"
      />

      <ProductSection
        title="Diagnostic Equipment"
        highlightWord="Diagnostic"
        products={products.diagnosticEquipment}
        viewAllLink="/category/imaging-radiology"
      />

      <ProductSection
        title="Lab Equipment"
        highlightWord="Lab"
        products={products.labEquipment}
        viewAllLink="/category/laboratory-blood-mortuary"
      />

      <ProductSection
        title="Monitoring Equipment"
        highlightWord="Monitoring"
        products={products.monitoringEquipment}
        viewAllLink="/category/icu-ccu-emergency-trauma"
      />

      <ProductSection
        title="Surgical Equipment"
        highlightWord="Surgical"
        products={products.surgicalEquipment}
        viewAllLink="/category/surgical-tools-equipment"
      />

      <ProductSection
        title="Homecare Products"
        highlightWord="Homecare"
        products={products.homecareProducts}
        viewAllLink="/search?q=homecare"
      />

      {/* Shop By Brand */}
      <BrandSection />

      {/* Parts & Accessories */}
      <PartsAccessories />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}

export default Home;
