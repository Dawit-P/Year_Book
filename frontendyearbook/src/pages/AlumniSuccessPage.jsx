import React, { useState, useEffect } from 'react';
import { getAlumniHighlights } from '../services/api';
import AlumniStory from '../components/AlumniStory';

const AlumniSuccessPage = () => {
  const [alumniStories, setAlumniStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlumniStories = async () => {
      try {
        setLoading(true);
        const params = {};
        const response = await getAlumniHighlights(params);
        if (response.data && response.data.results) {
          setAlumniStories(response.data.results);
        } else {
          setAlumniStories(response.data || []);
        }
      } catch (err) {
        console.error("Error fetching alumni stories:", err);
        setError(err.message || 'Failed to fetch alumni stories.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlumniStories();
  }, []);

  if (loading) {
    return <div style={styles.message}>Loading alumni success stories...</div>;
  }

  if (error) {
    return <div style={styles.message}>Error: {error}</div>;
  }

  if (alumniStories.length === 0) {
    return <div style={styles.message}>No alumni stories available at the moment.</div>;
  }

  return (
    <div className="container"> {/* Using .container utility */}
      <h1 style={styles.header}>Alumni Success Stories</h1>
      <div style={styles.listContainer}>
        {alumniStories.map(alumni => (
          <AlumniStory key={alumni.id} alumni={alumni} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  // .container handles padding and max-width
  header: {
    textAlign: 'center',
    color: 'var(--primary-color)',
    marginBottom: '30px',
    fontSize: '2.5em',
    fontFamily: 'var(--font-family-serif)',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center the story cards
    gap: '30px', // Space between story cards
    maxWidth: '750px', // Max width for the content list for readability
    margin: '0 auto', // Center the list container itself
  },
  message: {
    fontSize: '1.2em',
    color: 'var(--text-color-medium)',
    textAlign: 'center',
    marginTop: '50px',
  },
};

export default AlumniSuccessPage;
