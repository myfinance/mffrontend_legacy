import {Component, OnInit, ViewChild} from '@angular/core';
import {Instrument} from '../../../../../myfinance-tsclient-generated';
import {TransactionService} from '../../services/transaction.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap';

@Component({
  selector: 'app-budgettransferinputform',
  templateUrl: './budgettransferinputform.component.html',
  styleUrls: ['./budgettransferinputform.component.scss']
})
export class BudgettransferinputformComponent implements OnInit {

  budgets: Instrument[];
  budgetDefault: Instrument;
  budgettransferForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private formBuilder: FormBuilder, private transactionservice: TransactionService) { }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-default', dateInputFormat: 'YYYY-MM-DD'});
    this.budgettransferForm = this.formBuilder.group({
      description: ['', Validators.required],
      srcbudget: ['', Validators.required],
      trgbudget: ['', Validators.required],
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
    this.budgets = this.transactionservice.getBudgets();
    this.budgetDefault = this.budgets[0];
  }

  onSubmit() {
    console.log(this.budgettransferForm)
    this.transactionservice.saveTransfer(this.budgettransferForm.value.description,
      this.budgettransferForm.value.srcbudget.instrumentid,
      this.budgettransferForm.value.trgbudget.instrumentid,
      this.budgettransferForm.value.value,
      new Date());
    this.budgettransferForm.reset();
  }
}
