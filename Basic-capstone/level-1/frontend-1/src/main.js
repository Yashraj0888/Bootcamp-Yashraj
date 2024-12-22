const API_BASE = 'https://data-backend-zeta.vercel.app/api';
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
        // console.log(papers);
        
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
            <p>Sales Channel: ${paper['Sales Channel']}</p>
            <p>Order Priority: ${paper['Order Priority']}</p>
            <p>Total Revenue: $ ${paper['Total Revenue']}</p>
            <p>Total Profit: $ ${paper['Total Profit']}</p>
            <p>Order Ship Days: ${paper['Order_Ship_Days']}</p>
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
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = 'pagination-button';
        pageButton.disabled = i === currentPage;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderPapers(filteredPapers.length ? filteredPapers : papers);
        });
        paginationControls.appendChild(pageButton);
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

// Export function (add your export logic here)
function handleExport() {
    console.log('Exporting data...');
}

fetchPapers();
fetchFilters();

exportBtn.addEventListener('click', handleExport);

// Filters change logic
searchBar.addEventListener('input', filterPapers);
regionFilter.addEventListener('change', filterPapers);
countryFilter.addEventListener('change', filterPapers);
itemTypeFilter.addEventListener('change', filterPapers);
filterSalesChannel.addEventListener('change', filterPapers);
filterOrderPriority.addEventListener('change', filterPapers);
filterOrderDate.addEventListener('change', filterPapers);
filterTotalRevenue.addEventListener('change', filterPapers);
filterOrderyear.addEventListener('change', filterPapers);
filterTotalProfit.addEventListener('change', filterPapers);
filterOrder_Ship_Days.addEventListener('change', filterPapers);

function filterPapers() {
    const searchTerm = searchBar.value.toLowerCase();
    filteredPapers = papers.filter((paper) => {
        return (
            (searchTerm === '' || paper.Country.toLowerCase().includes(searchTerm)) &&
            (regionFilter.value === '' || paper.Region === regionFilter.value) &&
            (countryFilter.value === '' || paper.Country === countryFilter.value) &&
            (itemTypeFilter.value === '' || paper['Item Type'] === itemTypeFilter.value) 
            
        );
    });

    currentPage = 1;
    renderPapers(filteredPapers.length ? filteredPapers : papers);
}
