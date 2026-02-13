import { Link } from "wouter";

const Hero = () => {
  return (
    <section id="inicio" className="relative bg-[#F5F5DC] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Texto */}
          <div>
            <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6 text-gray-800">
              Belleza artesanal en cada detalle
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Joyería hecha a mano con pasión y dedicación.
              Cada pieza cuenta una historia única.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalogos">
                <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
                  Ver Catálogo
                </button>
              </Link>

              <Link href="#contacto">
                <button className="border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition">
                  Contáctanos
                </button>
              </Link>
            </div>
          </div>

          {/* Espacio visual limpio */}
          <div className="flex items-center justify-center">
            <div className="w-full h-80 bg-white rounded-2xl shadow-md flex items-center justify-center">
              <span className="text-gray-400 text-lg">
                Imagen principal próximamente
              </span>
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