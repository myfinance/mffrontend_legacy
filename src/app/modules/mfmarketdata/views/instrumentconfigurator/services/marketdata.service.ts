import {Injectable} from '@angular/core';
import {DashboardService} from '../../../../dashboard/services/dashboard.service';
import {MyFinanceDataService} from '../../../../../shared/services/myfinance-data.service';
import {DateDoubleModel, Instrument, InstrumentListModel, InstrumentProperties, InstrumentPropertyListModel, SecuritySymbols, SymbolListModel} from '../../../../myfinance-tsclient-generated';
import InstrumentTypeEnum = Instrument.InstrumentTypeEnum;
import {Subject} from 'rxjs/Rx';
import {AbstractDashboardDataService} from '../../../../../shared/services/abstract-dashboard-data.service';


@Injectable()
export class MarketDataService extends AbstractDashboardDataService {

  instruments: Array<Instrument> = new Array<Instrument>();
  instrumentSubject: Subject<any> = new Subject<any>();
  instrumentPropertySubject: Subject<any> = new Subject<any>();
  selectedinstrumentSubject: Subject<any> = new Subject<any>();
  selectedInstrument: Instrument;
  instrumentProperies: InstrumentProperties[];
  symbols: SecuritySymbols[];
  symbolSubject: Subject<any> = new Subject<any>();
  valueCurveSubject: Subject<any> = new Subject<any>();
  private isValueCurveLoaded = false;
  instrumentValues: DateDoubleModel;
  startdate = new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate());
  enddate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

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

    this.myFinanceService.getInstruments()
      .subscribe(
        (instruments: InstrumentListModel) => {
          this.instruments = instruments.values;
          this.instrumentSubject.next();
          this.isInstrumentLoaded = true;
          this.checkDataLoadStatus();
        },
        (errResp) => {
          this.myFinanceService.printError(errResp);
          this.dashboardService.handleDataNotLoaded(errResp);

        });
  }

  protected isDataLoadComplete(): boolean {
    if (this.isInstrumentLoaded) {
      return true;
    } else {
      return false;
    }
  }

  getInstruments(): Array<Instrument> {
    return this.instruments.filter(i => i.instrumentType === InstrumentTypeEnum.CURRENCY || i.instrumentType === InstrumentTypeEnum.EQUITY);
  }

  getCurrencies(): Array<Instrument> {
    return this.instruments.filter(i => i.instrumentType === InstrumentTypeEnum.CURRENCY);
  }

  loadInstrumentProperties(instrumentId: number) : void{
    this.myFinanceService.getInstrumentProperties(instrumentId)
    .subscribe(
      (instrumentProperties: InstrumentPropertyListModel) => {
        this.instrumentProperies = instrumentProperties.values;
        this.instrumentPropertySubject.next();
      },
      (errResp) => {
        this.myFinanceService.printError(errResp);
        this.dashboardService.handleDataNotLoaded(errResp);

      });
  }

  updateInstrument(instrumentId: number, desc: string, isActive: boolean) {
    this.myFinanceService.updateInstrument(instrumentId, desc, isActive, 'Instrument aktualisiert')
  }

  saveCurrency(desc: string, currencyCode: string) {
    this.myFinanceService.saveCurrency(desc, currencyCode);
  }

  saveEquity(desc: string, isin: string, symbols: string[]) {
    this.myFinanceService.saveEquity(desc, isin, symbols);
  }

  importPrices() {
    this.myFinanceService.importPrices();
  }

  setSelectedInstrument(instrument: Instrument) {
    this.selectedInstrument = instrument;
    this.selectedinstrumentSubject.next()
    this.loadValueCurve(instrument);
  }

  loadValueCurve(instrument: Instrument) {
    this.myFinanceService.getValueCurve(instrument.instrumentid, this.startdate, this.enddate)
    .subscribe(
      (values: DateDoubleModel) => {
        this.instrumentValues = values;
        this.isValueCurveLoaded = true;
        this.valueCurveSubject.next();
      },
      (errResp) => {
        this.myFinanceService.printError(errResp);
        this.dashboardService.handleDataNotLoaded(errResp);

      });
  }

  getStartDate(): Date {
    return this.startdate;
  }

  setStartDate(startdate: Date) {
    if(startdate == null) {
      return
    }
    if(this.startdate == null || startdate.getTime() !== this.startdate.getTime()){
      this.startdate = startdate;
      if(this.selectedInstrument!=null) {
        this.loadValueCurve(this.selectedInstrument);
      }
    }
  }

  getEndDate(): Date {
    return this.enddate;
  }

  setEndDate(enddate: Date) {
    if(enddate == null) {
      return
    }
    if(this.enddate == null || enddate.getTime() !== this.enddate.getTime()){
      this.enddate = enddate;
      if(this.selectedInstrument!=null) {
        this.loadValueCurve(this.selectedInstrument);
      }
    }
  }

  getSelectedInstrument(): Instrument {
    return this.selectedInstrument
  }

  getInstrumentSymbols(): SecuritySymbols[] {
    return this.symbols;
  }

  loadInstrumentSymbols(isin: string) : void{
    this.myFinanceService.getInstrumentSymbols(isin)
    .subscribe(
      (symbol: SymbolListModel) => {
        this.symbols = symbol.values;
        this.symbolSubject.next();
      },
      (errResp) => {
        this.myFinanceService.printError(errResp);
        this.dashboardService.handleDataNotLoaded(errResp);

      });
  }

  getIsValueCurveLoaded(): boolean {
    return this.isValueCurveLoaded
  }

  getValueCurve(): DateDoubleModel {

    return this.instrumentValues;
  }
}
