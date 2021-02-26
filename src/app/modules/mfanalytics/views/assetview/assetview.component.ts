import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AbstractDashboard } from '../../../dashboard/abstract-dashboard';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { AssetviewService } from './services/assetview.service';

@Component({
  selector: 'app-assetview',
  templateUrl: './assetview.component.html',
  styleUrls: ['./assetview.component.scss']
})
export class AssetviewComponent  extends AbstractDashboard implements OnInit, OnDestroy {

  title = 'Transactions';
  view = 'fit';

  widgets = [
    {
      uuid: '704197f2-6152-11eb-ae93-0242ac130002',
      title: 'Controller',
      x: 0,
      y: 0,
      rows: 1,
      cols: 2,
      draggable: true,
      resizable: true
    },
    {
      uuid: '7f38672c-6152-11eb-ae93-0242ac130002',
      title: 'Wertentwicklung',
      x: 2,
      y: 0,
      rows: 1,
      cols: 10,
      draggable: true,
      resizable: true
    },
    {
      uuid: '8d019478-6152-11eb-ae93-0242ac130002',
      title: 'Kontenübersicht',
      x: 0,
      y: 1,
      rows: 2,
      cols: 3,
      draggable: true,
      resizable: true
    },
    {
      uuid: '7dc9e43b-abc1-4191-9497-ad0fb24983e8',
      title: 'Konten Wertveränderung',
      x: 3,
      y: 1,
      rows: 2,
      cols: 3,
      draggable: true,
      resizable: true
    },
    {
      uuid: '972aa46c-6152-11eb-ae93-0242ac130002',
      title: 'Budgetübersichts',
      x: 6,
      y: 1,
      rows: 2,
      cols: 3,
      draggable: true,
      resizable: true
    },
    {
      uuid: 'ad625d6d-4ab5-475f-95c2-0e5add8b1b5b',
      title: 'Budget Wertveränderung',
      x: 9,
      y: 1,
      rows: 2,
      cols: 3,
      draggable: true,
      resizable: true
    },
    {
      uuid: '9ea794fc-6152-11eb-ae93-0242ac130002',
      title: 'Instrumentdetails',
      x: 0,
      y: 3,
      rows: 1,
      cols: 12,
      draggable: true,
      resizable: true
    }
  ];

  // dashboardService and instrumentservice are not used directly here but it is necessary to put them in the constructor to initialize them
  constructor( public dashboardService: DashboardService, public assetviewService: AssetviewService, changeDetectorRef: ChangeDetectorRef ) {
    super(changeDetectorRef);
  }

  ngOnInit() {
    this.assetviewService.dataLoadedSubject.subscribe(
      () => {
        if (this.grid) { this.grid.refresh(); }
      })
  }

  ngOnDestroy() {
  }
}
