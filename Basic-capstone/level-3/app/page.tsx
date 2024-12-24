"use client";

import { useState } from 'react';
import { getAllProducts, searchProducts } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';

export default function Home() {
  const [searchResults, setSearchResults] = useState(getAllProducts());

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setSearchResults(getAllProducts());
    } else {
      setSearchResults(searchProducts(query));
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
  <div
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "5px",
      width: "fit-content",
      backgroundColor: "rgba(0, 132, 255, 0.275)",
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M10 20v-6h4v6a1 1 0 001 1h3a1 1 0 001-1v-7h2.293a1 1 0 00.707-1.707l-8-8a1 1 0 00-1.414 0l-8 8A1 1 0 003.707 13H6v7a1 1 0 001 1h3a1 1 0 001-1z" />
    </svg>
    <a
      style={{
        marginLeft: "5px",
        textDecoration: "none",
        color: "inherit",
      }}
      href="../../../index.html"
    >
      Home
    </a>
  </div>

  <h1 className="mb-8 text-4xl font-bold">Welcome to Our Store</h1>

  <div className="mb-8 max-w-md">
    <SearchBar onSearch={handleSearch} />
  </div>

  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {searchResults.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</main>

  );
}