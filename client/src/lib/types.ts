// Client-side types

export type ProductCategory = 'collares' | 'pulseras' | 'aretes' | 'anillos' | 'all';

export type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  description: string;
  imageUrl: string;
};

export type Testimonial = {
  id: number;
  name: string;
  content: string;
  rating: number;
  customerSince: string;
  imageUrl: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ProductFormData = {
  name: string;
  price: string;
  category: string;
  description: string;
  imageUrl: string;
};
