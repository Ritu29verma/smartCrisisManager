import React, { useState , useEffect} from "react";
import { useRoute } from "wouter";
import { Shield, Zap, Users, Bell, Clock, Brain, Network, ChevronRight, Server, Database, Globe, Eye, Key,Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Code, Github, Linkedin, Mail, Phone, MapPin, Star, Award } from "lucide-react";
import { Book, Download, ExternalLink, Search, FileText, Video, MessageCircle } from "lucide-react";
import { Play, Pause, RotateCcw, AlertTriangle, CheckCircle } from "lucide-react";

export default function FooterSettings() {
  const [active, setActive] = useState("features");
  const [match, params] = useRoute("/footer-settings/:section");
   const [demoState, setDemoState] = useState('ready');
  const [currentStep, setCurrentStep] = useState(0);

  const mainFeatures = [
    {
      icon: Shield,
      title: "Emergency Response",
      description: "24/7 crisis management with instant response protocols and emergency contact integration.",
      details: ["Instant alert system", "Emergency contact automation", "Real-time status updates", "Multi-channel notifications"]
    },
    {
      icon: Zap,
      title: "Smart Automation",
      description: "Automated triggers and actions based on crisis scenarios with intelligent decision-making.",
      details: ["AI-powered triggers", "Custom workflow creation", "Intelligent escalation", "Automated reporting"]
    },
    {
      icon: Users,
      title: "Team Coordination",
      description: "Real-time collaboration tools for emergency teams with role-based access controls.",
      details: ["Role-based permissions", "Real-time messaging", "Task assignment", "Progress tracking"]
    }
  ];

  const additionalFeatures = [
    { icon: Bell, title: "Real-time Alerts", description: "Instant notifications across all platforms" },
    { icon: Clock, title: "24/7 Monitoring", description: "Continuous system surveillance" },
    { icon: Brain, title: "AI Intelligence", description: "Machine learning powered decisions" },
    { icon: Network, title: "Global Network", description: "Worldwide crisis response network" }
  ];

   const teamMembers = [
    {
      name: "Ritu Verma",
      role: "Lead Developer & AI Specialist",
      image: "/api/placeholder/150/150",
      email: "ritu.verma@codecommanders.com",
      phone: "+91 9876543210",
      linkedin: "https://linkedin.com/in/rituverma",
      github: "https://github.com/rituverma",
      skills: ["AI/ML", "React", "Node.js", "Crisis Management Systems"]
    },
    {
      name: "Deependra Kumar",
      role: "Full-Stack Developer & System Architect",
      image: "/api/placeholder/150/150",
      email: "deependra.kumar@codecommanders.com",
      phone: "+91 9876543211",
      linkedin: "https://linkedin.com/in/deependrakumar",
      github: "https://github.com/deependrakumar",
      skills: ["System Architecture", "Database Design", "DevOps", "Security"]
    },
    {
      name: "Khyati Gupta",
      role: "Frontend Developer & UX Designer",
      image: "/api/placeholder/150/150",
      email: "khyati.gupta@codecommanders.com",
      phone: "+91 9876543212",
      linkedin: "https://linkedin.com/in/khyatigupta",
      github: "https://github.com/khyatigupta",
      skills: ["React/Next.js", "UI/UX Design", "Responsive Design", "Accessibility"]
    }
  ];

  const openContributions = [
    {
      title: "Frontend Components",
      description: "Help us build beautiful, accessible UI components for crisis management interfaces",
      skills: ["React", "TypeScript", "Tailwind CSS", "Accessibility"]
    },
    {
      title: "AI Model Training",
      description: "Contribute to our crisis prediction and response AI models",
      skills: ["Python", "TensorFlow", "Machine Learning", "Data Science"]
    },
    {
      title: "Mobile Applications",
      description: "Develop native mobile apps for emergency responders",
      skills: ["React Native", "Flutter", "iOS", "Android"]
    },
    {
      title: "API Development",
      description: "Build robust APIs for crisis management systems integration",
      skills: ["Node.js", "Express", "PostgreSQL", "REST/GraphQL"]
    },
    {
      title: "Documentation",
      description: "Create comprehensive guides and documentation for developers",
      skills: ["Technical Writing", "Markdown", "API Documentation"]
    },
    {
      title: "Testing & QA",
      description: "Ensure our systems are reliable when seconds count",
      skills: ["Jest", "Cypress", "Testing", "Quality Assurance"]
    }
  ];

  const benefits = [
    "Open source contribution recognition",
    "Mentorship from experienced developers",
    "Real-world crisis management experience",
    "Portfolio building opportunities",
    "Community networking",
    "Skill development workshops"
  ];

  const docSections = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Complete setup guide and initial configuration",
      topics: ["Installation", "Basic Setup", "First Crisis Response", "User Management"]
    },
    {
      icon: Code,
      title: "API Integration",
      description: "Developer resources for system integration",
      topics: ["REST API", "Webhooks", "Authentication", "Rate Limiting"]
    },
    {
      icon: FileText,
      title: "User Guides",
      description: "Step-by-step guides for all user types",
      topics: ["Admin Guide", "Responder Guide", "Team Lead Guide", "Observer Guide"]
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Visual learning resources and walkthroughs",
      topics: ["Platform Overview", "Crisis Simulation", "Team Setup", "Advanced Features"]
    }
  ];

  const quickLinks = [
    { title: "API Reference", url: "#", icon: Code },
    { title: "SDKs & Libraries", url: "#", icon: Download },
    { title: "Changelog", url: "#", icon: FileText },
    { title: "Status Page", url: "/status", icon: ExternalLink }
  ];

  const popularGuides = [
    {
      title: "Setting up Emergency Alerts",
      description: "Configure automated alert systems for your organization",
      readTime: "5 min",
      category: "Setup"
    },
    {
      title: "Creating Custom Automation Rules",
      description: "Build intelligent response workflows for different crisis types",
      readTime: "10 min",
      category: "Advanced"
    },
    {
      title: "Team Role Management",
      description: "Set up role-based access and permissions for your team",
      readTime: "8 min",
      category: "Management"
    },
    {
      title: "Integration with External Systems",
      description: "Connect Smart Crisis Manager with your existing tools",
      readTime: "15 min",
      category: "Integration"
    }
  ];

    const demoFeatures = [
    {
      title: "Sub-second Response",
      description: "Experience our 0.3 second average response time",
      metric: "< 0.3s"
    },
    {
      title: "AI-Triggered Alerts", 
      description: "See how AI automatically detects and responds to crises",
      metric: "99.9%"
    },
    {
      title: "Team Coordination",
      description: "Watch real-time team coordination in action",
      metric: "15+"
    },
    {
      title: "Crisis Resolution",
      description: "Complete crisis management from detection to resolution",
      metric: "100%"
    }
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Talk to a support agent directly from the app",
      availability: "Available 9am–9pm IST",
      action: "Start Chat",
      urgent: false
    },
    {
      icon: Phone,
      title: "Emergency Hotline",
      description: "24/7 crisis support for urgent situations",
      availability: "Available 24/7",
      action: "Call Now",
      urgent: true
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses within 1 hour",
      availability: "Response within 1 hour",
      action: "Send Email",
      urgent: false
    },
    {
      icon: Book,
      title: "Documentation",
      description: "Comprehensive guides and tutorials",
      availability: "Always available",
      action: "Browse Docs",
      urgent: false
    }
  ];

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I set up my first crisis response plan?",
          a: "Navigate to Settings > Crisis Plans and use our step-by-step wizard to create your first response plan. You can customize it based on your organization's specific needs."
        },
        {
          q: "What are the system requirements?",
          a: "Smart Crisis Manager works on any modern web browser. For mobile apps, iOS 12+ and Android 8+ are required. No special hardware is needed."
        },
        {
          q: "How do I add team members?",
          a: "Go to Team Management in your dashboard, click 'Add Member', and enter their email. They'll receive an invitation to join your organization."
        }
      ]
    },
    {
      category: "Crisis Management",
      questions: [
        {
          q: "How fast does the system respond to emergencies?",
          a: "Our AI detection system responds within 0.3 seconds on average. Alerts are sent immediately to all relevant team members based on your configured response plans."
        },
        {
          q: "Can I customize alert types?",
          a: "Yes, you can create custom alert types for different crisis scenarios. Each alert type can have specific response protocols and team assignments."
        },
        {
          q: "What happens if the system goes down during a crisis?",
          a: "We have 99.9% uptime with redundant systems. In the unlikely event of downtime, backup alert systems via SMS and email continue to function."
        }
      ]
    },
    {
      category: "Billing & Account",
      questions: [
        {
          q: "How do I upgrade my plan?",
          a: "Visit Account Settings > Billing to view available plans and upgrade. Changes take effect immediately with prorated billing."
        },
        {
          q: "Can I cancel my subscription anytime?",
          a: "Yes, you can cancel anytime from your account settings. Your access continues until the end of your current billing period."
        },
        {
          q: "Do you offer enterprise pricing?",
          a: "Yes, we offer custom enterprise plans with volume discounts, dedicated support, and advanced features. Contact our sales team for details."
        }
      ]
    }
  ];

  const communityResources = [
    {
      title: "Community Forum",
      description: "Join discussions with other crisis management professionals",
      link: "#",
      members: "5,000+"
    },
    {
      title: "Best Practices Guide",
      description: "Learn from real-world crisis management experiences",
      link: "#",
      downloads: "10,000+"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features",
      link: "#",
      videos: "50+"
    },
    {
      title: "Webinar Series",
      description: "Monthly webinars on crisis management trends",
      link: "#",
      attendees: "2,000+"
    }
  ];

    const systemStatus = [
    {
      name: "Platform Uptime",
      status: "operational",
      value: "99.9%",
      description: "All core services running normally"
    },
    {
      name: "System Health", 
      status: "operational",
      value: "Excellent",
      description: "All systems operational"
    },
    {
      name: "Response Time",
      status: "operational", 
      value: "0.3s",
      description: "Average API response time"
    },
    {
      name: "Active Monitoring",
      status: "operational",
      value: "24/7",
      description: "Continuous system surveillance"
    }
  ];

  const services = [
    {
      icon: Server,
      name: "Core API",
      status: "operational",
      uptime: "99.99%",
      responseTime: "245ms"
    },
    {
      icon: Database,
      name: "Database",
      status: "operational", 
      uptime: "99.95%",
      responseTime: "12ms"
    },
    {
      icon: Globe,
      name: "Web Portal",
      status: "operational",
      uptime: "99.98%",
      responseTime: "180ms"
    },
    {
      icon: Zap,
      name: "Alert System",
      status: "operational",
      uptime: "99.99%",
      responseTime: "95ms"
    }
  ];

  const incidents = [
    {
      date: "No incidents reported",
      title: "System has been running smoothly",
      description: "No incidents reported in the past 30 days",
      status: "resolved",
      duration: "N/A"
    }
  ];

  const maintenanceSchedule = [
    {
      date: "Every Sunday",
      time: "3:00 AM - 4:00 AM IST",
      type: "Scheduled Maintenance",
      description: "Regular system updates and optimizations",
      impact: "Minimal impact expected"
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'operational': return 'text-green-400';
      case 'degraded': return 'text-yellow-400';
      case 'outage': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'operational': return CheckCircle;
      case 'degraded': return AlertTriangle;
      case 'outage': return AlertTriangle;
      default: return Clock;
    }
  };

   const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All communications and data are protected with military-grade AES-256 encryption",
      details: ["256-bit AES encryption", "TLS 1.3 for data in transit", "Zero-knowledge architecture", "Encrypted backup systems"]
    },
    {
      icon: Shield,
      title: "Multi-Factor Authentication",
      description: "Advanced authentication mechanisms to ensure only authorized access",
      details: ["TOTP authentication", "Biometric verification", "Hardware security keys", "Role-based access control"]
    },
    {
      icon: Eye,
      title: "Continuous Monitoring",
      description: "24/7 security monitoring and threat detection systems",
      details: ["Real-time threat detection", "Behavioral analytics", "Intrusion prevention", "Security audit logs"]
    },
    {
      icon: Database,
      title: "Data Protection",
      description: "Comprehensive data protection and privacy compliance",
      details: ["GDPR compliance", "Data anonymization", "Secure data disposal", "Privacy by design"]
    }
  ];

  const complianceStandards = [
    { name: "ISO 27001", description: "Information Security Management" },
    { name: "SOC 2 Type II", description: "Security & Availability Controls" },
    { name: "GDPR", description: "Data Protection Regulation" },
    { name: "HIPAA", description: "Healthcare Information Protection" },
    { name: "FedRAMP", description: "Federal Risk Management Program" },
    { name: "PCI DSS", description: "Payment Card Security Standards" }
  ];

  const securityStats = [
    { value: "0", label: "Security Breaches", period: "All Time" },
    { value: "99.99%", label: "Uptime SLA", period: "Last 12 Months" },
    { value: "< 1ms", label: "Security Response", period: "Average" },
    { value: "24/7", label: "Security Monitoring", period: "Continuous" }
  ];

   const demoSteps = [
    {
      title: "Crisis Detection",
      description: "AI sensors detect potential emergency situation",
      duration: 0.3,
      icon: AlertTriangle,
      status: "Emergency detected in Building A, Floor 3"
    },
    {
      title: "Alert Generation", 
      description: "System generates immediate alerts to response teams",
      duration: 0.1,
      icon: Zap,
      status: "Alerts sent to 15 team members"
    },
    {
      title: "Team Coordination",
      description: "Emergency response teams are automatically coordinated",
      duration: 0.2,
      icon: Users,
      status: "Response teams dispatched"
    },
    {
      title: "Status Resolution",
      description: "Crisis handled successfully with full team coordination",
      duration: 2.0,
      icon: CheckCircle,
      status: "Emergency resolved - All clear"
    }
  ];

  const startDemo = () => {
    setDemoState('running');
    setCurrentStep(0);
    
    // Simulate demo progression
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      
      if (step >= demoSteps.length) {
        clearInterval(interval);
        setDemoState('completed');
      }
    }, 1000);
  };

  const resetDemo = () => {
    setDemoState('ready');
    setCurrentStep(0);
  };

  useEffect(() => {
  setActive(params?.section ?? "features");
   window.scrollTo({
      top: 0,
      behavior: "auto",
    }, 50);
}, [params?.section]);

 const contentMap = {
  features: (
      <div className="min-h-screen bg-homepage-dark text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background SVG Pattern */}
        <div className="absolute inset-0 opacity-50">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="crisis-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="25" cy="25" r="2" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#crisis-grid)" className="text-accent"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-homepage-accent">
              Powerful Features
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive crisis management tools designed to save lives and protect communities
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="bg-homepage-dark-secondary border-homepage-accent/20 hover:border-homepage-accent/50 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-homepage-accent rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <ChevronRight className="h-4 w-4 text-homepage-accent mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-16 bg-homepage-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Additional Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="bg-homepage-dark border-homepage-accent/20 hover:bg-homepage-accent/10 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-homepage-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-black to-homepage-accent rounded-2xl p-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-homepage-accent mb-2">0.3s</div>
                <div className="text-gray-300">Average Response Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-homepage-accent mb-2">99.9%</div>
                <div className="text-gray-300">System Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-homepage-accent mb-2">24/7</div>
                <div className="text-gray-300">Monitoring Coverage</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-homepage-accent mb-2">500+</div>
                <div className="text-gray-300">Organizations Protected</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your free trial today and see how our features can protect your organization
          </p>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-white text-black font-semibold text-lg px-8 py-3"
            onClick={() => window.location.href = '/login'}
          >
            Try Features Now
          </Button>
        </div>
      </section>
    </div>
  
  ),
  security: (
    <>
      <div className="min-h-screen bg-homepage-dark text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background SVG Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="security-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                <circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M30,40 L35,45 L50,30" fill="none" stroke="currentColor" strokeWidth="3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#security-pattern)" className="text-homepage-accent"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-homepage-accent">
              Enterprise Security
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Your crisis management data is protected by bank-level security measures and continuous monitoring.
              Trust is earned through transparency and proven security practices.
            </p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="bg-homepage-dark-secondary border-homepage-accent/20 hover:border-homepage-accent/50 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-homepage-accent rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center text-gray-300 text-sm">
                            <CheckCircle className="h-4 w-4 text-homepage-accent mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Stats */}
      <section className="py-16 bg-homepage-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Security by the Numbers</h2>
            <p className="text-xl text-gray-300">Our commitment to security is measured and verified</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {securityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-homepage-dark rounded-2xl p-6 ">
                  <div className="text-4xl font-bold text-homepage-accent mb-2">{stat.value}</div>
                  <div className="text-white font-semibold mb-1">{stat.label}</div>
                  <div className="text-gray-400 text-sm">{stat.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Compliance & Certifications</h2>
            <p className="text-xl text-gray-300">Meeting the highest industry standards for security and privacy</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceStandards.map((standard, index) => (
              <Card key={index} className="bg-homepage-dark border-homepage-accent hover:border-white transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-8 w-8 text-homepage-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{standard.name}</h3>
                  <p className="text-gray-300 text-sm">{standard.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Architecture */}
      <section className="py-16 bg-homepage-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Security Architecture</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our security architecture is built on defense-in-depth principles, ensuring multiple layers
                of protection for your critical crisis management data.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Server className="h-6 w-6 text-homepage-accent mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-2">Infrastructure Security</h4>
                    <p className="text-gray-300">Secure cloud infrastructure with isolated environments and network segmentation.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Key className="h-6 w-6 text-homepage-accent mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-2">Access Control</h4>
                    <p className="text-gray-300">Granular permission systems with principle of least privilege enforcement.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-homepage-accent mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-2">Threat Detection</h4>
                    <p className="text-gray-300">Advanced AI-powered threat detection and automated incident response.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-homepage-accent/10 to-homepage-accent/5 rounded-2xl p-8">
                <div className="text-center">
                  <Shield className="h-20 w-20 text-homepage-accent mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Zero-Trust Security Model</h3>
                  <p className="text-gray-300 mb-6">
                    Every request is verified, authenticated, and authorized regardless of location or user credentials.
                  </p>
                  <div className="bg-homepage-dark rounded-lg p-4">
                    <div className="text-homepage-accent font-bold text-lg mb-2">Security Layers</div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>• Network Security</div>
                      <div>• Application Security</div>
                      <div>• Data Security</div>
                      <div>• Identity Security</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Contact */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Security Questions?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our security team is available to answer any questions about our security practices and compliance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-white text-black font-semibold text-lg px-8 py-3"
              onClick={() => window.location.href = 'mailto:codecommanders01@gmail.com?subject=Support Request&body=Hello, I need help with...'}   >
              Contact Security Team
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-homepage-accent text-homepage-accent hover:bg-white hover:text-black font-semibold text-lg px-8 py-3"
              onClick={() => window.location.href = '/not-found'}
            >
              View Security Status
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  ),
  demo: (
    <>
      <div className="min-h-screen bg-homepage-dark text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background SVG Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="demo-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
                <polygon points="30,20 35,25 30,30 25,25" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#demo-pattern)" className="text-homepage-accent"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-homepage-accent">
              Live Demo
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              See Smart Crisis Manager in action. Experience our sub-second response, AI-triggered alerts, 
              and team coordination tools in a simulated crisis environment.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-homepage-dark-secondary rounded-2xl p-8 border border-homepage-accent">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Interactive Crisis Simulation</h2>
              <p className="text-gray-300">Watch how Smart Crisis Manager handles a real emergency scenario</p>
            </div>

            {/* Demo Control Panel */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-4">
                {demoState === 'ready' && (
                  <Button 
                    onClick={startDemo}
                    className="bg-accent hover:bg-white text-black font-semibold px-8 py-3"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Launch Demo
                  </Button>
                )}
                
                {demoState === 'running' && (
                  <Button 
                    disabled
                    className="bg-gray-600 text-white font-semibold px-8 py-3"
                  >
                    <Clock className="h-5 w-5 mr-2 animate-spin" />
                    Demo Running...
                  </Button>
                )}
                
                {demoState === 'completed' && (
                  <Button 
                    onClick={resetDemo}
                    className="bg-homepage-accent hover:bg-yellow-500 text-black font-semibold px-8 py-3"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset Demo
                  </Button>
                )}
              </div>
            </div>

            {/* Demo Timeline */}
            <div className="space-y-6">
              {demoSteps.map((step, index) => (
                <div key={index} className={`flex items-center p-6 rounded-lg transition-all duration-500 ${
                  currentStep > index ? 'bg-blue-900 border border-homepage-accent' :
                  currentStep === index ? 'bg-black border border-accent' :
                  'bg-homepage-dark border border-gray-600'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-6 transition-all duration-300 ${
                    currentStep > index ? 'bg-homepage-accent text-black' :
                    currentStep === index ? 'bg-homepage-accent text-white animate-pulse' :
                    'bg-gray-600 text-gray-400'
                  }`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">{step.title}</h3>
                      <span className="text-homepage-accent font-mono text-sm">
                        {step.duration}s
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">{step.description}</p>
                    {currentStep > index && (
                      <div className="text-homepage-accent font-semibold text-sm">
                        ✓ {step.status}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Demo Results */}
            {demoState === 'completed' && (
              <div className="mt-8 p-6 bg-blue-900 rounded-lg border border-homepage-accent">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-homepage-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Demo Completed Successfully!</h3>
                  <p className="text-gray-300 mb-4">
                    Crisis resolved in 2.6 seconds with 100% team coordination
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-homepage-dark rounded-lg p-3">
                      <div className="text-homepage-accent font-bold">2.6s</div>
                      <div className="text-gray-300 text-sm">Total Response Time</div>
                    </div>
                    <div className="bg-homepage-dark rounded-lg p-3">
                      <div className="text-homepage-accent font-bold">15</div>
                      <div className="text-gray-300 text-sm">Team Members Alerted</div>
                    </div>
                    <div className="bg-homepage-dark rounded-lg p-3">
                      <div className="text-homepage-accent font-bold">100%</div>
                      <div className="text-gray-300 text-sm">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Demo Features */}
      <section className="py-16 bg-homepage-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What You'll Experience</h2>
            <p className="text-xl text-gray-300">Key features demonstrated in our interactive simulation</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoFeatures.map((feature, index) => (
              <Card key={index} className="bg-homepage-dark border-homepage-accent hover:border-white transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-homepage-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {feature.metric}
                  </div>
                  <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real-World Scenarios */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Real-World Crisis Scenarios</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our demo simulates actual crisis scenarios that organizations face daily. 
                See how Smart Crisis Manager handles different types of emergencies with precision and speed.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-homepage-accent mr-3" />
                  <span className="text-gray-300">Fire Emergency Response</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-homepage-accent mr-3" />
                  <span className="text-gray-300">Medical Emergency Coordination</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-homepage-accent mr-3" />
                  <span className="text-gray-300">Security Breach Response</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-homepage-accent mr-3" />
                  <span className="text-gray-300">Natural Disaster Management</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-homepage-accent/10 to-homepage-accent/5 rounded-2xl p-8">
                <div className="text-center">
                  <Play className="h-16 w-16 text-homepage-accent mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Try Multiple Scenarios</h3>
                  <p className="text-gray-300 mb-6">
                    Experience different crisis types and see how our system adapts to each situation
                  </p>
                  <Button 
                    className="bg-homepage-accent hover:bg-yellow-500 text-black font-semibold"
                    onClick={() => window.location.href = '/login'}
                  >
                    Start Interactive Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 ">
        <div className="max-w-4xl bg-gray-800 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to See More?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Schedule a personalized demo with our crisis management experts to explore advanced features
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-homepage-accent hover:bg-white text-black font-semibold text-lg px-8 py-3"
              onClick={() => window.location.href = 'mailto:codecommanders01@gmail.com?subject=Demo Request&body=Hello, I need demo...'}
            >
              Schedule Personal Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-homepage-accent text-homepage-accent hover:bg-white hover:text-black font-semibold text-lg px-8 py-3"
              onClick={() => window.location.href = '/not-found'}
            >
              Try Live Chat Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  ),
  about: (
    <>
      <div className="bg-[hsl(220,39%,11%)] text-white min-h-screen px-6">
      <div className="max-w-4xl mx-auto">
         <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background SVG Pattern */}
        <div className="absolute inset-0 opacity-50">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="crisis-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="25" cy="25" r="2" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#crisis-grid)" className="text-accent"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-homepage-accent">
              About Us
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We are Team Code Commanders — innovators in intelligent crisis management. Our platform saves lives through AI-powered detection, real-time team coordination,
           and zero-failure execution. With 10,000+ crises successfully handled, we’re setting the standard for the future.
            </p>
          </div>
        </div>
      </section>
        {/* Core Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Core Team</h2>
            <p className="text-xl text-gray-300">The developers behind Smart Crisis Manager</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-homepage-dark-secondary border-homepage-accent hover:border-white transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Users className="h-16 w-16 text-homepage-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-homepage-accent font-semibold mb-4">{member.role}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {member.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/30 text-homepage-accent text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="h-4 w-4 text-homepage-accent" />
                      <a href={`mailto:${member.email}`} className="hover:text-homepage-accent transition-colors text-sm">
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="h-4 w-4 text-homepage-accent" />
                      <span className="text-sm">{member.phone}</span>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4">
                      <a href={member.linkedin} className="text-homepage-accent hover:text-yellow-400 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href={member.github} className="text-homepage-accent hover:text-yellow-400 transition-colors">
                        <Github className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      </div>
    </div>
    </>
  ),
  careers: (
    <>
     <div className="min-h-screen bg-homepage-dark text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background SVG Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="team-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#team-pattern)" className="text-homepage-accent"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-homepage-accent">
              Join Our Mission
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We're building the future of crisis management technology. Join our team of passionate developers
              and help create systems that save lives through intelligent automation and seamless coordination.
            </p>
          </div>
        </div>
      </section>

      {/* Open Contributions Section */}
      <section className="py-16 bg-homepage-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Open Source Contributions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We welcome developers from around the world to contribute to our open-source crisis management platform.
              Your code could help save lives!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openContributions.map((contribution, index) => (
              <Card key={index} className="bg-homepage-dark border-homepage-accent hover:border-white transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-homepage-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Code className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{contribution.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{contribution.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {contribution.skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-homepage-accent/10 text-homepage-accent text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Why Contribute With Us?</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Contributing to Smart Crisis Manager means joining a mission to protect communities worldwide.
                We provide mentorship, learning opportunities, and recognition for your valuable contributions.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Star className="h-5 w-5 text-homepage-accent mr-3 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-400 to-gray-700 rounded-2xl p-8">
                <div className="text-center">
                  <Award className="h-16 w-16 text-homepage-accent mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Join Our Developer Community</h3>
                  <p className="text-gray-300 mb-6">
                    Over 100+ developers worldwide are already contributing to our mission
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-homepage-dark rounded-lg p-4">
                      <div className="text-2xl font-bold text-homepage-accent">100+</div>
                      <div className="text-gray-300 text-sm">Contributors</div>
                    </div>
                    <div className="bg-homepage-dark rounded-lg p-4">
                      <div className="text-2xl font-bold text-homepage-accent">50+</div>
                      <div className="text-gray-300 text-sm">Active Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  ),
  contact: (
    <>
      <div className="bg-[hsl(220,39%,11%)] text-white min-h-screen px-6">
      <div className="max-w-4xl mx-auto">
        {/* <h1 className="text-3xl font-bold mb-6 text-[hsl(74,100%,40%)]"></h1> */}
         <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background SVG Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="demo-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
                <polygon points="30,20 35,25 30,30 25,25" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#demo-pattern)" className="text-homepage-accent"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-homepage-accent">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
             Whether you're looking for full-time opportunities or want to contribute as an open-source developer,
            we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>
        {/* Contact & Apply Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-300 mb-8">
            
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-homepage-accent hover:bg-yellow-500 text-black font-semibold text-lg px-8 py-3"
              onClick={() => window.location.href = 'mailto:codecommanders01@gmail.com?subject=Contribution Interest'}
            >
              Start Contributing
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-homepage-accent text-homepage-accent hover:bg-white hover:text-black font-semibold text-lg px-8 py-3"
              onClick={() => window.location.href = 'https://github.com/Ritu29verma'}
            >
              View GitHub
            </Button>
          </div>
        </div>
      </section>
        <ul className="space-y-4 text-gray-300 ">
          <li><strong>Emergency Hotline:</strong> +91 7005755245 (24/7 availability)</li>
          <li><strong>Email Support:</strong> codecommanders01@gmail.com (Response within 1 hour)</li>
          <li><strong>Headquarters:</strong> Uttar Pradesh, India</li>
        </ul>
      </div>
    </div>
    </>
  ),
  docs: (
    <>
       <div className="min-h-screen bg-homepage-dark text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background SVG Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="docs-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2"/>
                <line x1="30" y1="35" x2="70" y2="35" stroke="currentColor" strokeWidth="2"/>
                <line x1="30" y1="45" x2="70" y2="45" stroke="currentColor" strokeWidth="1"/>
                <line x1="30" y1="55" x2="70" y2="55" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#docs-pattern)" className="text-homepage-accent"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-homepage-accent">
              Documentation
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Find step-by-step guides on setting up Smart Crisis Manager, API integration, 
              automation rules, and customizing user settings. Our developer docs ensure smooth onboarding and extensibility.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search documentation..."
                className="w-full pl-12 pr-4 py-4 bg-homepage-dark-secondary border border-homepage-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-homepage-accent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {docSections.map((section, index) => (
              <Card key={index} className="bg-homepage-dark-secondary border-homepage-accent hover:border-white transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-homepage-accent rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <section.icon className="h-6 w-6 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">{section.description}</p>
                      <div className="space-y-2">
                        {section.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-center text-gray-300 hover:text-homepage-accent transition-colors cursor-pointer">
                            <FileText className="h-4 w-4 mr-2" />
                            <span className="text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-homepage-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Quick Access</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Card key={index} className="bg-homepage-dark border-homepage-accent hover:border-white transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <link.icon className="h-12 w-12 text-homepage-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-bold text-white group-hover:text-homepage-accent transition-colors">{link.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">Popular Guides</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {popularGuides.map((guide, index) => (
              <Card key={index} className="bg-homepage-dark-secondary border-homepage-accent hover:border-white transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-white/50 text-homepage-accent text-xs rounded-full">
                      {guide.category}
                    </span>
                    <span className="text-gray-400 text-sm">{guide.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-homepage-accent transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{guide.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Resources */}
      <section className="py-16 bg-homepage-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Developer Resources</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Comprehensive API documentation, SDKs, and integration guides to help developers
                build powerful crisis management solutions on top of our platform.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Code className="h-5 w-5 text-homepage-accent mr-3" />
                  <span className="text-gray-300">RESTful API with OpenAPI specification</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-5 w-5 text-homepage-accent mr-3" />
                  <span className="text-gray-300">SDKs for JavaScript, Python, and Go</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-homepage-accent mr-3" />
                  <span className="text-gray-300">Comprehensive code examples</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-5 w-5 text-homepage-accent mr-3" />
                  <span className="text-gray-300">Developer community support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-homepage-dark rounded-2xl p-6 border border-homepage-accent">
                <div className="text-homepage-accent text-sm font-mono mb-4">
                  // Example API Call
                </div>
                <div className="bg-homepage-dark-secondary rounded-lg p-4 text-sm font-mono">
                  <div className="text-blue-400">curl</div>
                  <div className="text-white ml-2">-X POST \</div>
                  <div className="text-white ml-2">-H "Authorization: Bearer $TOKEN" \</div>
                  <div className="text-white ml-2">-H "Content-Type: application/json" \</div>
                  <div className="text-white ml-2">-d '{`{"type": "fire", "location": "Building A"}`}' \</div>
                  <div className="text-homepage-accent ml-2">https://api.smartcrisis.com/v1/alerts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help & Support */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Need More Help?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Can't find what you're looking for? Our support team is here to help with any questions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-homepage-accent hover:bg-white text-black font-semibold text-lg px-8 py-3"
              onClick={() => window.location.href = '/help'}
            >
              Contact Support
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-homepage-accent text-homepage-accent hover:bg-white hover:text-black font-semibold text-lg px-8 py-3"
              onClick={() => window.location.href = 'https://github.com/Ritu29verma/docs'}
            >
              GitHub Docs
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  ),
  status: (
    <>
       <div className="min-h-screen bg-homepage-dark text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background SVG Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="status-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="40" cy="40" r="15" fill="currentColor" opacity="0.3"/>
                <path d="M30,40 L37,47 L50,30" fill="none" stroke="currentColor" strokeWidth="3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#status-pattern)" className="text-green-400"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-homepage-accent">
              System Status
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Real-time system health monitoring and incident reporting for Smart Crisis Manager platform.
              All systems are currently operational.
            </p>
          </div>
        </div>
      </section>

      {/* Overall Status */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {systemStatus.map((item, index) => (
              <Card key={index} className="bg-homepage-dark-secondary border-green-400/20">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-homepage-accent mb-2">{item.value}</div>
                  <div className="font-semibold text-white mb-2">{item.name}</div>
                  <div className="text-gray-300 text-sm">{item.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Status */}
      <section className="py-16 bg-homepage-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Service Health</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const StatusIcon = getStatusIcon(service.status);
              return (
                <Card key={index} className="bg-homepage-dark border-homepage-accent">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <service.icon className="h-8 w-8 text-homepage-accent" />
                        <h3 className="text-lg font-bold text-white">{service.name}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`h-5 w-5 ${getStatusColor(service.status)}`} />
                        <span className={`font-semibold capitalize ${getStatusColor(service.status)}`}>
                          {service.status}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Uptime</div>
                        <div className="text-homepage-accent font-semibold">{service.uptime}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Response Time</div>
                        <div className="text-homepage-accent font-semibold">{service.responseTime}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Incident History */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">Incident History</h2>
          <Card className="bg-homepage-dark-secondary border-homepage-accent">
            <CardContent className="p-8">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">No Recent Incidents</h3>
                <p className="text-gray-300 mb-6">
                  No incidents reported in the past 30 days. Our systems have been running smoothly.
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-green-400/10 border border-green-400/20 rounded-lg">
                  <span className="text-green-400 font-semibold">30 days incident-free</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Maintenance Schedule */}
      <section className="py-16 bg-homepage-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">Scheduled Maintenance</h2>
          <div className="space-y-6">
            {maintenanceSchedule.map((maintenance, index) => (
              <Card key={index} className="bg-homepage-dark border-homepage-accent">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-homepage-accent mt-1" />
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">{maintenance.type}</h3>
                        <p className="text-gray-300 mb-3">{maintenance.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-homepage-accent font-semibold">
                            {maintenance.date}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-300">{maintenance.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-semibold text-sm mb-1">Scheduled</div>
                      <div className="text-gray-400 text-sm">{maintenance.impact}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Performance Metrics</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-homepage-dark-secondary border-homepage-accent">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">99.9%</div>
                <div className="text-white font-semibold mb-2">Uptime (30 days)</div>
                <div className="text-gray-300 text-sm">Above industry standard</div>
              </CardContent>
            </Card>
            
            <Card className="bg-homepage-dark-secondary border-homepage-accent">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">0.3s</div>
                <div className="text-white font-semibold mb-2">Avg Response</div>
                <div className="text-gray-300 text-sm">Crisis detection speed</div>
              </CardContent>
            </Card>
            
            <Card className="bg-homepage-dark-secondary border-homepage-accent">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-white font-semibold mb-2">Alert Delivery</div>
                <div className="text-gray-300 text-sm">No failed notifications</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Stay Updated</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get notified about system status changes and scheduled maintenance windows.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-homepage-dark-secondary border border-homepage-accent rounded-lg text-white placeholder-gray-400 focus:border-homepage-accent focus:outline-none"
            />
            <button className="px-6 py-3 bg-homepage-accent hover:bg-white text-black font-semibold rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
    </>
  ),
  help: (
    <>
    <div className="min-h-screen bg-homepage-dark text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background SVG Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="help-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
                <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
                <text x="60" y="68" textAnchor="middle" fontSize="20" fill="currentColor">?</text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#help-pattern)" className="text-homepage-accent"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-homepage-accent">
              Help & Support
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Get instant answers to common issues and usage questions. Our support team is here to help
              you make the most of Smart Crisis Manager.
            </p>
          </div>

          {/* Quick Search */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search for help topics..."
                className="w-full pl-12 pr-4 py-4 bg-homepage-dark-secondary border border-homepage-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-homepage-accent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Get Support</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <Card key={index} className={`border-2 transition-all duration-300 group hover:border-white ${
                channel.urgent ? 'bg-red-900/20 border-red-400/30' : 'bg-homepage-dark-secondary border-homepage-accent'
              }`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    channel.urgent ? 'bg-red-400/20' : 'bg-white'
                  }`}>
                    <channel.icon className={`h-8 w-8 ${channel.urgent ? 'text-red-400' : 'text-homepage-accent'}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{channel.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{channel.description}</p>
                  <div className={`text-xs mb-4 ${channel.urgent ? 'text-red-400' : 'text-homepage-accent'}`}>
                    {channel.availability}
                  </div>
                  <Button 
                    className={`w-full font-semibold ${
                      channel.urgent 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-homepage-accent hover:bg-white text-black'
                    }`}
                  >
                    {channel.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-homepage-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-xl font-bold text-homepage-accent mb-6">{category.category}</h3>
                <div className="space-y-6">
                  {category.questions.map((faq, faqIndex) => (
                    <Card key={faqIndex} className="bg-homepage-dark border-homepage-accent hover:border-white transition-all duration-300">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-white mb-3 leading-relaxed">{faq.q}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{faq.a}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Community Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityResources.map((resource, index) => (
              <Card key={index} className="bg-homepage-dark-secondary border-homepage-accent hover:border-white transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-homepage-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-bold text-white mb-3 group-hover:text-homepage-accent transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{resource.description}</p>
                  <div className="text-homepage-accent font-semibold text-sm">
                    {Object.values(resource).find(value => typeof value === 'string' && (value.includes('+') || value.includes('000')))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-homepage-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Still Need Help?</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our crisis management experts are available around the clock to help you with any questions
                or technical issues. Don't hesitate to reach out for personalized support.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-homepage-accent mr-3" />
                  <div>
                    <div className="text-white font-semibold">Emergency Hotline</div>
                    <div className="text-gray-300">+91 7005755245</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-homepage-accent mr-3" />
                  <div>
                    <div className="text-white font-semibold">Email Support</div>
                    <div className="text-gray-300">codecommanders01@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-homepage-accent mr-3" />
                  <div>
                    <div className="text-white font-semibold">Support Hours</div>
                    <div className="text-gray-300">24/7 Emergency • 9am-9pm IST General</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-homepage-accent/10 to-homepage-accent/5 rounded-2xl p-8">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-homepage-accent mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Quick Response Promise</h3>
                  <p className="text-gray-300 mb-6">
                    Emergency support within 5 minutes. General inquiries within 1 hour.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-homepage-dark rounded-lg p-4">
                      <div className="text-homepage-accent font-bold text-lg">{'<'} 5min</div>
                      <div className="text-gray-300 text-sm">Emergency Response</div>
                    </div>
                    <div className="bg-homepage-dark rounded-lg p-4">
                      <div className="text-homepage-accent font-bold text-lg">{'<'} 1hr</div>
                      <div className="text-gray-300 text-sm">General Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Ticket */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Submit a Support Ticket</h2>
          <p className="text-xl text-gray-300 mb-8">
            Can't find the answer you're looking for? Submit a detailed support ticket and our team will get back to you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-homepage-accent hover:bg-white text-black font-semibold text-lg px-8 py-3"
              onClick={() => window.location.href = 'mailto:codecommanders01@gmail.com?subject=Support Request'}
            >
              Submit Ticket
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-homepage-accent text-homepage-accent hover:bg-white hover:text-black font-semibold text-lg px-8 py-3"
              onClick={() => window.location.href = '/login'}
            >
              Try Live Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  )
};

  return (
        <div className="md:col-span-3">{contentMap[active]}</div>
  );
}