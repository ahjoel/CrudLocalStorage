import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crudlocalstorage';
  employeeObj: EmployeeObj;
  isedit:boolean=false;
  sortBy: string;
  searchText: string;
  employeeArr: EmployeeObj[] = [];
  e:any;

  constructor(){
    this.employeeObj = new EmployeeObj();
    this.sortBy = '';
    this.searchText = '';
  }

  ngOnInit(): void {
    this.isedit = false;
    this.getAllEmployee();
  }

  onSave() {
    // this.employeeArr.push(this.employeeObj);
    const isData = localStorage.getItem('EmpData');
    if (isData == null) {
      // First Record with set first ID
      const newArr = [];
      this.employeeObj.EmployeeId = 1;
      newArr.push(this.employeeObj);
      localStorage.setItem('EmpData', JSON.stringify(newArr));
    } else {
      // Second Record with increment ID
      const oldData = JSON.parse(isData);
      const datafind_1 = oldData.find((e: { FirstName: any; }) => e.FirstName === this.employeeObj.FirstName)
      const datafind_2 = oldData.find((e: { LastName: any; }) => e.LastName === this.employeeObj.LastName)

      // Cheick to eliminate double record
      if ((datafind_1 !== 'undefined') && (datafind_2  !== 'undefined')){
        const newId = oldData.length + 1;
        this.employeeObj.EmployeeId = newId;
        oldData.push(this.employeeObj);
        // Save in localstorage
        localStorage.setItem('EmpData', JSON.stringify(oldData));
      }else {
        alert('Le Nom et Prénom existent déja. Veuillez saisir une nouvelle!');
      }
    }
    this.employeeObj = new EmployeeObj();
    this.getAllEmployee();
    this.isedit = false;
  }

  onUpdate(employeeObj: EmployeeObj) {
    const isData = localStorage.getItem('EmpData');
    if (isData !== null) {
      const oldData = JSON.parse(isData);
      for (let index = 0; index < oldData.length; index++) {
        if (oldData[index].EmployeeId == employeeObj.EmployeeId){
          oldData[index] = this.employeeObj;
        }
      }
      // console.log('New Data', oldData);
      localStorage.setItem('EmpData', JSON.stringify(oldData));
    }
    this.employeeObj = new EmployeeObj();
    this.getAllEmployee();
    this.isedit = false;
  }

  getAllEmployee() {
    const isData = localStorage.getItem('EmpData');
    if (isData != null) {
      const localData = JSON.parse(isData);
      this.employeeArr = localData;
    }
  }

  onEdit(item: EmployeeObj){
    this.isedit = true;
    this.employeeObj = item;
  }

  onDelete(item: EmployeeObj) {
    const isData = localStorage.getItem('EmpData');
    if (isData != null) {
      const localData = JSON.parse(isData);
      for (let index = 0; index < localData.length; index++) {
        if (localData[index].EmployeeId == item.EmployeeId){
          localData.splice(index,1);
          // console.log('Ok', localData)
        }
      }
      localStorage.setItem('EmpData', JSON.stringify(localData));
      this.getAllEmployee();
      this.isedit = false;
    }
  }

  onSearch() {
    const isData = localStorage.getItem("EmpData");
    if(isData != null) {
      const localData = JSON.parse(isData);
      const filteredData = localData.filter((m:EmployeeObj) => m.FirstName.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()) )
      this.employeeArr = filteredData;
    }
  }

  onSort() {
    const isData = localStorage.getItem("EmpData");
    if(isData != null) {
      const localData = JSON.parse(isData);
      if (this.sortBy == "Name") {
        const filteredData = localData.sort((a:any, b: any) => a.FirstName.localeCompare(b.FirstName))
        this.employeeArr = filteredData;
      }
      if (this.sortBy == "Technology") {
        const filteredData = localData.sort((a:any, b: any) => a.Technology.localeCompare(b.Technology))
        this.employeeArr = filteredData;
      }
    }
  }





}

export class EmployeeObj {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  Technology: string;
  Designation: string;
  Skill: string;
  Core: string;
  IsCertification: string;
  Certification: string;
  Company: string;
  FewDetails: string;

  constructor(){
    this.EmployeeId = 0;
    this.FirstName = "";
    this.LastName = "";
    this.Technology = "";
    this.Designation = "";
    this.Skill = "";
    this.Core = "";
    this.IsCertification = "";
    this.Certification = "";
    this.Company = "";
    this.FewDetails = "";
  }

}