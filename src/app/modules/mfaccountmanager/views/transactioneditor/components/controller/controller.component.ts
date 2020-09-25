import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {TransactionService} from '../../services/transaction.service';
import {Instrument} from '../../../../../myfinance-tsclient-generated';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;
  daterange:  Array<Date>;
  instruments: Instrument[];
  instrument: Instrument;

  constructor(private formBuilder: FormBuilder, private transactionservice: TransactionService) {
    this.daterange = this.transactionservice.getDaterange()
  }

  ngOnInit() {

    this.bsConfig = Object.assign({}, { containerClass: 'theme-default', rangeInputFormat: 'YYYY-MM-DD'});
    if (this.transactionservice.getIsInit()) {
      this.loadData();
    } else {
      this.transactionservice.instrumentSubject.subscribe(
        () => {
          this.loadData()}
      )
    }
  }

  private loadData(): void {
    this.instruments = this.transactionservice.getInstruments();
    if (this.transactionservice.getInstrumentfilter() > -1) {
      this.instrument = this.instruments.find(x => x.instrumentid === this.transactionservice.getInstrumentfilter());
      this.setInstrumentFilter();
    }
  }

  onValueChange(value: Date[]): void {
    if (value !== null) {
      this.transactionservice.setDaterange(value);
    }
  }

  onClearFilter() {
    this.transactionservice.clearFilter();
  }

  setInstrumentFilter() {
    if (this.instrument != null) {
      this.transactionservice.setInstrumentfilter(this.instrument.instrumentid);
    }
  }

}
