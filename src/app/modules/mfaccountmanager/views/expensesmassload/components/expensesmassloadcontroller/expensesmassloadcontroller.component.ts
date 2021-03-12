import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expensesmassloadcontroller',
  templateUrl: './expensesmassloadcontroller.component.html',
  styleUrls: ['./expensesmassloadcontroller.component.scss']
})
export class ExpensesmassloadcontrollerComponent implements OnInit {

  fileToUpload: File = null;

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(event) {
    if(event.target.files && event.target.files.length) {
      this.fileToUpload = event.target.files;
    }
  }

  load() {

  }

}
