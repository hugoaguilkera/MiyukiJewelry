import {
  pgTable,
  text,
  serial,
  integer,
  real,
  timestamp
} from "drizzle-orm/pg-core";

import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/* =====================================================
   USERS
===================================================== */

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

/* =====================================================
   CATEGORIES
===================================================== */

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  imageUrl: text("image_url"),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  slug: true,
  imageUrl: true,
});

/* =====================================================
   PRODUCTS
===================================================== */

export const products = pgTable("products", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),

  price: real("price").notNull(),

  description: text("description"),

  imageUrl: text("image_url"),

  // 🔥 Aseguramos que SIEMPRE sea número entero válido
  categoryId: integer("category_id").notNull(),

  rating: real("rating").default(0),

  reviewCount: integer("review_count").default(0),

  createdAt: timestamp("created_at").defaultNow(),
});

/* -----------------------------------------------------
   INSERT PRODUCT SCHEMA CORREGIDO
----------------------------------------------------- */

export const insertProductSchema = createInsertSchema(products)
  .omit({
    id: true,
    createdAt: true,
    rating: true,
    reviewCount: true,
  })
  .extend({
    // 🔥 Forzamos que categoryId sea número real
    categoryId: z.number({
      required_error: "La categoría es obligatoria",
      invalid_type_error: "La categoría debe ser número",
    }),

    price: z.number({
      required_error: "El precio es obligatorio",
      invalid_type_error: "El precio debe ser número",
    }),

    imageUrl: z.string().nullable().optional(),
  });

/* =====================================================
   TESTIMONIALS
===================================================== */

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerImage: text("customer_image"),
  comment: text("comment").notNull(),
  rating: integer("rating").notNull(),
  customerSince: text("customer_since"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

/* =====================================================
   CONTACT MESSAGES
===================================================== */

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema =
  createInsertSchema(contactMessages).omit({
    id: true,
    createdAt: true,
  });

/* =====================================================
   TYPES
===================================================== */

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

