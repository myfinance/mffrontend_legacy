import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractDashboard} from '../../../dashboard/abstract-dashboard';
import {DashboardService} from '../../../dashboard/services/dashboard.service';
import {RecurrentTransactionService} from './services/recurrenttransaction.service';

@Component({
  selector: 'app-recurrenttransactioneditor',
  templateUrl: './recurrenttransactioneditor.component.html',
  styleUrls: ['./recurrenttransactioneditor.component.scss']
})
export class RecurrenttransactioneditorComponent extends AbstractDashboard implements OnInit {

  title = 'Recurrenttransactions';
  view = 'fit';

  widgets = [
    {
      uuid: 'e4b9c374-93f6-469b-9874-de3ab729f9f6',
      title: 'Controller',
      x: 0,
      y: 0,
      rows: 1,
      cols: 1,
      draggable: true,
      resizable: true
    },
    {
      uuid: '21ce418a-de25-476a-962f-6a222517c0c9',
      title: 'Editor',
      x: 0,
      y: 1,
      rows: 2,
      cols: 1,
      draggable: true,
      resizable: true
    },
    {
      uuid: 'b05f9c4b-43cc-44f6-9734-e202deab8d64',
      title: 'Input',
      x: 0,
      y: 3,
      rows: 2,
      cols: 1,
      draggable: true,
      resizable: true
    },
    {
      uuid: '5cbceb3d-a766-4ed0-8b83-467490bd3c9b',
      title: 'Alle Dauertransfers',
      x: 1,
      y: 0,
      rows: 5,
      cols: 4,
      draggable: true,
      resizable: true
    }
  ];

  // dashboardService and instrumentservice are not used directly here but it is necessary to put them in the constructor to initialize them
  constructor( public dashboardService: DashboardService,
               public recurrenttransactionService: RecurrentTransactionService,
               changeDetectorRef: ChangeDetectorRef ) {
     super(changeDetectorRef);
  }

  ngOnInit() {
    this.recurrenttransactionService.dataLoadedSubject.subscribe(
      () => {
        if (this.grid) { this.grid.refresh(); }
      })
  }
}
