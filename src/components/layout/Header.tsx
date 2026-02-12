import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import Cart from '@/components/cart/Cart';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Navigation links data
  const navLinks = [
    { href: "/#inicio", label: "Inicio" },
    { href: "/#productos", label: "Productos" },
    { href: "/#testimonios", label: "Testimonios" },
    { href: "/#contacto", label: "Contacto" },
    { href: "/admin", label: "Admin" }
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-primary">Miyuki</h1>
        </Link>
        
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = location === link.href || 
                              (link.href.startsWith('/#') && location === '/');
              
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-foreground hover:text-primary transition duration-300 font-medium ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          {/* Cart component - más visible */}
          <div className="relative z-50">
            <Cart />
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-foreground focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-foreground hover:text-primary transition duration-300 py-2 font-medium"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="py-2 flex items-center">
              <span className="text-foreground font-medium mr-2">Carrito:</span>
              <Cart />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
