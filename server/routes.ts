import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { 
  insertProductSchema, 
  insertContactMessageSchema,
  productFormSchema
} from "@shared/schema";
import { z } from "zod";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Base64 image handling
function saveBase64Image(base64String: string): string {
  // Extract the base64 data
  const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }
  
  const type = matches[1];
  const data = matches[2];
  const buffer = Buffer.from(data, 'base64');
  
  // Generate a unique filename
  const extension = type.split('/')[1];
  const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${extension}`;
  
  // Return the data URL for in-memory storage
  return base64String;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Product routes
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  });
  
  app.get("/api/products/category/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products by category" });
    }
  });
  
  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product" });
    }
  });
  
  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = productFormSchema.parse(req.body);
      
      // Create the product
      const product = await storage.createProduct({
        name: validatedData.name,
        price: validatedData.price,
        category: validatedData.category,
        description: validatedData.description,
        imageUrl: validatedData.imageUrl
      });
      
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: "Error creating product" });
    }
  });
  
  app.delete("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProduct(id);
      
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting product" });
    }
  });
  
  // Testimonial routes
  app.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Error fetching testimonials" });
    }
  });
  
  // Contact message routes
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = insertContactMessageSchema.parse({
        ...req.body,
        createdAt: new Date().toISOString()
      });
      
      // Create the contact message
      const message = await storage.createContactMessage(validatedData);
      
      res.status(201).json({ message: "Mensaje enviado correctamente" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: "Error sending contact message" });
    }
  });

  // Image upload endpoint for base64 data URLs
  app.post("/api/upload", async (req: Request, res: Response) => {
    try {
      const { image } = req.body;
      
      if (!image) {
        return res.status(400).json({ message: "No image provided" });
      }
      
      const imageUrl = saveBase64Image(image);
      res.status(200).json({ imageUrl });
    } catch (error) {
      res.status(500).json({ message: "Error uploading image" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
