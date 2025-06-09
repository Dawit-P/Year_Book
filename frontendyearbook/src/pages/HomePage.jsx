import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={styles.pageContainer} className="container"> {/* Using .container utility class */}
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to the ASTU Digital Yearbook!</h1>
        <p style={styles.subtitle}>Relive memories, celebrate achievements, and connect with your peers.</p>
      </header>

      <section style={styles.featuresGrid}>
        <div style={styles.featureCard} className="card-base"> {/* Using .card-base utility class */}
          <h2 style={styles.featureTitle}>Explore Student Profiles</h2>
          <p>Discover the stories and aspirations of your fellow graduates.</p>
          <Link to="/students" className="button-link">View Students</Link>
        </div>
        <div style={styles.featureCard} className="card-base">
          <h2 style={styles.featureTitle}>Department Galleries</h2>
          <p>See highlights and group photos from each academic department.</p>
          <Link to="/departments" className="button-link">View Departments</Link>
        </div>
        <div style={styles.featureCard} className="card-base">
          <h2 style={styles.featureTitle}>Share Your Memories</h2>
          <p>Contribute to our collective memory board with photos and captions.</p>
          <Link to="/memories" className="button-link">View Memory Board</Link>
        </div>
        <div style={styles.featureCard} className="card-base">
          <h2 style={styles.featureTitle}>Alumni Achievements</h2>
          <p>Get inspired by the success stories of ASTU alumni.</p>
          <Link to="/alumni" className="button-link">View Alumni Stories</Link>
        </div>
      </section>
    </div>
  );
};

// Inline styles are reduced, leveraging global styles and utility classes
const styles = {
  pageContainer: { // Renamed from container to avoid conflict if .container has different padding
    textAlign: 'center',
    paddingTop: '40px', // Padding from .container utility class handles sides
    paddingBottom: '40px',
    // backgroundColor: 'var(--background-color-white)', // Already white from body or card-base
  },
  header: {
    marginBottom: '50px',
  },
  title: {
    fontSize: '3em', // Kept large for impact
    color: 'var(--primary-color)', // Using CSS var
    marginBottom: '10px',
    fontWeight: '700',
    fontFamily: 'var(--font-family-serif)',
  },
  subtitle: {
    fontSize: '1.4em',
    color: 'var(--text-color-medium)',
    maxWidth: '700px',
    margin: '0 auto',
  },
  featuresGrid: { // Renamed from features for clarity
    display: 'grid', // Using grid for more robust layout
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Responsive grid
    gap: '30px',
  },
  featureCard: { // Specific overrides or additions to .card-base if needed
    // .card-base provides background, border-radius, box-shadow, padding
    //textAlign: 'left', // Content within cards might be better left-aligned
  },
  featureTitle: {
    fontSize: '1.8em',
    color: 'var(--text-color-dark)', // Adjusted from department color
    marginBottom: '15px',
    fontFamily: 'var(--font-family-serif)',
  },
  // .button-link class from index.css handles button styling
};

export default HomePage;
