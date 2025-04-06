import { 
  users, 
  products, 
  testimonials, 
  contactMessages,
  type User, 
  type InsertUser, 
  type Product, 
  type InsertProduct,
  type Testimonial,
  type InsertTestimonial,
  type ContactMessage,
  type InsertContactMessage 
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User methods (keeping original methods)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private testimonials: Map<number, Testimonial>;
  private contactMessages: Map<number, ContactMessage>;
  
  private currentUserId: number;
  private currentProductId: number;
  private currentTestimonialId: number;
  private currentContactMessageId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.testimonials = new Map();
    this.contactMessages = new Map();
    
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentTestimonialId = 1;
    this.currentContactMessageId = 1;
    
    // Initialize with sample testimonials
    this.initTestimonials();
  }

  // User methods (from original code)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }
  
  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const message: ContactMessage = { ...insertMessage, id };
    this.contactMessages.set(id, message);
    return message;
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  // Initialize sample testimonials
  private initTestimonials() {
    const testimonials: InsertTestimonial[] = [
      {
        name: "Laura Martínez",
        content: "Las piezas de Miyuki son increíblemente hermosas y únicas. Recibí muchos cumplidos por mi collar y siempre recomiendo esta tienda. La calidad es excepcional.",
        rating: 5,
        customerSince: "2021",
        imageUrl: "https://randomuser.me/api/portraits/women/62.jpg"
      },
      {
        name: "Carlos Rodríguez",
        content: "Compré una pulsera como regalo para mi hija y quedó encantada. El servicio fue excelente y el empaque muy elegante. Definitivamente volveré a comprar.",
        rating: 5,
        customerSince: "2022",
        imageUrl: "https://randomuser.me/api/portraits/men/41.jpg"
      },
      {
        name: "Ana García",
        content: "La atención personalizada que me brindaron fue excepcional. Las piezas son tan delicadas y hermosas como se ven en las fotos. Me encanta que cada pieza sea única.",
        rating: 4,
        customerSince: "2020",
        imageUrl: "https://randomuser.me/api/portraits/women/33.jpg"
      }
    ];
    
    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

export const storage = new MemStorage();
