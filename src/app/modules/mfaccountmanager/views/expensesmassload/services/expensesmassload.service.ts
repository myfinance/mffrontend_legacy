import { Injectable } from '@angular/core';
import { AbstractDashboardDataService } from '../../../../../shared/services/abstract-dashboard-data.service';
import { InstrumentListModel, Instrument } from '../../../../myfinance-tsclient-generated';
import { MyFinanceDataService } from '../../../../../shared/services/myfinance-data.service';
import { DashboardService } from '../../../../dashboard/services/dashboard.service';
import InstrumentTypeEnum = Instrument.InstrumentTypeEnum;
import { Subject } from 'rxjs';

@Injectable()
export class ExpensesmassloadService extends AbstractDashboardDataService {

  instruments: Array<Instrument> = new Array<Instrument>();
  budgets: Array<Instrument> = new Array<Instrument>();
  giros: Array<Instrument> = new Array<Instrument>();
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
          this.budgets = this.instruments.filter(i => i.instrumentType === InstrumentTypeEnum.BUDGET);
          this.giros = this.instruments.filter(i => i.instrumentType === InstrumentTypeEnum.GIRO);
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
    if(this.content != null && this.content.length>0) {
      this.content.forEach( i=> i[4] = this.budgets[0]);
    }
    this.contentSubject.next();
  }

  getContent() : string[] {
    return this.content;
  }

  getInstruments(): Array<Instrument> {
    return this.instruments;
  }

  getBudgets(): Array<Instrument> {
    return this.budgets;
  }

  getGiros(): Array<Instrument> {
    return this.giros;
  }

  save(content: any[], giro: Instrument ) {
    content.filter(i=>i[5]==null || i[5]==="true").forEach(element => {
      let datestring= element[1] as string;
      let valuestring= element[3] as string;
      let value: number = +valuestring.replace(',', '.');
      let theDate = new Date(datestring.substr(6,4) + "-" + datestring.substr(3,2) + "-" + datestring.substr(0,2));
      this.myFinanceService.saveIncomeExpenses("test", giro.instrumentid, element[4].instrumentid, value, theDate);
    });
  }
}

