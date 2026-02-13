export default function Catalogos() {
  const categorias = [
    {
      nombre: "Collares",
      descripcion: "Elegancia artesanal para cada ocasión."
    },
    {
      nombre: "Pulseras",
      descripcion: "Diseños delicados hechos a mano."
    },
    {
      nombre: "Aretes",
      descripcion: "Detalles que iluminan tu estilo."
    },
    {
      nombre: "Anillos",
      descripcion: "Piezas únicas con personalidad."
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
              {/* Placeholder visual premium */}
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <span className="text-gray-400 text-lg tracking-wider uppercase">
                  {cat.nombre}
                </span>
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