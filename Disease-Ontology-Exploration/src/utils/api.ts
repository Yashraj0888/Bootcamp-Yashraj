import axios from 'axios';

const OLS_API_BASE = 'https://www.ebi.ac.uk/ols4/api';
const PUBMED_API_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';

interface DiseaseSearchResponse {
  response: {
    docs: any[];
  };
}

interface DiseaseHierarchyResponse {
  _embedded: {
    terms: Array<{
      label: string;
      iri: string;
      description?: string[];
      obo_id?: string;
      ontology_name: string;
      _links: {
        parents?: { href: string };
        children?: { href: string };
      };
    }>;
  };
}

export async function searchDiseases(query: string) {
  try {
    const response = await axios.get<DiseaseSearchResponse>(`${OLS_API_BASE}/search`, {
      params: {
        q: query,
        ontology: 'efo,mondo',
        type: 'class'
      }
    });
    return response.data.response.docs;
  } catch (error) {
    console.error('Error searching diseases:', error);
    throw new Error('Failed to search diseases. Please try again later.');
  }
}

export async function getDiseaseHierarchy(iri: string) {
  try {
    // First, get the term details
    const termResponse = await axios.get<DiseaseHierarchyResponse>(`${OLS_API_BASE}/terms`, {
      params: {
        iri: iri
      }
    });

    if (!termResponse.data._embedded?.terms?.[0]) {
      throw new Error('Term not found');
    }

    const term = termResponse.data._embedded.terms[0];
    const result: {
        label: string;
        iri: string;
        description: string;
        obo_id: string;
        ontology_name: string;
        parents: { label: string; iri: string; }[];
        children: { label: string; iri: string; }[];
      } = {
        label: term.label,
        iri: term.iri,
        description: term.description?.[0] || '',
        obo_id: term.obo_id || '',
        ontology_name: term.ontology_name,
        parents: [],
        children: []
      };

    // Fetch parents if available
    if (term._links?.parents?.href) {
      const parentsResponse = await axios.get<DiseaseHierarchyResponse>(term._links.parents.href);
      if (parentsResponse.data._embedded?.terms) {
        result.parents = parentsResponse.data._embedded.terms.map(parent => ({
          label: parent.label,
          iri: parent.iri
        }));
      }
    }

    // Fetch children if available
    if (term._links?.children?.href) {
      const childrenResponse = await axios.get<DiseaseHierarchyResponse>(term._links.children.href);
      if (childrenResponse.data._embedded?.terms) {
        result.children = childrenResponse.data._embedded.terms.map(child => ({
          label: child.label,
          iri: child.iri
        }));
      }
    }

    return result;
  } catch (error) {
    console.error('Error getting disease hierarchy:', error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Disease not found');
    }
    throw new Error('Failed to get disease hierarchy. Please try again later.');
  }
}

export async function getResearchPapers(disease: string) {
  try {
    const response = await axios.get(`${PUBMED_API_BASE}/esearch.fcgi`, {
      params: {
        db: 'pubmed',
        term: `${disease}[MeSH Terms]`,
        retmode: 'json',
        retmax: 5
      }
    });
    return response.data.esearchresult?.idlist || [];
  } catch (error) {
    console.error('Error getting research papers:', error);
    throw new Error('Failed to get research papers. Please try again later.');
  }
}
