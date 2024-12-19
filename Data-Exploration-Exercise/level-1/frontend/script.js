document.addEventListener('DOMContentLoaded', async () => {
    const searchBox = document.getElementById('search-box');
    const filtersContainer = document.getElementById('filters');
    const cardsContainer = document.getElementById('cards-container');
    const exportButton = document.getElementById('export-button');

    const itemsPerPage = 10; // Number of items per page
    let data = [];
    let filteredData = [];
    let filters = {};
    let currentPage = 1;

    // Step 1: Fetch data from the backend
    const fetchData = async () => {
        const response = await fetch('http://localhost:3000/data');
        data = await response.json();
        filteredData = data;
    };

    // Step 2: Generate filters dynamically
    const generateFilters = () => {
        const filterFields = ['Region', 'Country', 'Item Type', 'Sales Channel', 'Order Priority'];
        filterFields.forEach((field) => {
            const uniqueValues = [...new Set(data.map((item) => item[field]))].sort();
            const filter = document.createElement('div');
            filter.classList.add('filter');
            filter.innerHTML = `
                <label>${field}</label>
                <select data-filter="${field}">
                    <option value="">All</option>
                    ${uniqueValues.map((value) => `<option value="${value}">${value}</option>`).join('')}
                </select>
            `;
            filtersContainer.appendChild(filter);
            filters[field] = '';
        });
    };

    // Step 3: Render cards with pagination
    const renderCards = () => {
        cardsContainer.innerHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
        const currentItems = filteredData.slice(startIndex, endIndex);

        currentItems.forEach((item) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = ` 
                <h3>${item['Item Type']}</h3>
                <p><strong>Region:</strong> ${item['Region']}</p>
                <p><strong>Country:</strong> ${item['Country']}</p>
                <p><strong>Sales Channel:</strong> ${item['Sales Channel']}</p>
                <p><strong>Order Priority:</strong> ${item['Order Priority']}</p>
            `;
            cardsContainer.appendChild(card);
        });

        renderPagination();
    };

    // Step 4: Render pagination controls
    const renderPagination = () => {
        const paginationContainer = document.querySelector('.pagination') || document.createElement('div');
        paginationContainer.classList.add('pagination');
        paginationContainer.innerHTML = '';

        const totalPages = Math.ceil(filteredData.length / itemsPerPage);

        // "Previous" button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            currentPage--;
            renderCards();
        });
        paginationContainer.appendChild(prevBtn);

        // Pagination buttons (10 per row)
        const startPage = Math.max(1, currentPage - 4); // Show up to 5 buttons before the current page
        const endPage = Math.min(totalPages, startPage + 9); // Show up to 10 buttons

        for (let i = startPage; i <= endPage; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.toggle('active', i === currentPage);
            button.addEventListener('click', () => {
                currentPage = i;
                renderCards();
            });
            paginationContainer.appendChild(button);
        }

        // "Next" button
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            currentPage++;
            renderCards();
        });
        paginationContainer.appendChild(nextBtn);

        if (!document.querySelector('.pagination')) {
            cardsContainer.parentElement.appendChild(paginationContainer);
        }
    };

    // Step 5: Apply filters
    const applyFilters = () => {
        filteredData = data.filter((item) =>
            Object.entries(filters).every(([key, value]) => !value || item[key] === value)
        );
        currentPage = 1; // Reset to the first page after applying filters
        renderCards();
    };

    // Step 6: Add event listeners
    filtersContainer.addEventListener('change', (e) => {
        const field = e.target.dataset.filter;
        if (field) {
            filters[field] = e.target.value;
            applyFilters();
        }
    });

    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filteredData = data.filter((item) =>
            Object.values(item).some((value) => value.toLowerCase().includes(searchTerm))
        );
        currentPage = 1; // Reset to the first page after searching
        renderCards();
    });

    exportButton.addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(filteredData, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'filtered_data.json';
        a.click();
    });

    // Initialize app
    await fetchData();
    generateFilters();
    renderCards();
});
