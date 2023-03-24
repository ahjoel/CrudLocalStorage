import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Property initialyze
  title = 'crudlocalstorage';
  employeeObj: EmployeeObj;
  isedit:boolean=false;
  sortBy: string;
  searchText: string;
  employeeArr: EmployeeObj[] = [];
  data: any;
  LangArr: LangObj[] = [];

  constructor(){
    this.employeeObj = new EmployeeObj();
    this.sortBy = '';
    this.searchText = '';
  }

  // Initialize variables of this component or setting configuration before component load 
  ngOnInit(): void {
    this.isedit = false;
    this.getAllEmployee();
    this.getAllSkill();
  }

  // Create Data
  onSave() {
    // this.employeeArr.push(this.employeeObj);
    const isData = localStorage.getItem('EmpData');
    if (isData == null) {
      // First Record with set first ID
      const newArr = [];
      this.employeeObj.EmployeeId = 1;
      // Convert skill select value string to integer to perform join
      this.employeeObj.Skill = parseInt(this.employeeObj.Skill.toString(), 10);
      newArr.push(this.employeeObj);
      // Save in localstorage
      localStorage.setItem('EmpData', JSON.stringify(newArr));
    } else {
      // Second Record with increment ID
      const oldData = JSON.parse(isData);
      const datafind_1 = oldData.find((e: { FirstName: any; }) => e.FirstName === this.employeeObj.FirstName)
      const datafind_2 = oldData.find((e: { LastName: any; }) => e.LastName === this.employeeObj.LastName)

      // Cheick to eliminate double record with firstname and lastname condition
      if ((datafind_1 !== 'undefined') && (datafind_2  !== 'undefined')){
        const newId = oldData.length + 1;
        this.employeeObj.EmployeeId = newId;
        // Convert skill select value string to integer to perform join
        this.employeeObj.Skill = parseInt(this.employeeObj.Skill.toString(), 10);
        oldData.push(this.employeeObj);
        // Save in localstorage
        localStorage.setItem('EmpData', JSON.stringify(oldData));
      }else {
        // If record with firstname and lastname existing, raise alert
        alert('Le Nom et Prénom existent déja. Veuillez saisir une nouvelle!');
      }
    }
    // Reset form
    this.employeeObj = new EmployeeObj();
    // Refresh Table
    this.getAllEmployee();
    // Set false to Save another Data
    this.isedit = false;
  }

  // Update Data
  onUpdate(employeeObj: EmployeeObj) {
    const isData = localStorage.getItem('EmpData');
    if (isData !== null) {
      const oldData = JSON.parse(isData);
      for (let index = 0; index < oldData.length; index++) {
        if (oldData[index].EmployeeId == employeeObj.EmployeeId){
          // Convert skill select value to integer
          this.employeeObj.Skill = parseInt(this.employeeObj.Skill.toString(), 10);
          oldData[index] = this.employeeObj;
        }
      }
      // Update data on localstorage
      localStorage.setItem('EmpData', JSON.stringify(oldData));
    }
    // Reset form
    this.employeeObj = new EmployeeObj();
    // Refresh Table
    this.getAllEmployee();
    // Set false to Save another Data
    this.isedit = false;
  }

  // Read Data
  getAllEmployee() {
    const isData = localStorage.getItem('EmpData');
    const isDataSkill = localStorage.getItem('LangData');
    // Cheick data from localstorage for Employee
    if (isData != null) {
      const localData = JSON.parse(isData);
      this.employeeArr = localData;
    }
    // Cheick data from localstorage for Language
    if (isDataSkill != null) {
      const localDataL = JSON.parse(isDataSkill);
      this.LangArr = localDataL;
    }
    // Use join between employe and language to perform data show on table
    this.data = this.employeeArr.map((employe: { Skill: any; }) =>{
      const lang = this.LangArr.find((lg: { id: any; }) => lg.id === employe.Skill);
      return {
        ...employe,
        lang
      }
    })

  }

  // Read Slill from localstorage
  getAllSkill() {
    const isDataSkill = localStorage.getItem('LangData');
    if (isDataSkill != null) {
      const localDataL = JSON.parse(isDataSkill);
      this.LangArr = localDataL;
      // console.log('Skill', this.LangArr);
    }
  }

  // Mode Edit activate
  onEdit(item: EmployeeObj){
    this.isedit = true;
    this.employeeObj = item;
  }

  // Delete Data
  onDelete(item: EmployeeObj) {
    const isData = localStorage.getItem('EmpData');
    if(confirm("Are you sure you want to delete this user?")) { 
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
  }

  // onSearch() {
  //   const isData = localStorage.getItem("EmpData");
  //   if(isData != null) {
  //     const localData = JSON.parse(isData);
  //     const filteredData = localData.filter((m:EmployeeObj) => m.FirstName.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()) )
  //     this.data = filteredData;
  //   }
  // }

  // onSort() {
  //   const isData = localStorage.getItem("EmpData");
  //   if(isData != null) {
  //     const localData = JSON.parse(isData);
  //     if (this.sortBy == "Name") {
  //       const filteredData = localData.sort((a:any, b: any) => a.FirstName.localeCompare(b.FirstName))
  //       this.data = filteredData;
  //     }
  //     if (this.sortBy == "Technology") {
  //       const filteredData = localData.sort((a:any, b: any) => a.Technology.localeCompare(b.Technology))
  //       this.data = filteredData;
  //     }
  //   }
  // }





}

export class EmployeeObj {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  Technology: string;
  Designation: string;
  Skill: number;
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
    this.Skill = 0;
    this.Core = "";
    this.IsCertification = "";
    this.Certification = "";
    this.Company = "";
    this.FewDetails = "";
  }

}

export class LangObj {
  id: number;
  name: string;

  constructor(){
    this.id = 0;
    this.name = "";
  }

}