import { Injectable } from '@angular/core';
import { AbstractDashboardDataService } from '../../../../../shared/services/abstract-dashboard-data.service';
import { InstrumentListModel, Instrument } from '../../../../myfinance-tsclient-generated';
import { MyFinanceDataService } from '../../../../../shared/services/myfinance-data.service';
import { DashboardService } from '../../../../dashboard/services/dashboard.service';
import { Subject } from 'rxjs';

@Injectable()
export class ExpensesmassloadService extends AbstractDashboardDataService {

  instruments: Array<Instrument> = new Array<Instrument>();
  instrumentSubject: Subject<any> = new Subject<any>();
  contentSubject: Subject<any> = new Subject<any>();
  content = [];


  constructor(protected myFinanceService: MyFinanceDataService, public dashboardService: DashboardService) {
    super(myFinanceService, dashboardService);
  }
  protected loadDataCall() {
    if (this.myFinanceService.getIsInit()) {
      this.loadData();
    }
    this.myFinanceService.configSubject.subscribe(
      () => {
        this.loadData()
      }
    )
    // subscribe to all instrument updates
    this.myFinanceService.instrumentSubject.subscribe(
      () => {
        this.loadData()
      }
    )
  }

  protected loadData(): void {
    this.dashboardService.handleDataPreparing();
    this.loadInstruments();
  }

  protected loadInstruments(): void {
    this.isInstrumentLoaded = false;
    this.myFinanceService.getActiveInstrumentsForTenant()
      .subscribe(
        (instruments: InstrumentListModel) => {
          this.instruments = instruments.values;
          this.instrumentSubject.next();
          this.isInstrumentLoaded = true;
          this.checkDataLoadStatus();
        },
        (errResp) => {
          console.error('error', errResp);
          this.dashboardService.handleDataNotLoaded(errResp);
        })
  }

  protected isDataLoadComplete(): boolean {
    if (this.isInstrumentLoaded) {
      return true;
    } else {
      return false;
    }
  }

  setContent(content: string[]) {
    this.content = content;
    this.contentSubject.next();
  }

  getContent() : string[] {
    return this.content;
  }


}

