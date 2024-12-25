import React, { useState, useEffect } from 'react';
import { searchDiseases } from '../utils/api';
import { Search, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface SearchBarProps {
  onSelect: (disease: any) => void;
}

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      const delayDebounceFn = setTimeout(async () => {
        setIsLoading(true);
        try {
          const results = await searchDiseases(query);
          setSuggestions(results);
          setError(null);
        } catch (err) {
          setSuggestions([]);
          setError('Failed to fetch suggestions. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSuggestions([]);
      setError(null);
    }
  }, [query]);

  return (
    <Card className="relative p-6">
      <div className="relative max-w-2xl mx-auto">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a disease..."
          className="pl-10"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          ) : (
            <Search className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>
      {error && (
        <div className="mt-2 text-sm text-red-500 text-center">{error}</div>
      )}
      {suggestions.length > 0 && (
        <Card className="absolute z-10 left-0 right-0 mt-2 max-h-[300px] overflow-auto">
          <ul className="p-2 divide-y divide-gray-100 dark:divide-gray-800">
            {suggestions.map((disease: any, index: number) => (
              <li
                key={`suggestion-${index}-${disease.iri}`}
                onClick={() => {
                  onSelect(disease);
                  setQuery('');
                  setSuggestions([]);
                }}
                className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg cursor-pointer transition-colors"
              >
                <div className="font-medium">{disease.label}</div>
                {disease.obo_id && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {disease.obo_id}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </Card>
  );
}
