import { Component, OnInit } from '@angular/core';
import { MarketDataService } from '../../services/marketdata.service';

@Component({
  selector: 'app-marketinstrumenttable',
  templateUrl: './marketinstrumenttable.component.html',
  styleUrls: ['./marketinstrumenttable.component.css']
})
export class MarketInstrumentTableComponent implements OnInit {

  constructor(private marketdataservice: MarketDataService){
    this.marketdataservice.instrumentSubject.subscribe(
      () => {
        this.loadData()
      }
    )
  }
  ngOnInit(): void {
  }

  private loadData(): void {

  }

}
