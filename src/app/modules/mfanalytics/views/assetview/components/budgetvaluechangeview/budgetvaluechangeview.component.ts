import { Component, OnInit } from '@angular/core';
import { AssetviewService } from '../../services/assetview.service';

@Component({
  selector: 'app-budgetvaluechangeview',
  templateUrl: './budgetvaluechangeview.component.html',
  styleUrls: ['./budgetvaluechangeview.component.css']
})
export class BudgetValueChangeViewComponent implements OnInit {

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
  xAxisLabel = 'Wertänderung';
  showDataLabel = true;

  colorScheme = 'horizon'
  schemeType: string = 'ordinal';

  isInit = false;
  budgetValueChange = 0.0;

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
    this.valuemap = this.assetviewservice.getBudgetDiffValuemap();
    this.budgetValueChange = this.assetviewservice.getBudgetValueChange();
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

