export default function Catalogos() {

  const categorias = [
    { nombre: "Collares", descripcion: "Elegancia artesanal para cada ocasión." },
    { nombre: "Pulseras", descripcion: "Diseños delicados hechos a mano." },
    { nombre: "Aretes", descripcion: "Detalles que iluminan tu estilo." },
    { nombre: "Anillos", descripcion: "Piezas únicas con personalidad." }
  ];

  return (
    <section className="bg-[#f6f2ea] min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-light tracking-wide text-gray-800 mb-4">
            Catálogos Miyuki
          </h1>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((cat) => (
            <div
              key={cat.nombre}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >

              {cat.nombre === "Pulseras" ? (
                <img
                  src="https://res.cloudinary.com/dnv4hrn3y/image/upload/v1771013713/pulsera_dorada_con_corazones-removebg-preview-Photoroom3_LE_auto_x4_light_ai_bdtfm7.png"
                  alt="Pulsera"
                  className="w-full h-64 object-contain bg-white"
                />
              ) : (
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-gray-400 uppercase">
                    {cat.nombre}
                  </span>
                </div>
              )}

              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {cat.nombre}
                </h2>
                <p className="text-gray-500 text-sm">
                  {cat.descripcion}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
