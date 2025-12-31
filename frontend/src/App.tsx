import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import VerifyPage from "./pages/VerifyPage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ProfileSettings from "./pages/ProfileSettings";
import DocumentManager from "./pages/DocumentManager";
import CertificateVerification from "./pages/CertificateVerification";
import AppointmentScheduling from "./pages/AppointmentScheduling";
import EventApplication from "./pages/EventApplication";
import AdminDashboard from "./pages/AdminDashboard";
import FamilyTree from "./pages/FamilyTree";
import Rewards from "./pages/Rewards";
import AuditLogs from "./pages/AuditLogs";
import AccessibilityPage from "./pages/AccessibilityPage";
import HelpPage from "./pages/HelpPage";
import NewsPage from "./pages/NewsPage";
import FAQPage from "./pages/FAQPage";
import ServiceForm from "./pages/ServiceForm";
import Events from "./pages/Events";
import Verify from "./pages/Verify";
import Transparency from "./pages/Transparency";
import Education from "./pages/Education";
import CookiesPage from "./pages/CookiesPage";
import NotFound from "./pages/NotFound";
import NewsDetailPage from "./pages/NewsDetailPage";
import APIDocumentation from "./pages/APIDocumentation";
import SystemStatus from "./pages/SystemStatus";
import Compliance from "./pages/Compliance";
import SLAPage from "./pages/SLAPage";
import { ChatSupport } from "./components/ChatSupport";
import { VoiceCommands } from "./components/VoiceCommands";
import "@/lib/i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth/:type" element={<AuthPage />} />
                  <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
                  <Route path="/documents" element={<ProtectedRoute><DocumentManager /></ProtectedRoute>} />
                  <Route path="/appointments" element={<ProtectedRoute><AppointmentScheduling /></ProtectedRoute>} />
                  <Route path="/apply" element={<ProtectedRoute><EventApplication /></ProtectedRoute>} />
                  <Route path="/event-application" element={<ProtectedRoute><EventApplication /></ProtectedRoute>} />
                  <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/family-tree" element={<ProtectedRoute><FamilyTree /></ProtectedRoute>} />
                  <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
                  <Route path="/audit-logs" element={<ProtectedRoute><AuditLogs /></ProtectedRoute>} />
                  <Route path="/verify" element={<Verify />} />
                  <Route path="/transparency" element={<Transparency />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/accessibility" element={<AccessibilityPage />} />
                  <Route path="/help" element={<HelpPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/events/:serviceType" element={<ProtectedRoute><ServiceForm /></ProtectedRoute>} />
                  <Route path="/cookies" element={<CookiesPage />} />
                  <Route path="/news/:id" element={<NewsDetailPage />} />
                  <Route path="/api-docs" element={<APIDocumentation />} />
                  <Route path="/status" element={<SystemStatus />} />
                  <Route path="/compliance" element={<Compliance />} />
                  <Route path="/sla" element={<SLAPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <PWAInstallPrompt />
              <OfflineIndicator />
              <ChatSupport />
              <VoiceCommands />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
