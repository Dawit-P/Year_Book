import React from 'react';
import PropTypes from 'prop-types';

// Placeholder for navigation hook, if we use react-router-dom for navigation
// import { useNavigate } from 'react-router-dom';

const DepartmentCard = ({ department }) => {
  // const navigate = useNavigate(); // Uncomment if using react-router-dom for navigation

  if (!department) {
    return <div>Loading department data...</div>;
  }

  const { name, cover_image_url, student_count, theme_color, intro_message } = department;

  // Fallback theme color if not provided
  const cardStyle = {
    ...styles.card,
    borderTop: `5px solid ${theme_color || '#3498db'}`,
  };

  const handleDepartmentClick = () => {
    // Later, this will navigate to a page showing students of this department
    // For now, it can log to console or do nothing
    console.log(`Department clicked: ${name} (ID: ${department.id})`);
    // navigate(`/departments/${department.id}/students`); // Example navigation
  };

  return (
    <div style={cardStyle} onClick={handleDepartmentClick} role="button" tabIndex={0} onKeyPress={e => e.key === 'Enter' && handleDepartmentClick()}>
      {cover_image_url && (
        <img src={cover_image_url} alt={`${name} cover`} style={styles.coverImage} />
      )}
      <div style={styles.cardContent}>
        <h3 style={styles.name}>{name}</h3>
        {intro_message && <p style={styles.intro}>{intro_message.substring(0, 100)}...</p>}
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

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    overflow: 'hidden', // Ensures image corners are rounded if image is flush
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    width: '300px', // Fixed width for grid item, adjust as needed for Pinterest style
  },
  // Basic hover effect
  // '@media (hover: hover)': { // Check if hover is supported
  //   card: { // This nested style won't work directly in inline styles
  //     '&:hover': {
  //       transform: 'translateY(-5px)',
  //       boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  //     }
  //   }
  // },
  coverImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '15px',
    flexGrow: 1, // Allows content to fill space if card heights are variable
  },
  name: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '8px',
  },
  intro: {
    fontSize: '0.9em',
    color: '#7f8c8d',
    lineHeight: '1.5',
    marginBottom: '10px',
  },
  studentCount: {
    fontSize: '0.9em',
    color: '#34495e',
    fontWeight: '500',
    marginTop: 'auto', // Pushes student count to the bottom if card heights vary
  },
};

export default DepartmentCard;
