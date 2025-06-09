import React, { useState, useEffect } from 'react';
import { getStudents } from '../services/api';
import StudentCard from '../components/StudentCard';

const StudentProfilePage = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const response = await getStudents({ limit: 1 });
        if (response.data && response.data.results && response.data.results.length > 0) {
          setStudent(response.data.results[0]);
        } else {
          setError('No student data found.');
        }
      } catch (err) {
        console.error("Error fetching student:", err);
        setError(err.message || 'Failed to fetch student data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  if (loading) {
    return <div style={styles.message}>Loading student profile...</div>;
  }

  if (error) {
    return <div style={styles.message}>Error: {error}</div>;
  }

  // Removed the !student check here because StudentCard handles its own loading/null state
  // This page could eventually display multiple students or a swipe interface

  return (
    <div style={styles.container} className="container"> {/* Using .container utility */}
      <h1 style={styles.header}>Student Profile</h1>
      {student ? (
        <StudentCard student={student} />
      ) : (
        <div style={styles.message}>No student to display.</div>
      )}
      {/* Placeholder for swipe navigation or list view */}
    </div>
  );
};

const styles = {
  // container: { // .container utility class handles padding and max-width
  //   // display: 'flex', // Not necessarily flex for a single centered card
  //   // flexDirection: 'column',
  //   // alignItems: 'center',
  // },
  header: {
    textAlign: 'center',
    color: 'var(--primary-color)',
    marginBottom: '30px', // Increased margin
    fontSize: '2.5em', // Consistent with other page headers
    fontFamily: 'var(--font-family-serif)',
  },
  message: {
    fontSize: '1.2em',
    color: 'var(--text-color-medium)',
    textAlign: 'center',
    marginTop: '50px',
  }
};

export default StudentProfilePage;
