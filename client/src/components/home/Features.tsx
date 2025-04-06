import { GemIcon, HeartHandshake, Star } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <GemIcon className="text-primary text-2xl" />,
      title: "Diseños únicos",
      description: "Cada pieza está diseñada con atención al detalle y creatividad."
    },
    {
      icon: <HeartHandshake className="text-primary text-2xl" />,
      title: "Hecho a mano",
      description: "Artesanía auténtica creada con amor y técnicas tradicionales."
    },
    {
      icon: <Star className="text-primary text-2xl" />,
      title: "Calidad premium",
      description: "Utilizamos materiales de la más alta calidad para nuestras joyas."
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="bg-background inline-block rounded-full p-4 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
