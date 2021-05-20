import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InstrumentService} from '../../services/instrument.service';
import {Instrument} from '../../../../../myfinance-tsclient-generated';
import * as moment from 'moment';

@Component({
  selector: 'app-instrumentupdateform',
  templateUrl: './instrumentupdateform.component.html',
  styleUrls: ['./instrumentupdateform.component.scss']
})
export class InstrumentupdateformComponent  implements OnInit {
  instrumentForm: FormGroup;
  noInstrumentSelected = true;
  selectedInstrument: Instrument;
  valcaldata: FormArray;

  constructor(private formBuilder: FormBuilder, private instrumentservice: InstrumentService) { }

  ngOnInit() {
    this.instrumentForm = this.formBuilder.group({
      description: ['', Validators.required],
      active: ['', Validators.required],
      valcaldata: this.formBuilder.array([this.createItem()])
    });
    this.instrumentservice.selectedinstrumentSubject.subscribe(
      () => {
        this.updateSelectedInstrument()
      }
    )
  }

  updateSelectedInstrument() {
    this.selectedInstrument = this.instrumentservice.getSelectedInstrument()
    if (this.selectedInstrument) {
      this.noInstrumentSelected = false;
      this.instrumentForm.get('description').setValue(this.selectedInstrument.description);
      this.instrumentForm.get('active').setValue(this.selectedInstrument.isactive);
    }

  }

  getSelectedInstrumentId(): number {
    if (!this.selectedInstrument) { return 0; } else { return this.selectedInstrument.instrumentid; }
  }

  onSubmit() {
    console.log(this.instrumentForm);
    if (this.instrumentForm.touched) {
      console.log('touched');
      if(this.selectedInstrument.instrumentType === 'REALESTATE') {
        let yieldgoals: string[] = [];
        let profits: string[] = [];
        this.instrumentForm.get('valcaldata')['controls'].forEach(element => {
          let valdate = moment(element.value.valDate).format('YYYY-MM-DD');
          yieldgoals.push(element.value.yieldgoal + "," + valdate);
          profits.push(element.value.profit + "," + valdate);
        });
        this.instrumentservice.updateRealEstate(
          this.getSelectedInstrumentId(),
          this.instrumentForm.value.description,
          yieldgoals,
          profits,
          this.instrumentForm.value.active);
      } else {
        this.instrumentservice.updateInstrument(
          this.getSelectedInstrumentId(),
          this.instrumentForm.value.description,
          this.instrumentForm.value.active);
      }
    } else {
      console.log('untouched');
    }
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      valDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      yieldgoal: 0.0,
      profit: 0.0
    });
  }

  addValueCalculationData() {
    this.valcaldata = this.instrumentForm.get('valcaldata') as FormArray;
    this.valcaldata.push(this.createItem());
  }
}
