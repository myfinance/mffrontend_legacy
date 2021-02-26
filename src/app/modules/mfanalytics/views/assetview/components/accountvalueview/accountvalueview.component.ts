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
        "series": []
      }
    ];
  diffvaluemap = [
      {
        "name": "Liquid",
        "series": []
      }
    ];
  view: any[] = [600, 600];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: string = 'right';
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Liquidität';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Wert';
  showDataLabel = true;

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };
  schemeType: string = 'ordinal';

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
    this.valuemap = this.assetviewservice.getAccountValuemap();
    this.isInit = true;
  }

}
