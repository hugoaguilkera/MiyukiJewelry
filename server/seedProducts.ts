import { db } from './db';
import { products } from '@shared/schema';

async function seedProducts() {
  try {
    const sampleProducts = [
      {
        name: "Pulsera de Corazones",
        description: "Pulsera hecha a mano con cuentas Miyuki en tonos rojos y dorados, con un diseño delicado de corazones.",
        price: "$320",
        imageUrl: "/images/pulsera-corazones.png",
        category: "pulseras"
      },
      {
        name: "Collar Flor de Loto",
        description: "Hermoso collar con pendiente de flor de loto, elaborado con cuentas Miyuki en tonos dorados, rojos y verdes.",
        price: "$450",
        imageUrl: "/images/collar-miyuki.svg",
        category: "collares"
      },
      {
        name: "Aretes de Mariposa",
        description: "Aretes ligeros con diseño geométrico, hechos con cuentas Miyuki en colores vibrantes que combinan con cualquier atuendo.",
        price: "$280",
        imageUrl: "/images/aretes-miyuki.svg",
        category: "aretes"
      },
      {
        name: "Anillo Ajustable Estrella",
        description: "Anillo ajustable con diseño tablero, elaborado con cuentas Miyuki en tonos dorados y rojos.",
        price: "$220",
        imageUrl: "/images/anillo-miyuki.svg",
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
