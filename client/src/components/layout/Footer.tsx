import { Link } from 'wouter';
import { FacebookIcon, InstagramIcon, MapPin, Mail, Phone } from 'lucide-react';
import { FaPinterest, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4">Miyuki</h3>
            <p className="text-gray-300 mb-4">Bisutería artesanal hecha con pasión y dedicación.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition duration-300" aria-label="Facebook">
                <FacebookIcon size={18} />
              </a>
              <a href="#" className="text-white hover:text-primary transition duration-300" aria-label="Instagram">
                <InstagramIcon size={18} />
              </a>
              <a href="#" className="text-white hover:text-primary transition duration-300" aria-label="Pinterest">
                <FaPinterest size={18} />
              </a>
              <a href="#" className="text-white hover:text-primary transition duration-300" aria-label="TikTok">
                <FaTiktok size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#inicio" className="text-gray-300 hover:text-primary transition duration-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="text-gray-300 hover:text-primary transition duration-300">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/#testimonios" className="text-gray-300 hover:text-primary transition duration-300">
                  Testimonios
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="text-gray-300 hover:text-primary transition duration-300">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#productos" className="text-gray-300 hover:text-primary transition duration-300">
                  Collares
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="text-gray-300 hover:text-primary transition duration-300">
                  Pulseras
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="text-gray-300 hover:text-primary transition duration-300">
                  Aretes
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="text-gray-300 hover:text-primary transition duration-300">
                  Anillos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Calle Artesanal 123, Col. Centro<br />
                  Ciudad de México, México
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <a 
                  href="mailto:info@miyuki.com" 
                  className="text-gray-300 hover:text-primary transition duration-300"
                >
                  info@miyuki.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <a 
                  href="tel:+525512345678" 
                  className="text-gray-300 hover:text-primary transition duration-300"
                >
                  +52 55 1234 5678
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Miyuki. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
