import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';

function AppRoutes() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const goals = [
    {
      id: 1,
      title: "Launch My Online Business",
      progress: 65,
      steps: 8,
      completed: 5,
      streak: 12,
      priority: "high"
    },
    {
      id: 2,
      title: "Master React Development",
      progress: 40,
      steps: 15,
      completed: 6,
      streak: 8,
      priority: "medium"
    },
    {
      id: 3,
      title: "Build Daily Exercise Habit",
      progress: 85,
      steps: 12,
      completed: 10,
      streak: 21,
      priority: "high"
    }
  ];

  const aiAgents = [
    { name: "Focus Coach", avatar: "🎯", status: "active", specialty: "Eliminating distractions" },
    { name: "Goal Strategist", avatar: "📋", status: "active", specialty: "Breaking down complex goals" },
    { name: "Motivation Mentor", avatar: "🚀", status: "active", specialty: "Maintaining momentum" },
    { name: "Habit Builder", avatar: "⚡", status: "standby", specialty: "Creating lasting routines" }
  ];

  // Handlers for login/signup
  const handleLogin = (userObj) => {
    setUser(userObj);
    navigate('/dashboard');
  };
  const handleSignup = (userObj) => {
    setUser(userObj);
    navigate('/dashboard');
  };
  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage setActiveView={(view) => {
        if (view === 'login') navigate('/login');
        else if (view === 'signup') navigate('/signup');
        else if (view === 'dashboard') navigate('/dashboard');
        else navigate('/');
      }} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} onSwitchToSignup={() => navigate('/signup')} onBackToLanding={() => navigate('/')} />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup onSignup={handleSignup} onSwitchToLogin={() => navigate('/login')} onBackToLanding={() => navigate('/')} />} />
      <Route path="/dashboard" element={user ? <Dashboard setActiveView={() => { }} selectedGoal={selectedGoal} setSelectedGoal={setSelectedGoal} goals={goals} aiAgents={aiAgents} user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App; 