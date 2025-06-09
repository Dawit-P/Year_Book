import React from 'react';
import PropTypes from 'prop-types';

const StudentCard = ({ student }) => {
  if (!student) {
    return <div style={styles.loadingMessage}>Loading student data...</div>;
  }

  const { name, photo_url, quote, department_name, last_words, highlight_tagline, description } = student;

  return (
    <div style={styles.card} className="card-base"> {/* Using .card-base */}
      {photo_url && <img src={photo_url} alt={name} style={styles.photo} />}
      <div style={styles.content}>
        <h2 style={styles.name}>{name}</h2>
        {department_name && <p style={styles.department}>Department: {department_name}</p>}
        {quote && <p style={styles.quote}>"{quote}"</p>}
        {highlight_tagline && <p style={styles.tagline}>{highlight_tagline}</p>}
        {description && <p style={styles.description}>{description}</p>}
        {last_words && <p style={styles.lastWords}>Last Words: {last_words}</p>}
      </div>
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
  }), // Changed from .isRequired to allow null if student is not yet loaded
};

// Inline styles are simplified, relying on .card-base and CSS variables
const styles = {
  card: { // Specific overrides for StudentCard on top of .card-base
    maxWidth: '380px', // Slightly wider for more content
    // .card-base provides: backgroundColor, borderRadius, boxShadow, padding, transition
    // We can add specific margins if needed here, or handle in parent grid
    margin: '15px auto', // Center card if it's the only one on a page
  },
  photo: {
    width: '100%',
    maxHeight: '320px', // Adjusted max height
    objectFit: 'cover',
    borderRadius: 'var(--border-radius-medium) var(--border-radius-medium) 0 0', // Rounded top corners
    marginBottom: '15px',
  },
  content: {
    // Padding is handled by .card-base, this is for internal content styling
  },
  name: {
    fontSize: '1.8em',
    margin: '0 0 10px 0',
    color: 'var(--primary-color)',
    fontFamily: 'var(--font-family-serif)',
  },
  department: {
    fontSize: '1em',
    color: 'var(--text-color-medium)',
    marginBottom: '10px',
  },
  quote: {
    fontSize: '1.1em',
    fontStyle: 'italic',
    color: 'var(--text-color-medium)',
    marginBottom: '15px',
    borderLeft: '4px solid var(--secondary-color)', // Accent border
    paddingLeft: '15px',
    backgroundColor: 'rgba(var(--secondary-color-rgb, 243, 156, 18), 0.05)', // Light accent bg
                                                                            // Need to define --secondary-color-rgb if using rgba()
  },
  tagline: {
    fontSize: '1em',
    fontWeight: 'bold',
    color: 'var(--tertiary-color)',
    marginBottom: '10px',
  },
  description: {
    fontSize: '0.95em',
    color: 'var(--text-color-dark)', // Darker for better readability
    lineHeight: '1.6',
    marginBottom: '10px',
  },
  lastWords: {
    fontSize: '0.9em',
    color: 'var(--text-color-medium)',
    marginTop: '15px',
    borderTop: '1px solid #eee', // Keep a light separator
    paddingTop: '10px',
  },
  loadingMessage: {
    padding: '20px',
    textAlign: 'center',
    color: 'var(--text-color-medium)',
  }
};

export default StudentCard;
