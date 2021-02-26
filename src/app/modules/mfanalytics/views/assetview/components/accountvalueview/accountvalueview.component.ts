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

  colorScheme = 'horizon'
  schemeType: string = 'ordinal';

  isInit = false;
  accountAsset = 0.0;

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
    this.accountAsset = this.assetviewservice.getAccountAsset();
    this.isInit = true;
  }

}
