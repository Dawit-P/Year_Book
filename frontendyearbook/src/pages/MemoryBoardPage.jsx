import React, { useState, useEffect } from 'react';
import { getMemories } from '../services/api';
import MemoryItemCard from '../components/MemoryItemCard';

const MemoryBoardPage = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setLoading(true);
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
  }, []);

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
    <div className="container"> {/* Using .container utility */}
      <h1 style={styles.header}>Memory Board</h1>
      {/* Add filter controls here later */}
      <div style={styles.listContainer}> {/* Changed from timelineContainer for now */}
        {memories.map(memory => (
          <MemoryItemCard key={memory.id} memory={memory} />
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
    // textShadow: '1px 1px 2px var(--primary-color-rgb, 0, 51, 102, 0.3)', // Softer shadow
  },
  listContainer: { // Simple list layout for now
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', // Responsive grid
    gap: '25px',
  },
  message: {
    fontSize: '1.2em',
    color: 'var(--text-color-medium)',
    textAlign: 'center',
    marginTop: '50px',
  },
};

export default MemoryBoardPage;
