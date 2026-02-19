import { useQuery } from "@tanstack/react-query";

export default function Catalogos() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/products'],
  });

  if (isLoading) return <p className="p-10">Cargando productos...</p>;
  if (error) return <p className="p-10">Error cargando productos</p>;

  const products = data?.result || [];

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product: any) => (
        <div key={product.id} className="border rounded-lg p-4 shadow">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-60 object-cover rounded"
          />
          <h3 className="mt-3 font-bold text-lg">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
        </div>
      ))}
    </div>
  );
}

