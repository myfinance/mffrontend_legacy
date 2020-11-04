import {Injectable} from '@angular/core';
import {AbstractDashboardDataService} from '../../../../../shared/services/abstract-dashboard-data.service';
import {
  Instrument,
  InstrumentListModel, RecurrentTransaction,
} from '../../../../myfinance-tsclient-generated';
import {MyFinanceDataService} from '../../../../../shared/services/myfinance-data.service';
import {DashboardService} from '../../../../dashboard/services/dashboard.service';
import InstrumentTypeEnum = Instrument.InstrumentTypeEnum;
import RecurrentfrequenceEnum = RecurrentTransaction.RecurrentfrequenceEnum;

@Injectable()
export class RecurrentTransactionService extends AbstractDashboardDataService {


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
    this.myFinanceService.getInstruments()
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
    if (this.isInstrumentLoaded ) {
      return true;
    } else {
      return false;
    }
  }

  getGiros(): Array<Instrument> {
    return this.instruments.filter(i => i.instrumentType === InstrumentTypeEnum.Giro);
  }

  getBudgets(): Array<Instrument> {
    return this.instruments.filter(i => i.instrumentType === InstrumentTypeEnum.Budget);
  }

  saveRecurrentTransaction(desc: string, srcInstrumentId: number, trgInstrumentId: number,
                           recurrentFrequency: RecurrentfrequenceEnum, value: number, transactionDate: Date) {
    this.myFinanceService.saveRecurrentTransfer(desc, srcInstrumentId, trgInstrumentId, value, transactionDate, recurrentFrequency);
  }
}
