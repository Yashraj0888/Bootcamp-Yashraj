import Papa from 'papaparse';
import StudentTable from './components/StudentTable';

// Fetch the CSV file and parse it
fetch('./data/students.csv')
  .then(response => response.text())
  .then(csvData => {
    Papa.parse(csvData, {
      complete: (result) => {
        const studentData = result.data as { id: number, name: string, age: number, course: string }[];
        
        // Initialize AG Grid with the parsed student data
        const studentTable = new StudentTable(studentData);
        studentTable.render();
      }
    });
  })
  .catch(error => console.error('Error loading CSV file:', error));
