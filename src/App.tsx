import { useState, useEffect } from 'react';
import { Moon, Sun, Star, Shield, Zap, Heart } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-white text-gray-900'
    }`}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
            50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.6); }
          }
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes counter {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
          .animate-gradient { 
            background-size: 200% 200%;
            animation: gradient-shift 8s ease infinite;
          }
          .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
          .animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
          .animate-counter { animation: counter 1s ease-out forwards; }
          .hover-lift { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
          .hover-lift:hover { transform: translateY(-8px) scale(1.02); }
          .glass-effect {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text-gradient {
            background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `
      }} />
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-500 z-50 hover:scale-110 hover-lift group ${
          isDarkMode
            ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400 animate-pulse-glow'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-lg'
        }`}
      >
        <div className="relative">
          {isDarkMode ? (
            <Sun size={24} className="transition-all duration-300 group-hover:rotate-180" />
          ) : (
            <Moon size={24} className="transition-all duration-300 group-hover:rotate-12" />
          )}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
      </button>

      {/* Hero/CTA Section */}
      <section className={`relative py-20 px-6 overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 animate-float ${
            isDarkMode ? 'bg-yellow-400' : 'bg-blue-500'
          }`}></div>
          <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5 animate-float ${
            isDarkMode ? 'bg-purple-500' : 'bg-green-500'
          }`} style={{ animationDelay: '2s' }}></div>
          <div className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-5 animate-float ${
            isDarkMode ? 'bg-blue-500' : 'bg-purple-500'
          }`} style={{ animationDelay: '4s' }}></div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text Content */}
            <div className="space-y-8 relative z-10">
              <div className="space-y-4">
                <h1 className={`text-5xl lg:text-6xl font-bold leading-tight animate-slide-up ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Premium Rubber
                  <span className={`block text-gradient animate-gradient ${isDarkMode ? '' : 'text-blue-600'}`}>
                    Duck Collection
                  </span>
                </h1>
                <p className={`text-xl leading-relaxed animate-slide-up ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`} style={{ animationDelay: '0.2s' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <button className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover-lift group relative overflow-hidden ${
                  isDarkMode
                    ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:shadow-2xl'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-2xl'
                }`}>
                  <span className="relative z-10">Shop Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className={`px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-300 hover-lift group glass-effect ${
                  isDarkMode
                    ? 'border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400'
                    : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                }`}>
                  <span className="relative z-10">Learn More</span>
                </button>
              </div>

              <div className="flex items-center space-x-6 pt-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 fill-current transition-all duration-300 hover:scale-125 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Trusted by 10,000+ customers
                </span>
              </div>
            </div>

            {/* Right side - Hero Image */}
            <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-gray-800 hover-lift group">
                <img
                  src="https://images.unsplash.com/photo-1563906267088-b029e7101114?w=600&amp;h=400&amp;fit=crop"
                  alt="Premium rubber duck collection"
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className={`absolute -bottom-6 -left-6 p-6 rounded-xl shadow-lg glass-effect hover-lift ${
                isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white/80 border border-gray-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse-glow ${
                    isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-blue-600 text-white'
                  }`}>
                    <Heart className="w-6 h-6 transition-transform duration-300 hover:scale-125" />
                  </div>
                  <div>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Premium Quality
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Handcrafted Excellence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Z-Pattern Layout */}
      <section className={`py-20 px-6 relative ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${isDarkMode ? '#fbbf24' : '#3b82f6'} 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16" data-animate id="features-header">
            <h2 className={`text-4xl font-bold mb-4 transition-all duration-700 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            } ${isVisible['features-header'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`}>
              Why Choose Our Ducks?
            </h2>
            <p className={`text-xl transition-all duration-700 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } ${isVisible['features-header'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.2s' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>

          {/* Feature 1 - Z-Pattern: Image Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20" data-animate id="feature-1">
            <div className={`space-y-6 transition-all duration-700 ${
              isVisible['feature-1'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
            }`}>
              <div className={`inline-flex p-3 rounded-lg transition-all duration-300 hover:scale-110 hover-lift ${
                isDarkMode ? 'bg-yellow-400 text-gray-900 animate-pulse-glow' : 'bg-blue-600 text-white'
              }`}>
                <Shield className="w-8 h-8 transition-transform duration-300 hover:rotate-12" />
              </div>
              <h3 className={`text-3xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white hover:text-yellow-400' : 'text-gray-900 hover:text-blue-600'
              }`}>
                Premium Materials
              </h3>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <ul className={`space-y-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {['Non-toxic materials', 'Durable construction', 'Waterproof design'].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2 group">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150 ${
                      isDarkMode ? 'bg-yellow-400' : 'bg-blue-600'
                    }`}></div>
                    <span className="transition-colors duration-300 group-hover:text-current">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`rounded-2xl overflow-hidden shadow-xl bg-gray-700 hover-lift group transition-all duration-700 ${
              isVisible['feature-1'] ? 'animate-scale-in' : 'opacity-0 scale-90'
            }`} style={{ animationDelay: '0.3s' }}>
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&amp;h=400&amp;fit=crop"
                alt="Premium rubber duck materials"
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Feature 2 - Z-Pattern: Image Left */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20" data-animate id="feature-2">
            <div className={`rounded-2xl overflow-hidden shadow-xl lg:order-1 bg-gray-700 hover-lift group transition-all duration-700 ${
              isVisible['feature-2'] ? 'animate-scale-in' : 'opacity-0 scale-90'
            }`}>
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&amp;h=400&amp;fit=crop"
                alt="Fast delivery rubber ducks"
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className={`space-y-6 lg:order-2 transition-all duration-700 ${
              isVisible['feature-2'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
            }`} style={{ animationDelay: '0.2s' }}>
              <div className={`inline-flex p-3 rounded-lg transition-all duration-300 hover:scale-110 hover-lift ${
                isDarkMode ? 'bg-yellow-400 text-gray-900 animate-pulse-glow' : 'bg-blue-600 text-white'
              }`}>
                <Zap className="w-8 h-8 transition-transform duration-300 hover:rotate-12" />
              </div>
              <h3 className={`text-3xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white hover:text-yellow-400' : 'text-gray-900 hover:text-blue-600'
              }`}>
                Lightning Fast Delivery
              </h3>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center group hover-lift">
                  <div className={`text-3xl font-bold transition-all duration-300 group-hover:scale-110 animate-counter ${
                    isDarkMode ? 'text-yellow-400' : 'text-blue-600'
                  }`}>24h</div>
                  <div className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-500'
                  }`}>Express Delivery</div>
                </div>
                <div className="text-center group hover-lift">
                  <div className={`text-3xl font-bold transition-all duration-300 group-hover:scale-110 animate-counter ${
                    isDarkMode ? 'text-yellow-400' : 'text-blue-600'
                  }`} style={{ animationDelay: '0.2s' }}>99%</div>
                  <div className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-500'
                  }`}>On-time Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3 - Z-Pattern: Image Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center" data-animate id="feature-3">
            <div className={`space-y-6 transition-all duration-700 ${
              isVisible['feature-3'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
            }`}>
              <div className={`inline-flex p-3 rounded-lg transition-all duration-300 hover:scale-110 hover-lift ${
                isDarkMode ? 'bg-yellow-400 text-gray-900 animate-pulse-glow' : 'bg-blue-600 text-white'
              }`}>
                <Heart className="w-8 h-8 transition-transform duration-300 hover:rotate-12" />
              </div>
              <h3 className={`text-3xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white hover:text-yellow-400' : 'text-gray-900 hover:text-blue-600'
              }`}>
                Customer Satisfaction
              </h3>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 fill-current transition-all duration-300 hover:scale-125 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <span className={`font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-white hover:text-yellow-400' : 'text-gray-900 hover:text-blue-600'
                }`}>4.9/5 Rating</span>
              </div>
            </div>
            <div className={`rounded-2xl overflow-hidden shadow-xl bg-gray-700 hover-lift group transition-all duration-700 ${
              isVisible['feature-3'] ? 'animate-scale-in' : 'opacity-0 scale-90'
            }`} style={{ animationDelay: '0.3s' }}>
              <img
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&amp;h=400&amp;fit=crop"
                alt="Happy customers with rubber ducks"
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 px-6 relative ${
        isDarkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'
      }`} data-animate id="footer">
        {/* Footer Background Effect */}
        <div className="absolute inset-0 opacity-5">
          <div className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gradient-to-t from-yellow-400/10 to-transparent' 
              : 'bg-gradient-to-t from-blue-600/10 to-transparent'
          }`}></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`grid md:grid-cols-4 gap-8 mb-12 transition-all duration-700 ${
            isVisible['footer'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}>
            <div className="space-y-4 group">
              <h3 className={`text-xl font-bold transition-all duration-300 group-hover:text-gradient ${
                isDarkMode ? 'text-white hover:text-yellow-400' : 'text-gray-900 hover:text-blue-600'
              }`}>
                DuckCorp
              </h3>
              <p className={`${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Products
              </h4>
              <ul className={`space-y-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {['Classic Ducks', 'Premium Collection', 'Limited Edition', 'Custom Designs'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className={`hover:text-current transition-all duration-300 hover:translate-x-2 inline-block ${
                      isDarkMode ? 'hover:text-yellow-400' : 'hover:text-blue-600'
                    }`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Company
              </h4>
              <ul className={`space-y-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {['About Us', 'Our Story', 'Careers', 'Press'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className={`hover:text-current transition-all duration-300 hover:translate-x-2 inline-block ${
                      isDarkMode ? 'hover:text-yellow-400' : 'hover:text-blue-600'
                    }`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Support
              </h4>
              <ul className={`space-y-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {['Help Center', 'Contact Us', 'Shipping Info', 'Returns'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className={`hover:text-current transition-all duration-300 hover:translate-x-2 inline-block ${
                      isDarkMode ? 'hover:text-yellow-400' : 'hover:text-blue-600'
                    }`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center transition-all duration-700 ${
            isDarkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
          } ${isVisible['footer'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.3s' }}>
            <p className="transition-colors duration-300 hover:text-current">&copy; 2024 DuckCorp. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`hover:text-current transition-all duration-300 hover:translate-y-1 ${
                    isDarkMode ? 'hover:text-yellow-400' : 'hover:text-blue-600'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
