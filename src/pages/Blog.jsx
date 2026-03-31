import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Calendar } from 'lucide-react';
import './InfoPage.css';

const blogPosts = [
  {
    title: 'How to Choose the Right Ultrasound Machine for Your Clinic',
    excerpt:
      'A comprehensive guide on selecting ultrasound equipment based on your clinical needs, budget, and patient volume.',
    date: 'March 25, 2026',
    category: 'Buying Guide',
    image: 'https://placehold.co/400x200/eee/999?text=Ultrasound+Guide',
  },
  {
    title: 'Top 10 Medical Equipment Trends in 2026',
    excerpt:
      'Explore the latest innovations and trends shaping the medical equipment industry this year.',
    date: 'March 18, 2026',
    category: 'Industry News',
    image: 'https://placehold.co/400x200/eee/999?text=Med+Trends+2026',
  },
  {
    title: 'Refurbished vs New Medical Equipment: Making the Right Choice',
    excerpt:
      'Understanding the pros and cons of buying refurbished equipment and how to ensure quality.',
    date: 'March 10, 2026',
    category: 'Buying Guide',
    image: 'https://placehold.co/400x200/eee/999?text=New+vs+Refurb',
  },
  {
    title: 'Setting Up a Diagnostic Lab: Essential Equipment Checklist',
    excerpt:
      'Everything you need to know about equipping a modern diagnostic laboratory from scratch.',
    date: 'March 3, 2026',
    category: 'Guide',
    image: 'https://placehold.co/400x200/eee/999?text=Lab+Setup',
  },
  {
    title: 'Maintenance Tips for CT and MRI Machines',
    excerpt:
      'Expert advice on maintaining expensive imaging equipment to maximize lifespan and performance.',
    date: 'February 25, 2026',
    category: 'Maintenance',
    image: 'https://placehold.co/400x200/eee/999?text=CT+MRI+Tips',
  },
  {
    title: 'How Medauc is Transforming Medical Equipment Trade in Pakistan',
    excerpt:
      'Learn about our journey and mission to digitize the medical equipment marketplace.',
    date: 'February 18, 2026',
    category: 'Company',
    image: 'https://placehold.co/400x200/eee/999?text=Medauc+Story',
  },
];

function Blog() {
  return (
    <div className="info-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>Blog</span>
        </nav>

        <h1>Medauc Blog</h1>
        <p className="page-subtitle">
          Stay informed with the latest news, buying guides, and industry insights
          from the world of medical equipment.
        </p>

        <div className="info-cards-grid">
          {blogPosts.map((post, index) => (
            <div key={index} className="info-card">
              <div className="blog-card-image">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
              <span className="card-meta">{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="card-meta" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> {post.date}
                </span>
                <a href="#" className="card-link">
                  Read More <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
