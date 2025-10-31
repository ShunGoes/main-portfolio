"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Code, Smartphone, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { motion, AnimatePresence } from '@/components/motion';
import { cn } from '@/lib/utils';

const NavItem = ({ href, text, icon: Icon, onClick }: { 
  href: string; 
  text: string; 
  icon?: React.ElementType;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={cn(
        "flex items-center px-4 py-2 text-sm font-medium transition-colors",
        "hover:text-primary rounded-md",
        isActive 
          ? "text-primary font-semibold" 
          : "text-muted-foreground"
      )}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {text}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full w-full"
          layoutId="navbar-active"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          <span className="text-primary">Favour Timothy</span>
        </Link>

        <nav className="hidden md:flex space-x-1 relative">
          <NavItem href="/" text="Home" />
          {/* <NavItem href="/wordpress" text="WordPress" icon={Laptop} /> */}
          <NavItem href="/fullstack" text="Full Stack" icon={Code} />
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t bg-background"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <NavItem href="/" text="Home" onClick={closeMobileMenu} />
              <NavItem href="/wordpress" text="WordPress" icon={Laptop} onClick={closeMobileMenu} />
              <NavItem href="/fullstack" text="Full Stack" icon={Code} onClick={closeMobileMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}