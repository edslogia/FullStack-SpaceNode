import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Navbar from "./components/Navbar";
import PublicDashboard from "./pages/PublicDashboard";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import OperatorDashboard from "./pages/OperatorDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<PublicDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard-admin"
              element={
                <PrivateRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard-operator"
              element={
                <PrivateRoute requiredRole="OPERATOR">
                  <OperatorDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
