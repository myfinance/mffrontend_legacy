import {Injectable} from '@angular/core';
import {AbstractDashboardDataService} from '../../../../../shared/services/abstract-dashboard-data.service';
import {
  Instrument,
  InstrumentListModel, InstrumentModel, RecurrentTransaction, RecurrentTransactionListModel, Transaction, TransactionListModel,
} from '../../../../myfinance-tsclient-generated';
import {MyFinanceDataService} from '../../../../../shared/services/myfinance-data.service';
import {DashboardService} from '../../../../dashboard/services/dashboard.service';
import InstrumentTypeEnum = Instrument.InstrumentTypeEnum;
import RecurrentfrequenceEnum = RecurrentTransaction.RecurrentfrequenceEnum;
import {Subject} from 'rxjs/Rx';

@Injectable()
export class RecurrentTransactionService extends AbstractDashboardDataService {

  private budgetGroupFilter = -1;
  private incomeBudget: Instrument;
  private isIncomeBudgetLoaded = false;
  private isRecurrentTransactionLoaded = false;
  private recurrenttransactions: Array<RecurrentTransaction> = new Array<RecurrentTransaction>();
  recurrentTransactionSubject: Subject<any> = new Subject<any>();

  constructor(protected myFinanceService: MyFinanceDataService, public dashboardService: DashboardService) {
    super(myFinanceService, dashboardService);
  }

  protected loadDataCall() {
    if (this.myFinanceService.getIsInit()) {
      this.loadData();
    }
    this.myFinanceService.configSubject.subscribe(
      () => {
        this.loadData();
        this.loadRecurrentTransactions();
      }
    )
    // subscribe to all instrument updates
    this.myFinanceService.instrumentSubject.subscribe(
      () => {
        this.loadData();
      }
    )
    // subscribe to all transaction updates
    this.myFinanceService.recurrentTransactionSubject.subscribe(
      () => {
        this.dashboardService.handleDataPreparing();
        this.loadRecurrentTransactions();
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
          this.setBudgetGroupfilter(this.getBudgetGroups()[0].instrumentid);
          this.instrumentSubject.next();
          this.isInstrumentLoaded = true;
          this.checkDataLoadStatus();
        },
        (errResp) => {
          console.error('error', errResp);
          this.dashboardService.handleDataNotLoaded(errResp);
        })
  }

  private loadRecurrentTransactions() {
    this.isRecurrentTransactionLoaded = false;
    this.myFinanceService.getRecurrentTransactions()
      .subscribe(
        (recurrentTransactions: RecurrentTransactionListModel) => {
          this.recurrenttransactions = recurrentTransactions.values;
          this.recurrentTransactionSubject.next();
          this.isRecurrentTransactionLoaded = true;
          this.checkDataLoadStatus();
        },
        (errResp) => {
          console.error('error', errResp);
          this.dashboardService.handleDataNotLoaded(errResp);

        })
  }

  protected isDataLoadComplete(): boolean {
    if (this.isInstrumentLoaded && this.isIncomeBudgetLoaded && this.isRecurrentTransactionLoaded) {
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

  getExpenseBudgets(): Array<Instrument> {
    const expenseBudgets =
      this.instruments.filter(i => i.instrumentType === InstrumentTypeEnum.Budget && i.instrumentid !== this.incomeBudget.instrumentid);
    return expenseBudgets;
  }

  getIncomeBudget(): Instrument {
    return this.incomeBudget;
  }

  saveRecurrentTransaction(desc: string, srcInstrumentId: number, trgInstrumentId: number,
                           recurrentFrequency: RecurrentfrequenceEnum, value: number, transactionDate: Date) {
    this.myFinanceService.saveRecurrentTransfer(desc, srcInstrumentId, trgInstrumentId, value, transactionDate, recurrentFrequency);
  }

  getBudgetGroups(): Array<Instrument> {
    return this.instruments.filter(i => i.instrumentType === InstrumentTypeEnum.BudgetGroup );
  }

  setBudgetGroupfilter(instrumentid: number) {
    this.isIncomeBudgetLoaded = false;
    this.budgetGroupFilter = instrumentid;
    this.myFinanceService.getIncomeBudgetForBudgetGroup(this.budgetGroupFilter).subscribe(
      (instrument: InstrumentModel) => {
        this.incomeBudget = instrument.value;
        this.isIncomeBudgetLoaded = true;
        this.checkDataLoadStatus();
      },
      (errResp) => {
        console.error('error', errResp);
        this.dashboardService.handleDataNotLoaded(errResp);
      })
    // this.applyBudgetGroup();
  }

  getBudgetGroupfilter(): number {
    return this.budgetGroupFilter;
  }

  getRecurrentTransactions(): Array<RecurrentTransaction> {
    return this.recurrenttransactions;
  }
}
