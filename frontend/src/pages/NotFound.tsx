import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-muted/30 px-4">
      <div className="text-center max-w-md animate-fade-in">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="inline-flex p-6 bg-destructive/10 rounded-full mb-4">
            <AlertCircle className="h-16 w-16 text-destructive" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <h1 className="font-display text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground leading-relaxed">
            The page you're looking for doesn't exist or may have been moved. 
            Let's get you back to safety.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="hero" size="lg" className="group">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/verify">
            <Button variant="civic" size="lg">
              <Search className="h-4 w-4 mr-2" />
              Verify Certificate
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team at{" "}
            <a 
              href="mailto:support@civicconnect.gov.et" 
              className="text-primary hover:underline font-medium"
            >
              support@civicconnect.gov.et
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
