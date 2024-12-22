import productsData from '@/data/products.json';

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export function getAllProducts(): Product[] {
  return productsData.products;
}

export function getProductById(id: string): Product | undefined {
  return productsData.products.find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return productsData.products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): Category[] {
  return productsData.categories;
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return productsData.products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
}