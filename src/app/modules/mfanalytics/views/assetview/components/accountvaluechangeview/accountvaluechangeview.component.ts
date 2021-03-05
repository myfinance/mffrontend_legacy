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

  colorScheme = 'horizon'
  schemeType: string = 'ordinal';

  isInit = false;
  accountValueChange = 0.0;

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
    this.accountValueChange = this.assetviewservice.getAccountValueChange();
    this.isInit = true;
  }

  onSelect(data) {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    //console.log('Item clicked',data['name'].substring(0,data['name'].indexOf(':')));
    this.assetviewservice.setSelectedinstrument(data['name'].substring(0,data['name'].indexOf(':')));
  }

  onActivate() {
  }

  onDeactivate() {
  }

}
