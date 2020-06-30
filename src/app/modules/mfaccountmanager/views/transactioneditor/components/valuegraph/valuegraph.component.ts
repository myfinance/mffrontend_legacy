import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: 'app-valuegraph',
  templateUrl: './valuegraph.component.html',
  styleUrls: ['./valuegraph.component.scss']
})
export class ValuegraphComponent implements OnInit {

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

  constructor(private transactionservice: TransactionService) {
    this.transactionservice.valueCurveSubject.subscribe(
      () => {
         this.setValueMap()
      }
    )
  }

  ngOnInit() {

  }

  setValueMap() {

    const newvaluemap = [
      {
        'name': 'InstrumentId:' + this.transactionservice.getInstrumentfilter(),
        'series': []
      }
    ];
    const values = this.transactionservice.getValueCurve().values;
    for (const key in values) {
      newvaluemap[0].series.push(          {
        'name': key,
        'value': values[key]
      });

    }
    this.valuemap = newvaluemap;
  }

}
