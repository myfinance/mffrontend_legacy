import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {Instrument, RecurrentTransaction} from '../../../../../myfinance-tsclient-generated';
import {RecurrentTransactionService} from '../../services/recurrenttransaction.service';
import RecurrentfrequenceEnum = RecurrentTransaction.RecurrentfrequenceEnum;

@Component({
  selector: 'app-recurrentbudgettransfer',
  templateUrl: './recurrentbudgettransferinput.component.html',
  styleUrls: ['./recurrentbudgettransferinput.component.css']
})
export class RecurrentbudgettransferinputComponent  implements OnInit {

  recurrentTransactionForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  budgets: Instrument[];
  srcbudget: Instrument;
  budgetDescription = 'NA';
  trgbudget: Instrument;
  frequencyValues: string[] = ['Monat', 'Quartal', 'Jahr'];
  frequency = this.frequencyValues[0];

  constructor(private formBuilder: FormBuilder, private recurrentTransactionService: RecurrentTransactionService) {
  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-default', dateInputFormat: 'YYYY-MM-DD'});
    this.recurrentTransactionForm = this.formBuilder.group({
      description: ['', Validators.required],
      trgbudget: ['', Validators.required],
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
    this.budgets = this.recurrentTransactionService.getExpenseBudgets();
    this.srcbudget = this.recurrentTransactionService.getIncomeBudget();
    if ( this.srcbudget != null) {
      this.budgetDescription = this.srcbudget.description;
    }
    this.trgbudget = this.budgets[0];
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
      this.srcbudget.instrumentid,
      this.recurrentTransactionForm.value.trgbudget.instrumentid,
      frequencyEnum,
      this.recurrentTransactionForm.value.value,
      this.recurrentTransactionForm.value.transactionDate
    );
    this.recurrentTransactionForm.reset();
  }
}
