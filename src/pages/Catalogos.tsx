export default function Catalogos() {
  const categorias = [
    { id: 1, nombre: "Collares" },
    { id: 2, nombre: "Pulseras" },
    { id: 3, nombre: "Aretes" },
    { id: 4, nombre: "Anillos" },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h1>Catálogos</h1>
      <ul>
        {categorias.map((cat) => (
          <li key={cat.id}>{cat.nombre}</li>
        ))}
      </ul>
    </div>
  );
}