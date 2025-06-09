import React, { useState, useEffect } from 'react';
import { getDepartments } from '../services/api';
import DepartmentCard from '../components/DepartmentCard';

const DepartmentGalleriesPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const response = await getDepartments();
        if (response.data && response.data.results) {
          setDepartments(response.data.results);
        } else {
          setDepartments(response.data || []);
        }
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError(err.message || 'Failed to fetch departments.');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return <div style={styles.message}>Loading departments...</div>;
  }

  if (error) {
    return <div style={styles.message}>Error: {error}</div>;
  }

  if (departments.length === 0) {
    return <div style={styles.message}>No departments found.</div>;
  }

  return (
    <div className="container"> {/* Using .container utility class */}
      <h1 style={styles.header}>Department Galleries</h1>
      <div style={styles.grid}>
        {departments.map(dept => (
          <DepartmentCard key={dept.id} department={dept} />
        ))}
      </div>
    </div>
  );
};

// Styles are simplified, relying on CSS variables and utility classes
const styles = {
  // .container utility class handles overall padding and max-width
  header: {
    textAlign: 'center',
    color: 'var(--primary-color)',
    marginBottom: '30px',
    fontSize: '2.5em',
    fontFamily: 'var(--font-family-serif)',
  },
  grid: {
    display: 'grid',
    // Responsive grid: min 300px width, fill available space, auto-fit columns
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px', // Spacing between cards
  },
  message: {
    fontSize: '1.2em',
    color: 'var(--text-color-medium)',
    textAlign: 'center',
    marginTop: '50px',
  }
};

export default DepartmentGalleriesPage;
