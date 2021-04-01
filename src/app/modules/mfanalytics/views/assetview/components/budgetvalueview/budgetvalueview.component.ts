import { Component, OnInit } from '@angular/core';
import { AssetviewService } from '../../services/assetview.service';

@Component({
  selector: 'app-budgetvalueview',
  templateUrl: './budgetvalueview.component.html',
  styleUrls: ['./budgetvalueview.component.css']
})
export class BudgetValueViewComponent {

  valuemap = [];
  view: any[] = [600, 600];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: string = 'right';
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Budget';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Wert';
  showDataLabel = true;

  colorScheme = 'horizon'
  schemeType: string = 'ordinal';

  isInit = false;
  budgetValue = 0.0;

  constructor(private assetviewservice: AssetviewService) {
    this.assetviewservice.instrumentDetailsSubject.subscribe(
      () => {
         this.setValueMap()
      }
    )
    this.updateValues();
  }

  updateValues() {
    if (this.assetviewservice.getIsInstrumentDetailsLoaded()) {
      this.setValueMap()
    }
  }

  setValueMap() {
    this.valuemap = this.assetviewservice.getBudgetValuemap();
    this.budgetValue = this.assetviewservice.getBudgetAsset();
    this.isInit = true;
  }

  onSelect(data) {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    //console.log('Item clicked',data['name'].substring(0,data['name'].indexOf(':')));
    this.assetviewservice.setSelectedinstrument(data['name'].substring(0,data['name'].indexOf(':')));
  }
}
