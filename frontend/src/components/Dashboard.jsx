import React from 'react';
import { Zap } from 'lucide-react';

const Dashboard = ({ selectedGoal, setSelectedGoal, goals, aiAgents, user, onLogout }) => {
  const displayName = user?.name || user?.user_metadata?.display_name || user?.email || 'User';

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {`Welcome back, ${displayName}!`}
        </h1>
        <p className="text-gray-600">You're making great progress. Let's keep the momentum going!</p>
        <div className="text-sm text-gray-500 mt-1">
          {user?.email && <span>Email: {user.email}</span>}
        </div>
      </div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Active Goals", value: "3", icon: null, change: "+1" },
          { label: "Completed Steps", value: "21", icon: null, change: "+5" },
          { label: "Current Streak", value: "12", icon: null, change: "+2" },
          { label: "Achievement Score", value: "847", icon: null, change: "+43" }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="flex flex-col items-end">
                {stat.icon}
                <span className="text-sm text-green-600 mt-1">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Goals Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Goals</h2>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div 
                key={goal.id} 
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedGoal === goal.id 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedGoal(goal.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{goal.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    goal.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {goal.priority}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{goal.completed}/{goal.steps} steps completed</span>
                  <span className="flex items-center space-x-1">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>{goal.streak} day streak</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* AI Agents Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your AI Team</h2>
          <div className="space-y-4">
            {aiAgents.map((agent, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                <div className="text-2xl">{agent.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">{agent.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      agent.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{agent.specialty}</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                  Chat
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { time: "2 hours ago", action: "Completed step: 'Research target market'", goal: "Launch My Online Business" },
            { time: "1 day ago", action: "Achieved 20-day streak!", goal: "Build Daily Exercise Habit" },
            { time: "2 days ago", action: "Started new goal", goal: "Master React Development" },
            { time: "3 days ago", action: "Completed goal milestone", goal: "Launch My Online Business" }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.goal} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard; 