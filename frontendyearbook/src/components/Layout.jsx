import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom'; // Changed Link to NavLink where appropriate

const Layout = () => {
  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <Link to="/" style={styles.logoLink}> {/* Logo remains a simple Link */}
          <h1 style={styles.logo}>ASTU Digital Yearbook</h1>
        </Link>
        <nav style={styles.nav}>
          <NavLink to="/" className="nav-link-style" end>Home</NavLink> {/* 'end' prop for exact match on root */}
          <NavLink to="/students" className="nav-link-style">Students</NavLink>
          <NavLink to="/departments" className="nav-link-style">Departments</NavLink>
          <NavLink to="/memories" className="nav-link-style">Memory Board</NavLink>
          <NavLink to="/alumni" className="nav-link-style">Alumni</NavLink>
          <NavLink to="/faculty-tributes" className="nav-link-style">Faculty Tributes</NavLink>
          <NavLink to="/president-message" className="nav-link-style">President's Message</NavLink>
          <NavLink to="/about" className="nav-link-style">About ASTU</NavLink>
        </nav>
      </header>
      <main style={styles.mainContent}>
        <Outlet />
      </main>
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Adama Science and Technology University. All rights reserved.</p>
        <p>Designed with <span style={{color: 'var(--secondary-color)'}}>&#10084;</span> for the students.</p>
      </footer>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "var(--font-family-sans-serif)",
  },
  header: {
    backgroundColor: "var(--primary-color)",
    color: "var(--text-color-light)",
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: "var(--box-shadow-light)",
    position: 'sticky', // Make header sticky
    top: 0,
    zIndex: 1000, // Ensure header is above other content
  },
  logoLink: {
    textDecoration: 'none',
    color: "var(--text-color-light)",
  },
  logo: {
    margin: 0,
    fontSize: '1.8em',
    fontWeight: 'bold',
    fontFamily: "var(--font-family-serif)",
    color: "var(--text-color-light)",
  },
  nav: {
    display: 'flex',
    gap: '10px',
  },
  mainContent: {
    flexGrow: 1,
    padding: '20px',
    backgroundColor: "var(--background-color-light)",
    paddingTop: 'calc(60px + 20px)', // Adjust padding top to account for sticky header height + desired space
                                   // Header padding (15+15) + logo font size (approx 30) = ~60px. Adjust if needed.
  },
  footer: {
    backgroundColor: "#333333",
    color: "#dddddd",
    textAlign: 'center',
    padding: '20px',
    fontSize: '0.9em',
  }
};

export default Layout;
