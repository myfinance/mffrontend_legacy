import { Component, OnInit } from '@angular/core';
import {Instrument} from '../../../../../myfinance-tsclient-generated';
import {FormBuilder} from '@angular/forms';
import {RecurrentTransactionFEModel, RecurrentTransactionService} from '../../services/recurrenttransaction.service';

@Component({
  selector: 'app-recurrenttransactioncontroller',
  templateUrl: './recurrenttransactioncontroller.component.html',
  styleUrls: ['./recurrenttransactioncontroller.component.css']
})
export class RecurrenttransactioncontrollerComponent implements OnInit {

  budgetGroups: Instrument[];
  budgetGroup: Instrument;
  incomeBudgetTransferDiff = 0.0;

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
    // subscribe to all transaction updates
    this.incomeBudgetTransferDiff = this.recurrentTransactionService.getIncomeBudgetTransferDiff();
    this.recurrentTransactionService.recurrentTransactionSubject.subscribe(
      () => {
        this.incomeBudgetTransferDiff = this.recurrentTransactionService.getIncomeBudgetTransferDiff();
      }
    )
  }

  private loadData(): void {
    this.budgetGroups = this.recurrentTransactionService.getBudgetGroups();
    this.budgetGroup = this.budgetGroups.filter(i => i.instrumentid === this.recurrentTransactionService.getBudgetGroupfilter())[0];
  }

  setBudgetGroupfilter() {
    this.recurrentTransactionService.setBudgetGroupfilter(this.budgetGroup.instrumentid);
  }
}
