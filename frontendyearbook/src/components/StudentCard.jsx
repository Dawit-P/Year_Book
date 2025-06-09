import React from 'react';
import PropTypes from 'prop-types';

const StudentCard = ({ student }) => {
  if (!student) {
    return <div>Loading student data...</div>;
  }

  const { name, photo_url, quote, department_name, last_words, highlight_tagline, description } = student;

  return (
    <div style={styles.card}>
      {photo_url && <img src={photo_url} alt={name} style={styles.photo} />}
      <h2 style={styles.name}>{name}</h2>
      {department_name && <p style={styles.department}>Department: {department_name}</p>}
      {quote && <p style={styles.quote}>"{quote}"</p>}
      {highlight_tagline && <p style={styles.tagline}>{highlight_tagline}</p>}
      {description && <p style={styles.description}>{description}</p>}
      {last_words && <p style={styles.lastWords}>Last Words: {last_words}</p>}
    </div>
  );
};

StudentCard.propTypes = {
  student: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo_url: PropTypes.string,
    quote: PropTypes.string,
    department_name: PropTypes.string,
    last_words: PropTypes.string,
    highlight_tagline: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    maxWidth: '350px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Example font
  },
  photo: {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  name: {
    fontSize: '1.8em',
    margin: '0 0 10px 0',
    color: '#333',
  },
  department: {
    fontSize: '1em',
    color: '#555',
    marginBottom: '10px',
  },
  quote: {
    fontSize: '1.1em',
    fontStyle: 'italic',
    color: '#777',
    marginBottom: '10px',
    borderLeft: '3px solid #eee',
    paddingLeft: '10px',
  },
  tagline: {
    fontSize: '1em',
    fontWeight: 'bold',
    color: '#3498db', // Theme color example
    marginBottom: '10px',
  },
  description: {
    fontSize: '0.95em',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
  lastWords: {
    fontSize: '0.9em',
    color: '#888',
    marginTop: '15px',
    borderTop: '1px solid #eee',
    paddingTop: '10px',
  }
};

export default StudentCard;
