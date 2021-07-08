import { Component, OnInit } from '@angular/core';
import { MarketDataService } from '../../services/marketdata.service';

@Component({
  selector: 'app-marketdatapriceview',
  templateUrl: './marketdatapriceview.component.html',
  styleUrls: ['./marketdatapriceview.component.css']
})
export class MarketdatapriceviewComponent implements OnInit {

  valuemap = [
    {
      'name': 'No Instrument selected',
      'series': [
        {
          'name': '',
          'value': 0
        }
      ]
    }
  ];
  // options
  legend = true;
  animations = true;
  xAxis = false;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Datum';
  yAxisLabel = 'Wert';
  timeline = true;
  view = [1200, 200];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  isInit = false;

  constructor(private marketdataservice: MarketDataService) { }

  ngOnInit(): void {
    this.marketdataservice.valueCurveSubject.subscribe(
      () => {
         this.setValueMap()
      }
    )
    this.updateValues();
  }

  updateValues() {
    if (this.marketdataservice.getIsValueCurveLoaded()) {
      this.setValueMap()
    }
  }

  setValueMap() {

    const newvaluemap = [
      {
        'name': 'Gesamtvermögen',
        'series': []
      }
    ];
    const values = this.marketdataservice.getValueCurve().values;
    for (const key in values) {
      newvaluemap[0].series.push(          {
        'name': key,
        'value': values[key]
      });

    }
    this.valuemap = newvaluemap;
    this.isInit = true;
  }

}
