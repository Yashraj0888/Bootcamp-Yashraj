import React, { useState } from 'react';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import HierarchyView from './components/HierarchyView';
import DiseaseInfo from './components/DiseaseInfo';

export default function App() {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <Layout>
      <SearchBar onSelect={setSelectedDisease} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {selectedDisease && (
        <div className="mt-4">
          <HierarchyView disease={selectedDisease} onSelect={setSelectedDisease} onError={handleError} />
          <DiseaseInfo disease={selectedDisease} onError={handleError} />
        </div>
      )}
    </Layout>
  );
}
