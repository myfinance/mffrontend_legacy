import { Component, OnInit } from '@angular/core';
import { AssetviewService } from '../../services/assetview.service';

@Component({
  selector: 'app-accountvaluechangeview',
  templateUrl: './accountvaluechangeview.component.html',
  styleUrls: ['./accountvaluechangeview.component.css']
})
export class AccountValueChangeViewComponent implements OnInit {

  valuemap = [];
  view: any[] = [600, 600];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: string = 'right';
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Konto';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Wertänderung';
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
    this.valuemap = this.assetviewservice.getAccountDiffValuemap();
    this.isInit = true;
  }

}
