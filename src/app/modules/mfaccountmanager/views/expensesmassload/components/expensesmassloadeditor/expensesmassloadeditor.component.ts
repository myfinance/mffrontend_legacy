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
  budget: Instrument;
  giros: Instrument[];
  giro: Instrument

  constructor(private expensesmassloadService: ExpensesmassloadService) { }

  ngOnInit(): void {
      this.expensesmassloadService.contentSubject.subscribe(
      () => {
        this.updateTableContent()
      }
    )
    if (this.expensesmassloadService.getIsInit()) {
      this.loadData();
    } else {
      this.expensesmassloadService.instrumentSubject.subscribe(
        () => {
          this.loadData()}
      )
    }
  }

  updateTableContent() {
    this.content = this.expensesmassloadService.getContent();
  }

  private loadData(): void {
    this.budgets = this.expensesmassloadService.getBudgets();
    this.giros = this.expensesmassloadService.getGiros();
  }

  save() {
    if (this.giro != null && this.content!=null && this.content.length>0) {
      this.expensesmassloadService.save(this.content, this.giro);
    }
  }

}
