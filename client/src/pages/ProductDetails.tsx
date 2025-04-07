import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet";

const ProductDetails = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const { addToCart } = useCart();
  
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
  });
  
  // Format price to currency
  const formatPrice = (price: number) => {
    return `$${price}`;
  };
  
  // Render stars for rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-yellow-400"></i>);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-400"></i>);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fas fa-star text-gray-300"></i>);
    }
    
    return stars;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="md:w-1/2 h-96 bg-gray-300 rounded-lg"></div>
          <div className="md:w-1/2">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="h-32 bg-gray-300 rounded mb-6"></div>
            <div className="h-12 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-12 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Producto no encontrado</h1>
          <p className="mb-6">Lo sentimos, el producto que buscas no existe o ha sido eliminado.</p>
          <Link href="/#productos" className="bg-[#D4AF37] text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors">
            Ver otros productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - Miyuki</title>
        <meta name="description" content={product.description || `Miyuki - ${product.name}`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2">
            <img 
              src={product.imageUrl || "https://via.placeholder.com/600x600?text=No+Image"} 
              alt={product.name} 
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="font-display text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              {renderRating(product.rating)}
              <span className="text-sm text-gray-500 ml-2">({product.reviewCount} reseñas)</span>
            </div>
            
            <p className="text-2xl text-[#D4AF37] font-medium mb-6">{formatPrice(product.price)}</p>
            
            <div className="mb-8">
              <h2 className="font-medium mb-2">Descripción:</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-[#D4AF37] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md shadow-md transition-all transform hover:scale-105"
              >
                Agregar al Carrito
              </button>
              
              <Link 
                href="/#productos"
                className="block w-full text-center border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Seguir Comprando
              </Link>
            </div>
            
            <div className="mt-8 border-t pt-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <i className="fas fa-truck text-[#5F9EA0] mr-2"></i>
                  <span>Envío a todo el país</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-shield-alt text-[#5F9EA0] mr-2"></i>
                  <span>Garantía de calidad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
