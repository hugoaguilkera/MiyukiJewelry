import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';

interface SpeechRecognitionCommand {
  command: string;
  callback: () => void;
  description: string;
}

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [commands, setCommands] = useState<SpeechRecognitionCommand[]>([]);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [, navigate] = useLocation();

  // Check if Speech Recognition is supported
  useEffect(() => {
    const supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setIsSupported(supported);
  }, []);

  // Initialize default commands
  useEffect(() => {
    const defaultCommands: SpeechRecognitionCommand[] = [
      {
        command: 'ir a inicio',
        callback: () => navigate('/'),
        description: 'Navegar a la página de inicio'
      },
      {
        command: 'ir a productos',
        callback: () => navigate('/#productos'),
        description: 'Navegar a la sección de productos'
      },
      {
        command: 'ir a testimonios',
        callback: () => navigate('/#testimonios'),
        description: 'Navegar a la sección de testimonios'
      },
      {
        command: 'ir a contacto',
        callback: () => navigate('/#contacto'),
        description: 'Navegar a la sección de contacto'
      },
      {
        command: 'ir a carrito',
        callback: () => {
          const cartButton = document.querySelector('[aria-label="Abrir carrito"]');
          if (cartButton instanceof HTMLElement) {
            cartButton.click();
          }
        },
        description: 'Abrir el carrito de compras'
      },
      {
        command: 'ir a administración',
        callback: () => navigate('/admin'),
        description: 'Navegar al panel de administración'
      }
    ];
    
    setCommands(defaultCommands);
  }, [navigate]);

  // Start/stop listening
  const toggleListening = useCallback(() => {
    if (!isSupported) return;
    
    setIsListening(prevState => !prevState);
  }, [isSupported]);

  // Handle speech recognition
  useEffect(() => {
    if (!isSupported) return;

    // @ts-ignore - SpeechRecognition is not in the TypeScript types
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      if (isListening) {
        // Restart if it was supposed to be listening
        recognition.start();
      }
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      setTranscript(transcript);
      
      // Check if the transcript matches any command
      for (const { command, callback } of commands) {
        if (transcript === command.toLowerCase()) {
          callback();
          // Announce command execution for screen readers
          announceForScreenReader(`Ejecutando: ${command}`);
          break;
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    if (isListening) {
      try {
        recognition.start();
      } catch (err) {
        console.error('Speech recognition error', err);
      }
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, commands, isSupported]);

  // Add custom command
  const addCommand = useCallback((command: SpeechRecognitionCommand) => {
    setCommands(prev => [...prev, command]);
  }, []);

  // Announce text for screen readers
  const announceForScreenReader = (text: string) => {
    const announcer = document.getElementById('screen-reader-announcer');
    if (announcer) {
      announcer.textContent = text;
    } else {
      const newAnnouncer = document.createElement('div');
      newAnnouncer.id = 'screen-reader-announcer';
      newAnnouncer.className = 'sr-only';
      newAnnouncer.setAttribute('aria-live', 'assertive');
      newAnnouncer.textContent = text;
      document.body.appendChild(newAnnouncer);
    }
  };

  return {
    isListening,
    toggleListening,
    transcript,
    isSupported,
    commands,
    addCommand,
    announceForScreenReader
  };
}