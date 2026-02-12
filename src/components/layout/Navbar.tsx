import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../cart/CartDrawer";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, openCart } = useCart();
  const [location] = useLocation();

  // Detect scroll to add shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white ${isScrolled ? 'shadow-md' : ''} transition-shadow`}>
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="font-display text-3xl text-[#D4AF37] font-bold">Miyuki</Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link href="/#inicio" className="font-medium hover:text-[#D4AF37] transition-colors">Inicio</Link>
              <Link href="/#productos" className="font-medium hover:text-[#D4AF37] transition-colors">Productos</Link>
              <Link href="/#testimonios" className="font-medium hover:text-[#D4AF37] transition-colors">Testimonios</Link>
              <Link href="/#contacto" className="font-medium hover:text-[#D4AF37] transition-colors">Contacto</Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <button 
                className="p-2 hover:text-[#D4AF37] transition-colors" 
                aria-label="Buscar"
              >
                <i className="fas fa-search"></i>
              </button>
              
              {/* Cart */}
              <button 
                className="p-2 hover:text-[#D4AF37] transition-colors relative" 
                aria-label="Carrito"
                onClick={openCart}
              >
                <i className="fas fa-shopping-bag"></i>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              
              {/* Admin */}
              <Link href="/admin" className="p-2 hover:text-[#D4AF37] transition-colors" aria-label="Administración">
                <i className="fas fa-cog"></i>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-md focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden bg-white px-4 py-3 shadow-inner ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="space-y-2">
            <Link href="/#inicio" className="block py-2 font-medium hover:text-[#D4AF37] transition-colors">Inicio</Link>
            <Link href="/#productos" className="block py-2 font-medium hover:text-[#D4AF37] transition-colors">Productos</Link>
            <Link href="/#testimonios" className="block py-2 font-medium hover:text-[#D4AF37] transition-colors">Testimonios</Link>
            <Link href="/#contacto" className="block py-2 font-medium hover:text-[#D4AF37] transition-colors">Contacto</Link>
          </div>
        </div>
      </header>
      
      <CartDrawer />
    </>
  );
};

export default Navbar;
