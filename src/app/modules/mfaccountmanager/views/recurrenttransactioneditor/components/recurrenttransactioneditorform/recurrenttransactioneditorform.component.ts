import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {Instrument, RecurrentTransaction} from '../../../../../myfinance-tsclient-generated';
import {RecurrentTransactionService, RecurrentTransactionFEModel} from '../../services/recurrenttransaction.service';
import RecurrentfrequenceEnum = RecurrentTransaction.RecurrentfrequenceEnum;

@Component({
  selector: 'app-recurrenttransactioneditorform',
  templateUrl: './recurrenttransactioneditorform.component.html',
  styleUrls: ['./recurrenttransactioneditorform.component.css']
})
export class RecurrenttransactioneditorformComponent  implements OnInit {

  recurrentEditForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  frequencyValues: string[] = ['Monat', 'Quartal', 'Jahr'];
  frequency = this.frequencyValues[0];
  selectedRecurrentTransaction: RecurrentTransactionFEModel;
  recurrentTransactionSelected = false;

  constructor(private formBuilder: FormBuilder, private recurrentTransactionService: RecurrentTransactionService) {
  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-default', dateInputFormat: 'YYYY-MM-DD'});
    this.recurrentEditForm = this.formBuilder.group({
      description: ['', Validators.required],
      value: [0, [Validators.required]],
      nexttransaction: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), Validators.required],
      recurrentFrequency: [this.frequencyValues[0], Validators.required],
    });
    this.recurrentEditForm.disable();
    this.recurrentTransactionService.recurrentTransactionSelectionSubject.subscribe(
      () => {
        this.loadData()}
    )
  }

  private loadData(): void {
    this.selectedRecurrentTransaction = this.recurrentTransactionService.getSelectedRecurrentTransaction();
    if (this.selectedRecurrentTransaction !== null && this.selectedRecurrentTransaction.Id !== -1) {
      this.recurrentTransactionSelected = true;
      this.recurrentEditForm.reset();
      this.recurrentEditForm.enable();
      this.recurrentEditForm.controls.description.setValue(this.selectedRecurrentTransaction.description);
      this.recurrentEditForm.controls.nexttransaction.setValue(this.selectedRecurrentTransaction.nexttransaction)
      this.recurrentEditForm.controls.value.setValue(this.selectedRecurrentTransaction.value);
      switch (this.selectedRecurrentTransaction.recurrentfrequence) {
        case RecurrentfrequenceEnum.Monthly: {
          this.recurrentEditForm.controls.recurrentFrequency.setValue('Monat');
          break;
        }
        case RecurrentfrequenceEnum.Quaterly: {
          this.recurrentEditForm.controls.recurrentFrequency.setValue('Quartal');
          break;
        }
        case RecurrentfrequenceEnum.Yearly: {
          this.recurrentEditForm.controls.recurrentFrequency.setValue('Jahr');
          break;
        }
        default: {
          this.recurrentEditForm.controls.recurrentFrequency.setValue('Monat');
          break;
        }
      }
    } else {
      this.recurrentTransactionSelected = false;
      this.recurrentEditForm.disable();
    }
  }

  onUpdateRecurrentTransaction() {
    this.recurrentTransactionService.updateRecurrentTransaction(this.selectedRecurrentTransaction.Id,
      this.recurrentEditForm.value.description,
      this.recurrentEditForm.value.nexttransaction,
      this.recurrentEditForm.value.value);
    this.recurrentEditForm.reset();
  }

  onDeleteRecurrentTransaction() {
    this.recurrentTransactionService.deleteRecurrentTransaction(this.selectedRecurrentTransaction.Id);
    this.recurrentEditForm.reset();
  }
}


