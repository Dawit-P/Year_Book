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
          // Handle cases where 'results' might be missing, though API seems to provide it
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
    <div style={styles.container}>
      <h1 style={styles.header}>Department Galleries</h1>
      <div style={styles.grid}>
        {departments.map(dept => (
          <DepartmentCard key={dept.id} department={dept} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#eef1f5', // A slightly different background for this page
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '2.5em',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", // Clean, modern font
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center cards in the grid
    gap: '20px', // Spacing between cards
  },
  message: {
    fontSize: '1.2em',
    color: '#555',
    textAlign: 'center',
    marginTop: '50px',
  }
};

export default DepartmentGalleriesPage;
