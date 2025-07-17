import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const DashboardNavbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 w-full z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">AchieveMind</span>
            </div>
            <div className="hidden md:flex items-center space-x-6 ml-10">
              <button className="text-gray-700 hover:text-indigo-600 font-medium" onClick={() => navigate('/dashboard')}>Dashboard</button>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => navigate('/goals')}>Goals</button>
              <button className="text-gray-500 hover:text-gray-700">Progress</button>
              <button className="text-gray-500 hover:text-gray-700">Habits</button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow transition-colors"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm animate-fadein">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Logout?</h2>
            <p className="mb-6 text-gray-700">Are you sure you want to logout and end your session?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 font-semibold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const DashboardLayout = ({ children, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar onLogout={onLogout} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout; 