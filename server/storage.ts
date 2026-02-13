import { db } from "./db";
import { eq } from "drizzle-orm";
import { 
  users, 
  categories,
  products,
  testimonials,
  contactMessages,
  type User, 
  type InsertUser,
  type Category,
  type InsertCategory,
  type Product,
  type InsertProduct,
  type Testimonial,
  type InsertTestimonial,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // User methods (kept from original)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }
  
  async updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const [updatedCategory] = await db
      .update(categories)
      .set(category)
      .where(eq(categories.id, id))
      .returning();
    return updatedCategory;
  }
  
  async deleteCategory(id: number): Promise<boolean> {
    const result = await db.delete(categories).where(eq(categories.id, id));
    return result.count > 0;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.categoryId, categoryId));
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
  
  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.count > 0;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }
  
  // Contact methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }
}

// For development or when database is not available, use MemStorage
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private testimonials: Map<number, Testimonial>;
  private contactMessages: Map<number, ContactMessage>;
  private currentIds: {
    users: number;
    categories: number;
    products: number;
    testimonials: number;
    contactMessages: number;
  };

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.testimonials = new Map();
    this.contactMessages = new Map();
    this.currentIds = {
      users: 1,
      categories: 1,
      products: 1,
      testimonials: 1,
      contactMessages: 1
    };
    
    // Add some initial data
    this.initializeData();
  }

  private initializeData() {
    // Add categories
    const categoriesData: InsertCategory[] = [
      { name: "Pulseras", slug: "pulseras", imageUrl: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnJhY2VsZXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
      { name: "Collares", slug: "collares", imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmVja2xhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
      { name: "Aretes", slug: "aretes", imageUrl: "https://images.unsplash.com/photo-1575863527524-77f9e12effae?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZWFycmluZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
      { name: "Anillos", slug: "anillos", imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
    ];
    
    for (const category of categoriesData) {
      this.createCategory(category);
    }
    
    // Add products
    const productsData: InsertProduct[] = [
      { 
        name: "Pulsera de Cuentas", 
        price: 250, 
        description: "Hermosa pulsera artesanal hecha con cuentas de colores.", 
        imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhZCUyMGJyYWNlbGV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
        categoryId: 1 
      },
      { 
        name: "Pulsera de Corazones", 
        price: 320, 
        description: "Pulsera artesanal decorada con hermosos corazones.", 
        imageUrl: "/images/pulsera-corazones.png", 
        categoryId: 1 
      },
      { 
        name: "Aretes Colgantes", 
        price: 180, 
        description: "Elegantes aretes colgantes hechos a mano.", 
        imageUrl: "https://images.unsplash.com/photo-1576022162026-9b1b183184ac?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZWFycmluZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
        categoryId: 3 
      },
      { 
        name: "Collar Bohemio", 
        price: 420, 
        description: "Collar de estilo bohemio con detalles únicos.", 
        imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8amV3ZWxyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
        categoryId: 2 
      },
      { 
        name: "Anillo Dorado", 
        price: 350, 
        description: "Elegante anillo dorado con diseño minimalista.", 
        imageUrl: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z29sZCUyMHJpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
        categoryId: 4 
      },
      { 
        name: "Collar de Cuentas", 
        price: 290, 
        description: "Collar hecho con cuentas de colores.", 
        imageUrl: "https://images.unsplash.com/photo-1561172317-5c06dc6cbddc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVhZCUyMG5lY2tsYWNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
        categoryId: 2 
      },
      { 
        name: "Aretes Minimalistas", 
        price: 150, 
        description: "Aretes con diseño minimalista y elegante.", 
        imageUrl: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZWFycmluZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
        categoryId: 3 
      },
      { 
        name: "Pulsera Tejida", 
        price: 280, 
        description: "Pulsera artesanal tejida a mano.", 
        imageUrl: "https://images.unsplash.com/photo-1620786148566-2b5dd564ebc6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGpld2Vscnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
        categoryId: 1 
      }
    ];
    
    for (const product of productsData) {
      this.createProduct(product);
    }
    
    // Add testimonials
    const testimonialsData: InsertTestimonial[] = [
      {
        customerName: "Laura Martínez",
        customerImage: "https://randomuser.me/api/portraits/women/44.jpg",
        comment: "Las pulseras de Miyuki son hermosas. La calidad es excepcional y el diseño es único. Recomiendo totalmente comprar aquí, el servicio es excelente y la entrega fue muy rápida.",
        rating: 5,
        customerSince: "2021"
      },
      {
        customerName: "Carlos Ruiz",
        customerImage: "https://randomuser.me/api/portraits/men/32.jpg",
        comment: "Compré un collar para regalar a mi hermana y quedó encantada. El empaque es precioso y la joya es exactamente como se ve en las fotos. Definitivamente volveré a comprar.",
        rating: 4,
        customerSince: "2022"
      },
      {
        customerName: "Ana García",
        customerImage: "https://randomuser.me/api/portraits/women/68.jpg",
        comment: "Los aretes que compré son preciosos y muy ligeros de usar. Me encantan los detalles artesanales y el toque personalizado. La atención al cliente es excelente, respondieron todas mis dudas.",
        rating: 5,
        customerSince: "2020"
      }
    ];
    
    for (const testimonial of testimonialsData) {
      this.createTestimonial(testimonial);
    }
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.currentIds.categories++;
    const newCategory: Category = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }
  
  async updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const existingCategory = this.categories.get(id);
    if (!existingCategory) return undefined;
    
    const updatedCategory: Category = {
      ...existingCategory,
      ...category
    };
    
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }
  
  async deleteCategory(id: number): Promise<boolean> {
    return this.categories.delete(id);
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentIds.products++;
    const rating = 4 + Math.random(); // Random rating between 4 and 5
    const reviewCount = Math.floor(Math.random() * 30) + 5; // Random review count
    const createdAt = new Date();
    
    const newProduct: Product = { 
      ...product, 
      id, 
      rating: rating > 5 ? 5 : rating, 
      reviewCount,
      createdAt
    };
    
    this.products.set(id, newProduct);
    return newProduct;
  }
  
  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;
    
    const updatedProduct: Product = {
      ...existingProduct,
      ...product
    };
    
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentIds.testimonials++;
    const createdAt = new Date();
    
    const newTestimonial: Testimonial = {
      ...testimonial,
      id,
      createdAt
    };
    
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
  
  // Contact methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentIds.contactMessages++;
    const createdAt = new Date();
    
    const newMessage: ContactMessage = {
      ...message,
      id,
      createdAt
    };
    
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
}

// Use MemStorage for development or when DATABASE_URL is not available
export const storage = new DatabaseStorage();
