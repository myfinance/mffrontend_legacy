import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {RecurrentTransactionService} from '../../services/recurrenttransaction.service';

@Component({
  selector: 'app-recurrentincomeexpenses',
  templateUrl: './recurrentincomeexpenses.component.html',
  styleUrls: ['./recurrentincomeexpenses.component.css']
})
export class RecurrentincomeexpensesComponent implements OnInit {

  recurrentTransactionForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

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
  }
}
