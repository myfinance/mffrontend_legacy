import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {TransactionService} from '../../services/transaction.service';
import {Instrument} from '../../../../../myfinance-tsclient-generated';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private transactionservice: TransactionService) {
  }

  ngOnInit() {
  }
}
