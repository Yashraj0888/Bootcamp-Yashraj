import { Grid } from 'ag-grid-community';

export default class StudentTable {
  private gridDiv: HTMLElement;
  private gridOptions: any;

  constructor(private data: { id: number, name: string, age: number, course: string }[]) {
    this.gridDiv = document.getElementById('students-grid')!;
    this.gridOptions = {
      columnDefs: [
        { headerName: 'ID', field: 'id' },
        { headerName: 'Name', field: 'name' },
        { headerName: 'Age', field: 'age' },
        { headerName: 'Course', field: 'course' }
      ],
      rowData: this.data
    };
  }

  render() {
    new Grid(this.gridDiv, this.gridOptions);
  }
}
