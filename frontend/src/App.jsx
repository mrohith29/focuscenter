import React, { useState } from 'react';
import { Target, Brain, TrendingUp, Users, CheckCircle, Star, ArrowRight, Menu, X, Play, BarChart3, Calendar, Zap, Shield, Award, Clock } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState('landing');
  const [selectedGoal, setSelectedGoal] = useState(null);

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

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold text-white">AchieveMind</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
              <button 
                onClick={() => setActiveView('dashboard')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transform Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"> Dreams</span>
              <br />Into Reality
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Overcome procrastination and achieve your most important goals with our AI-powered productivity platform. 
              Get personalized guidance, actionable steps, and motivation tailored to your unique journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setActiveView('dashboard')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Start Your Journey</span>
              </button>
              <button className="border border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-white/80">
              Powerful features designed to eliminate procrastination and maximize your potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="h-8 w-8 text-indigo-400" />,
                title: "Goal Clarification",
                description: "AI-powered questioning to help you define crystal-clear, achievable goals"
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-emerald-400" />,
                title: "Smart Breakdown",
                description: "Automatically break complex goals into manageable, actionable steps"
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-400" />,
                title: "Motivation Engine",
                description: "Personalized encouragement and insights to keep you moving forward"
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-green-400" />,
                title: "Progress Tracking",
                description: "Visual analytics and insights to monitor your journey in real-time"
              },
              {
                icon: <Calendar className="h-8 w-8 text-purple-400" />,
                title: "Habit Building",
                description: "Create lasting positive habits with streak tracking and smart reminders"
              },
              {
                icon: <Users className="h-8 w-8 text-pink-400" />,
                title: "AI Collaboration",
                description: "Multiple specialized AI agents working together to support your success"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How AchieveMind Works
            </h2>
            <p className="text-xl text-white/80">
              A simple, powerful process to transform your aspirations into achievements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Define Your Vision",
                description: "Share your goals and aspirations. Our AI helps clarify and refine them into actionable objectives.",
                icon: <Target className="h-12 w-12 text-indigo-400" />
              },
              {
                step: "02",
                title: "Get Your Roadmap",
                description: "Receive a personalized action plan with clear steps, timelines, and milestone checkpoints.",
                icon: <BarChart3 className="h-12 w-12 text-emerald-400" />
              },
              {
                step: "03",
                title: "Take Action",
                description: "Execute your plan with AI guidance, motivation, and real-time adjustments based on your progress.",
                icon: <Zap className="h-12 w-12 text-yellow-400" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center border border-white/20">
                  {step.icon}
                </div>
                <div className="text-sm font-semibold text-indigo-400 mb-2">STEP {step.step}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Achieve Your Goals?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of users who have transformed their lives with AchieveMind
          </p>
          <button 
            onClick={() => setActiveView('dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-2"
          >
            <span>Start Your Free Trial</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900">AchieveMind</span>
              </div>
              <div className="hidden md:flex items-center space-x-6 ml-10">
                <button className="text-gray-700 hover:text-indigo-600 font-medium">Dashboard</button>
                <button className="text-gray-500 hover:text-gray-700">Goals</button>
                <button className="text-gray-500 hover:text-gray-700">Progress</button>
                <button className="text-gray-500 hover:text-gray-700">Habits</button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Add Goal
              </button>
              <button 
                onClick={() => setActiveView('landing')}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Alex!</h1>
          <p className="text-gray-600">You're making great progress. Let's keep the momentum going!</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Active Goals", value: "3", icon: <Target className="h-6 w-6 text-indigo-600" />, change: "+1" },
            { label: "Completed Steps", value: "21", icon: <CheckCircle className="h-6 w-6 text-green-600" />, change: "+5" },
            { label: "Current Streak", value: "12", icon: <Zap className="h-6 w-6 text-yellow-600" />, change: "+2" },
            { label: "Achievement Score", value: "847", icon: <Award className="h-6 w-6 text-purple-600" />, change: "+43" }
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
      </div>
    </div>
  );

  return activeView === 'landing' ? <LandingPage /> : <Dashboard />;
}



export default App; 