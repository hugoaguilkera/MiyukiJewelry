import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { contactFormSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MapPin, Mail, Phone, Clock, FacebookIcon, InstagramIcon } from "lucide-react";
import { FaPinterest, FaTiktok } from "react-icons/fa";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { ContactFormData } from "@/lib/types";

const ContactForm = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Mensaje enviado",
        description: "¡Gracias por tu mensaje! Te contactaremos pronto.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contacto" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Contáctanos</h2>
          <p className="text-lg max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o solicitud especial? Estamos aquí para ayudarte.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-display font-bold mb-4">Envíanos un mensaje</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Nombre completo
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Correo electrónico
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email" 
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Asunto
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Mensaje
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              rows={4} 
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={contactMutation.isPending}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 h-auto"
                    >
                      {contactMutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Enviar mensaje
                    </Button>
                  </form>
                </Form>
              </div>
              
              <div className="md:w-1/2 bg-primary text-white p-8">
                <h3 className="text-2xl font-display font-bold mb-6">Información de contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="flex-shrink-0 mt-1 text-white/80" />
                    <div className="ml-4">
                      <p className="font-medium">Dirección</p>
                      <p className="text-white/80">
                        Calle Artesanal 123, Col. Centro<br />
                        Ciudad de México, México
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="flex-shrink-0 mt-1 text-white/80" />
                    <div className="ml-4">
                      <p className="font-medium">Correo electrónico</p>
                      <p className="text-white/80">info@miyuki.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="flex-shrink-0 mt-1 text-white/80" />
                    <div className="ml-4">
                      <p className="font-medium">Teléfono</p>
                      <p className="text-white/80">+52 55 1234 5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="flex-shrink-0 mt-1 text-white/80" />
                    <div className="ml-4">
                      <p className="font-medium">Horario de atención</p>
                      <p className="text-white/80">
                        Lunes a Viernes: 10:00 AM - 7:00 PM<br />
                        Sábado: 10:00 AM - 3:00 PM
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-3">Síguenos</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-white hover:text-white/80 transition duration-300">
                      <FacebookIcon size={20} />
                    </a>
                    <a href="#" className="text-white hover:text-white/80 transition duration-300">
                      <InstagramIcon size={20} />
                    </a>
                    <a href="#" className="text-white hover:text-white/80 transition duration-300">
                      <FaPinterest size={20} />
                    </a>
                    <a href="#" className="text-white hover:text-white/80 transition duration-300">
                      <FaTiktok size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
