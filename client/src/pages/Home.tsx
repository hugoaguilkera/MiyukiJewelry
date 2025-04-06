import React, { useEffect } from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import ProductGallery from "@/components/products/ProductGallery";
import TestimonialCarousel from "@/components/testimonials/TestimonialCarousel";
import ContactForm from "@/components/contact/ContactForm";

const Home = () => {
  // Handle smooth scrolling when clicking on anchor links
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: "smooth",
          });
        }
      }
    };

    // Handle initial load with hash in URL
    if (window.location.hash) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(handleHashChange, 100);
    }

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div>
      <Hero />
      <Features />
      <ProductGallery />
      <section id="testimonios" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mayor recompensa.
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>
      <ContactForm />
    </div>
  );
};

export default Home;
