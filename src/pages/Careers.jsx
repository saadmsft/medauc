import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import './InfoPage.css';

const openings = [
  {
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Lahore, Pakistan',
    type: 'Full-time',
    description:
      'Build and maintain our marketplace platform using React, Node.js, and cloud technologies.',
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'Lahore, Pakistan',
    type: 'Full-time',
    description:
      'Define product strategy and roadmap for our medical equipment marketplace.',
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Design intuitive and accessible interfaces for healthcare professionals.',
  },
  {
    title: 'Business Development Executive',
    department: 'Sales',
    location: 'Karachi, Pakistan',
    type: 'Full-time',
    description:
      'Drive seller acquisition and partnership development across Pakistan.',
  },
  {
    title: 'Customer Support Specialist',
    department: 'Support',
    location: 'Lahore, Pakistan',
    type: 'Full-time',
    description:
      'Provide exceptional support to buyers and sellers on the platform.',
  },
  {
    title: 'Digital Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Lead digital marketing campaigns to grow our user base and brand awareness.',
  },
];

function Careers() {
  return (
    <div className="info-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>Careers</span>
        </nav>

        <h1>Join Our Team</h1>
        <p className="page-subtitle">
          We are building the future of medical equipment commerce in Pakistan. Join us
          and make a difference in healthcare accessibility.
        </p>

        <div className="info-cards-grid">
          {openings.map((job, index) => (
            <div key={index} className="info-card">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p className="card-meta">
                {job.department} &middot; {job.location} &middot; {job.type}
              </p>
              <a href="#" className="card-link">
                Apply Now <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>

        <div className="info-content" style={{ marginTop: '48px' }}>
          <h2>Why Work at Medauc?</h2>
          <ul>
            <li>Impact-driven work in healthcare technology</li>
            <li>Competitive salary and benefits package</li>
            <li>Flexible remote work options</li>
            <li>Professional development and learning opportunities</li>
            <li>Collaborative and inclusive team culture</li>
            <li>Health insurance for you and your family</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Careers;
