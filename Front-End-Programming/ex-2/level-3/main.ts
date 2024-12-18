import data from './data.json'; // Assuming data.json is placed correctly

// Interface for the data structure
interface TableRow {
    id: number;
    name: string;
    value: number;
    [key: string]: any; // Add this index signature
  }

// Render table rows dynamically
function renderTable(data: TableRow[]): void {
  const tableBody = document.querySelector('tbody')!;
  
  // Clear any existing rows
  tableBody.innerHTML = '';
  
  // Add new rows to the table
  data.forEach(row => {
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.name}</td>
      <td>${row.value}</td>
    `;
    
    tableBody.appendChild(tr);
  });
}

// Sort the table data by column
function sortTableData(data: TableRow[], column: string): TableRow[] {
  return data.sort((a, b) => {
    if (a[column] < b[column]) return -1;
    if (a[column] > b[column]) return 1;
    return 0;
  });
}

// Adding click listeners to column headers for sorting
document.querySelectorAll('th').forEach((header, index) => {
  header.addEventListener('click', () => {
    const column = header.textContent?.toLowerCase() || '';
    const sortedData = sortTableData(data, column);
    renderTable(sortedData);
  });
});

// Initial render
renderTable(data);
