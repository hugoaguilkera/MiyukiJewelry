import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TestimonialCard from "../ui/testimonial-card";
import { Testimonial } from "../../types";

const Testimonials = () => {
  const [activePage, setActivePage] = useState(0);
  const testimonialsPerPage = 3;

  // Fetch testimonials
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  if (isLoading) {
    return (
      <section id="testimonios" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Lo que dicen nuestros clientes</h2>
            <p className="max-w-xl mx-auto text-[#333333] text-opacity-70">Cargando testimonios...</p>
          </div>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-6 bg-[#F5F5DC] rounded-lg animate-pulse">
                <div className="flex flex-col h-full">
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
                  <div className="h-20 bg-gray-300 rounded mb-4"></div>
                  <div className="flex items-center mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonios" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Lo que dicen nuestros clientes</h2>
            <p className="text-red-500">Error al cargar los testimonios. Por favor, intenta de nuevo más tarde.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <section id="testimonios" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Lo que dicen nuestros clientes</h2>
            <p>Aún no hay testimonios. ¡Sé el primero en compartir tu experiencia!</p>
          </div>
        </div>
      </section>
    );
  }

  // Calculate total pages
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  
  // Get current page testimonials
  const currentTestimonials = testimonials.slice(
    activePage * testimonialsPerPage,
    (activePage + 1) * testimonialsPerPage
  );

  return (
    <section id="testimonios" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Lo que dicen nuestros clientes</h2>
          <p className="max-w-xl mx-auto text-[#333333] text-opacity-70">
            Conoce las experiencias de quienes ya disfrutan de nuestras piezas artesanales.
          </p>
        </div>

        <div className="flex flex-nowrap md:flex-wrap overflow-x-auto pb-8 -mx-4 px-4 space-x-4 md:space-x-0 md:gap-4 scrollbar-hide">
          {currentTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === activePage ? "bg-[#D4AF37]" : "bg-gray-300 hover:bg-[#D4AF37]"
                } transition-colors`}
                onClick={() => setActivePage(index)}
                aria-label={`Página ${index + 1}`}
                aria-current={index === activePage ? "page" : undefined}
              ></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
