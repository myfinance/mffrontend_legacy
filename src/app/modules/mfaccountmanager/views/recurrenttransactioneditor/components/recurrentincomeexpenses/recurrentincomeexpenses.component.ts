import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {RecurrentTransactionService} from '../../services/recurrenttransaction.service';
import {Instrument} from '../../../../../myfinance-tsclient-generated';

@Component({
  selector: 'app-recurrentincomeexpenses',
  templateUrl: './recurrentincomeexpenses.component.html',
  styleUrls: ['./recurrentincomeexpenses.component.css']
})
export class RecurrentincomeexpensesComponent implements OnInit {

  recurrentTransactionForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  giros: Instrument[];
  budgets: Instrument[];
  giroDefault: Instrument;
  budgetDefault: Instrument;

  constructor(private formBuilder: FormBuilder, private recurrentTransactionService: RecurrentTransactionService) {
  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-default', dateInputFormat: 'YYYY-MM-DD'});
    this.recurrentTransactionForm = this.formBuilder.group({
      description: ['', Validators.required],
      giro: ['', Validators.required],
      budget: ['', Validators.required],
      value: [0, Validators.required],
      transactionDate: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), Validators.required],
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
    this.budgets = this.recurrentTransactionService.getBudgets();
    this.budgetDefault = this.budgets[0];
  }

  onSubmit() {
  }
}
