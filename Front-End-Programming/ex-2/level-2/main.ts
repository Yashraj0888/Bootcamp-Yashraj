import Papa from 'papaparse';
import { renderTable } from './table';

document.addEventListener("DOMContentLoaded", () => {
    Papa.parse('./data.csv', {
        download: true,
        header: true,
        complete: (result) => {
            const tableData = result.data as { name: string, age: number, country: string }[];
            renderTable(tableData);
        }
    });
});
