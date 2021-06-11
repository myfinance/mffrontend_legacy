import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  symbols: FormArray;
  currencies: Instrument[];

  constructor(private formBuilder: FormBuilder, private marketdataservice: MarketDataService) { }

  ngOnInit() {
      this.instrumentForm = this.formBuilder.group({
        description: ['', Validators.required],
        instrumentType: [InstrumentTypeEnum.EQUITY, Validators.required],
        currencycode: ['', [Validators.required, this.isCurrencyCodeNecessary.bind(this)]],
        isin: ['', [Validators.required, this.isISINNecessary.bind(this)]],
        symbols: this.formBuilder.array([])
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
    this.currencies = this.marketdataservice.getCurrencies();
  }

  onSubmit() {
    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.CURRENCY) {
      this.marketdataservice.saveCurrency(this.instrumentForm.value.description, this.instrumentForm.value.currencycode)
    } else if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.EQUITY) {
      //this.marketdataservice.saveEquity(this.instrumentForm.value.description, this.instrumentForm.value.isin)
      this.instrumentForm.get('symbols')['controls'].forEach(element => {
        //this.marketdataservice.saveSymbol()
        //console.info('symbol:'+element.value.symbol);
        //console.info('currency:'+element.value.currency.businesskey);
      });
      
    }
  }

  isCurrencyCodeNecessary(control: FormControl): {[s: string]: boolean} {
    if (this.instrumentForm == null) { return null; }
    if (this.instrumentForm.value == null) { return null; }
    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.CURRENCY && this.instrumentForm.value.currencycode == null) {
      return {'CurrencyCode is necessary': true};
    } else { return null; }
  }

  isISINNecessary(control: FormControl): {[s: string]: boolean} {
    if (this.instrumentForm == null) { return null; }
    if (this.instrumentForm.value == null) { return null; }
    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.EQUITY && this.instrumentForm.value.isin == null) {
      return {'Isin is necessary': true};
    } else { return null; }
  }

  addSymbol() {
    this.symbols = this.instrumentForm.get('symbols') as FormArray;
    this.symbols.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      symbol: '',
      currency: ''
    });
  }
}

