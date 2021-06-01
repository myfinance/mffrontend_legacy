import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractDashboard} from '../../../dashboard/abstract-dashboard';
import {DashboardService} from '../../../dashboard/services/dashboard.service';
import { MarketDataService } from './services/marketdata.service';


@Component({
  selector: 'app-instrumentconfigurator',
  templateUrl: './instrumentconfigurator.component.html',
  styleUrls: ['./instrumentconfigurator.component.css']
})
export class InstrumentconfiguratorComponent extends AbstractDashboard implements OnInit {

  title = 'Instruments';
  view = 'fit';

  widgets = [
    {
      uuid: '06bd164a-17aa-4a75-85bb-72b010931d5b',
      title: 'Controller',
      x: 0,
      y: 0,
      rows: 1,
      cols: 1,
      draggable: true,
      resizable: true
    },
    {
      uuid: 'b3d3d7cf-4c2f-42fd-ab32-73a29e8e2056',
      title: 'Alle Instrumente',
      x: 0,
      y: 1,
      rows: 1,
      cols: 1,
      draggable: true,
      resizable: true
    }
  ];

  // dashboardService and instrumentservice are not used directly here but it is necessary to put them in the constructor to initialize them
  constructor( public dashboardService: DashboardService,
               public marketdataservice: MarketDataService,
               changeDetectorRef: ChangeDetectorRef ) {
    super(changeDetectorRef);
  }

  ngOnInit() {
    this.marketdataservice.dataLoadedSubject.subscribe(
      () => {
        if (this.grid) { this.grid.refresh(); }
      })
  }
}