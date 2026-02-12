import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Star, StarHalf, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Testimonial } from "@/lib/types";

const TestimonialCarousel = () => {
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ["/api/testimonials"],
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle automatic rotation
  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const handlePrev = () => {
    if (!testimonials) return;
    setCurrentSlide((prev) => 
      (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    if (!testimonials) return;
    setCurrentSlide((prev) => 
      (prev + 1) % testimonials.length
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-primary text-primary" />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-primary text-primary" />);
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No hay testimonios disponibles en este momento.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="testimonial-carousel relative">
        <div className="overflow-hidden">
          <div 
            className="testimonial-slides flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial: Testimonial) => (
              <div key={testimonial.id} className="testimonial-slide w-full flex-shrink-0 px-4">
                <div className="bg-background rounded-lg p-8 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="flex text-primary">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.imageUrl} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">Cliente desde {testimonial.customerSince}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <Button
          onClick={handlePrev}
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none text-primary hover:bg-primary hover:text-white transition duration-300 p-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none text-primary hover:bg-primary hover:text-white transition duration-300 p-0"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
        
        {/* Dot Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index: number) => (
            <button 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
