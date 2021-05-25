import {Component, OnInit, ViewChild} from '@angular/core';
import {Instrument} from '../../../../../myfinance-tsclient-generated';
import {TransactionService} from '../../services/transaction.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';

@Component({
  selector: 'app-incomeexpensesinputform',
  templateUrl: './incomeexpensesinputform.component.html',
  styleUrls: ['./incomeexpensesinputform.component.scss']
})
export class IncomeexpensesinputformComponent implements OnInit {

  giros: Instrument[];
  linkableAccounts: Instrument[];
  budgets: Instrument[];
  giroDefault: Instrument;
  budgetDefault: Instrument;
  incomeExpensesForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private formBuilder: FormBuilder, private transactionservice: TransactionService) { }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-default', dateInputFormat: 'YYYY-MM-DD'});
    this.incomeExpensesForm = this.formBuilder.group({
      description: ['', Validators.required],
      giro: ['', Validators.required],
      budget: ['', Validators.required],
      isLinked: ['false', Validators.required],
      linkedAccount: ['', Validators.required],
      value: [0, Validators.required],
      transactionDate: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), Validators.required],
    });
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
    this.giros = this.transactionservice.getGiros();
    this.giroDefault = this.giros[0];
    this.budgets = this.transactionservice.getBudgets();
    this.budgetDefault = this.budgets[0];
    this.linkableAccounts =  this.transactionservice.getLinkableAccounts();
  }

  onSubmit() {
    console.log(this.incomeExpensesForm)
    let linkedAccId: number = 0;
    if(this.incomeExpensesForm.value.linkedAccount!=null) {
      linkedAccId=this.incomeExpensesForm.value.linkedAccount.instrumentid;
    }
    this.transactionservice.saveIncomeExpenses(this.incomeExpensesForm.value.description,
      this.incomeExpensesForm.value.giro.instrumentid,
      this.incomeExpensesForm.value.budget.instrumentid,
      this.incomeExpensesForm.value.value,
      this.incomeExpensesForm.value.transactionDate,
      this.incomeExpensesForm.value.isLinked == "true",
      linkedAccId
      );
    this.incomeExpensesForm.reset();
  }
}
