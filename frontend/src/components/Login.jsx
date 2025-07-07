import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

const Login = ({ onLogin, onSwitchToSignup, onBackToLanding }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    onLogin({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Back button */}
      <button
        onClick={onBackToLanding}
        className="absolute left-4 top-4 flex items-center text-indigo-400 hover:text-indigo-300 focus:outline-none"
        aria-label="Back to landing"
      >
        <ArrowLeft className="h-6 w-6 mr-1" />
        <span className="hidden md:inline text-base font-medium">Back</span>
      </button>
      <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Banner */}
        <div className="flex flex-col items-center mb-8">
          <button
            type="button"
            onClick={onBackToLanding}
            className="flex items-center space-x-2 mb-2 focus:outline-none group"
            aria-label="Back to landing"
          >
            <Brain className="h-8 w-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            <span className="text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors">Focus Center</span>
          </button>
          <div className="text-indigo-200 text-sm text-center">Welcome back! Log in to continue your journey.</div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login to Focus Center</h2>
        {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
        <div className="mb-4">
          <label className="block text-white/80 mb-1">Email</label>
          <input type="email" className="w-full px-3 py-2 rounded bg-white/20 text-white focus:outline-none" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-white/80 mb-1">Password</label>
          <input type="password" className="w-full px-3 py-2 rounded bg-white/20 text-white focus:outline-none" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold transition-colors mb-4">Login</button>
        <div className="text-center text-white/70 text-sm">
          Don't have an account?{' '}
          <button type="button" className="text-indigo-400 hover:underline" onClick={onSwitchToSignup}>Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Login; 