import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Goals = ({ setSelectedGoal, selectedGoal, user }) => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [deleteGoalId, setDeleteGoalId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user && user.id) fetchGoals();
    // eslint-disable-next-line
  }, [user]);

  async function fetchGoals() {
    setLoading(true);
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (data) setGoals(data);
    setLoading(false);
  }

  const handleGoalClick = (goalId) => {
    setSelectedGoal(goalId);
    navigate(`/goals/${goalId}`);
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    if (!form.title) {
      setError('Title is required.');
      setSubmitting(false);
      return;
    }
    const { error: insertError } = await supabase.from('goals').insert([
      {
        user_id: user.id,
        title: form.title,
        description: form.description,
        priority: form.priority,
        status: 'active',
      }
    ]);
    if (insertError) {
      setError(insertError.message);
    } else {
      setShowModal(false);
      setForm({ title: '', description: '', priority: 'medium' });
      fetchGoals();
    }
    setSubmitting(false);
  };

  const handleDeleteGoal = async (goalId) => {
    setDeleting(true);
    await supabase.from('goals').delete().eq('id', goalId);
    setDeleteGoalId(null);
    fetchGoals();
    setDeleting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Goals</h1>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
            onClick={() => setShowModal(true)}
          >
            + Add Goal
          </button>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading goals...</div>
        ) : goals.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No goals yet. Start by adding one!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map(goal => (
              <div
                key={goal.id}
                className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${selectedGoal === goal.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => handleGoalClick(goal.id)}
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h2>
                <div className="mb-2 text-sm text-gray-600">{goal.description}</div>
                <div className="mb-2 text-sm text-gray-600">Priority: {goal.priority || 'medium'}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${goal.progress || 0}%` }}></div>
                </div>
                <div className="text-xs text-gray-500">{goal.completed || 0}/{goal.steps || 0} steps completed</div>
                <div className="absolute bottom-2 right-4 text-xs text-gray-400">{goal.created_at ? new Date(goal.created_at).toLocaleString() : ''}</div>
                <button
                  type="button"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow"
                  onClick={e => { e.stopPropagation(); setDeleteGoalId(goal.id); }}
                  aria-label="Delete goal"
                >
                  &#128465;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Modal for adding a goal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fadein"
            onSubmit={handleAddGoal}
          >
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Add New Goal</h2>
            {error && <div className="mb-2 text-red-500 text-sm">{error}</div>}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Priority</label>
              <select
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none"
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value })}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold transition-colors"
              disabled={submitting}
            >
              {submitting ? 'Adding...' : 'Add Goal'}
            </button>
          </form>
        </div>
      )}
      {/* Delete confirmation modal */}
      {deleteGoalId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm animate-fadein">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Delete Goal?</h2>
            <p className="mb-6 text-gray-700">Are you sure you want to delete this goal? This will remove all related data and cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => setDeleteGoalId(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={() => handleDeleteGoal(deleteGoalId)}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals; 