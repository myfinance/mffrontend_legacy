import { Component, OnInit } from '@angular/core';
import {Instrument} from '../../../../../myfinance-tsclient-generated';
import {FormBuilder} from '@angular/forms';
import {RecurrentTransactionService} from '../../services/recurrenttransaction.service';

@Component({
  selector: 'app-recurrenttransactioncontroller',
  templateUrl: './recurrenttransactioncontroller.component.html',
  styleUrls: ['./recurrenttransactioncontroller.component.css']
})
export class RecurrenttransactioncontrollerComponent implements OnInit {

  budgetGroups: Instrument[];
  budgetGroup: Instrument;

  constructor(private formBuilder: FormBuilder, private recurrentTransactionService: RecurrentTransactionService) {
  }

  ngOnInit(): void {
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
    this.budgetGroups = this.recurrentTransactionService.getBudgetGroups();
    this.budgetGroup = this.budgetGroups.filter(i => i.instrumentid === this.recurrentTransactionService.getBudgetGroupfilter())[0];
  }

  setBudgetGroupfilter() {
    if (this.budgetGroup != null) {
      this.recurrentTransactionService.setBudgetGroupfilter(this.budgetGroup.instrumentid);
    }
  }

}
