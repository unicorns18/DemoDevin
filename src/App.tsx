import { useState } from 'react';
import { Moon, Sun, Star, Shield, Zap, Heart } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-white text-gray-900'
    }`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${
          isDarkMode
            ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
        }`}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Hero/CTA Section */}
      <section className={`relative py-20 px-6 ${
        isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className={`text-5xl lg:text-6xl font-bold leading-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Premium Rubber
                  <span className={`block ${isDarkMode ? 'text-yellow-400' : 'text-blue-600'}`}>
                    Duck Collection
                  </span>
                </h1>
                <p className={`text-xl leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:shadow-lg'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                }`}>
                  Shop Now
                </button>
                <button className={`px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-300 ${
                  isDarkMode
                    ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
                }`}>
                  Learn More
                </button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 fill-current ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                  ))}
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Trusted by 10,000+ customers
                </span>
              </div>
            </div>

            {/* Right side - Hero Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1563906267088-b029e7101114?w=600&amp;h=400&amp;fit=crop"
                  alt="Premium rubber duck collection"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className={`absolute -bottom-6 -left-6 p-6 rounded-xl shadow-lg ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-blue-600 text-white'
                  }`}>
                    <Heart className="w-6 h-6" />
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
      <section className={`py-20 px-6 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Why Choose Our Ducks?
            </h2>
            <p className={`text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>

          {/* Feature 1 - Z-Pattern: Image Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <div className={`inline-flex p-3 rounded-lg ${
                isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-blue-600 text-white'
              }`}>
                <Shield className="w-8 h-8" />
              </div>
              <h3 className={`text-3xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
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
                <li className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isDarkMode ? 'bg-yellow-400' : 'bg-blue-600'
                  }`}></div>
                  <span>Non-toxic materials</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isDarkMode ? 'bg-yellow-400' : 'bg-blue-600'
                  }`}></div>
                  <span>Durable construction</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isDarkMode ? 'bg-yellow-400' : 'bg-blue-600'
                  }`}></div>
                  <span>Waterproof design</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-700">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&amp;h=400&amp;fit=crop"
                alt="Premium rubber duck materials"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          {/* Feature 2 - Z-Pattern: Image Left */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="rounded-2xl overflow-hidden shadow-xl lg:order-1 bg-gray-700">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&amp;h=400&amp;fit=crop"
                alt="Fast delivery rubber ducks"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="space-y-6 lg:order-2">
              <div className={`inline-flex p-3 rounded-lg ${
                isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-blue-600 text-white'
              }`}>
                <Zap className="w-8 h-8" />
              </div>
              <h3 className={`text-3xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Lightning Fast Delivery
              </h3>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${
                    isDarkMode ? 'text-yellow-400' : 'text-blue-600'
                  }`}>24h</div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Express Delivery</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${
                    isDarkMode ? 'text-yellow-400' : 'text-blue-600'
                  }`}>99%</div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>On-time Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3 - Z-Pattern: Image Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className={`inline-flex p-3 rounded-lg ${
                isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-blue-600 text-white'
              }`}>
                <Heart className="w-8 h-8" />
              </div>
              <h3 className={`text-3xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
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
                    <Star key={i} className={`w-5 h-5 fill-current ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                  ))}
                </div>
                <span className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>4.9/5 Rating</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-700">
              <img
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&amp;h=400&amp;fit=crop"
                alt="Happy customers with rubber ducks"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 px-6 ${
        isDarkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <h3 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
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
                <li><a href="#" className="hover:text-current transition-colors">Classic Ducks</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Premium Collection</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Limited Edition</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Custom Designs</a></li>
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
                <li><a href="#" className="hover:text-current transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Press</a></li>
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
                <li><a href="#" className="hover:text-current transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>
          
          <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center ${
            isDarkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
          }`}>
            <p>&copy; 2024 DuckCorp. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-current transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-current transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-current transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
