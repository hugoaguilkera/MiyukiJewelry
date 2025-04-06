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

import { db } from "./db";
import { eq } from "drizzle-orm";

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
  }
  
  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }
  
  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }
  
  // Initialize sample testimonials if none exist
  async initializeTestimonials(): Promise<void> {
    const existingTestimonials = await db.select().from(testimonials);
    
    if (existingTestimonials.length === 0) {
      const sampleTestimonials: InsertTestimonial[] = [
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
      
      await db.insert(testimonials).values(sampleTestimonials);
    }
  }
}

// Create and initialize database storage
export const storage = new DatabaseStorage();

// Initialize testimonials data (run this at startup)
(async () => {
  try {
    await (storage as DatabaseStorage).initializeTestimonials();
    console.log("Database initialized with sample testimonials (if needed)");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
})();
