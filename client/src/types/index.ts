export interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl: string | null;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  categoryId: number;
  rating: number;
  reviewCount: number;
  createdAt: Date;
}

export interface Testimonial {
  id: number;
  customerName: string;
  customerImage: string | null;
  comment: string;
  rating: number;
  customerSince: string | null;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
