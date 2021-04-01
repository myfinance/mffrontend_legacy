import { Component, OnInit } from '@angular/core';
import { AssetviewService } from '../../services/assetview.service';

@Component({
  selector: 'app-instrumentvaluedetailsview',
  templateUrl: './instrumentvaluedetailsview.component.html',
  styleUrls: ['./instrumentvaluedetailsview.component.css']
})
export class InstrumentvaluedetailsviewComponent {

  instrumentdescription = "no Instrument selected";
  value = 0;
  valueDiffDate = 0;
  valueChange = 0;
  instrumentType = 'NA'
  avgCashoutPerMonth = 0;
  avgCashoutLastYear = 0;
  expenses: String[][];
  income: String[][];

  constructor(private assetviewservice: AssetviewService) {
    this.assetviewservice.selectedinstrumentSubject.subscribe(
      () => {
         this.setValues()
      }
    )
  }

  private setValues() {
    this.instrumentdescription = this.assetviewservice.getInstrumentDetails().valuemap['description'];
    this.value = +this.assetviewservice.getInstrumentDetails().valuemap['value'];
    this.valueDiffDate = +this.assetviewservice.getInstrumentDetails().valuemap['valueDiffDate'];
    this.valueChange = +this.assetviewservice.getInstrumentDetails().valuemap['valueChange'];
    this.instrumentType = this.assetviewservice.getInstrumentDetails().valuemap['instrumenttype'];

    if(this.instrumentType === 'Budget' || this.instrumentType === 'Giro') {
      this.avgCashoutPerMonth = +this.assetviewservice.getInstrumentDetails().valuemap['avgCashoutPerMonth'];
      this.avgCashoutLastYear = +this.assetviewservice.getInstrumentDetails().valuemap['avgCashoutLastYear'];
      this.expenses=this.assetviewservice.getInstrumentDetails().expensesLastMonth;
      this.income=this.assetviewservice.getInstrumentDetails().incomeLastMonth;
    }
  }

}
