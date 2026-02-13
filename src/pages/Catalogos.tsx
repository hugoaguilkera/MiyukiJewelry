export default function Catalogos() {
  const categorias = [
    {
      nombre: "Collares",
      descripcion: "Elegancia artesanal para cada ocasión.",
      imagen: "https://images.unsplash.com/photo-1605106702845-8c5e43f1b2c6"
    },
    {
      nombre: "Pulseras",
      descripcion: "Diseños delicados hechos a mano.",
      imagen: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad"
    },
    {
      nombre: "Aretes",
      descripcion: "Detalles que iluminan tu estilo.",
      imagen: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
    },
    {
      nombre: "Anillos",
      descripcion: "Piezas únicas con personalidad.",
      imagen: "https://images.unsplash.com/photo-1617038220319-276d3cfab638"
    }
  ];

  return (
    <section className="bg-[#f6f2ea] min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Título */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light tracking-wide text-gray-800 mb-4">
            Catálogos Miyuki
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubre nuestras colecciones artesanales cuidadosamente diseñadas,
            hechas con pasión y dedicación.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((cat) => (
            <div
              key={cat.nombre}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-500"
            >
              {/* Imagen */}
              <div className="h-64 overflow-hidden">
                <img
                  src={cat.imagen}
                  alt={cat.nombre}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              {/* Contenido */}
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {cat.nombre}
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  {cat.descripcion}
                </p>

                <button className="mt-2 px-6 py-2 border border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition duration-300 text-sm tracking-wide">
                  Ver colección
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}