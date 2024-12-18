"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const papaparse_1 = __importDefault(require("papaparse"));
const table_1 = require("./table");
document.addEventListener("DOMContentLoaded", () => {
    papaparse_1.default.parse('./data.csv', {
        download: true,
        header: true,
        complete: (result) => {
            const tableData = result.data;
            (0, table_1.renderTable)(tableData);
        }
    });
});
