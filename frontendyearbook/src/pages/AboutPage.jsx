import React, { useState, useEffect } from 'react';
import { getAboutASTU } from '../services/api';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await getAboutASTU();
        // The API returns an array with one object for AboutASTU (pk=1)
        if (response.data && response.data.results && response.data.results.length > 0) {
          setAboutData(response.data.results[0]);
        } else if (response.data && !Array.isArray(response.data)) {
          // Handling cases where the API might directly return the single object if not paginated
          // Or if API directly returns the single object (as get_queryset in view might imply)
           setAboutData(response.data);
        }
         else {
          setError('About ASTU information not found.');
        }
      } catch (err) {
        console.error("Error fetching About ASTU data:", err);
        setError(err.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return <div style={styles.message}>Loading information about ASTU...</div>;
  }

  if (error) {
    return <div style={styles.message}>Error: {error}</div>;
  }

  if (!aboutData) {
    return <div style={styles.message}>No information about ASTU is available.</div>;
  }

  const {
    logo_url,
    vision_statement,
    history_summary,
    campus_photo_url,
    established_year,
    student_count,
    // Assuming the model might have a 'name' or 'university_name' field
    // If not, we use a static title.
    name = "Adama Science and Technology University"
  } = aboutData;

  return (
    <div className="container" style={styles.pageContainer}>
      <header style={styles.headerStyle}>
        {logo_url && <img src={logo_url} alt={`${name} Logo`} style={styles.logo} />}
        <h1 style={styles.mainTitle}>{name}</h1>
      </header>

      {campus_photo_url && (
        <img src={campus_photo_url} alt="ASTU Campus" style={styles.campusPhoto} />
      )}

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Vision</h2>
        <p style={styles.textContent}>{vision_statement || "Vision statement not available."}</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our History</h2>
        <p style={styles.textContent}>{history_summary || "History summary not available."}</p>
      </section>

      <section style={styles.factsSection}>
        <h2 style={styles.sectionTitle}>Key Facts</h2>
        <div style={styles.factsGrid}>
          {established_year && (
            <div style={styles.factItem}>
              <h3 style={styles.factTitle}>Established</h3>
              <p style={styles.factValue}>{established_year}</p>
            </div>
          )}
          {student_count && (
            <div style={styles.factItem}>
              <h3 style={styles.factTitle}>Student Population</h3>
              <p style={styles.factValue}>{student_count.toLocaleString()}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const styles = {
  pageContainer: {
    paddingTop: '30px',
    paddingBottom: '30px',
  },
  headerStyle: {
    textAlign: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: `2px solid var(--secondary-color)`,
  },
  logo: {
    maxHeight: '120px', // Adjust as needed
    marginBottom: '20px',
  },
  mainTitle: {
    color: 'var(--primary-color)',
    fontSize: '2.8em',
    fontFamily: 'var(--font-family-serif)',
    fontWeight: 'bold',
  },
  campusPhoto: {
    width: '100%',
    maxHeight: '450px',
    objectFit: 'cover',
    borderRadius: 'var(--border-radius-large)',
    marginBottom: '40px',
    boxShadow: 'var(--box-shadow-dark)',
  },
  section: {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: 'var(--background-color-white)',
    borderRadius: 'var(--border-radius-medium)',
    boxShadow: 'var(--box-shadow-light)',
  },
  sectionTitle: {
    color: 'var(--primary-color)',
    fontSize: '2em',
    marginBottom: '15px',
    fontFamily: 'var(--font-family-serif)',
    borderBottom: '1px solid var(--background-color-light)',
    paddingBottom: '10px',
  },
  textContent: {
    fontSize: '1.1em',
    lineHeight: '1.8',
    color: 'var(--text-color-medium)',
    whiteSpace: 'pre-line', // Respect newlines from TextField
  },
  factsSection: {
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: `1px solid var(--background-color-light)`,
  },
  factsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    textAlign: 'center',
  },
  factItem: {
    padding: '20px',
    backgroundColor: 'var(--background-color-white)',
    borderRadius: 'var(--border-radius-medium)',
    boxShadow: 'var(--box-shadow-light)',
  },
  factTitle: {
    fontSize: '1.2em',
    color: 'var(--tertiary-color)',
    marginBottom: '8px',
    fontFamily: 'var(--font-family-sans-serif)',
  },
  factValue: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
  },
  message: {
    fontSize: '1.2em',
    color: 'var(--text-color-medium)',
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
  }
};

export default AboutPage;
