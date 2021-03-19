import { Component, OnInit } from '@angular/core';
import { ExpensesmassloadService } from '../../services/expensesmassload.service';

@Component({
  selector: 'app-expensesmassloadcontroller',
  templateUrl: './expensesmassloadcontroller.component.html',
  styleUrls: ['./expensesmassloadcontroller.component.scss']
})
export class ExpensesmassloadcontrollerComponent implements OnInit {

  fileToUpload: File = null;

  constructor(private expensesmassloadService: ExpensesmassloadService) { }

  ngOnInit(): void {
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.fileToUpload = event.target.files.item(0);
    }
  }

  load() {
    //array varibales to store csv data
    let lines = []; //for headings
    let linesR = []; // for rows
    //File reader method
    let reader: FileReader = new FileReader();
    reader.readAsText(this.fileToUpload);
    reader.onload = (e) => {
      let csv: any = reader.result;
      let allTextLines = [];
      allTextLines = csv.split("\n");

      //Table Headings
      let headers = allTextLines[0].split(';');
      let data = headers;
      let tarr = [];
      for (let j = 0; j < headers.length; j++) {
        tarr.push(data[j]);
      }
      //Pusd headings to array variable
      lines.push(tarr);


      // Table Rows
      let tarrR = [];

      let arrl = allTextLines.length;
      let rows = [];
      for (let i = 1; i < arrl; i++) {
        rows.push(allTextLines[i].split(';'));

      }

      for (let j = 0; j < arrl; j++) {

        tarrR.push(rows[j]);

      }
      //Push rows to array variable
      linesR.push(tarrR);
      this.expensesmassloadService.setContent(linesR[0]);
    }
  }

}
