// Table Renderer Module
export function renderStudentTable(students, tableBodyElement) {
    // Clear existing table rows
    tableBodyElement.innerHTML = '';

    // Render each student
    students.forEach(student => {
        const row = tableBodyElement.insertRow();
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
        `;
    });
}