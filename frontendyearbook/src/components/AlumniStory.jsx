import React from 'react';
import PropTypes from 'prop-types';

const AlumniStory = ({ alumni }) => {
  if (!alumni) {
    return <div>Loading alumni story...</div>;
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
    <div style={styles.card}>
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

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    margin: '20px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    maxWidth: '600px', // Max width for readability
    border: '1px solid #e0e0e0',
  },
  photo: {
    width: '100%',
    maxHeight: '350px',
    objectFit: 'cover',
    borderBottom: '1px solid #eee',
  },
  content: {
    padding: '20px 25px',
  },
  name: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#1a237e', // Dark blue, professional
    marginBottom: '5px',
  },
  position: {
    fontSize: '1.1em',
    fontWeight: '500',
    color: '#3949ab', // Indigo
    marginBottom: '10px',
  },
  metaInfo: {
    fontSize: '0.95em',
    color: '#546e7a', // Blue grey
    marginBottom: '15px',
  },
  section: {
    marginBottom: '15px',
  },
  sectionTitle: {
    fontSize: '1em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
    borderBottom: '2px solid #3949ab',
    paddingBottom: '3px',
    display: 'inline-block',
  },
  sectionContent: {
    fontSize: '0.95em',
    color: '#444',
    lineHeight: '1.7',
    whiteSpace: 'pre-line', // Respects newlines in the bio/achievement text
  },
};

export default AlumniStory;
