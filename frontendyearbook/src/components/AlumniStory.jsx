import React from 'react';
import PropTypes from 'prop-types';

const AlumniStory = ({ alumni }) => {
  if (!alumni) {
    return <div style={{textAlign: 'center', padding: '20px'}}>Loading alumni story...</div>;
  }

  const {
    name,
    photo_url,
    bio,
    achievement,
    department_name,
    graduation_year,
    current_position,
  } = alumni;

  return (
    <div style={styles.card} className="card-base"> {/* Using .card-base */}
      {photo_url && <img src={photo_url} alt={name} style={styles.photo} />}
      <div style={styles.content}>
        <h3 style={styles.name}>{name}</h3>
        {current_position && <p style={styles.position}>{current_position}</p>}
        {department_name && graduation_year && (
          <p style={styles.metaInfo}>
            {department_name} - Class of {graduation_year}
          </p>
        )}
        {achievement && (
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Key Achievement</h4>
            <p style={styles.sectionContent}>{achievement}</p>
          </div>
        )}
        {bio && (
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Bio</h4>
            <p style={styles.sectionContent}>{bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};

AlumniStory.propTypes = {
  alumni: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photo_url: PropTypes.string,
    bio: PropTypes.string,
    achievement: PropTypes.string,
    department_name: PropTypes.string,
    graduation_year: PropTypes.number,
    current_position: PropTypes.string,
  }).isRequired,
};

// Styles simplified, using .card-base and CSS variables
const styles = {
  card: { // Specific styles for AlumniStory, complementing .card-base
    // .card-base provides: backgroundColor, borderRadius, boxShadow, padding, transition
    // maxWidth: '700px', // Max width for readability, can be handled by page layout too
    // margin: '20px auto', // Center the card if it's the only one or in a list
    borderLeft: '5px solid var(--secondary-color)', // Accent color
  },
  photo: {
    width: '100%',
    maxHeight: '350px',
    objectFit: 'cover',
    borderBottom: '1px solid #eee', // Separator
    borderRadius: 'var(--border-radius-medium) var(--border-radius-medium) 0 0', // If image is at the top
  },
  content: {
    // Padding is handled by .card-base
  },
  name: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    marginBottom: '5px',
    fontFamily: 'var(--font-family-serif)',
  },
  position: {
    fontSize: '1.1em',
    fontWeight: '500',
    color: 'var(--tertiary-color)', // Using tertiary for position
    marginBottom: '10px',
  },
  metaInfo: {
    fontSize: '0.95em',
    color: 'var(--text-color-medium)',
    marginBottom: '15px',
  },
  section: {
    marginBottom: '15px',
  },
  sectionTitle: {
    fontSize: '1.1em', // Slightly larger section title
    fontWeight: 'bold',
    color: 'var(--text-color-dark)',
    marginBottom: '8px', // Increased space
    borderBottom: `2px solid var(--secondary-color)`,
    paddingBottom: '4px', // Increased padding
    display: 'inline-block',
    fontFamily: 'var(--font-family-sans-serif)', // Sans-serif for section titles for contrast
  },
  sectionContent: {
    fontSize: '1em', // Slightly larger content text
    color: 'var(--text-color-medium)',
    lineHeight: '1.7',
    whiteSpace: 'pre-line',
  },
};

export default AlumniStory;
