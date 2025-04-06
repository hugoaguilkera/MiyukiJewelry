import React from 'react';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import './socialButtons.css';

const SocialButtons = () => {
  const openFacebook = () => {
    window.open('https://www.facebook.com/share/12JoCjxdZcJ/', '_blank');
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/52181849955181?text=Hola%2C%20me%20interesan%20los%20productos%20de%20Miyuki%20✨', '_blank');
  };

  return (
    <div className="social-buttons-container">
      {/* Botón de Facebook */}
      <button
        onClick={openFacebook}
        className="social-button facebook-button fixed bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#1877F2] text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2] z-50"
        title="Compartir en Facebook"
        aria-label="Compartir en Facebook"
        data-tooltip="Compartir en Facebook"
      >
        <FaFacebook className="w-6 h-6 md:w-7 md:h-7" />
        <span className="sr-only">Compartir en Facebook</span>
      </button>

      {/* Botón de WhatsApp */}
      <button
        onClick={openWhatsApp}
        className="social-button whatsapp-button fixed bottom-6 left-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] z-50"
        title="Contactar por WhatsApp"
        aria-label="Contactar por WhatsApp"
        data-tooltip="Contactar por WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6 md:w-7 md:h-7" />
        <span className="sr-only">Contactar por WhatsApp</span>
      </button>
    </div>
  );
};

export default SocialButtons;