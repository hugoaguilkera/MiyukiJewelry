import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import './chatBox.css';

interface FormData {
  name: string;
  phone: string;
  address: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  address: '',
  message: ''
};

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset form when opening
      setIsSubmitted(false);
      setFormData(initialFormData);
      setErrors({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El celular es requerido';
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Solo se permiten números';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Log data to console for now
    console.log('Datos del formulario de contacto:', formData);
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsOpen(false);
      // Reset form
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData(initialFormData);
      }, 500);
    }, 3000);
  };

  return (
    <>
      {/* Botón de chat flotante */}
      <button
        onClick={toggleChatBox}
        className="chat-button fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 text-white shadow-lg flex items-center justify-center focus:outline-none"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        title={isOpen ? "Cerrar chat" : "¿Te gustaría que te contactemos?"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Ventana de chat */}
      {isOpen && (
        <div 
          className="chat-box fixed bottom-24 right-24 w-80 sm:w-96 bg-white rounded-lg shadow-xl transition-all duration-300 ease-in-out"
          style={{
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderTop: '3px solid #F59E0B'
          }}
        >
          {/* Encabezado */}
          <div className="bg-gradient-to-r from-amber-300 to-amber-500 text-white rounded-t-lg p-4">
            <h3 className="text-lg font-semibold">¿Te gustaría que te contactemos?</h3>
          </div>
          
          {/* Contenido */}
          <div className="p-4">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-field w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  
                  {/* Celular */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Celular *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-field w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>
                  
                  {/* Dirección */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección de envío *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={2}
                      value={formData.address}
                      onChange={handleChange}
                      className={`input-field w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                  </div>
                  
                  {/* Mensaje */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Comentario o mensaje (opcional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="input-field w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white py-2 px-4 rounded-md hover:from-amber-500 hover:to-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
                  >
                    <span>Enviar mensaje</span>
                    <Send className="w-4 h-4" />
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-2">
                    * Campos obligatorios
                  </p>
                </div>
              </form>
            ) : (
              <div className="py-10 text-center">
                <div className="success-animation inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">¡Gracias!</h4>
                <p className="text-gray-600">Te contactaremos pronto.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;