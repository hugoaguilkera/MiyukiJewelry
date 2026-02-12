const SocialButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      <a 
        href="https://wa.me/528184995581" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform" 
        aria-label="WhatsApp"
      >
        <i className="fab fa-whatsapp text-xl"></i>
      </a>
      <a 
        href="#contacto" 
        className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform" 
        aria-label="Contáctanos"
      >
        <i className="fas fa-envelope text-xl"></i>
      </a>
    </div>
  );
};

export default SocialButtons;
