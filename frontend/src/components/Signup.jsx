import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Signup = ({ onSignup, onSwitchToLogin, onBackToLanding }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: name }
        }
      });
      if (error) {
        setError(error.message || 'Signup failed.');
        setLoading(false);
        return;
      }
      setSuccess(true);
      localStorage.setItem('pendingProfileName', name);
      // Optionally, you can store the name in a profile table after signup confirmation
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <div className="text-indigo-200 text-sm text-center">Join us and start achieving your goals today!</div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up for Focus Center</h2>
        {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
        {success && <div className="mb-4 text-green-400 text-sm">Signup successful! Please check your email to verify your account.</div>}
        <div className="mb-4">
          <label htmlFor="signup-name" className="block text-white/80 mb-1">Name</label>
          <input id="signup-name" type="text" className="w-full px-3 py-2 rounded bg-white/20 text-white focus:outline-none" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="signup-email" className="block text-white/80 mb-1">Email</label>
          <input id="signup-email" type="email" className="w-full px-3 py-2 rounded bg-white/20 text-white focus:outline-none" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="signup-password" className="block text-white/80 mb-1">Password</label>
          <input id="signup-password" type="password" className="w-full px-3 py-2 rounded bg-white/20 text-white focus:outline-none" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="mb-6">
          <label htmlFor="signup-confirm-password" className="block text-white/80 mb-1">Confirm Password</label>
          <input id="signup-confirm-password" type="password" className="w-full px-3 py-2 rounded bg-white/20 text-white focus:outline-none" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold transition-colors mb-4" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
        <div className="text-center text-white/70 text-sm">
          Already have an account?{' '}
          <button type="button" className="text-indigo-400 hover:underline" onClick={onSwitchToLogin}>Log in</button>
        </div>
      </form>
    </div>
  );
};

export default Signup; 