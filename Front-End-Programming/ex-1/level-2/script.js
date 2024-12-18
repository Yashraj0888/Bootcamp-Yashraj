// Main Script
import { loadStudentData } from './data-loader.js';
import { renderStudentTable } from './table-renderer.js';

document.addEventListener('DOMContentLoaded', async () => {
    const studentTableBody = document.getElementById('studentTableBody');
    const addStudentBtn = document.getElementById('addStudentBtn');
    const changeFontBtn = document.getElementById('changeFontBtn');
    const browserInfoElement = document.getElementById('browserInfo');

    // Load and render initial student data
    const students = await loadStudentData();
    renderStudentTable(students, studentTableBody);

    let studentIdCounter = students.length + 1;

    // Function to add a new student
    function addStudent() {
        const newStudent = {
            id: studentIdCounter++,
            name: 'New Student',
            age: Math.floor(Math.random() * 10) + 18,
            grade: String.fromCharCode(65 + Math.floor(Math.random() * 5))
        };

        students.push(newStudent);
        renderStudentTable(students, studentTableBody);
    }

    // Function to change font
    function changeFont() {
        document.body.style.fontFamily = 
            document.body.style.fontFamily === 'Roboto, sans-serif' 
                ? 'Arial, sans-serif' 
                : 'Roboto, sans-serif';
    }

    // Display browser information
    function displayBrowserInfo() {
        const info = `
            Browser: ${navigator.userAgent}<br>
            Window Size: ${window.innerWidth} x ${window.innerHeight}<br>
            Platform: ${navigator.platform}
        `;
        browserInfoElement.innerHTML = info;
    }

    // Event Listeners
    addStudentBtn.addEventListener('click', addStudent);
    changeFontBtn.addEventListener('click', changeFont);
    displayBrowserInfo();
    window.addEventListener('resize', displayBrowserInfo);
});