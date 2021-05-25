import {Injectable} from '@angular/core';
import {DashboardService} from '../../../../dashboard/services/dashboard.service';
import {MyFinanceDataService} from '../../../../../shared/services/myfinance-data.service';
import {
  Cashflow,
  DateDoubleModel,
  Instrument,
  InstrumentListModel,
  Transaction,
  TransactionListModel
} from '../../../../myfinance-tsclient-generated';
import * as moment from 'moment';
import InstrumentTypeEnum = Instrument.InstrumentTypeEnum;
import {AbstractDashboardDataService} from '../../../../../shared/services/abstract-dashboard-data.service';
import {Observable, Subject} from 'rxjs/Rx';

interface MyCashflow {
  transactionId: number;
  cashflowId: number;
  value: number;
  instrument: string;
}


@Injectable()
export class TransactionService extends AbstractDashboardDataService {

  transactions: Array<Transaction> = new Array<Transaction>();
  filteredTransactions: Array<Transaction> = new Array<Transaction>();
  filteredCashflows: Array<MyCashflow> = new Array<MyCashflow>();
  instruments: Array<Instrument> = new Array<Instrument>();
  transactionSubject: Subject<any> = new Subject<any>();
  transactionFilterSubject: Subject<any> = new Subject<any>();
  valueCurveSubject: Subject<any> = new Subject<any>();
  instrumentSubject: Subject<any> = new Subject<any>();
  instrumentValues: DateDoubleModel;
  private isTransactionLoaded = false;
  daterange = [new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()),
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())];
  private transactionfilter = -1;
  private instrumentfilter = -1;


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
    // subscribe to all transaction updates
    this.myFinanceService.transactionSubject.subscribe(
      () => {
        this.dashboardService.handleDataPreparing();
        this.loadTransactions();
      }
    )
  }

  protected loadData(): void {
    this.dashboardService.handleDataPreparing();
    this.loadTransactions();
    this.loadInstruments();
  }

  private loadTransactions() {
    this.isTransactionLoaded = false;
    // I don't know why but the daterange init is not working if hosted on linux. This is why we need this check again.
    if (this.daterange == null) {
      this.daterange = [new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()),
        new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())];
    }
    this.myFinanceService.getTransactions(this.daterange[0], this.daterange[1])
      .subscribe(
        (transactions: TransactionListModel) => {
          this.transactions = transactions.values;
          this.applyTransactionfilter();
          this.transactionSubject.next();
          this.isTransactionLoaded = true;
          this.checkDataLoadStatus();
        },
        (errResp) => {
          console.error('error', errResp);
          this.dashboardService.handleDataNotLoaded(errResp);

        })
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
    if (this.isInstrumentLoaded && this.isTransactionLoaded) {
      return true;
    } else {
      return false;
    }
  }

  getTransactions(): Array<Transaction> {
    return this.filteredTransactions;
  }

  getCashflows(): Array<MyCashflow> {
    return this.filteredCashflows
  }

  private applyTransactionfilter() {
    this.filteredTransactions = new Array<Transaction>();
    this.filteredCashflows = new Array<MyCashflow>();

    // apply filter on transactions
    const transactionsFirstFilter =
      this.transactions.filter(i => moment(i.transactiondate, 'YYYY-MM-DD').isSameOrAfter(this.daterange[0]) &&
      moment(i.transactiondate, 'YYYY-MM-DD').isSameOrBefore(this.daterange[1]));

    if (this.instrumentfilter !== -1) {
      transactionsFirstFilter.forEach(x => x.cashflows.forEach(c => {
        if (c.instrument.instrumentid === this.instrumentfilter) {
          this.filteredTransactions.push(x)
        }
      }))
    } else {
      // just clone the array - no change
      this.filteredTransactions = [...transactionsFirstFilter];
    }

    // update filteredCashflows and apply the transactionfilter for cashflows only(this filter is not for transactions. it dosn't make
    // sense to apply a filter on one transactionid then only one transaction is displayed)
    this.filteredTransactions.filter(i => this.getTransactionfilter() === -1 || i.transactionid === this.getTransactionfilter()).
    forEach(x => x.cashflows.forEach(c => {
      this.filteredCashflows.push({
        transactionId: x.transactionid,
        value: c.value,
        cashflowId: c.cashflowid,
        instrument: c.instrument.description })
    }));
  }

  getInstruments(): Array<Instrument> {
    return this.instruments.filter(i => i.instrumentType === InstrumentTypeEnum.GIRO || i.instrumentType === InstrumentTypeEnum.BUDGET );
  }

  getGiros(): Array<Instrument> {
    return this.instruments.filter(i => i.instrumentType === InstrumentTypeEnum.GIRO);
  }

  getLinkableAccounts(): Array<Instrument> {
    return this.instruments.filter(i => i.instrumentType === InstrumentTypeEnum.REALESTATE);
  }

  getBudgets(): Array<Instrument> {
    return this.instruments.filter(i => i.instrumentType === InstrumentTypeEnum.BUDGET);
  }

  setDaterange(daterange: Array<Date>) {
    if (daterange != null && (this.daterange == null || daterange[0] !== this.daterange[0] || daterange[1] !== this.daterange[1])) {
      this.daterange = daterange;
      this.dashboardService.handleDataPreparing();
      this.loadTransactions();
    }
  }

  getDaterange(): Array<Date> {
    return this.daterange;
  }

  getTransactionfilter(): number {
    return this.transactionfilter;
  }
  setTransactionfilter(transactionfilter: number) {
    this.transactionfilter = transactionfilter;
    this.applyTransactionfilter();
    this.transactionFilterSubject.next();
  }

  setInstrumentfilter(instrumentid: number) {
    this.instrumentfilter = instrumentid;
    this.applyTransactionfilter();
    this.myFinanceService.getValueCurve(this.instrumentfilter, this.daterange[0], this.daterange[1])
      .subscribe(
        (values: DateDoubleModel) => {
          this.instrumentValues = values;
          this.valueCurveSubject.next();
        },
        (errResp) => {
          console.error('error', errResp);
          this.dashboardService.handleDataNotLoaded(errResp);
        })
    this.transactionFilterSubject.next();
  }

  getInstrumentfilter(): number {
    return this.instrumentfilter;
  }

  getValueCurve(): DateDoubleModel {

    return this.instrumentValues;
  }

  clearFilter() {
    this.transactionfilter = -1;
    this.instrumentfilter = -1;
    this.applyTransactionfilter();
    this.transactionFilterSubject.next();
  }

  saveIncomeExpenses(desc: string, srcInstrumentId: number, trgInstrumentId: number, value: number, transactionDate: Date, isLinked: Boolean, linkedAccId: number) {
    if(isLinked) {
      this.myFinanceService.saveLinkedIncomeExpenses(desc, srcInstrumentId, linkedAccId, trgInstrumentId, value, transactionDate);
    } else if(!isLinked){
      this.myFinanceService.saveIncomeExpenses(desc, srcInstrumentId, trgInstrumentId, value, transactionDate);
    }
  }

  saveTransfer(desc: string, srcInstrumentId: number, trgInstrumentId: number, value: number, transactionDate: Date) {
    this.myFinanceService.saveTransfer(desc, srcInstrumentId, trgInstrumentId, value, transactionDate);
  }

  updateTransaction(desc: string, transactionId: number, value: number, transactionDate: Date) {
    this.myFinanceService.updateTransactions(desc, transactionId, value, transactionDate);
  }

  deleteTransaction(transactionId: number) {
    this.myFinanceService.deleteTransaction(transactionId);
  }
}
