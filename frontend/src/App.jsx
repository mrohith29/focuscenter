import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState('landing');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'
  const [user, setUser] = useState(null); // null if not logged in

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
  const handleLogin = (credentials) => {
    // TODO: Integrate with backend
    setUser({ email: credentials.email });
    setActiveView('dashboard');
  };
  const handleSignup = (info) => {
    // TODO: Integrate with backend
    setUser({ name: info.name, email: info.email });
    setActiveView('dashboard');
  };
  const handleLogout = () => {
    setUser(null);
    setActiveView('landing');
  };

  // Routing logic
  if (!user) {
    if (activeView === 'login') {
      return <Login onLogin={handleLogin} onSwitchToSignup={() => setActiveView('signup')} onBackToLanding={() => setActiveView('landing')} />;
    }
    if (activeView === 'signup') {
      return <Signup onSignup={handleSignup} onSwitchToLogin={() => setActiveView('login')} onBackToLanding={() => setActiveView('landing')} />;
    }
    return <LandingPage setActiveView={setActiveView} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />;
  }

  // User is logged in
  return (
    <Dashboard
      setActiveView={setActiveView}
      selectedGoal={selectedGoal}
      setSelectedGoal={setSelectedGoal}
      goals={goals}
      aiAgents={aiAgents}
      user={user}
      onLogout={handleLogout}
    />
  );
}

export default App; 