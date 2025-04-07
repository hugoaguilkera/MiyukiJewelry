import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertProductSchema, 
  insertCategorySchema, 
  insertTestimonialSchema, 
  insertContactMessageSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes prefix
  const apiPrefix = "/api";
  
  // GET /api/categories - Get all categories
  app.get(`${apiPrefix}/categories`, async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Error fetching categories" });
    }
  });
  
  // GET /api/categories/:slug - Get category by slug
  app.get(`${apiPrefix}/categories/:slug`, async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      console.error(`Error fetching category ${req.params.slug}:`, error);
      res.status(500).json({ message: "Error fetching category" });
    }
  });
  
  // POST /api/categories - Create new category
  app.post(`${apiPrefix}/categories`, async (req: Request, res: Response) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const newCategory = await storage.createCategory(categoryData);
      res.status(201).json(newCategory);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Error creating category" });
    }
  });
  
  // PUT /api/categories/:id - Update category
  app.put(`${apiPrefix}/categories/:id`, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const categoryData = insertCategorySchema.partial().parse(req.body);
      const updatedCategory = await storage.updateCategory(Number(id), categoryData);
      
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(updatedCategory);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error(`Error updating category ${req.params.id}:`, error);
      res.status(500).json({ message: "Error updating category" });
    }
  });
  
  // DELETE /api/categories/:id - Delete category
  app.delete(`${apiPrefix}/categories/:id`, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteCategory(Number(id));
      
      if (!success) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error(`Error deleting category ${req.params.id}:`, error);
      res.status(500).json({ message: "Error deleting category" });
    }
  });
  
  // GET /api/products - Get all products
  app.get(`${apiPrefix}/products`, async (req: Request, res: Response) => {
    try {
      const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
      
      let products;
      if (categoryId) {
        products = await storage.getProductsByCategory(categoryId);
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products" });
    }
  });
  
  // GET /api/products/:id - Get product by ID
  app.get(`${apiPrefix}/products/:id`, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await storage.getProductById(Number(id));
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      console.error(`Error fetching product ${req.params.id}:`, error);
      res.status(500).json({ message: "Error fetching product" });
    }
  });
  
  // POST /api/products - Create new product
  app.post(`${apiPrefix}/products`, async (req: Request, res: Response) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const newProduct = await storage.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Error creating product" });
    }
  });
  
  // PUT /api/products/:id - Update product
  app.put(`${apiPrefix}/products/:id`, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const productData = insertProductSchema.partial().parse(req.body);
      const updatedProduct = await storage.updateProduct(Number(id), productData);
      
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(updatedProduct);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error(`Error updating product ${req.params.id}:`, error);
      res.status(500).json({ message: "Error updating product" });
    }
  });
  
  // DELETE /api/products/:id - Delete product
  app.delete(`${apiPrefix}/products/:id`, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteProduct(Number(id));
      
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error(`Error deleting product ${req.params.id}:`, error);
      res.status(500).json({ message: "Error deleting product" });
    }
  });
  
  // GET /api/testimonials - Get all testimonials
  app.get(`${apiPrefix}/testimonials`, async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Error fetching testimonials" });
    }
  });
  
  // POST /api/testimonials - Create new testimonial
  app.post(`${apiPrefix}/testimonials`, async (req: Request, res: Response) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const newTestimonial = await storage.createTestimonial(testimonialData);
      res.status(201).json(newTestimonial);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Error creating testimonial" });
    }
  });
  
  // POST /api/contact - Create new contact message
  app.post(`${apiPrefix}/contact`, async (req: Request, res: Response) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const newMessage = await storage.createContactMessage(messageData);
      res.status(201).json({ success: true, id: newMessage.id });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Error creating contact message:", error);
      res.status(500).json({ message: "Error creating contact message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
