import React, { useState, useEffect } from 'react';
import { getResearchPapers } from '../utils/api';
import { ExternalLink, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DiseaseInfoProps {
  disease: any;
  onError: (error: string) => void;
}

export default function DiseaseInfo({ disease, onError }: DiseaseInfoProps) {
  const [papers, setPapers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (disease?.label) {
      setLoading(true);
      getResearchPapers(disease.label)
        .then(setPapers)
        .catch((error) => {
          console.error('Error fetching research papers:', error);
          onError('Failed to fetch research papers. Please try again.');
        })
        .finally(() => setLoading(false));
    }
  }, [disease, onError]);

  if (!disease) return null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
          Disease Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h3>
            <p className="font-medium">{disease.label || 'Unknown'}</p>
          </div>
          {disease.ontology_name && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ontology</h3>
              <Badge variant="secondary">{disease.ontology_name.toUpperCase()}</Badge>
            </div>
          )}
          {disease.obo_id && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</h3>
              <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                {disease.obo_id}
              </code>
            </div>
          )}
          {disease.description?.[0] && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
              <p className="text-gray-700 dark:text-gray-300">{disease.description[0]}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Research Papers</h3>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            </div>
          ) : papers.length > 0 ? (
            <ul className="space-y-3">
              {papers.map((paperId) => (
                <li key={`paper-${paperId}`}>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${paperId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      PubMed ID: {paperId}
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No research papers found
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
