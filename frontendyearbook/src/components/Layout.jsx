import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Outlet is used to render child routes
import PropTypes from 'prop-types';

const Layout = () => {
  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <Link to="/" style={styles.logoLink}>
          <h1 style={styles.logo}>ASTU Digital Yearbook</h1>
        </Link>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/students" style={styles.navLink}>Students</Link>
          <Link to="/departments" style={styles.navLink}>Departments</Link>
          <Link to="/memories" style={styles.navLink}>Memory Board</Link>
          <Link to="/alumni" style={styles.navLink}>Alumni</Link>
          {/* <Link to="/about" style={styles.navLink}>About ASTU</Link> */}
          {/* Add more links as pages are developed */}
        </nav>
      </header>
      <main style={styles.mainContent}>
        <Outlet /> {/* Child routes will render here */}
      </main>
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Adama Science and Technology University. All rights reserved.</p>
        <p>Designed with <span style={{color: 'red'}}>&#10084;</span> for the students.</p>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  // children: PropTypes.node, // Not needed when using Outlet
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Open Sans', sans-serif", // A neutral, readable font for the layout
  },
  header: {
    backgroundColor: '#003366', // ASTU Blue (example)
    color: '#ffffff',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  logoLink: {
    textDecoration: 'none',
    color: '#ffffff',
  },
  logo: {
    margin: 0,
    fontSize: '1.8em',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1em',
    padding: '5px 10px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  // navLinkHover: { // Hover effects need to be handled with CSS or JS in React
  //   backgroundColor: '#005599',
  // },
  mainContent: {
    flexGrow: 1,
    padding: '20px', // Add some padding around page content
    backgroundColor: '#f4f6f8', // Light background for content area
  },
  footer: {
    backgroundColor: '#333333',
    color: '#dddddd',
    textAlign: 'center',
    padding: '20px',
    fontSize: '0.9em',
  }
};

export default Layout;
