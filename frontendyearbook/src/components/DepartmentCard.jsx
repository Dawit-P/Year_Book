import React from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom'; // Keep for future navigation

const DepartmentCard = ({ department }) => {
  // const navigate = useNavigate(); // For future navigation

  if (!department) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading department data...</div>;
  }

  const { name, cover_image_url, student_count, theme_color, intro_message } = department;

  // Fallback theme color if not provided, using a CSS variable
  const cardStyle = {
    ...styles.card, // Includes .card-base like properties
    borderTop: `5px solid ${theme_color || 'var(--tertiary-color)'}`,
  };

  const handleDepartmentClick = () => {
    console.log(`Department clicked: ${name} (ID: ${department.id})`);
    // navigate(`/departments/${department.id}/students`); // Future navigation
  };

  return (
    <div style={cardStyle} onClick={handleDepartmentClick} role="button" tabIndex={0} onKeyPress={e => e.key === 'Enter' && handleDepartmentClick()} className="card-base">
      {cover_image_url && (
        <img src={cover_image_url} alt={`${name} cover`} style={styles.coverImage} />
      )}
      <div style={styles.cardContent}>
        <h3 style={styles.name}>{name}</h3>
        {intro_message && <p style={styles.intro}>{intro_message.substring(0, 100)}{intro_message.length > 100 ? '...' : ''}</p>}
        {student_count !== undefined && (
          <p style={styles.studentCount}>Students: {student_count}</p>
        )}
      </div>
    </div>
  );
};

DepartmentCard.propTypes = {
  department: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    cover_image_url: PropTypes.string,
    student_count: PropTypes.number,
    theme_color: PropTypes.string,
    intro_message: PropTypes.string,
  }).isRequired,
};

// Styles now primarily use CSS variables and .card-base provides defaults
const styles = {
  card: { // Specific styles for DepartmentCard, complementing .card-base
    // .card-base handles: backgroundColor, borderRadius, boxShadow, padding, transition
    // We ensure DepartmentCard specific structure and hover effects are compatible
    overflow: 'hidden', // Ensures image corners are rounded if image is flush
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    // width: '300px', // Removed fixed width, grid will manage size
    height: '100%', // Allow card to fill grid cell height for uniform look if desired by parent
  },
  coverImage: {
    width: '100%',
    height: '180px', // Fixed height for cover images
    objectFit: 'cover',
    // borderRadius: 'var(--border-radius-medium) var(--border-radius-medium) 0 0', // If image is at the very top
  },
  cardContent: {
    padding: '15px', // .card-base provides padding, this can adjust if needed or be removed
    flexGrow: 1, // Allows content to fill space
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    marginBottom: '8px',
    fontFamily: 'var(--font-family-serif)',
  },
  intro: {
    fontSize: '0.9em',
    color: 'var(--text-color-medium)',
    lineHeight: '1.5',
    marginBottom: '10px',
    flexGrow: 1, // Allow intro to take up available space
  },
  studentCount: {
    fontSize: '0.9em',
    color: 'var(--text-color-dark)',
    fontWeight: '500',
    marginTop: 'auto', // Pushes student count to the bottom
  },
};

export default DepartmentCard;
