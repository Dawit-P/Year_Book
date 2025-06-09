import React, { useState, useEffect } from 'react';
import { getMemories } from '../services/api';
import MemoryItemCard from '../components/MemoryItemCard'; // Corrected import name

const MemoryBoardPage = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Placeholder for filter states
  // const [departmentFilter, setDepartmentFilter] = useState('');
  // const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setLoading(true);
        // Add filter params here later: { department: departmentFilter, memory_type: typeFilter }
        const params = {};
        const response = await getMemories(params);
        if (response.data && response.data.results) {
          setMemories(response.data.results);
        } else {
          setMemories(response.data || []);
        }
      } catch (err) {
        console.error("Error fetching memories:", err);
        setError(err.message || 'Failed to fetch memories.');
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []); // Add filters to dependency array when implemented: [departmentFilter, typeFilter]

  if (loading) {
    return <div style={styles.message}>Loading memories...</div>;
  }

  if (error) {
    return <div style={styles.message}>Error: {error}</div>;
  }

  if (memories.length === 0) {
    return <div style={styles.message}>No memories posted yet. Be the first!</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Memory Board</h1>
      {/* Add filter controls here later */}
      <div style={styles.timelineContainer}>
        {memories.map(memory => (
          <MemoryItemCard key={memory.id} memory={memory} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f0f2f5', // Light grey background
    fontFamily: "'Roboto', sans-serif",
  },
  header: {
    textAlign: 'center',
    color: '#1a237e', // Deep indigo for header
    marginBottom: '30px',
    fontSize: '2.8em',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px #c5cae9', // Subtle shadow
  },
  // Basic list layout for now, timeline styling can be more complex
  timelineContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center cards if they don't take full width
    gap: '20px',
  },
  message: {
    fontSize: '1.2em',
    color: '#555',
    textAlign: 'center',
    marginTop: '50px',
  },
  // Styles for filter controls (to be added later)
  // filterControls: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   gap: '20px',
  //   marginBottom: '30px',
  // },
  // filterInput: {
  //   padding: '10px',
  //   borderRadius: '5px',
  //   border: '1px solid #ccc',
  // }
};

export default MemoryBoardPage;
