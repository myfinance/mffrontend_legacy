import { Component, OnInit } from '@angular/core';
import { MarketDataService } from '../../services/marketdata.service';

@Component({
  selector: 'app-marketdatacontroller',
  templateUrl: './marketdatacontroller.component.html',
  styleUrls: ['./marketdatacontroller.component.scss']
})
export class MarketDataControllerComponent implements OnInit {

  constructor(private marketdataservice: MarketDataService) { }

  ngOnInit(): void {
  }

  onImportStart(): void {
    this.marketdataservice.importPrices();
  }

}
