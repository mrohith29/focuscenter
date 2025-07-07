import React, { useState, useEffect } from 'react';
import { Brain, X, Menu, Play, ArrowRight, Target, BarChart3, Zap, TrendingUp, Calendar, Users } from 'lucide-react';

const stats = [
  { label: 'Goals Achieved', value: "12000+" },
  { label: 'Active Users', value: "5300+" },
  { label: 'AI Agents', value: "4+" },
];

const quotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "The secret of getting ahead is getting started.",
  "You don't have to be great to start, but you have to start to be great.",
  "Discipline is the bridge between goals and accomplishment.",
];

const faqs = [
  {
    question: "Is Focus Center really free?",
    answer: "Yes! You can use all the core features for free, including adding one goal, sub-goals, and simple progress tracking. Upgrade to Pro for unlimited goals and advanced features.",
  },
  {
    question: "Can I cancel my Pro subscription anytime?",
    answer: "Absolutely. You can cancel your Pro plan at any time from your account settings. Your access will remain until the end of your billing period.",
  },
  {
    question: "How does the AI help me?",
    answer: "Our AI agents provide personalized guidance, break down your goals, and keep you motivated with actionable insights and reminders.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use industry-standard security practices to keep your data safe and private. We never share your information without your consent.",
  },
];

const animatedWords = ["Dreams", "Goals", "Ideas", "Ambitions", "Visions"];

const AnimatedWord = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % animatedWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);
  return (
    <span
      className="inline-block align-middle mx-2 min-w-[130px] text-center"
      aria-live="polite"
      style={{ verticalAlign: 'middle', position: 'relative', top: '-7px' }}
    >
      <span
        key={animatedWords[index]}
        className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 animate-fadein text-4xl md:text-6xl font-bold"
        style={{
          opacity: 1,
          transition: 'opacity 0.7s',
          willChange: 'opacity',
          display: 'inline-block',
        }}
      >
        {animatedWords[index]}
      </span>
    </span>
  );
};

function useAnimatedCounter(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    let raf;
    function animate() {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        raf = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return count;
}

const AnimatedStats = () => (
  <div className="flex flex-col sm:flex-row justify-center gap-8 mt-10 mb-8">
    {stats.map((stat, idx) => {
      const count = useAnimatedCounter(stat.value);
      return (
        <div key={stat.label} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-indigo-400">
            {count.toLocaleString()}
          </div>
          <div className="text-white/80 text-lg mt-1">{stat.label}</div>
        </div>
      );
    })}
  </div>
);

const QuoteRotator = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="text-indigo-200 italic text-lg mb-6 min-h-[32px] transition-opacity duration-700">
      "{quotes[index]}"
    </div>
  );
};

const PricingToggle = ({ isYearly, setIsYearly }) => (
  <div className="flex items-center justify-center mb-10">
    <span className={`text-sm font-medium px-2 ${isYearly ? 'text-indigo-400' : 'text-white/60'}`}>Yearly</span>
    <button
      className={`relative w-14 h-7 bg-white/20 rounded-full flex items-center transition-colors duration-300 mx-2 focus:outline-none`}
      onClick={() => setIsYearly((v) => !v)}
      aria-label="Toggle pricing"
    >
      <span
        className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-indigo-500 shadow-md transition-transform duration-300 ${isYearly ? '' : 'translate-x-7'}`}
      ></span>
      <span className="sr-only">Toggle pricing</span>
    </button>
    <span className={`text-sm font-medium px-2 ${!isYearly ? 'text-indigo-400' : 'text-white/60'}`}>Monthly</span>
  </div>
);

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div key={faq.question} className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
          <button
            className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none hover:bg-white/10 transition-colors"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            <span className="text-lg font-semibold text-indigo-300">{faq.question}</span>
            <span className={`ml-4 text-indigo-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-90' : ''}`}>▶</span>
          </button>
          <div
            className={`px-6 pb-4 text-white/80 text-base transition-all duration-300 ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            style={{ transitionProperty: 'max-height, opacity' }}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => setActiveView('login')}
      className="fixed bottom-8 right-8 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-colors"
      aria-label="Back to top"
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
    </button>
  );
};

const LandingPage = ({ setActiveView, isMenuOpen, setIsMenuOpen }) => {
  const [isYearly, setIsYearly] = useState(true);
  const yearlyPrice = 99;
  const monthlyPrice = 12;
  const yearlyPerMonth = (yearlyPrice / 12).toFixed(2);
  const savings = Math.round((1 - (monthlyPrice * 12) / yearlyPrice) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold text-white">Focus Center</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
              <button 
                onClick={() => setActiveView('login')}
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
          <QuoteRotator />
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transform Your
              <AnimatedWord />
              <br />Into Reality
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Overcome procrastination and achieve your most important goals with our AI-powered productivity platform. 
              Get personalized guidance, actionable steps, and motivation tailored to your unique journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setActiveView('login')}
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
          <AnimatedStats />
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
                title: "Note Taking",
                description: "Take notes, organize your thoughts, and keep track of your progress"
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
      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-xl text-white/80">Real stories from people achieving more with Focus Center</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 border border-white/20 rounded-xl p-6 flex flex-col items-center shadow-lg hover:scale-105 hover:bg-white/20 transition-all duration-300">
              <div className="text-lg font-semibold text-white mb-2">“Focus Center helped me finally launch my business!”</div>
              <div className="text-indigo-300 text-sm mb-2">Alex P.</div>
              <div className="text-white/60 text-xs">Entrepreneur</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-6 flex flex-col items-center shadow-lg hover:scale-105 hover:bg-white/20 transition-all duration-300">
              <div className="text-lg font-semibold text-white mb-2">“The AI agents keep me motivated and on track every day.”</div>
              <div className="text-indigo-300 text-sm mb-2">Samira K.</div>
              <div className="text-white/60 text-xs">Student</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-6 flex flex-col items-center shadow-lg hover:scale-105 hover:bg-white/20 transition-all duration-300">
              <div className="text-lg font-semibold text-white mb-2">“I love the progress tracking and how easy it is to break down my goals.”</div>
              <div className="text-indigo-300 text-sm mb-2">Jordan L.</div>
              <div className="text-white/60 text-xs">Designer</div>
            </div>
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
            onClick={() => setActiveView('login')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-2"
          >
            <span>Start Your Free Trial</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pricing</h2>
            <p className="text-xl text-white/80">Choose the plan that fits your journey</p>
          </div>
          <PricingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
          <div className="grid md:grid-cols-2 gap-10">
            {/* Free Plan */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-8 flex flex-col items-center shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">Free</h3>
              <div className="text-4xl font-extrabold text-indigo-400 mb-4">$0</div>
              <ul className="text-white/90 text-lg mb-8 space-y-3 text-left w-full max-w-xs mx-auto">
                <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-indigo-400 rounded-full"></span> Add <span className="font-semibold">1 personal goal</span></li>
                <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-indigo-400 rounded-full"></span> Organize with sub-goals</li>
                <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-indigo-400 rounded-full"></span> Simple, visual progress tracking</li>
              </ul>
              <div className="text-white/70 text-sm mb-4 text-center">Perfect for getting started and focusing on your most important goal.</div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full shadow-md">Get Started</button>
            </div>
            {/* Paid Plan */}
            <div className="bg-white/10 border-2 border-indigo-400 rounded-xl p-8 flex flex-col items-center shadow-lg relative hover:scale-105 transition-transform duration-300">
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">Most Popular</span>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">Pro</h3>
              <div className="text-4xl font-extrabold text-indigo-400 mb-2">
                {isYearly ? (
                  <>
                    $99 <span className="text-lg font-normal">/year</span>
                    <div className="text-base font-medium text-indigo-200 mt-1">${yearlyPerMonth}/month</div>
                  </>
                ) : (
                  <>
                    $12 <span className="text-lg font-normal">/month</span>
                  </>
                )}
              </div>
              <ul className="text-white/90 text-lg mb-8 space-y-3 text-left w-full max-w-xs mx-auto">
                <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-indigo-400 rounded-full"></span> All Free features</li>
                <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-indigo-400 rounded-full"></span> Unlimited goals & sub-goals</li>
                <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-indigo-400 rounded-full"></span> Advanced analytics & insights</li>
                <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-indigo-400 rounded-full"></span> AI-powered productivity tools</li>
                <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-indigo-400 rounded-full"></span> Priority customer support</li>
              </ul>
              {isYearly ? (
                <div className="text-green-400 text-sm font-semibold mb-4">Save 31% compared to monthly</div>
              ) : (
                <div className="text-indigo-300 text-sm mb-4">Switch to yearly and save 31%</div>
              )}
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full shadow-md">Upgrade to Pro</button>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-white/80">Everything you need to know before getting started</p>
          </div>
          <FAQAccordion />
        </div>
      </section>
      <BackToTopButton />
      {/* Footer Section */}
      <footer className="bg-slate-950 border-t border-white/10 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Brain className="h-7 w-7 text-indigo-400" />
            <span className="text-lg font-bold text-white">Focus Center</span>
          </div>
          {/* Navigation Links and CTA */}
          <div className="flex flex-col items-center md:items-center gap-4">
            <nav className="flex flex-col md:flex-row gap-4 md:gap-8 text-white/80 text-sm">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            </nav>
            <button
              onClick={() => setActiveView('login')}
              className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md"
            >
              Get Started
            </button>
          </div>
          {/* Contact and Socials */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <a href="mailto:support@focuscenter.com" className="text-white/80 hover:text-white text-sm">support@focuscenter.com</a>
            <div className="flex gap-4 mt-2">
              <a href="#" aria-label="Twitter" className="hover:text-indigo-400 text-white/60 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 19c11 0 13-9 13-13v-.5A9.72 9.72 0 0023 3a9.72 9.72 0 01-2.828.775A4.932 4.932 0 0022.338 2c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0016.616 2c-2.73 0-4.942 2.21-4.942 4.942 0 .387.044.763.127 1.124C7.728 7.89 4.1 6.13 1.671 3.149c-.423.726-.666 1.57-.666 2.475 0 1.708.87 3.216 2.188 4.099A4.904 4.904 0 012 8.1v.062c0 2.385 1.697 4.374 3.946 4.827-.413.112-.849.172-1.298.172-.317 0-.626-.03-.927-.086.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 012 19.54a13.94 13.94 0 007.548 2.212" /></svg></a>
              <a href="#" aria-label="GitHub" className="hover:text-indigo-400 text-white/60 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.566 4.936.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.578.688.48C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-indigo-400 text-white/60 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5a6 6 0 016-6zm-4 0V6a4 4 0 118 0v2" /></svg></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-white/40 text-xs">&copy; {new Date().getFullYear()} Focus Center. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default LandingPage; 