import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractDashboard} from '../../../dashboard/abstract-dashboard';
import {DashboardService} from '../../../dashboard/services/dashboard.service';
import { MarketDataService } from './services/marketdata.service';


@Component({
  selector: 'app-marketdataconfigurator',
  templateUrl: './marketdataconfigurator.component.html',
  styleUrls: ['./marketdataconfigurator.component.scss']
})
export class MarketDataConfiguratorComponent extends AbstractDashboard implements OnInit {

  title = 'Instruments';
  view = 'fit';

  widgets = [
    {
      uuid: '06bd164a-17aa-4a75-85bb-72b010931d5b',
      title: 'editor',
      x: 0,
      y: 0,
      rows: 1,
      cols: 1,
      draggable: true,
      resizable: true
    },
    {
      uuid: '4ebcb0f3-295b-4b06-a14a-5e085eef8f72',
      title: 'Controller',
      x: 1,
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
    },
    {
      uuid: 'b90f6647-3d26-4acf-93fd-d583b82bf4f1',
      title: 'Preise',
      x: 1,
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