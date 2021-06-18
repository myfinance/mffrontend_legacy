import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Instrument } from '../../../../../myfinance-tsclient-generated';
import { MarketDataService } from '../../services/marketdata.service';
import InstrumentTypeEnum = Instrument.InstrumentTypeEnum;

@Component({
  selector: 'app-marketinstrumentupdateform',
  templateUrl: './marketinstrumentupdateform.component.html',
  styleUrls: ['./marketinstrumentupdateform.component.scss']
})
export class MarketInstrumentUpdateformComponent implements OnInit {

  selectedInstrument: Instrument;
  instrumentForm: FormGroup;
  symbols: FormArray;
  currencies: Instrument[];
  noInstrumentSelected = true;

  constructor(private formBuilder: FormBuilder, private marketdataservice: MarketDataService) { }

  ngOnInit() {
      this.instrumentForm = this.formBuilder.group({
        description: ['', Validators.required],
        active: ['', Validators.required],
        symbols: this.formBuilder.array([])
      });

    if (this.marketdataservice.getIsInit()) {
      this.loadData();
    }
    this.marketdataservice.selectedinstrumentSubject.subscribe(
      () => {
        this.updateSelectedInstrument()
      }
    )
    this.marketdataservice.instrumentSubject.subscribe(
      () => {
        this.loadData();
      }
    )
  }

  loadData(): void {
    this.currencies = this.marketdataservice.getCurrencies();
  }

  updateSelectedInstrument() {
    this.selectedInstrument = this.marketdataservice.getSelectedInstrument()
    if (this.selectedInstrument) {
      this.noInstrumentSelected = false;
      this.instrumentForm.get('description').setValue(this.selectedInstrument.description);
      this.instrumentForm.get('active').setValue(this.selectedInstrument.isactive);
      if (this.selectedInstrument.instrumentType === InstrumentTypeEnum.EQUITY) {
        //this.instrumentservice.loadInstrumentProperties(this.selectedInstrument.instrumentid)
      }
    }

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

  onSubmit() {
    if (this.selectedInstrument.instrumentType === InstrumentTypeEnum.CURRENCY) {
      this.marketdataservice.updateInstrument(this.selectedInstrument.instrumentid, this.instrumentForm.value.description, true);
    } else if (this.selectedInstrument.instrumentType === InstrumentTypeEnum.EQUITY) {
      let symbols: string[] = [];
      this.instrumentForm.get('symbols')['controls'].forEach(element => {
        symbols.push(element.value.symbol+','+element.value.currency.businesskey);
      });
      this.marketdataservice.saveEquity(this.instrumentForm.value.description, this.selectedInstrument.businesskey, symbols);
    }
  }

}
