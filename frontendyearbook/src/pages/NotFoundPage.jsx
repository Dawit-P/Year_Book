import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={styles.container} className="container">
      <h1 style={styles.title}>404</h1>
      <h2 style={styles.subtitle}>Oops! Page Not Found.</h2>
      <p style={styles.message}>
        Sorry, the page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link to="/" className="button-link" style={styles.homeButton}>
        Go to Homepage
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '50px',
    paddingBottom: '50px',
    minHeight: 'calc(100vh - 120px)', // Adjust based on header/footer height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '6em',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    margin: 0,
    fontFamily: 'var(--font-family-sans-serif)',
  },
  subtitle: {
    fontSize: '2em',
    color: 'var(--text-color-dark)',
    marginBottom: '20px',
    fontFamily: 'var(--font-family-serif)',
  },
  message: {
    fontSize: '1.2em',
    color: 'var(--text-color-medium)',
    marginBottom: '30px',
    maxWidth: '500px',
  },
  homeButton: { // .button-link provides base, this is for specific overrides
    fontSize: '1.1em',
    padding: '12px 25px',
  }
};

export default NotFoundPage;
