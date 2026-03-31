import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import CategoryCard from '../components/CategoryCard.jsx';
import ProductSection from '../components/ProductSection.jsx';
import BrandSection from '../components/BrandSection.jsx';
import PartsAccessories from '../components/PartsAccessories.jsx';
import Newsletter from '../components/Newsletter.jsx';
import { getCategories, getFeaturedProducts } from '../services/productService.js';
import './Home.css';

// Map icon names to components
import {
  Radiation, Bone, FlaskConical, Sparkles, Eye, Factory,
  Scissors, HeartPulse, BedDouble, ScanLine, Stethoscope, Wind,
} from 'lucide-react';

const iconMap = {
  Radiation, Bone, FlaskConical, Sparkles, Eye, Factory,
  Scissors, HeartPulse, BedDouble, ScanLine, Stethoscope, Wind,
};

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catPage, setCatPage] = useState(0);
  const catsPerPage = 12;

  useEffect(() => {
    async function fetchData() {
      try {
        const [cats, prods] = await Promise.all([
          getCategories(),
          getFeaturedProducts(48),
        ]);
        // Add icon components to categories
        const catsWithIcons = cats.map(cat => ({
          ...cat,
          icon: iconMap[cat.icon_name] || Stethoscope,
        }));
        setCategories(catsWithIcons);
        setProducts(prods);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalCatPages = Math.ceil(categories.length / catsPerPage);
  const displayCategories = categories.slice(
    catPage * catsPerPage,
    (catPage + 1) * catsPerPage
  );

  // Group products for sections
  const newListings = products.slice(0, 4);
  const medicalConsumables = products.filter(p => p.price < 10000).slice(0, 4);
  const diagnosticEquipment = products.filter(p => p.category_slug === 'imaging-radiology').slice(0, 4);
  const labEquipment = products.filter(p => p.category_slug === 'laboratory-blood-mortuary').slice(0, 4);
  const monitoringEquipment = products.filter(p => p.category_slug === 'icu-ccu-emergency-trauma').slice(0, 4);
  const surgicalEquipment = products.filter(p => p.category_slug === 'surgical-tools-equipment').slice(0, 4);
  const homecareProducts = products.filter(p => p.category_slug === 'hospital-furniture' || p.category_slug === 'bones-joints-muscles').slice(0, 4);

  // Map Supabase product format to component format
  const mapProduct = (p) => ({
    ...p,
    image: p.image_url,
    category: p.category_slug,
  });

  if (loading) {
    return (
      <div className="home" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Loader2 size={48} className="spin" style={{ color: '#F57C20' }} />
      </div>
    );
  }

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
        products={newListings.map(mapProduct)}
        viewAllLink="/search?q=new"
      />

      <ProductSection
        title="Medical Consumables"
        highlightWord="Consumables"
        products={medicalConsumables.map(mapProduct)}
        viewAllLink="/search?q=consumables"
      />

      <ProductSection
        title="Diagnostic Equipment"
        highlightWord="Diagnostic"
        products={diagnosticEquipment.map(mapProduct)}
        viewAllLink="/category/imaging-radiology"
      />

      <ProductSection
        title="Lab Equipment"
        highlightWord="Lab"
        products={labEquipment.map(mapProduct)}
        viewAllLink="/category/laboratory-blood-mortuary"
      />

      <ProductSection
        title="Monitoring Equipment"
        highlightWord="Monitoring"
        products={monitoringEquipment.map(mapProduct)}
        viewAllLink="/category/icu-ccu-emergency-trauma"
      />

      <ProductSection
        title="Surgical Equipment"
        highlightWord="Surgical"
        products={surgicalEquipment.map(mapProduct)}
        viewAllLink="/category/surgical-tools-equipment"
      />

      <ProductSection
        title="Homecare Products"
        highlightWord="Homecare"
        products={homecareProducts.map(mapProduct)}
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
