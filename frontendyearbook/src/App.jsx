import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import StudentProfilePage from './pages/StudentProfilePage';
import DepartmentGalleriesPage from './pages/DepartmentGalleriesPage';
import MemoryBoardPage from './pages/MemoryBoardPage';
import AlumniSuccessPage from './pages/AlumniSuccessPage';
import AboutPage from './pages/AboutPage';
import FacultyTributesPage from './pages/FacultyTributesPage';
import PresidentMessagePage from './pages/PresidentMessagePage';
import NotFoundPage from './pages/NotFoundPage'; // Added import

import './App.css';
// import './index.css'; // Already imported in main.jsx

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentProfilePage />} />
          <Route path="/departments" element={<DepartmentGalleriesPage />} />
          <Route path="/memories" element={<MemoryBoardPage />} />
          <Route path="/alumni" element={<AlumniSuccessPage />} />
          <Route path="/faculty-tributes" element={<FacultyTributesPage />} />
          <Route path="/president-message" element={<PresidentMessagePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Added route */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
