import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  subject: z.string().min(2, "El asunto debe tener al menos 2 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres")
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/contact', data);
      
      toast({
        title: "Mensaje enviado",
        description: "Hemos recibido tu mensaje. Te contactaremos pronto.",
        variant: "default",
      });
      
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error sending contact form:", error);
      
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-16 bg-[#F5F5DC]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Contáctanos</h2>
            <p className="mb-6">Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos a la brevedad.</p>
            
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-white mr-4">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-medium">Ubicación</h4>
                  <p>Fuentes 211, Villas de Anáhuac, Sector Alpes</p>
                  <p>C.P. 66059</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-white mr-4">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h4 className="font-medium">Teléfono</h4>
                  <p>+52 8184995581</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-white mr-4">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p>info@miyuki.com</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-white hover:bg-opacity-90 transition-opacity" 
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-white hover:bg-opacity-90 transition-opacity" 
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://wa.me/528184995581" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-white hover:bg-opacity-90 transition-opacity" 
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-white hover:bg-opacity-90 transition-opacity" 
                aria-label="Pinterest"
              >
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">Nombre</label>
                  <input 
                    type="text" 
                    id="name" 
                    className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`} 
                    placeholder="Tu nombre"
                    {...register("name")}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`} 
                    placeholder="Tu email"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-2 font-medium">Asunto</label>
                <input 
                  type="text" 
                  id="subject" 
                  className={`w-full border ${errors.subject ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`} 
                  placeholder="Asunto del mensaje"
                  {...register("subject")}
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">Mensaje</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className={`w-full border ${errors.message ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`} 
                  placeholder="Escribe tu mensaje aquí..."
                  {...register("message")}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#D4AF37] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md shadow-md transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
