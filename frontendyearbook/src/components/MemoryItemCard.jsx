import React from 'react';
import PropTypes from 'prop-types';

const MemoryItemCard = ({ memory }) => {
  if (!memory) {
    return <div>Loading memory...</div>;
  }

  const { title, photo_url, caption, department_name, memory_type, created_at } = memory;

  // Format date for display (basic example)
  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={styles.card}>
      {photo_url && <img src={photo_url} alt={title || 'Memory image'} style={styles.photo} />}
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        {memory_type && <span style={styles.typeBadge}>{memory_type}</span>}
        {caption && <p style={styles.caption}>{caption}</p>}
        {department_name && <p style={styles.department}>Department: {department_name}</p>}
        {created_at && <p style={styles.date}>{formattedDate}</p>}
      </div>
    </div>
  );
};

MemoryItemCard.propTypes = {
  memory: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    photo_url: PropTypes.string,
    caption: PropTypes.string,
    department_name: PropTypes.string,
    memory_type: PropTypes.string, // Consider making this more specific if using fixed choices
    created_at: PropTypes.string, // ISO date string
  }).isRequired,
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    margin: '15px',
    overflow: 'hidden',
    width: 'clamp(300px, 80vw, 450px)', // Responsive width
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '4px solid #5dade2', // Accent color
  },
  photo: {
    width: '100%',
    maxHeight: '250px',
    objectFit: 'cover',
  },
  content: {
    padding: '15px 20px',
  },
  title: {
    fontSize: '1.4em',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
  },
  typeBadge: {
    display: 'inline-block',
    backgroundColor: '#5dade2',
    color: '#fff',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.8em',
    fontWeight: '500',
    marginBottom: '10px',
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: '1em',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
  department: {
    fontSize: '0.9em',
    color: '#777',
    marginBottom: '5px',
  },
  date: {
    fontSize: '0.85em',
    color: '#777',
    textAlign: 'right',
    marginTop: '10px',
  },
};

export default MemoryItemCard;
