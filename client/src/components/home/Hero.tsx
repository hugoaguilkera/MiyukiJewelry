import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Hero = () => {
  return (
    <section id="inicio" className="pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
              Descubre la elegancia en cada detalle
            </h2>
            <p className="text-lg mb-6 leading-relaxed">
              Piezas de bisutería artesanal únicas y exclusivas, hechas a mano con pasión y delicadeza.
            </p>
            <Link href="#productos">
              <Button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 h-auto">
                Ver Colección
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Colección de joyería Miyuki" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
