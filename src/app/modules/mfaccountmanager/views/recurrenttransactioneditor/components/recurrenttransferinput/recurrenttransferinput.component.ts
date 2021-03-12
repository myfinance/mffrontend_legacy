import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Instrument, RecurrentTransaction} from '../../../../../myfinance-tsclient-generated';
import {RecurrentTransactionService} from '../../services/recurrenttransaction.service';
import RecurrentfrequenceEnum = RecurrentTransaction.RecurrentfrequenceEnum;
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';

@Component({
  selector: 'app-recurrenttransfer',
  templateUrl: './recurrenttransferinput.component.html',
  styleUrls: ['./recurrenttransferinput.component.css']
})
export class RecurrenttransferinputComponent  implements OnInit {

  recurrentTransactionForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  accounts: Instrument[];
  srcAccount: Instrument;
  trgAccount: Instrument;
  frequencyValues: string[] = ['Monat', 'Quartal', 'Jahr'];
  frequency = this.frequencyValues[0];

  constructor(private formBuilder: FormBuilder, private recurrentTransactionService: RecurrentTransactionService) {
  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-default', dateInputFormat: 'YYYY-MM-DD'});
    this.recurrentTransactionForm = this.formBuilder.group({
      description: ['', Validators.required],
      srcAccount: ['', Validators.required],
      trgAccount: ['', Validators.required],
      value: [0, [Validators.required, Validators.min(0)]],
      transactionDate: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), Validators.required],
      recurrentFrequency: [this.frequencyValues[0], Validators.required],
    });
    if (this.recurrentTransactionService.getIsInit()) {
      this.loadData();
    } else {
      this.recurrentTransactionService.instrumentSubject.subscribe(
        () => {
          this.loadData()}
      )
    }
  }

  private loadData(): void {
    this.accounts = this.recurrentTransactionService.getGiros();
    this.srcAccount = this.accounts[0];
    this.trgAccount = this.accounts[0];
  }

  onSubmit() {
    console.log(this.recurrentTransactionForm);
    if (!this.recurrentTransactionForm.valid) {
      return;
    }
    let frequencyEnum: RecurrentfrequenceEnum;
    switch (this.recurrentTransactionForm.value.recurrentFrequency) {
      case 'Monat': {
        frequencyEnum = RecurrentfrequenceEnum.Monthly;
        break;
      }
      case 'Quartal': {
        frequencyEnum = RecurrentfrequenceEnum.Quaterly;
        break;
      }
      case 'Jahr': {
        frequencyEnum = RecurrentfrequenceEnum.Yearly;
        break;
      }
      default: {
        frequencyEnum = RecurrentfrequenceEnum.UNKNOWN;
        break;
      }
    }
    this.recurrentTransactionService.saveRecurrentTransaction(this.recurrentTransactionForm.value.description,
      this.recurrentTransactionForm.value.srcAccount.instrumentid,
      this.recurrentTransactionForm.value.trgAccount.instrumentid,
      frequencyEnum,
      this.recurrentTransactionForm.value.value,
      this.recurrentTransactionForm.value.transactionDate
    );
    this.recurrentTransactionForm.reset();
  }
}
