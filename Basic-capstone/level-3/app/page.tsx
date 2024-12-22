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