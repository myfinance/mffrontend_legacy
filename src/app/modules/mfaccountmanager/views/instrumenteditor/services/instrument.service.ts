import {Injectable} from '@angular/core';
import {DashboardService} from '../../../../dashboard/services/dashboard.service';
import {MyFinanceDataService} from '../../../../../shared/services/myfinance-data.service';
import {Instrument, InstrumentListModel, InstrumentProperties, InstrumentPropertyListModel} from '../../../../myfinance-tsclient-generated';
import InstrumentTypeEnum = Instrument.InstrumentTypeEnum;
import {Subject} from 'rxjs/Rx';
import {AbstractDashboardDataService} from '../../../../../shared/services/abstract-dashboard-data.service';

export class RealestateProperties {
  constructor(valdate: Date, yieldgoal: number, profit: number) {
    this.valdate=valdate;
    this.yieldgoal=yieldgoal;
    this.profit=profit;
  }
  valdate: Date; 
  yieldgoal: number; 
  profit: number;
}

@Injectable()
export class InstrumentService extends AbstractDashboardDataService {

  instruments: Array<Instrument> = new Array<Instrument>();
  instrumentSubject: Subject<any> = new Subject<any>();
  instrumentPropertySubject: Subject<any> = new Subject<any>();
  selectedinstrumentSubject: Subject<any> = new Subject<any>();
  selectedInstrument: Instrument;
  instrumentProperies: InstrumentProperties[];

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

    this.myFinanceService.getInstrumentsForTenant()
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
    return this.instruments;
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

  getRealestateProperties(): RealestateProperties[] {
    var realestateProperties: RealestateProperties[] = [];
    let currentDate: Date = null;
    let currentYieldGoal: number = 0.0;
    let currentProfit: number = 0.0;

    this.instrumentProperies.sort((a,b)=>new Date(a.validfrom).getTime()-new Date(b.validfrom).getTime()).forEach((item => {   
      currentDate = new Date(item.validfrom);
      if(item.propertyname === "YIELDGOAL") {
        currentYieldGoal = +item.value;
      } else if(item.propertyname === "REALESTATEPROFITS") {
        currentProfit = +item.value;
      }
      realestateProperties = realestateProperties.filter(e => e.valdate.getTime() != currentDate.getTime());
      realestateProperties.push(new RealestateProperties(currentDate, currentYieldGoal, currentProfit));
    } ));
    return realestateProperties;
  }

  getBudgetGroups(): Array<Instrument> {
    return this.instruments.filter(i => i.instrumentType === InstrumentTypeEnum.BUDGETGROUP);
  }

  getBudgets(): Array<Instrument> {
    return this.instruments.filter(i => i.instrumentType === InstrumentTypeEnum.BUDGET);
  }


  saveGiro(desc: string) {
    this.myFinanceService.saveGiro(desc);
  }

  updateInstrument(instrumentId: number, desc: string, isActive: boolean) {
    this.myFinanceService.updateInstrument(instrumentId, desc, isActive, 'Instrument aktualisiert')
  }

  saveBudget(desc: string, budgetGroupId: number) {
    this.myFinanceService.saveBudget(desc, budgetGroupId)
  }

  saveRealEstate(desc: string, valueBudgetId: number, yieldgoals: string[], profits: string[]) {
    this.myFinanceService.saveRealEstate(desc, valueBudgetId, yieldgoals, profits);
  }

  updateRealEstate(instrumentId: number, desc: string, yieldgoals: string[], profits: string[], isActive: boolean) {
    this.myFinanceService.updateRealEstate(instrumentId, desc, isActive, yieldgoals, profits);
  }

  saveCurrency(desc: string, currencyCode: string) {
    this.myFinanceService.saveCurrency(desc, currencyCode);
  }

  setSelectedInstrument(instrument: Instrument) {
    this.selectedInstrument = instrument;
    this.selectedinstrumentSubject.next()
  }

  getSelectedInstrument(): Instrument {
    return this.selectedInstrument
  }
}
