import React, { useState, useEffect } from 'react';
import { getFacultyTributes } from '../services/api';
import FacultyTributeCard from '../components/FacultyTributeCard';

const FacultyTributesPage = () => {
  const [tributes, setTributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTributes = async () => {
      try {
        setLoading(true);
        const response = await getFacultyTributes();
        if (response.data && response.data.results) {
          setTributes(response.data.results);
        } else {
          setTributes(response.data || []);
        }
      } catch (err) {
        console.error("Error fetching faculty tributes:", err);
        setError(err.message || 'Failed to fetch tributes.');
      } finally {
        setLoading(false);
      }
    };

    fetchTributes();
  }, []);

  if (loading) {
    return <div style={styles.message}>Loading faculty tributes...</div>;
  }

  if (error) {
    return <div style={styles.message}>Error: {error}</div>;
  }

  if (tributes.length === 0) {
    return <div style={styles.message}>No faculty tributes available at this time.</div>;
  }

  return (
    <div className="container">
      <h1 style={styles.header}>Faculty Tributes</h1>
      <div style={styles.grid}>
        {tributes.map(tribute => (
          <FacultyTributeCard key={tribute.id} tribute={tribute} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  header: {
    textAlign: 'center',
    color: 'var(--primary-color)',
    marginBottom: '30px',
    fontSize: '2.5em',
    fontFamily: 'var(--font-family-serif)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
  },
  message: {
    fontSize: '1.2em',
    color: 'var(--text-color-medium)',
    textAlign: 'center',
    marginTop: '50px',
  }
};

export default FacultyTributesPage;
