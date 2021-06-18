import {Injectable} from '@angular/core';
import {DashboardService} from '../../../../dashboard/services/dashboard.service';
import {MyFinanceDataService} from '../../../../../shared/services/myfinance-data.service';
import {Instrument, InstrumentListModel, InstrumentProperties, InstrumentPropertyListModel, SecuritySymbols, SymbolListModel} from '../../../../myfinance-tsclient-generated';
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
}
