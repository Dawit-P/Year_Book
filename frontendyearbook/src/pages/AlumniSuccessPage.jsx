import React, { useState, useEffect } from 'react';
import { getAlumniHighlights } from '../services/api';
import AlumniStory from '../components/AlumniStory';

const AlumniSuccessPage = () => {
  const [alumniStories, setAlumniStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Placeholder for filter/search parameters if needed later
  // const [searchTerm, setSearchTerm] = useState('');
  // const [departmentFilter, setDepartmentFilter] = useState('');

  useEffect(() => {
    const fetchAlumniStories = async () => {
      try {
        setLoading(true);
        // Add params for filtering/searching later
        const params = {};
        const response = await getAlumniHighlights(params);
        if (response.data && response.data.results) {
          setAlumniStories(response.data.results);
        } else {
          // Handle cases where 'results' might be missing
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
  }, []); // Add dependencies like searchTerm, departmentFilter later

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
    <div style={styles.container}>
      <h1 style={styles.header}>Alumni Success Stories</h1>
      {/* Add search/filter inputs here later */}
      <div style={styles.listContainer}>
        {alumniStories.map(alumni => (
          <AlumniStory key={alumni.id} alumni={alumni} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa', // Very light grey, clean background
    fontFamily: "'Lato', sans-serif", // Professional and readable font
  },
  header: {
    textAlign: 'center',
    color: '#004d40', // Dark teal for a sophisticated look
    marginBottom: '30px',
    fontSize: '2.8em',
    fontWeight: '700',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center the story cards
    gap: '25px', // Space between story cards
  },
  message: {
    fontSize: '1.2em',
    color: '#555',
    textAlign: 'center',
    marginTop: '50px',
  },
  // Styles for search/filter controls (to be added later)
  // filterControls: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   gap: '20px',
  //   marginBottom: '30px',
  // },
  // searchInput: {
  //   padding: '12px',
  //   borderRadius: '5px',
  //   border: '1px solid #ced4da',
  //   width: '300px',
  // }
};

export default AlumniSuccessPage;
