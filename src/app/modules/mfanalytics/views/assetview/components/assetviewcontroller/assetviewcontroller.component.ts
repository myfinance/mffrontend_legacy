import { Component, OnInit } from '@angular/core';
import { AssetviewService } from '../../services/assetview.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-assetviewcontroller',
  templateUrl: './assetviewcontroller.component.html',
  styleUrls: ['./assetviewcontroller.component.css']
})
export class AssetviewcontrollerComponent implements OnInit {

  controllerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  duedate: Date;
  diffDate: Date;

  constructor(private assetviewservice: AssetviewService) { }

  ngOnInit(): void {
      this.bsConfig = Object.assign({}, { containerClass: 'theme-default', dateInputFormat: 'YYYY-MM-DD'});
      this.initDates();
  }

  private initDates() {
      var today = new Date();
      if(this.assetviewservice.getDueday() != null) {
        this.duedate = this.assetviewservice.getDueday();
      } else {
        this.duedate = new Date(today.getFullYear(), today.getMonth(), 0);
      }
      if(this.assetviewservice.getDiffday() != null) {
        this.diffDate = this.assetviewservice.getDiffday();
      } else {
        this.diffDate = new Date(this.duedate.getFullYear(), this.duedate.getMonth(), 0);
      }
  }

  onDueDayChange(value: Date): void {
    if (value !== null) {
      this.assetviewservice.setDueday(value);
    }
  }

  onDiffDayChange(value: Date): void {
    if (value !== null) {
      this.assetviewservice.setDiffday(value);
    }
  }
}
