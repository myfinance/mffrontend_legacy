import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Instrument} from '../../../../../myfinance-tsclient-generated';
import { MarketDataService } from '../../services/marketdata.service';
import InstrumentTypeEnum = Instrument.InstrumentTypeEnum;

@Component({
  selector: 'app-marketinstrumentinputform',
  templateUrl: './marketinstrumentinputform.component.html',
  styleUrls: ['./marketinstrumentinputform.component.scss']
})
export class MarketInstrumentInputformComponent implements OnInit {

  instrumentTypes: InstrumentTypeEnum[] = [InstrumentTypeEnum.CURRENCY, InstrumentTypeEnum.EQUITY];
  instrumentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private marketdataservice: MarketDataService) { }

  ngOnInit() {
      this.instrumentForm = this.formBuilder.group({
        description: ['', Validators.required],
        instrumentType: [InstrumentTypeEnum.EQUITY, Validators.required],
        currencycode: ['', [Validators.required, this.isCurrencyCodeNecessary.bind(this)]]
      });

    if (this.marketdataservice.getIsInit()) {
      this.loadData();
    }
    this.marketdataservice.instrumentSubject.subscribe(
      () => {
        this.loadData();
      }
    )
  }

  loadData(): void {
  }

  onSubmit() {
    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.CURRENCY) {
      this.marketdataservice.saveCurrency(this.instrumentForm.value.description, this.instrumentForm.value.currencycode)
    }
  }

  isCurrencyCodeNecessary(control: FormControl): {[s: string]: boolean} {
    if (this.instrumentForm == null) { return null; }
    if (this.instrumentForm.value == null) { return null; }
    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.CURRENCY && this.instrumentForm.value.currencycode == null) {
      return {'CurrencyCode is necessary': true};
    } else { return null; }
  }
}

