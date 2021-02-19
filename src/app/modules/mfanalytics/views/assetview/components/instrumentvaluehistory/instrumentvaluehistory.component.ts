import { Component, OnInit } from '@angular/core';
import { AssetviewService } from '../../services/assetview.service';

@Component({
  selector: 'app-instrumentvaluehistory',
  templateUrl: './instrumentvaluehistory.component.html',
  styleUrls: ['./instrumentvaluehistory.component.css']
})
export class InstrumentvaluehistoryComponent implements OnInit {

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
  showLabels = false;
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

  constructor(private assetviewservice: AssetviewService) {
    this.assetviewservice.valueCurveSubject.subscribe(
      () => {
         this.setValueMap()
      }
    )
    this.updateValues();
  }

  ngOnInit() {

  }

  updateValues() {
    if (this.assetviewservice.getIsValueCurveLoaded()) {
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
    const values = this.assetviewservice.getValueCurve().values;
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
