"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTable = renderTable;
function renderTable(data) {
    const tableBody = document.querySelector("tbody");
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
function sortTable(columnIndex, data) {
    const sortedData = [...data];
    const key = columnIndex === 0 ? 'name' : columnIndex === 1 ? 'age' : 'country';
    sortedData.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    renderTable(sortedData);
}
