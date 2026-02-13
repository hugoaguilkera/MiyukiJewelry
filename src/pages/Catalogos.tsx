export default function Catalogos() {
  const categorias = [
    {
      nombre: "Collares",
      descripcion: "Elegancia artesanal para cada ocasión.",
    },
    {
      nombre: "Pulseras",
      descripcion: "Diseños delicados hechos a mano.",
    },
    {
      nombre: "Aretes",
      descripcion: "Detalles que iluminan tu estilo.",
    },
    {
      nombre: "Anillos",
      descripcion: "Piezas únicas con personalidad.",
    },
  ];

  return (
    <div className="bg-neutral-50 min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Título */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
            Catálogos Miyuki
          </h1>
          <p className="mt-4 text-gray-500 text-lg">
            Descubre nuestras colecciones artesanales cuidadosamente diseñadas.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {categorias.map((cat) => (
            <div
              key={cat.nombre}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 p-8 text-center cursor-pointer border border-gray-100"
            >
              <div className="h-40 mb-6 bg-gradient-to-br from-pink-100 to-rose-200 rounded-xl flex items-center justify-center">
                <span className="text-4xl">💎</span>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-rose-500 transition">
                {cat.nombre}
              </h2>

              <p className="mt-3 text-gray-500 text-sm">
                {cat.descripcion}
              </p>

              <div className="mt-6">
                <button className="px-5 py-2 text-sm font-medium bg-black text-white rounded-full hover:bg-rose-500 transition">
                  Ver colección
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}