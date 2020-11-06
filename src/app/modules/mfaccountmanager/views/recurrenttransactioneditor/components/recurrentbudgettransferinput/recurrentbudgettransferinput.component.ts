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
  budgetDefault: Instrument;
  frequencyValues: string[] = ['Monat', 'Quartal', 'Jahr'];
  frequency = this.frequencyValues[0];

  constructor(private formBuilder: FormBuilder, private recurrentTransactionService: RecurrentTransactionService) {
  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-default', dateInputFormat: 'YYYY-MM-DD'});
    this.recurrentTransactionForm = this.formBuilder.group({
      description: ['', Validators.required],
      srcbudget: ['', Validators.required],
      trgbudget: ['', Validators.required],
      value: [0, Validators.required],
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
    this.budgets = this.recurrentTransactionService.getBudgets();
    this.budgetDefault = this.budgets[0];
  }

  onSubmit() {
    console.log(this.recurrentTransactionForm)
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
      this.recurrentTransactionForm.value.giro.instrumentid,
      this.recurrentTransactionForm.value.budget.instrumentid,
      frequencyEnum,
      this.recurrentTransactionForm.value.value,
      this.recurrentTransactionForm.value.transactionDate
    );
    this.recurrentTransactionForm.reset();
  }
}
