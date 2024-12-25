import React, { useState, useEffect } from 'react';
import { getDiseaseHierarchy } from '../utils/api';
import { Loader2, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface HierarchyViewProps {
  disease: any;
  onSelect: (disease: any) => void;
  onError: (error: string) => void;
}

export default function HierarchyView({ disease, onSelect, onError }: HierarchyViewProps) {
  const [hierarchy, setHierarchy] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchHierarchy() {
      if (!disease?.iri) return;
      
      setLoading(true);
      try {
        const data = await getDiseaseHierarchy(disease.iri);
        setHierarchy(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch disease hierarchy';
        onError(message);
        setHierarchy(null);
      } finally {
        setLoading(false);
      }
    }

    fetchHierarchy();
  }, [disease, onError]);

  if (loading) {
    return (
      <Card className="mt-8">
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading hierarchy...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hierarchy) return null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
          Disease Hierarchy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {hierarchy.parents?.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              Parent Diseases
            </h3>
            <ul className="space-y-2">
              {hierarchy.parents.map((parent: any, index: number) => (
                <li key={`parent-${index}-${parent.iri}`}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => onSelect(parent)}
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                    {parent.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-medium text-lg">{hierarchy.label}</h3>
          {hierarchy.obo_id && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {hierarchy.obo_id}
            </p>
          )}
        </div>

        {hierarchy.children?.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              Child Diseases
            </h3>
            <ul className="space-y-2 ml-4">
              {hierarchy.children.map((child: any, index: number) => (
                <li key={`child-${index}-${child.iri}`}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => onSelect(child)}
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                    {child.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
