// Determine if we're in production based on environment variables
// GitHub Pages and Vercel set NODE_ENV to production
export const isProduction = process.env.NODE_ENV === 'production';

// Flag to use in-memory storage instead of database in production environments like GitHub Pages
export const useInMemoryStorage = isProduction || !process.env.DATABASE_URL;