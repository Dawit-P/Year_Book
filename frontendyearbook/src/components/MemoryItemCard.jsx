import React from 'react';
import PropTypes from 'prop-types';

const MemoryItemCard = ({ memory }) => {
  if (!memory) {
    return <div style={{textAlign: 'center', padding: '20px'}}>Loading memory...</div>;
  }

  const { title, photo_url, caption, department_name, memory_type, created_at } = memory;

  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date unknown';

  return (
    <div style={styles.card} className="card-base"> {/* Using .card-base */}
      {photo_url && <img src={photo_url} alt={title || 'Memory image'} style={styles.photo} />}
      <div style={styles.content}>
        <h3 style={styles.title}>{title || "Untitled Memory"}</h3>
        {memory_type && <span style={{...styles.typeBadge, backgroundColor: stringToColor(memory_type)}}>{memory_type}</span>}
        {caption && <p style={styles.caption}>{caption}</p>}
        {department_name && <p style={styles.department}>Department: {department_name}</p>}
        <p style={styles.date}>{formattedDate}</p>
      </div>
    </div>
  );
};

MemoryItemCard.propTypes = {
  memory: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string, // Title can be optional
    photo_url: PropTypes.string,
    caption: PropTypes.string,
    department_name: PropTypes.string,
    memory_type: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
};

// Helper function to generate a color from a string (for memory_type badge)
// This is a simple hash function, not cryptographically secure.
const stringToColor = (str) => {
  if (!str) return 'var(--tertiary-color)';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  const color = "00000".substring(0, 6 - c.length) + c;
  // Ensure contrast, very basic check, might need a better algorithm for accessibility
  const r = parseInt(color.substring(0,2), 16);
  const g = parseInt(color.substring(2,4), 16);
  const b = parseInt(color.substring(4,6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? `#${color}` : `var(--secondary-color)`; // fallback to secondary if too dark
};


// Styles simplified, using .card-base and CSS variables
const styles = {
  card: { // Specific styles for MemoryItemCard, complementing .card-base
    // .card-base handles: backgroundColor, borderRadius, boxShadow, padding, transition
    // width: 'clamp(300px, 80vw, 450px)', // Removed, page layout will handle width
    borderLeft: '4px solid var(--tertiary-color)', // Accent color, can be dynamic based on type
    display: 'flex',
    flexDirection: 'column',
  },
  photo: {
    width: '100%',
    maxHeight: '280px', // Adjusted height
    objectFit: 'cover',
    borderBottom: '1px solid #eee', // Separator
  },
  content: {
    // Padding is handled by .card-base
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  title: {
    fontSize: '1.4em',
    fontWeight: '600',
    color: 'var(--primary-color)',
    marginBottom: '8px',
    fontFamily: 'var(--font-family-serif)',
  },
  typeBadge: { // Base style, background color is dynamic
    display: 'inline-block',
    color: 'var(--text-color-light)', // Text color for badges
    padding: '5px 12px', // Adjusted padding
    borderRadius: 'var(--border-radius-large)', // More rounded badge
    fontSize: '0.8em',
    fontWeight: '500',
    marginBottom: '12px',
    textTransform: 'uppercase',
    alignSelf: 'flex-start', // Align badge to the start
  },
  caption: {
    fontSize: '1em',
    color: 'var(--text-color-medium)',
    lineHeight: '1.6',
    marginBottom: '10px',
    flexGrow: 1,
  },
  department: {
    fontSize: '0.9em',
    color: 'var(--text-color-medium)',
    marginBottom: '5px',
  },
  date: {
    fontSize: '0.85em',
    color: 'var(--text-color-medium)',
    textAlign: 'right',
    marginTop: '10px', // Pushes to bottom if content above is short
  },
};

export default MemoryItemCard;
