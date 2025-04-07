import { Link } from "wouter";
import { Product } from "../../types";
import { useCart } from "../../context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
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

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md group hover:shadow-lg transition-shadow">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.imageUrl || "https://via.placeholder.com/500x500?text=No+Image"} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-[#333333] bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link 
            href={`/productos/${product.id}`} 
            className="bg-white p-2 rounded-full mx-1 hover:bg-[#D4AF37] hover:text-white transition-colors"
            aria-label="Ver detalle"
          >
            <i className="fas fa-eye"></i>
          </Link>
          <button 
            className="bg-white p-2 rounded-full mx-1 hover:bg-[#D4AF37] hover:text-white transition-colors" 
            onClick={() => addToCart(product)}
            aria-label="Agregar al carrito"
          >
            <i className="fas fa-shopping-bag"></i>
          </button>
          <button 
            className="bg-white p-2 rounded-full mx-1 hover:bg-[#D4AF37] hover:text-white transition-colors"
            aria-label="Agregar a favoritos"
          >
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-medium text-lg mb-2">{product.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-[#D4AF37] font-medium">{formatPrice(product.price)}</span>
          <div className="flex items-center">
            {renderRating(product.rating)}
            <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
