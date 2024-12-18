// Fetch the student data
fetch('./data/students.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('student-body');
    
    // Loop through the data and create table rows
    data.forEach(student => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.course}</td>
      `;
      
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error('Error loading student data:', error));
