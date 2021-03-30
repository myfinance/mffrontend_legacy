import { Component, OnInit } from '@angular/core';
import { ExpensesmassloadService } from '../../services/expensesmassload.service';
import { Instrument } from '../../../../../myfinance-tsclient-generated';

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

      let arrl = allTextLines.length;
      let rows = [];
      for (let i = 1; i < arrl; i++) {
        let row = allTextLines[i].split(';');
        if(row != null && row[1]!=null && row[1] !== "") {
          let minrow = [i, row[0], row[3], row[4], ''];
          rows.push(minrow);
        }
      }
      this.expensesmassloadService.setContent(rows);
    }
  }

}
