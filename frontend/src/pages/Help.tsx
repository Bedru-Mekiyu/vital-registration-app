import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Book, 
  MessageCircle, 
  Phone, 
  Mail,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Download,
  Video,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('getting-started');

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: Book },
    { id: 'certificates', name: 'Certificates', icon: FileText },
    { id: 'verification', name: 'Verification', icon: HelpCircle },
    { id: 'account', name: 'Account Management', icon: MessageCircle },
    { id: 'technical', name: 'Technical Support', icon: Phone }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I apply for a birth certificate?',
      answer: 'To apply for a birth certificate, navigate to the "New Certificate" page, select "Birth Certificate" as the type, and fill in all required information including personal details, parents\' information, and place of birth. Submit the application and track its progress through your dashboard.'
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'What documents do I need to provide?',
      answer: 'Required documents vary by certificate type. Generally, you\'ll need: valid ID, proof of relationship (for family certificates), hospital records (for birth certificates), and any supporting documentation. Check the specific requirements for each certificate type.'
    },
    {
      id: 3,
      category: 'certificates',
      question: 'How long does the approval process take?',
      answer: 'The approval process typically takes 3-5 business days. The timeline includes: Application Review (1 day), Document Verification (1-2 days), and Final Approval (1-2 days). You\'ll receive notifications at each stage.'
    },
    {
      id: 4,
      category: 'certificates',
      question: 'Can I track my application status?',
      answer: 'Yes! You can track your application status in real-time through your dashboard. You\'ll see the current stage, processing timeline, and any required actions. Email and SMS notifications are also sent for status updates.'
    },
    {
      id: 5,
      category: 'verification',
      question: 'How do I verify a certificate?',
      answer: 'Certificates can be verified in three ways: 1) Scan the QR code on the certificate, 2) Enter the certificate number on the verification page, 3) Send an SMS with the certificate number to our verification service.'
    },
    {
      id: 6,
      category: 'verification',
      question: 'What if the QR code doesn\'t work?',
      answer: 'If the QR code doesn\'t scan properly, you can manually enter the certificate number on our verification page. Ensure you have a stable internet connection and try using a different QR code scanner app if needed.'
    },
    {
      id: 7,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email. You can also change your password from the Settings page when logged in.'
    },
    {
      id: 8,
      category: 'account',
      question: 'Can I update my personal information?',
      answer: 'Yes, you can update your personal information from the Profile page. Some changes may require verification. Contact support if you need to update information on issued certificates.'
    },
    {
      id: 9,
      category: 'technical',
      question: 'The website is not loading properly',
      answer: 'Try clearing your browser cache, disabling browser extensions, or using a different browser. Ensure you have a stable internet connection. If issues persist, contact our technical support team.'
    },
    {
      id: 10,
      category: 'technical',
      question: 'I\'m having trouble uploading documents',
      answer: 'Ensure your documents are in supported formats (PDF, JPG, PNG) and under 5MB each. Check your internet connection and try uploading one document at a time. Clear your browser cache if problems continue.'
    }
  ];

  const tutorials = [
    {
      title: 'Getting Started Guide',
      description: 'Complete walkthrough of the civil registry system',
      type: 'video',
      duration: '15 min',
      url: '#'
    },
    {
      title: 'Certificate Application Process',
      description: 'Step-by-step guide to applying for certificates',
      type: 'pdf',
      pages: '12 pages',
      url: '#'
    },
    {
      title: 'Verification Methods',
      description: 'How to verify certificates using different methods',
      type: 'video',
      duration: '8 min',
      url: '#'
    },
    {
      title: 'Family Tree Management',
      description: 'Managing your family relationships and documents',
      type: 'pdf',
      pages: '8 pages',
      url: '#'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.category === activeCategory &&
    (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <HelpCircle className="h-12 w-12 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Help & Support
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Find answers to common questions, access tutorials, and get support for using the civil registry system.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Categories
            </h3>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <category.icon className="h-5 w-5" />
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Support */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Support
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+251911000000"
                className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm">+251 911 000 000</p>
                </div>
              </a>
              <a
                href="mailto:support@civilregistry.gov.et"
                className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm">support@civilregistry.gov.et</p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Tutorials */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tutorials & Guides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tutorials.map((tutorial, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    {tutorial.type === 'video' ? (
                      <Video className="h-6 w-6 text-red-500 mt-1" />
                    ) : (
                      <FileText className="h-6 w-6 text-blue-500 mt-1" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {tutorial.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {tutorial.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {tutorial.type === 'video' ? tutorial.duration : tutorial.pages}
                        </span>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No results found
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or browse different categories.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;