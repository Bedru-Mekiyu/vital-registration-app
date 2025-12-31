import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Shield, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-display text-xl font-bold text-primary">CivicConnect</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering citizens with secure, efficient access to vital government services.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">{t('home')}</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">{t('services')}</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">{t('about')}</Link></li>
              <li><Link to="/verify" className="hover:text-primary transition-colors">Verify Certificate</Link></li>
              <li><Link to="/news" className="hover:text-primary transition-colors">News</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('support')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t('contact')}</Link></li>
              <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/accessibility" className="hover:text-primary transition-colors">{t('accessibility')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">{t('privacyPolicy')}</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">{t('termsOfService')}</Link></li>
              <li><Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link to="/compliance" className="hover:text-primary transition-colors">Compliance</Link></li>
              <li><Link to="/sla" className="hover:text-primary transition-colors">SLA</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Developers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/api-docs" className="hover:text-primary transition-colors">API Documentation</Link></li>
              <li><Link to="/status" className="hover:text-primary transition-colors">System Status</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Ethiopian Government. {t('allRightsReserved')}.
          </p>
        </div>
      </div>
    </footer>
  );
};