import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card className="product-card bg-white rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        <div className="h-48 sm:h-56 md:h-64 bg-gray-200 relative overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <CardContent className="p-3 sm:p-4 flex-grow flex flex-col">
          <h3 className="text-base sm:text-lg font-medium mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-secondary font-semibold mb-3">{product.price}</p>
          <div className="mt-auto">
            <Button 
              onClick={() => setShowDetails(true)}
              className="bg-primary hover:bg-primary/90 text-white font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-md w-full text-xs sm:text-sm h-auto"
            >
              Ver detalles
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-md max-w-[90vw] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-display">{product.name}</DialogTitle>
            <DialogDescription className="text-secondary font-semibold">
              {product.price}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="aspect-video overflow-hidden rounded-md">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Categoría</h4>
              <p className="text-sm text-muted-foreground capitalize mb-3">
                {product.category}
              </p>
              
              <h4 className="text-sm font-medium mb-1">Descripción</h4>
              <p className="text-sm text-muted-foreground">
                {product.description || "Elegante pieza artesanal hecha a mano con los mejores materiales."}
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="button"
              variant="default"
              className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 h-auto"
              onClick={() => setShowDetails(false)}
            >
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
