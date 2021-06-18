import { Component, OnInit } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Instrument } from '../../../../../myfinance-tsclient-generated';
import { MarketDataService } from '../../services/marketdata.service';

@Component({
  selector: 'app-marketinstrumenttable',
  templateUrl: './marketinstrumenttable.component.html',
  styleUrls: ['./marketinstrumenttable.component.scss']
})
export class MarketInstrumentTableComponent implements OnInit {

  rows: Array<Instrument>;
  columns = [
    { prop: 'instrumentid' }, 
    { prop: 'description', name:'Beschreibung' },
    { prop: 'treelastchanged', name:'Zuletzt geändert' },
    { prop: 'instrumentType', name:'InstrumentType' },
  ];

  selected:Instrument[] = []
  SelectionType = SelectionType;

  constructor(private marketdataservice: MarketDataService){

  }
  ngOnInit(): void {
    this.loadData()
    this.marketdataservice.instrumentSubject.subscribe(
      () => {
        this.loadData()
      }
    )
  }

  private loadData(): void {
    this.rows = this.marketdataservice.getInstruments();
  }

  onSelect({ selected }) {
    this.marketdataservice.setSelectedInstrument(selected[0]);
  }

}
