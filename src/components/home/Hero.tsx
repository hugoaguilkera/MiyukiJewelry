import { Link } from "wouter";

const Hero = () => {
  return (
    <section id="inicio" className="relative bg-[#F5F5DC] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Descubre la belleza artesanal en cada pieza
            </h1>
            <p className="text-lg mb-8 max-w-md">
              Joyería hecha a mano con pasión y dedicación. Cada pieza cuenta una historia única.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#productos" 
                className="bg-[#D4AF37] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md shadow-md transition-all transform hover:scale-105 text-center"
              >
                Ver colección
              </Link>
              <Link 
                href="#contacto" 
                className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-medium py-3 px-6 rounded-md transition-colors text-center"
              >
                Contáctanos
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1611085583191-a3b181a88581?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8amV3ZWxyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Joyería artesanal Miyuki" 
                className="rounded-lg shadow-lg transform translate-y-4 w-full h-64 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8amV3ZWxyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Detalles de joyas artesanales" 
                className="rounded-lg shadow-lg transform -translate-y-4 w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#F7CAC9] opacity-20 rounded-bl-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#5F9EA0] opacity-10 rounded-tr-full -z-10"></div>
    </section>
  );
};

export default Hero;
