import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { MarketDataService } from '../../services/marketdata.service';

@Component({
  selector: 'app-marketdatacontroller',
  templateUrl: './marketdatacontroller.component.html',
  styleUrls: ['./marketdatacontroller.component.scss']
})
export class MarketDataControllerComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  startdate: Date;
  enddate: Date;

  constructor(private marketdataservice: MarketDataService) { }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-default', dateInputFormat: 'YYYY-MM-DD'});
    this.initDates();
  }

  onImportStart(): void {
    this.marketdataservice.importPrices();
  }

  private initDates() {
    var today = new Date();
    if(this.marketdataservice.getStartDate() != null) {
      this.startdate = this.marketdataservice.getStartDate();
    } else {
      this.startdate = new Date(today.getFullYear(), today.getMonth(), 0);
    }
    if(this.marketdataservice.getEndDate() != null) {
      this.enddate = this.marketdataservice.getEndDate();
    } else {
      this.enddate = new Date(this.enddate.getFullYear(), this.enddate.getMonth(), 0);
    }
}

onStartDateChange(value: Date): void {
  if (value !== null) {
    this.marketdataservice.setStartDate(value);
  }
}

onEndDateChange(value: Date): void {
  if (value !== null) {
    this.marketdataservice.setEndDate(value);
  }
}

}
