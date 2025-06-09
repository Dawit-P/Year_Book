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
        // Fetching all students and taking the first one for now
        // We can later modify this to fetch a specific student by ID
        // or implement logic for featured/random student.
        const response = await getStudents({ limit: 1 }); // Fetch 1 student
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

  if (!student) {
    return <div style={styles.message}>No student to display.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Student Profile</h1>
      <StudentCard student={student} />
      {/* Later, we can add navigation for swipeable cards or a list here */}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f4f7f6', // Light background for the page
  },
  header: {
    color: '#333',
    marginBottom: '20px',
    fontFamily: "'Georgia', serif", // Example of a more "nostalgic" font
  },
  message: {
    fontSize: '1.2em',
    color: '#555',
    textAlign: 'center',
    marginTop: '50px',
  }
};

export default StudentProfilePage;
