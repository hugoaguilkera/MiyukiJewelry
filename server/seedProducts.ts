import { db } from './db';
import { products } from '@shared/schema';

async function seedProducts() {
  try {
    const sampleProducts = [
      {
        name: "Pulsera de Corazones",
        description: "Pulsera hecha a mano con cuentas Miyuki en tonos rosas y blancos, con un diseño delicado de corazones.",
        price: "$320",
        imageUrl: "https://i.imgur.com/bVRyNio.jpg",
        category: "pulseras"
      },
      {
        name: "Collar Flor de Loto",
        description: "Hermoso collar con pendiente de flor de loto, elaborado con cuentas Miyuki en tonos azules y plateados.",
        price: "$450",
        imageUrl: "https://i.imgur.com/vE4rlZ6.jpg",
        category: "collares"
      },
      {
        name: "Aretes de Mariposa",
        description: "Aretes ligeros en forma de mariposa, hechos con cuentas Miyuki en colores vibrantes que combinan con cualquier atuendo.",
        price: "$280",
        imageUrl: "https://i.imgur.com/MJ51Qcj.jpg",
        category: "aretes"
      },
      {
        name: "Anillo Ajustable Estrella",
        description: "Anillo ajustable con diseño de estrella en el centro, elaborado con cuentas Miyuki en tonos dorados.",
        price: "$220",
        imageUrl: "https://i.imgur.com/9L81cLM.jpg",
        category: "anillos"
      }
    ];

    await db.insert(products).values(sampleProducts);
    
    console.log("✅ Productos insertados correctamente");
  } catch (error) {
    console.error("❌ Error al insertar productos:", error);
  }
}

seedProducts()
  .catch((e) => console.error("❌ Error inesperado:", e))
  .finally(() => process.exit(0));
