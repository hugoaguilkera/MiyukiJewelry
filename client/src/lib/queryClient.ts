import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Detectar si estamos en GitHub Pages u otro entorno sin backend
const isStaticHosting = () => {
  if (typeof window === 'undefined') return false;
  
  // GitHub Pages u otros hostings estáticos donde no hay backend
  return window.location.hostname.includes('github.io') || 
         (import.meta.env.MODE === 'production' && !import.meta.env.VITE_API_URL);
};

// Mapeo de simulación para entornos sin backend
const mockResponses: Record<string, any> = {
  '/api/products': () => import('@/mocks/products.json'),
  '/api/testimonials': () => import('@/mocks/testimonials.json'),
  // Agregar más rutas según sea necesario
};

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Obtener la URL base de la API
const getApiBaseUrl = () => {
  // Si hay una URL específica en las variables de entorno, usarla
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // En desarrollo, usar la URL relativa normal
  return '';
};

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Si estamos en GitHub Pages y es una solicitud a la API
  if (isStaticHosting() && url.startsWith('/api/')) {
    console.warn('Ejecutando en entorno estático sin backend, usando datos de muestra');
    
    // Simular un retardo para que parezca una solicitud real
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Crear una respuesta simulada para POST/PUT/DELETE
    if (method !== 'GET') {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    throw new Error(`No se puede realizar ${method} a ${url} en entorno estático`);
  }
  
  const apiUrl = `${getApiBaseUrl()}${url}`;
  
  const res = await fetch(apiUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    
    // Si estamos en GitHub Pages y es una solicitud a la API
    if (isStaticHosting() && url.startsWith('/api/')) {
      console.warn('Ejecutando en entorno estático sin backend, usando datos de muestra');
      
      // Buscar una respuesta simulada para esta ruta
      const matchingRoute = Object.keys(mockResponses).find(route => {
        // Comprobar si la URL coincide exactamente o con un patrón como /api/products/1
        return url === route || (url.startsWith(route + '/') && route !== '/api/');
      });
      
      if (matchingRoute) {
        try {
          // Simular un retardo para que parezca una solicitud real
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Obtener los datos simulados
          const module = await mockResponses[matchingRoute]();
          return module.default;
        } catch (error) {
          console.error('Error al cargar datos simulados:', error);
          throw new Error(`No se pudieron cargar datos simulados para ${url}`);
        }
      } else {
        throw new Error(`No hay datos simulados disponibles para ${url}`);
      }
    }
    
    const apiUrl = `${getApiBaseUrl()}${url}`;
    
    const res = await fetch(apiUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
