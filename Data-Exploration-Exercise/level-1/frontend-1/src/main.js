const API_BASE = 'http://localhost:3000/api';
const papersList = document.getElementById('papers-list');
const searchBar = document.getElementById('search-bar');
const regionFilter = document.getElementById('filter-region');
const countryFilter = document.getElementById('filter-country');
const itemTypeFilter = document.getElementById('filter-item-type');
const exportBtn = document.getElementById('export-btn');
const paginationControls = document.getElementById('pagination-controls');

let papers = [];
let filteredPapers = [];
let currentPage = 1; // Current page
const itemsPerPage = 10; // Number of items per page
const maxPageButtons = 10; // Max number of visible page buttons

// Fetch papers and render
async function fetchPapers() {
    try {
        const response = await fetch(`${API_BASE}/papers`);
        papers = await response.json();
        renderPapers(papers);
    } catch (error) {
        console.error('Error fetching papers:', error);
    }
}

// Fetch filters and populate options
async function fetchFilters() {
    try {
        const response = await fetch(`${API_BASE}/filters`);
        const filters = await response.json();

        populateFilter(regionFilter, filters.regions);
        populateFilter(countryFilter, filters.countries);
        populateFilter(itemTypeFilter, filters.itemTypes);
    } catch (error) {
        console.error('Error fetching filters:', error);
    }
}

// Populate filter dropdown
function populateFilter(selectElement, options) {
    options.forEach((option) => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
    });
}

// Render papers with pagination
function renderPapers(data) {
    papersList.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    paginatedData.forEach((paper) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${paper.Country}</h3>
            <p>Region: ${paper.Region}</p>
            <p>Item Type: ${paper['Item Type']}</p>
        `;
        papersList.appendChild(card);
    });

    renderPaginationControls(data.length);
}

// Render pagination controls
function renderPaginationControls(totalItems) {
    paginationControls.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.className = 'pagination-button';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        currentPage--;
        renderPapers(filteredPapers.length ? filteredPapers : papers);
    });
    paginationControls.appendChild(prevButton);

    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = 'pagination-button';
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            currentPage = i;
            renderPapers(filteredPapers.length ? filteredPapers : papers);
        });
        paginationControls.appendChild(button);
    }

    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.className = 'pagination-button';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        currentPage++;
        renderPapers(filteredPapers.length ? filteredPapers : papers);
    });
    paginationControls.appendChild(nextButton);
}

// Filter papers
function filterPapers() {
    const searchText = searchBar.value.toLowerCase();
    const selectedRegion = regionFilter.value;
    const selectedCountry = countryFilter.value;
    const selectedItemType = itemTypeFilter.value;

    filteredPapers = papers.filter((paper) => {
        return (
            (!selectedRegion || paper.Region === selectedRegion) &&
            (!selectedCountry || paper.Country === selectedCountry) &&
            (!selectedItemType || paper['Item Type'] === selectedItemType) &&
            Object.values(paper).some((value) =>
                String(value).toLowerCase().includes(searchText)
            )
        );
    });

    currentPage = 1; // Reset to the first page
    renderPapers(filteredPapers);
}

// Export filtered data
async function exportData() {
    try {
        const response = await fetch(`${API_BASE}/export`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filteredData: filteredPapers }),
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'filtered_data.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error exporting data:', error);
    }
}

// Event listeners
searchBar.addEventListener('input', filterPapers);
regionFilter.addEventListener('change', filterPapers);
countryFilter.addEventListener('change', filterPapers);
itemTypeFilter.addEventListener('change', filterPapers);
exportBtn.addEventListener('click', exportData);

// Initialize
fetchPapers();
fetchFilters();
