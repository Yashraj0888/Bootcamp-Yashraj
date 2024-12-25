# Target Identification for a Disease

## Objective
Develop an interactive widget to facilitate biologists in specifying and exploring diseases within their hierarchical contexts. This widget will enable users to search, explore, and select diseases using classification systems such as EFO (Experimental Factor Ontology) or MONDO (Monarch Disease Ontology).

---

## Key Challenges in Disease Specification
1. **Ambiguity in Disease Names**:
   - Diseases can have multiple synonyms or aliases.
   - Examples: "Type 2 diabetes" vs. "diabetes."

2. **Hierarchical Nature of Diseases**:
   - Diseases are organized into general and specific terms.
   - Examples:
     - General: "asthma."
     - Specific: "allergic asthma."

3. **Categorization Across Multiple Contexts**:
   - Diseases may belong to multiple categories or taxonomies.
   
---

## Solution Requirements
### Widget Features:
1. **Search Capability**:
   - Allow users to search for diseases by name or keyword.
2. **Hierarchical Exploration**:
   - Display the disease hierarchy for better understanding of context.
3. **Selection Mechanism**:
   - Enable users to select a disease and retrieve its corresponding EFO or MONDO code.
4. **Optional Features**:
   - Display a brief description of the disease.
   - Provide links to recent research papers on the disease.




---

## Understanding Key Concepts
### What is a Target?
A target is a biological entity (e.g., gene, protein) associated with a disease and is typically the focus of therapeutic development.

### What is EFO?
EFO (Experimental Factor Ontology) is a curated ontology that standardizes terms for experimental variables, including diseases. It is widely used in research to ensure consistent terminology.

### What is MONDO?
MONDO (Monarch Disease Ontology) integrates multiple disease ontologies, providing a unified and comprehensive resource for disease classification.

---

## Widget Development
### 1. **Design and Features**
The widget will:
   - Provide a search bar to input disease names or keywords.
   - Display search results in a tree view to explore hierarchical relationships.
   - Allow disease selection with details such as:
     - Name.
     - EFO or MONDO code.
     - Description (if available).
     - Links to recent research papers.

### 2. **Implementation Steps**
1. **Fetch Ontology Data**:
   - Use EBI OLS API to retrieve disease data and hierarchical structures.
2. **Interactive UI**:
   - Implement using a frontend framework like React or Vue.js.
   - Incorporate tree-view libraries for hierarchical visualization.
3. **Disease Details**:
   - Retrieve descriptions and relevant research articles from external sources like PubMed.
4. **Integration**:
   - Package the widget into a demo application for demonstration.

---

## Application Demonstration
The application will:
1. Feature the widget on the homepage.
2. Allow users to:
   - Search for diseases.
   - Explore their hierarchy.
   - Select diseases and view additional details.
3. Showcase how selected diseases can be used for further research or therapeutic development.

---


## Notes on Research and Development
- **Research Notes**:
  - Explored EFO and MONDO ontologies to understand hierarchical structures and application relevance.
  - Investigated APIs (EBI OLS, PubMed) for data retrieval.
- **User-Centric Approach**:
  - Focused on intuitive navigation and clarity of disease information.

---

## Conclusion
The proposed widget will significantly enhance the process of disease identification and exploration for biologists, fostering accurate target identification and supporting therapeutic development.

