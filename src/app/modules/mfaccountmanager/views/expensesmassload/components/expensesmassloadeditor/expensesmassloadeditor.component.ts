import { Component, OnInit } from '@angular/core';
import { ExpensesmassloadService } from '../../services/expensesmassload.service';
import { Instrument } from '../../../../../myfinance-tsclient-generated';

@Component({
  selector: 'app-expensesmassloadeditor',
  templateUrl: './expensesmassloadeditor.component.html',
  styleUrls: ['./expensesmassloadeditor.component.css']
})
export class ExpensesmassloadeditorComponent implements OnInit {
  content = [];
  budgets: Array<Instrument> = new Array<Instrument>();

  constructor(private expensesmassloadService: ExpensesmassloadService) { }

  ngOnInit(): void {
      this.expensesmassloadService.contentSubject.subscribe(
      () => {
        this.updateTableContent()
      }
    )
    this.expensesmassloadService.instrumentSubject.subscribe(
      () => {
        this.loadData();
      }
    )
  }

  updateTableContent() {
    this.content = this.expensesmassloadService.getContent();
  }

  private loadData(): void {
    this.budgets = this.expensesmassloadService.getInstruments();
  }

}
