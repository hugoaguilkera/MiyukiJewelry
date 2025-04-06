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
import { useInMemoryStorage } from "@shared/env";

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
  
  // Initialize data (for both implementations)
  initializeData(): Promise<void>;
}

import { db } from "./db";
import { eq } from "drizzle-orm";

// Sample products for memory storage
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Collar de Flor Azul",
    price: "280.00",
    category: "collares",
    description: "Hermoso collar con diseño de flor en tonos azules, hecho a mano con cuentas Miyuki de alta calidad.",
    imageUrl: "/images/collar_flor_azul.svg"
  },
  {
    id: 2,
    name: "Pulsera de Arcoíris",
    price: "150.00",
    category: "pulseras",
    description: "Pulsera colorida con patrón de arcoíris, perfecta para el verano y combinar con múltiples atuendos.",
    imageUrl: "/images/pulsera_arcoiris.svg"
  },
  {
    id: 3,
    name: "Aretes de Luna",
    price: "180.00",
    category: "aretes",
    description: "Elegantes aretes con forma de luna creciente en tonos plateados y cristales, ideales para ocasiones especiales.",
    imageUrl: "/images/aretes_luna.svg"
  },
  {
    id: 4,
    name: "Anillo de Flores",
    price: "120.00",
    category: "anillos",
    description: "Delicado anillo con patrón de flores pequeñas, ajustable y muy cómodo de usar diariamente.",
    imageUrl: "/images/anillo_flores.svg"
  },
  {
    id: 5,
    name: "Collar de Corazón",
    price: "300.00",
    category: "collares",
    description: "Romántico collar con dije de corazón elaborado con minuciosas cuentas en tonos rojos y rosas.",
    imageUrl: "/images/collar_corazon.svg"
  },
  {
    id: 13,
    name: "Pulsera de Corazones",
    price: "185.00",
    category: "pulseras",
    description: "Hermosa pulsera con patrón de corazones, elaborada con cuentas Miyuki en tonos cálidos.",
    imageUrl: "/images/pulsera_corazones.png"
  }
];

// Sample testimonials for memory storage
const sampleTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Laura Martínez",
    content: "Las piezas de Miyuki son increíblemente hermosas y únicas. Recibí muchos cumplidos por mi collar y siempre recomiendo esta tienda. La calidad es excepcional.",
    rating: 5,
    customerSince: "2021",
    imageUrl: "https://randomuser.me/api/portraits/women/62.jpg"
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    content: "Compré una pulsera como regalo para mi hija y quedó encantada. El servicio fue excelente y el empaque muy elegante. Definitivamente volveré a comprar.",
    rating: 5,
    customerSince: "2022",
    imageUrl: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    id: 3,
    name: "Ana García",
    content: "La atención personalizada que me brindaron fue excepcional. Las piezas son tan delicadas y hermosas como se ven en las fotos. Me encanta que cada pieza sea única.",
    rating: 4,
    customerSince: "2020",
    imageUrl: "https://randomuser.me/api/portraits/women/33.jpg"
  }
];

// Memory storage implementation
export class MemoryStorage implements IStorage {
  private users: User[] = [];
  private products: Product[] = [...sampleProducts];
  private testimonials: Testimonial[] = [...sampleTestimonials];
  private contactMessages: ContactMessage[] = [];
  private nextUserId = 1;
  private nextProductId = sampleProducts.length + 1;
  private nextTestimonialId = sampleTestimonials.length + 1;
  private nextContactMessageId = 1;

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.nextUserId++,
      ...insertUser
    };
    this.users.push(user);
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.find(product => product.id === id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.products.filter(product => product.category === category);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const product: Product = {
      id: this.nextProductId++,
      ...insertProduct
    };
    this.products.push(product);
    return product;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const initialLength = this.products.length;
    this.products = this.products.filter(product => product.id !== id);
    return initialLength > this.products.length;
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return this.testimonials;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const testimonial: Testimonial = {
      id: this.nextTestimonialId++,
      ...insertTestimonial
    };
    this.testimonials.push(testimonial);
    return testimonial;
  }

  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const message: ContactMessage = {
      id: this.nextContactMessageId++,
      ...insertMessage,
      createdAt: new Date().toISOString()
    };
    this.contactMessages.push(message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return this.contactMessages;
  }

  // Initialize data
  async initializeData(): Promise<void> {
    // Data is already initialized in constructor
    console.log("Memory storage initialized with sample data");
  }
}

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
  
  // Initialize data - combines all initialization methods
  async initializeData(): Promise<void> {
    await this.initializeTestimonials();
  }
  
  // Initialize sample testimonials if none exist
  private async initializeTestimonials(): Promise<void> {
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

// Create storage based on environment
export const storage = useInMemoryStorage 
  ? new MemoryStorage() 
  : new DatabaseStorage();

// Initialize data at startup
(async () => {
  try {
    await storage.initializeData();
    console.log(`${useInMemoryStorage ? 'Memory' : 'Database'} storage initialized with sample data`);
  } catch (error) {
    console.error(`Error initializing ${useInMemoryStorage ? 'memory' : 'database'} storage:`, error);
  }
})();
