import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  res.status(200).json([
    {
      id: 1,
      name: "Pulsera minimalista",
      price: "$450",
      imageUrl:
        "https://res.cloudinary.com/dnv4hrn3y/image/upload/v1771013713/pulsera_dorada_con_corazones-removebg-preview-Photoroom3_LE_auto_x4_light_ai_bdtfm7.png",
      category: "pulseras",
      description: "Pulsera dorada con corazones."
    }
  ]);
}