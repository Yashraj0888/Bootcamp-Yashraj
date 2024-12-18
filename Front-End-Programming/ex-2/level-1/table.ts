export function renderTable(data: { name: string, age: number, country: string }[]): void {
    const tableBody = document.querySelector("tbody")!;
    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.country}</td>
        `;
        tableBody.appendChild(tr);
    });

    const headers = document.querySelectorAll("th");
    headers.forEach((header, index) => {
        header.addEventListener("click", () => sortTable(index, data));
    });
}

function sortTable(columnIndex: number, data: { name: string, age: number, country: string }[]): void {
    const sortedData = [...data];
    const key = columnIndex === 0 ? 'name' : columnIndex === 1 ? 'age' : 'country';
    sortedData.sort((a, b) => (a[key] > b[key] ? 1 : -1));

    renderTable(sortedData);
}
