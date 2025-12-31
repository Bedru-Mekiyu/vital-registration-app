import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { AccessibilityMenu } from "@/components/AccessibilityMenu";
import { Menu, Shield, User, LogOut, Settings, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationCenter } from "@/components/NotificationCenter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t('home') },
    { href: "/services", label: t('services') },
    { href: "/about", label: t('about') },
    { href: "/faq", label: 'FAQ' },
    { href: "/help", label: 'Help' },
    { href: "/contact", label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-display text-xl font-bold text-primary">CivicConnect</span>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((item) => (
              <Link key={item.href} to={item.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <AccessibilityMenu />
            <LanguageToggle />
            <ThemeToggle />
            {user ? (
              <>
                <NotificationCenter />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {user.email?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-popover border-border" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Manage your account
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="flex items-center cursor-pointer text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      {t('logout') || 'Logout'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">{t('login')}</Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="sm">{t('getStarted')}</Button>
                </Link>
              </>
            )}
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} to={link.href} className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col space-y-3 pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                  {user ? (
                    <>
                      <Link to="/dashboard" className="w-full">
                        <Button variant="outline" className="w-full">
                          <User className="h-4 w-4 mr-2" />
                          Dashboard
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full" onClick={signOut}>
                        <LogOut className="h-4 w-4 mr-2" />
                        {t('logout') || 'Logout'}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth/login" className="w-full">
                        <Button variant="outline" className="w-full">{t('login')}</Button>
                      </Link>
                      <Link to="/auth/register" className="w-full">
                        <Button className="w-full">{t('getStarted')}</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};