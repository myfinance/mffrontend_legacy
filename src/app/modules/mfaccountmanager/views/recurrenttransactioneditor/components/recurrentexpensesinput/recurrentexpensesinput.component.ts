import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecurrentTransactionService} from '../../services/recurrenttransaction.service';
import {Instrument, RecurrentTransaction} from '../../../../../myfinance-tsclient-generated';
import RecurrentfrequenceEnum = RecurrentTransaction.RecurrentfrequenceEnum;
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';

@Component({
  selector: 'app-recurrentexpensesinput',
  templateUrl: './recurrentexpensesinput.component.html',
  styleUrls: ['./recurrentexpensesinput.component.css']
})
export class RecurrentexpensesinputComponent implements OnInit {

  recurrentTransactionForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  giros: Instrument[];
  budgets: Instrument[];
  giroDefault: Instrument;
  budgetDefault: Instrument;
  frequencyValues: string[] = ['Monat', 'Quartal', 'Jahr'];
  frequency = this.frequencyValues[0];

  constructor(private formBuilder: FormBuilder, private recurrentTransactionService: RecurrentTransactionService) {
  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-default', dateInputFormat: 'YYYY-MM-DD'});
    this.recurrentTransactionForm = this.formBuilder.group({
      description: ['', Validators.required],
      giro: ['', Validators.required],
      budget: ['', Validators.required],
      value: [0, [Validators.required, Validators.max(0)]],
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
    this.giros = this.recurrentTransactionService.getGiros();
    this.giroDefault = this.giros[0];
    this.budgets = this.recurrentTransactionService.getExpenseBudgets();
    this.budgetDefault = this.budgets[0];
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
      this.recurrentTransactionForm.value.giro.instrumentid,
      this.recurrentTransactionForm.value.budget.instrumentid,
      frequencyEnum,
      this.recurrentTransactionForm.value.value,
      this.recurrentTransactionForm.value.transactionDate
    );
    this.recurrentTransactionForm.reset();
  }
}
