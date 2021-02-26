import { Component, OnInit } from '@angular/core';
import { AssetviewService } from '../../services/assetview.service';

@Component({
  selector: 'app-accountvalueview',
  templateUrl: './accountvalueview.component.html',
  styleUrls: ['./accountvalueview.component.css']
})
export class AccountValueViewComponent implements OnInit {

  valuemap = [
  {
    "name": "Liquid",
    "series": [
      {
        "name": "NA",
        "value": 0
      },
      {
        "name": "NA2",
        "value": 1
      }
    ]
  },

  {
    "name": "LongTerm",
    "series": [
      {
        "name": "NA3",
        "value": 2
      }
    ]
  },
];
  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: string = 'below';
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Liquidität';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Wert';
  showDataLabel = true;

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };
  schemeType: string = 'linear';

  isInit = false;

  constructor(private assetviewservice: AssetviewService) {
    this.assetviewservice.instrumentDetailsSubject.subscribe(
      () => {
         this.setValueMap()
      }
    )
    this.updateValues();
  }

  ngOnInit(): void {
  }

  updateValues() {
    if (this.assetviewservice.getIsInstrumentDetailsLoaded()) {
      this.setValueMap()
    }
  }

  setValueMap() {

    const newvaluemap = [
      {
        "name": "Liquid",
        "series": []
      },
      {
        "name": "MidTerm",
        "series": []
      },
      {
        "name": "LongTerm",
        "series": []
      },
    ];
    const values = this.assetviewservice.getInstrumentDetails().values;
    for (const key in values) {
      if(values[key].valuemap['liquiditytype'] === 'LIQUIDE') {
        newvaluemap[0].series.push(          {
        'name': key,
        'value': values[key].valuemap['value']
      });
     }
    }
    this.valuemap = newvaluemap;
    this.isInit = true;
  }

}
