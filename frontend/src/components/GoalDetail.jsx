import React from 'react';
import { useParams } from 'react-router-dom';

const GoalDetail = ({ goals, aiAgents, user }) => {
  const { goalId } = useParams();
  const goal = goals.find(g => String(g.id) === String(goalId));

  if (!goal) return <div className="min-h-screen flex items-center justify-center">Goal not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{goal.title}</h1>
        <div className="mb-4 text-gray-700">Progress: {goal.progress}%</div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${goal.progress}%` }}></div>
        </div>
        <div className="mb-6 text-sm text-gray-600">{goal.completed}/{goal.steps} steps completed</div>
        {/* Placeholder for steps, subgoals, and AI chat */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">Steps and subgoals will go here.</div>
        <div className="bg-white rounded-lg shadow p-6">AI chat history will go here.</div>
      </div>
    </div>
  );
};

export default GoalDetail; 