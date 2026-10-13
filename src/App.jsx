import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PirahPage from './pages/PirahPage';
import BirthdayPage from './pages/BirthdayPage';
import './App.css';

/**
 * App Component - Root router configuration
 * Routes:
 * - `/` -> Pirah business homepage
 * - `/birthday` -> Birthday experience for Ife Mi
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PirahPage />} />
        <Route path="/birthday" element={<BirthdayPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
