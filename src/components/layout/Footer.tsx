import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* BLOQUE 1 - Marca y redes */}
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Miyuki</h3>
            <p className="mb-4 text-gray-300">
              Creando joyas artesanales con pasión y dedicación. 
              Cada pieza es única y hecha con amor.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#D4AF37] transition-colors" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#D4AF37] transition-colors" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://wa.me/528110773873" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#D4AF37] transition-colors" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#D4AF37] transition-colors" aria-label="Pinterest">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
          </div>

          {/* BLOQUE 2 - Enlaces rápidos */}
          <div>
            <h4 className="font-medium text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/#inicio" className="text-gray-300 hover:text-[#D4AF37] transition-colors">Inicio</Link></li>
              <li><Link href="/#productos" className="text-gray-300 hover:text-[#D4AF37] transition-colors">Productos</Link></li>
              <li><Link href="/#testimonios" className="text-gray-300 hover:text-[#D4AF37] transition-colors">Testimonios</Link></li>
              <li><Link href="/#contacto" className="text-gray-300 hover:text-[#D4AF37] transition-colors">Contacto</Link></li>
              <li><Link href="/admin" className="text-gray-300 hover:text-[#D4AF37] transition-colors">Administración</Link></li>
            </ul>
          </div>

          {/* BLOQUE 3 - Contacto actualizado */}
          <div>
            <h4 className="font-medium text-lg mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-[#D4AF37]"></i>
                <span className="text-gray-300">
                  Fuentes 211, Villas de Anáhuac, Gral. Escobedo, NL
                </span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-2 text-[#D4AF37]"></i>
                <a href="tel:+528184995581" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  81 84995581
                </a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-[#D4AF37]"></i>
                <a href="mailto:mbecerra_sanchez@hotmail.com" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  mbecerra_sanchez@hotmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* BLOQUE 4 - Suscripción */}
          <div>
            <h4 className="font-medium text-lg mb-4">Suscríbete</h4>
            <p className="text-gray-300 mb-4">
              Recibe nuestras novedades y ofertas exclusivas.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none"
                aria-label="Email para suscripción"
              />
              <button 
                type="submit" 
                className="bg-[#D4AF37] px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors"
                aria-label="Suscribirse"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>

        </div>

        {/* BLOQUE 5 - Footer inferior */}
        <div className="border-t border-gray-700 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Miyuki. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;