import {Component, OnInit, ViewChild} from '@angular/core';
import {Instrument} from '../../../../../myfinance-tsclient-generated';
import {TransactionService} from '../../services/transaction.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap';

@Component({
  selector: 'app-transferinputform',
  templateUrl: './transferinputform.component.html',
  styleUrls: ['./transferinputform.component.scss']
})
export class TransferinputformComponent implements OnInit {

  giros: Instrument[];
  giroDefault: Instrument;
  transferForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private formBuilder: FormBuilder, private transactionservice: TransactionService) { }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-default', dateInputFormat: 'YYYY-MM-DD'});
    this.transferForm = this.formBuilder.group({
      description: ['', Validators.required],
      srcaccount: ['', Validators.required],
      trgaccount: ['', Validators.required],
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
  }

  onSubmit() {
    console.log(this.transferForm)
    this.transactionservice.saveTransfer(this.transferForm.value.description,
      this.transferForm.value.srcaccount.instrumentid,
      this.transferForm.value.trgaccount.instrumentid,
      this.transferForm.value.value,
      this.transferForm.value.transactionDate);
    this.transferForm.reset();
  }
}
