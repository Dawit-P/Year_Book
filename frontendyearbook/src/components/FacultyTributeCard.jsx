import React from 'react';
import PropTypes from 'prop-types';

const FacultyTributeCard = ({ tribute }) => {
  if (!tribute) {
    return <div>Loading tribute...</div>;
  }

  const { name, photo_url, message, position } = tribute;

  return (
    <div style={styles.card} className="card-base">
      {photo_url && <img src={photo_url} alt={name} style={styles.photo} />}
      <div style={styles.content}>
        <h3 style={styles.name}>{name}</h3>
        {position && <p style={styles.position}>{position}</p>}
        {message && <p style={styles.messageContent}>"{message}"</p>}
      </div>
    </div>
  );
};

FacultyTributeCard.propTypes = {
  tribute: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photo_url: PropTypes.string,
    message: PropTypes.string.isRequired,
    position: PropTypes.string,
  }).isRequired,
};

const styles = {
  card: { // Complements .card-base
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center', // Center content within the card
    // maxWidth: '350px', // Let the grid control width
  },
  photo: {
    width: '150px', // Fixed size for tribute photos
    height: '150px',
    objectFit: 'cover',
    borderRadius: '50%', // Circular photos
    margin: '0 auto 15px auto', // Center the photo
    border: `3px solid var(--secondary-color)`,
  },
  content: {
    // Padding handled by .card-base
  },
  name: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    fontFamily: 'var(--font-family-serif)',
    marginBottom: '5px',
  },
  position: {
    fontSize: '1em',
    color: 'var(--text-color-medium)',
    fontStyle: 'italic',
    marginBottom: '10px',
  },
  messageContent: {
    fontSize: '1em',
    color: 'var(--text-color-dark)',
    lineHeight: '1.6',
    fontStyle: 'italic',
    padding: '10px',
    borderTop: '1px solid var(--background-color-light)',
    marginTop: '10px',
  }
};

export default FacultyTributeCard;
