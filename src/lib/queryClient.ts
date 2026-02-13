import { QueryClient, QueryFunction } from "@tanstack/react-query";

/* =========================
   MOCK DATA
========================= */

const mockProducts = [
  { id: 1, name: "Collar Miyuki", price: 450, image: "/generated-icon.png" },
  { id: 2, name: "Pulsera Artesanal", price: 320, image: "/generated-icon.png" },
];

const mockTestimonials = [
  { id: 1, name: "Ana López", comment: "Hermosas piezas, excelente calidad." },
  { id: 2, name: "Carlos Ruiz", comment: "Servicio increíble y diseños únicos." },
];

const mockCategories = [
  { id: 1, name: "Collares" },
  { id: 2, name: "Pulseras" },
];

/* =========================
   API REQUEST MOCK
========================= */

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<any> {
  console.log("Mock API:", method, url, data);

  if (url.includes("/api/products")) {
    return mockProducts;
  }

  if (url.includes("/api/testimonials")) {
    return mockTestimonials;
  }

  if (url.includes("/api/categories")) {
    return mockCategories;
  }

  if (url.includes("/api/contact")) {
    return { success: true };
  }

  return {};
}

/* =========================
   QUERY FUNCTION MOCK
========================= */

export const getQueryFn: <T>() => QueryFunction<T> =
  () =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;

    if (url.includes("/api/products")) {
      return mockProducts as unknown as T;
    }

    if (url.includes("/api/testimonials")) {
      return mockTestimonials as unknown as T;
    }

    if (url.includes("/api/categories")) {
      return mockCategories as unknown as T;
    }

    return null as T;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn(),
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