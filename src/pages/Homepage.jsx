import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, Shield, Zap, Users, ArrowRight, Star, Target, Eye, Heart, CheckCircle, Phone, Mail, MapPin, Clock, Award, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Emergency Response",
      description: "24/7 crisis management with instant response protocols and emergency contact integration."
    },
    {
      icon: Zap,
      title: "Smart Automation",
      description: "Automated triggers and actions based on crisis scenarios with intelligent decision-making."
    },
    {
      icon: Users,
      title: "Team Coordination",
      description: "Real-time collaboration tools for emergency teams with role-based access controls."
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: "Industry Leading",
      description: "Recognized as the #1 crisis management platform by emergency response professionals worldwide."
    },
    {
      icon: Clock,
      title: "Lightning Fast",
      description: "Sub-second response times with 99.9% uptime guarantee, ensuring you're always protected."
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "Over 10,000 successful crisis interventions with zero system failures in critical moments."
    },
    {
      icon: Lightbulb,
      title: "Continuous Innovation",
      description: "Regular updates with cutting-edge AI technology and user-driven feature enhancements."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Detection",
      description: "AI-powered sensors and monitoring systems detect potential crisis situations in real-time."
    },
    {
      step: "02", 
      title: "Analysis",
      description: "Advanced algorithms analyze threat level, impact scope, and recommend optimal response strategies."
    },
    {
      step: "03",
      title: "Response",
      description: "Automated protocols activate emergency teams and execute predefined action plans instantly."
    },
    {
      step: "04",
      title: "Coordination",
      description: "Real-time communication channels ensure seamless collaboration between all response teams."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent">
                  Smart Crisis Manager
                </h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-900 hover:text-homepage-accent transition-colors px-3 py-2 text-sm font-medium">
                  Features
                </a>
                <a href="#why-choose-us" className="text-gray-900 hover:text-homepage-accent transition-colors px-3 py-2 text-sm font-medium">
                  Why Us
                </a>
                <a href="#about" className="text-gray-900 hover:text-homepage-accent transition-colors px-3 py-2 text-sm font-medium">
                  About
                </a>
                <a href="#process" className="text-gray-900 hover:text-homepage-accent transition-colors px-3 py-2 text-sm font-medium">
                  Process
                </a>
                <a href="#contact" className="text-gray-900 hover:text-homepage-accent transition-colors px-3 py-2 text-sm font-medium">
                  Contact
                </a>
                 <Button 
                  className="bg-accent hover:bg-white transition-colors text-black font-semibold cursor-pointer"
                  onClick={() => window.location.href = '/login'}
                >
                  Login
                </Button>
                <Button 
                  className="bg-accent hover:bg-white text-black font-semibold cursor-pointer"
                  onClick={() => window.location.href = '/register'}
                >
                  Get Started
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900 hover:text-homepage-accent transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-homepage-accent transition-colors">
                Features
              </a>
              <a href="#why-choose-us" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-homepage-accent transition-colors">
                Why Us
              </a>
              <a href="#about" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-homepage-accent transition-colors">
                About
              </a>
              <a href="#process" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-homepage-accent transition-colors">
                Process
              </a>
              <a href="#contact" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-homepage-accent transition-colors">
                Contact
              </a>
              <div className="px-3 py-2">
                <Button 
                  className="w-full bg-accent hover:bg-white text-black font-semibold"
                  onClick={() => window.location.href = '/login'}
                >
                  Login
                </Button>
                <Button 
                  className="w-full bg-accent hover:bg-white text-black font-semibold"
                  onClick={() => window.location.href = '/register'}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-homepage-dark opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Crisis Management
                <span className="block text-homepage-accent">Reimagined</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Intelligent AI-powered crisis response system that saves lives through instant decision-making, 
                automated protocols, and seamless team coordination.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-white text-black font-semibold text-lg px-8 py-3"
                  onClick={() => window.location.href = '/register'}
                >
                  Start Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold text-lg px-8 py-3"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-homepage-dark rounded-2xl p-8 shadow-2xl">
                <div className="bg-homepage-dark-secondary rounded-lg p-6 mb-4">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-white">
                      <div className="w-8 h-8 bg-homepage-accent rounded-full flex items-center justify-center mr-3">
                        <span className="text-black text-sm font-bold">AI</span>
                      </div>
                      <div className="bg-gray-800 rounded-lg px-4 py-2 text-sm">
                        Emergency detected. Initiating response protocol...
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-homepage-accent rounded-lg px-4 py-2 text-black text-sm font-medium">
                        All teams notified. ETA 3 minutes.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-homepage-accent text-sm font-mono">
                  {'>'} Crisis response time: 0.3 seconds<br/>
                  {'>'} Team coordination: Active<br/>
                  {'>'} Status: All systems operational
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[hsl(215,28%,17%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Everything you need to handle any crisis with confidence and precision
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gray-50 hover:bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-homepage-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-20 bg-homepage-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-homepage-accent mb-2">99.9%</div>
              <div className="text-gray-300 text-lg">Uptime</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-homepage-accent mb-2">0.3s</div>
              <div className="text-gray-300 text-lg">Response Time</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-homepage-accent mb-2">10k+</div>
              <div className="text-gray-300 text-lg">Lives Saved</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-homepage-accent mb-2">500+</div>
              <div className="text-gray-300 text-lg">Organizations</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" className="text-homepage-accent" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading the industry with proven expertise and cutting-edge technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white hover:bg-gradient-to-br hover:from-white hover:to-yellow-50">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-homepage-accent to-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <item.icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex-shrink-0">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-homepage-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Eye className="h-8 w-8 text-homepage-accent mr-4" />
                  <h3 className="text-3xl font-bold text-white">Our Vision</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To create a world where every crisis is met with instant, intelligent response. 
                  We envision communities protected by AI-powered systems that predict, prevent, 
                  and respond to emergencies with unprecedented speed and accuracy.
                </p>
              </div>

              <div className="hidden sm:block">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-homepage-accent mr-4" />
                  <h3 className="text-3xl font-bold text-white">Our Mission</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Empowering organizations with cutting-edge crisis management technology that saves lives, 
                  protects assets, and ensures business continuity through intelligent automation and 
                  seamless coordination.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-homepage-dark-secondary to-gray-900 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-homepage-accent rounded-lg flex items-center justify-center mr-4">
                      <Heart className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <div className="text-homepage-accent font-bold text-lg">Lives Protected</div>
                      <div className="text-gray-300">10,000+ people kept safe</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-homepage-accent rounded-lg flex items-center justify-center mr-4">
                      <Shield className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <div className="text-homepage-accent font-bold text-lg">Organizations Served</div>
                      <div className="text-gray-300">500+ companies worldwide</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-homepage-accent rounded-lg flex items-center justify-center mr-4">
                      <Clock className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <div className="text-homepage-accent font-bold text-lg">Response Time</div>
                      <div className="text-gray-300">0.3 seconds average</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section id="process" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven 4-step methodology that ensures rapid and effective crisis response
            </p>
          </div>

          <div className="relative">
            {/* Process Flow Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-white via-accent to-white transform -translate-y-1/2 z-0"></div>
            
            <div className="grid lg:grid-cols-4 gap-8 relative z-10">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-white to-accent rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-black">{step.step}</span>
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="lg:hidden w-1 h-16 bg-accent mx-auto mt-4"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
                About Smart Crisis Manager
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Founded by members of Team Code Commanders who are professionals and understand the critical 
                importance of every second during a crisis. Our platform combines years of field experience 
                with cutting-edge artificial intelligence to deliver solutions that truly make a difference.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-homepage-accent mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Expert Team</h4>
                    <p className="text-gray-600">Emergency responders, AI specialists, and safety experts working together.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-homepage-accent mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Proven Technology</h4>
                    <p className="text-gray-600">Battle-tested in real-world scenarios with 99.9% reliability record.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-homepage-accent mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Continuous Innovation</h4>
                    <p className="text-gray-600">Regular updates and improvements based on user feedback and new technology.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-homepage-dark to-homepage-dark-secondary rounded-2xl p-8 shadow-2xl">
                <div className="text-center text-black">
                  <div className="w-24 h-24 bg-homepage-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-12 w-12 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Industry Recognition</h3>
                  <p className="text-gray-900 mb-6">
                    Winner of the Global Safety Innovation Award 2024
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-homepage-dark-secondary rounded-lg p-4">
                      <div className="text-homepage-accent font-bold text-lg">5+</div>
                      <div className="text-gray-300">Years Experience</div>
                    </div>
                    <div className="bg-homepage-dark-secondary rounded-lg p-4">
                      <div className="text-homepage-accent font-bold text-lg">50+</div>
                      <div className="text-gray-300">Team Members</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 bg-homepage-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to secure your organization? Get in touch with our crisis management experts.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-homepage-dark-secondary border-0 text-white hover:bg-opacity-80 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Phone className="h-12 w-12 text-homepage-accent mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Emergency Hotline</h3>
                <p className="text-gray-300 mb-4">Available 24/7 for urgent support</p>
                <p className="text-homepage-accent font-bold text-lg">+1 (555) 911-HELP</p>
              </CardContent>
            </Card>

            <Card className="bg-homepage-dark-secondary border-0 text-white hover:bg-opacity-80 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 text-homepage-accent mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Email Support</h3>
                <p className="text-gray-300 mb-4">Get detailed responses within 1 hour</p>
                <p className="text-homepage-accent font-bold text-lg">support@smartcrisis.com</p>
              </CardContent>
            </Card>

            <Card className="bg-homepage-dark-secondary border-0 text-white hover:bg-opacity-80 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <MapPin className="h-12 w-12 text-homepage-accent mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Headquarters</h3>
                <p className="text-gray-300 mb-4">Visit our crisis management center</p>
                <p className="text-homepage-accent font-bold text-lg">UP , India</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Button 
              size="lg" 
              className="bg-homepage-accent hover:bg-yellow-500 text-black font-semibold text-lg px-12 py-4"
              onClick={() => window.location.href = '/chat'}
            >
              Start Free Consultation
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-homepage-dark-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Crisis Response?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of organizations who trust Smart Crisis Manager to keep their teams safe.
          </p>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-white text-black font-semibold text-lg px-12 py-4"
            onClick={() => window.location.href = '/register'}
          >
            Get Started Today
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-homepage-accent mb-4">Smart Crisis Manager</h3>
              <p className="text-gray-400 leading-relaxed">
                Advanced AI-powered crisis management for the modern world.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-homepage-accent transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-homepage-accent transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-homepage-accent transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-homepage-accent transition-colors">About</a></li>
                <li><a href="#" className="hover:text-homepage-accent transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-homepage-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-homepage-accent transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-homepage-accent transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-homepage-accent transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Team Code Commanders. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}