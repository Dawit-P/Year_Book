import React, { useState, useEffect } from 'react';
import { getPresidentMessage } from '../services/api';

const PresidentMessagePage = () => {
  const [messageData, setMessageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true);
        const response = await getPresidentMessage();
        // API for president's message returns the latest message directly (or an array with one item)
        if (response.data && response.data.results && response.data.results.length > 0) {
          setMessageData(response.data.results[0]);
        } else if (response.data && !Array.isArray(response.data)) {
          // If the API returns a single object directly
          setMessageData(response.data);
        } else {
          setError("President's message not found.");
        }
      } catch (err) {
        console.error("Error fetching President's message:", err);
        setError(err.message || 'Failed to fetch message.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  if (loading) {
    return <div style={styles.messageStatus}>Loading President's message...</div>;
  }

  if (error) {
    return <div style={styles.messageStatus}>Error: {error}</div>;
  }

  if (!messageData) {
    return <div style={styles.messageStatus}>President's message is not available at this time.</div>;
  }

  const { name, photo_url, speech, position } = messageData;

  return (
    <div className="container" style={styles.pageContainer}>
      <h1 style={styles.headerTitle}>Message from the President</h1>
      <article style={styles.article}>
        <header style={styles.messageHeader}>
          {photo_url && <img src={photo_url} alt={name} style={styles.photo} />}
          <div>
            <h2 style={styles.name}>{name}</h2>
            {position && <p style={styles.position}>{position}</p>}
          </div>
        </header>
        {speech && <section style={styles.speechContent} dangerouslySetInnerHTML={{ __html: speech.replace(/\n/g, '<br />') }} />}
      </article>
    </div>
  );
};

const styles = {
  pageContainer: {
    paddingTop: '30px',
    paddingBottom: '30px',
  },
  headerTitle: {
    textAlign: 'center',
    color: 'var(--primary-color)',
    marginBottom: '40px', // Increased margin
    fontSize: '2.8em', // Larger title
    fontFamily: 'var(--font-family-serif)',
    borderBottom: `2px solid var(--secondary-color)`,
    paddingBottom: '15px',
  },
  article: {
    backgroundColor: 'var(--background-color-white)',
    borderRadius: 'var(--border-radius-large)', // Larger radius
    boxShadow: 'var(--box-shadow-dark)', // Deeper shadow for important message
    padding: '30px 40px', // More padding
    maxWidth: '900px', // Max width for readability
    margin: '0 auto', // Center the article
  },
  messageHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid var(--background-color-light)',
  },
  photo: {
    width: '180px', // Larger photo
    height: '180px',
    objectFit: 'cover',
    borderRadius: '50%', // Circular photo
    marginRight: '30px', // More space
    border: `4px solid var(--primary-color)`, // Thicker border
  },
  name: {
    fontSize: '2em', // Prominent name
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    fontFamily: 'var(--font-family-serif)',
    marginBottom: '5px',
  },
  position: {
    fontSize: '1.2em', // Clear position
    color: 'var(--text-color-medium)',
    fontStyle: 'italic',
  },
  speechContent: {
    fontSize: '1.15em', // Comfortable reading size
    lineHeight: '1.8', // Ample line spacing
    color: 'var(--text-color-dark)',
    whiteSpace: 'pre-line', // Respects newlines from TextField
    textAlign: 'justify', // Justify text for formal look
    textIndent: '2em', // Indent first line of paragraphs (if speech is structured this way)
  },
  messageStatus: {
    fontSize: '1.2em',
    color: 'var(--text-color-medium)',
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
  }
};

export default PresidentMessagePage;
