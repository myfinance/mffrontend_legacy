import { Component, OnInit } from '@angular/core';
import { ExpensesmassloadService } from '../../services/expensesmassload.service';

@Component({
  selector: 'app-expensesmassloadeditor',
  templateUrl: './expensesmassloadeditor.component.html',
  styleUrls: ['./expensesmassloadeditor.component.css']
})
export class ExpensesmassloadeditorComponent implements OnInit {
  content = [];

  constructor(private expensesmassloadService: ExpensesmassloadService) { }

  ngOnInit(): void {
      this.expensesmassloadService.contentSubject.subscribe(
      () => {
        this.updateTableContent()
      }
    )
  }

  updateTableContent() {
    this.content = this.expensesmassloadService.getContent();
  }

}
