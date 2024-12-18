import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

type DataRow = {
  id: string;
  name: string;
  age: string;
  grade: string;
};

const DataGrid: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            setData(results.data as DataRow[]);
          },
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [apiEndpoint]);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.age}</td>
            <td>{row.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataGrid;
