export default function handler(req, res) {
  res.status(200).json([
    { id: 1, name: "Collares" },
    { id: 2, name: "Pulseras" },
    { id: 3, name: "Aretes" },
    { id: 4, name: "Anillos" }
  ]);
}