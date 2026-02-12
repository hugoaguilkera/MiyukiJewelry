import { Link } from "wouter";
import { Category } from "../../types";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/#productos?category=${category.slug}`} className="group">
      <div className="bg-[#F5F5DC] rounded-lg overflow-hidden shadow-md transition-transform transform group-hover:scale-105">
        <div className="h-40 md:h-52 overflow-hidden">
          <img 
            src={category.imageUrl || "https://via.placeholder.com/500x500?text=No+Image"} 
            alt={category.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4 bg-white">
          <h3 className="font-display font-medium text-lg text-center">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
