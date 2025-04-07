import { Testimonial } from "../../types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  // Render stars for rating
  const renderRating = (rating: number) => {
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
      } else {
        stars.push(<i key={i} className="fas fa-star text-gray-300"></i>);
      }
    }
    
    return stars;
  };

  return (
    <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-6 bg-[#F5F5DC] rounded-lg">
      <div className="flex flex-col h-full">
        <div className="flex mb-4">
          {renderRating(testimonial.rating)}
        </div>
        <p className="italic mb-4 flex-grow">{testimonial.comment}</p>
        <div className="flex items-center mt-auto">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <img 
              src={testimonial.customerImage || "https://via.placeholder.com/100x100?text=User"} 
              alt={testimonial.customerName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium">{testimonial.customerName}</h4>
            {testimonial.customerSince && (
              <p className="text-sm text-[#333333] text-opacity-70">Cliente desde {testimonial.customerSince}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
