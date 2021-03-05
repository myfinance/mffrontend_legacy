import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AbstractDashboard } from '../../../dashboard/abstract-dashboard';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { ExpensesmassloadService } from './services/expensesmassload.service';

@Component({
  selector: 'app-expensesmassload',
  templateUrl: './expensesmassload.component.html',
  styleUrls: ['./expensesmassload.component.scss']
})
export class ExpensesmassloadComponent extends AbstractDashboard implements OnInit, OnDestroy {

  title = 'Massenupload';
  view = 'fit';

  widgets = [
    {
      uuid: 'c8cbce04-304c-40ef-a4fd-f0d82da774b6',
      title: 'Controller',
      x: 0,
      y: 0,
      rows: 1,
      cols: 1,
      draggable: true,
      resizable: true
    },
    {
      uuid: 'faf71f82-c7cc-4866-ad2d-1441a0875437',
      title: 'Editor',
      x: 0,
      y: 1,
      rows: 5,
      cols: 1,
      draggable: true,
      resizable: true
    }
  ];

  // dashboardService and instrumentservice are not used directly here but it is necessary to put them in the constructor to initialize them
  constructor( public dashboardService: DashboardService,
               public expensesmassloadService: ExpensesmassloadService,
               changeDetectorRef: ChangeDetectorRef ) {
    super(changeDetectorRef);
  }

  ngOnInit() {
    this.expensesmassloadService.dataLoadedSubject.subscribe(
      () => {
        if (this.grid) { this.grid.refresh(); }
      })
  }

  ngOnDestroy() {
  }
}
