import { Link } from 'react-router-dom';
import './CategoryCard.css';

function CategoryCard({ category }) {
  const IconComponent = category.icon;

  return (
    <Link to={`/category/${category.slug}`} className="category-card">
      <div className="category-icon">
        <IconComponent size={32} />
      </div>
      <p className="category-name">{category.name}</p>
    </Link>
  );
}

export default CategoryCard;
