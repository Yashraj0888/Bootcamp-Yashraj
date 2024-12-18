import { renderTable } from './table';
import * as data from './data.json';

const tableData = data as { name: string, age: number, country: string }[];

document.addEventListener("DOMContentLoaded", () => {
    renderTable(tableData);
});
