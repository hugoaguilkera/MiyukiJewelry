import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {categories.map((cat) => (
        <div key={cat.id}>{cat.name}</div>
      ))}
    </div>
  );
}