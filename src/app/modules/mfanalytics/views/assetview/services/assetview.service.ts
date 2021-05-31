import { Injectable } from '@angular/core';
import { DashboardService } from '../../../../dashboard/services/dashboard.service';
import { MyFinanceDataService } from '../../../../../shared/services/myfinance-data.service';
import { Instrument, InstrumentListModel, DateDoubleModel, InstrumentDetailModel, InstrumentDetails } from '../../../../myfinance-tsclient-generated';
import InstrumentTypeEnum = Instrument.InstrumentTypeEnum;
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Rx';
import { AbstractDashboardDataService } from '../../../../../shared/services/abstract-dashboard-data.service';

@Injectable()
export class AssetviewService extends AbstractDashboardDataService {

  instruments: Array<Instrument> = new Array<Instrument>();
  instrumentSubject: Subject<any> = new Subject<any>();
  instrumentDetailsSubject: Subject<any> = new Subject<any>();
  selectedinstrumentSubject: Subject<any> = new Subject<any>();
  selectedinstrument: number = -1;
  selectedTenant: Instrument;
  valueCurveSubject: Subject<any> = new Subject<any>();
  instrumentValues: DateDoubleModel;
  instrumentDetailMap: {[key: string]: InstrumentDetails};
  daterange = [new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()),
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())];
  private isValueCurveLoaded = false;
  private isInstrumentDetailsLoaded = false;
  dueday: Date;
  diffday: Date;
  accountValuemap = [
    {
      "name": "Liquid",
      "series": []
    },
    {
      "name": "ShortTerm",
      "series": []
    },
    {
      "name": "MidTerm",
      "series": []
    },
    {
      "name": "LongTerm",
      "series": []
    },
  ];
  accountDiffValuemap = [];
  budgetDiffValuemap = [];
  liquidAsset = 0.0;
  shorttermAsset = 0.0;
  midtermAsset = 0.0;
  longtermAsset = 0.0;
  budgetValuemap = [];
  budgetAsset = 0.0;
  budgetvaluechange = 0.0;
  accountAsset = 0.0;
  accountValueChange = 0.0;

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
        })
    // I don't know why but the daterange init is not working if hosted on linux. This is why we need this check again.
    if (this.daterange == null) {
      this.daterange = [new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()),
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())];
    }
    this.myFinanceService.getValueCurveForTenant(this.daterange[0], this.daterange[1])
      .subscribe(
        (values: DateDoubleModel) => {
          this.instrumentValues = values;
          this.isValueCurveLoaded = true;
          this.valueCurveSubject.next();
          this.checkDataLoadStatus();
        },
        (errResp) => {
          console.error('error', errResp);
          this.dashboardService.handleDataNotLoaded(errResp);
        })
    this.loadInstrumentDetails();
  }

  private loadInstrumentDetails(){
    if(this.dueday == null || this.diffday == null) return;
    this.myFinanceService.getInstrumentValues(this.dueday, this.diffday)
      .subscribe(
        (values: InstrumentDetailModel) => {
          this.setInstrumentDetails(values.values);
          this.isInstrumentDetailsLoaded = true;
          this.instrumentDetailsSubject.next();
          this.checkDataLoadStatus();
        },
        (errResp) => {
          console.error('error', errResp);
          this.dashboardService.handleDataNotLoaded(errResp);
        })
  }

  protected isDataLoadComplete(): boolean {
    if (this.isInstrumentLoaded && this.isValueCurveLoaded && this.isInstrumentDetailsLoaded) {
      return true;
    } else {
      return false;
    }
  }

  getValueCurve(): DateDoubleModel {

    return this.instrumentValues;
  }

  getIsValueCurveLoaded(): boolean {
    return this.isValueCurveLoaded
  }

  getIsInstrumentDetailsLoaded(): boolean {
    return this.isInstrumentDetailsLoaded
  }

  getDueday(): Date {
    return this.dueday;
  }
  setDueday(dueday: Date) {
    if(dueday == null) {
      return
    }
    if(this.dueday == null || dueday.getTime() !== this.dueday.getTime()){
      this.dueday = dueday;
      this.loadInstrumentDetails();
    }
  }

  getDiffday(): Date {
    return this.diffday;
  }
  setDiffday(diffday: Date) {
    if(diffday == null) {
      return
    }
    if(this.diffday == null || diffday.getTime() !== this.diffday.getTime()){
      this.diffday = diffday;
      this.loadInstrumentDetails();
    }
  }

  getAccountValuemap(): any[] {
    return this.accountValuemap;
  }

  getAccountDiffValuemap(): any[] {
    return this.accountDiffValuemap;
  }

  getBudgetDiffValuemap(): any[] {
    return this.budgetDiffValuemap;
  }

  getBudgetValuemap(): any[] {
    return this.budgetValuemap;
  }

  getLiquidAsset(): number {
    return this.liquidAsset;
  }

  getMidermAsset(): number {
    return this.midtermAsset;
  }

  getShorttermAsset(): number {
    return this.shorttermAsset;
  }

  getLongtermAsset(): number {
    return this.longtermAsset;
  }

  getBudgetAsset(): number {
    return this.budgetAsset;
  }

  getBudgetValueChange(): number {
    return this.budgetvaluechange;
  }

  getAccountAsset(): number {
    return this.accountAsset;
  }

  getAccountValueChange(): number {
    return this.accountValueChange;
  }

  getInstrumentDetails(): InstrumentDetails{
     return this.instrumentDetailMap[this.selectedinstrument];
  }

  setSelectedinstrument(instrumentId: number) {
    this.selectedinstrument = instrumentId;
    this.selectedinstrumentSubject.next();
  }

  private setInstrumentDetails(instrumentDetails: { [key: string]: InstrumentDetails; }) {
    this.liquidAsset = 0.0;
    this.shorttermAsset = 0.0;
    this.midtermAsset = 0.0;
    this.longtermAsset = 0.0;
    this.budgetAsset = 0.0;
    this.budgetValuemap = [];
    this.accountDiffValuemap = [];
    let liquiAssets = []
    let shorttermAssets = []
    let midtermAssets = []
    let longtermAssets = []

    this.instrumentDetailMap = instrumentDetails;

    for (const key in instrumentDetails) {
      if (instrumentDetails[key].valuemap['liquiditytype'] === 'LIQUIDE') {
        this.liquidAsset = + instrumentDetails[key].valuemap['value'] + this.liquidAsset ;
        this.setAccountDetails(instrumentDetails, key, liquiAssets, this.accountDiffValuemap);
      }
      if (instrumentDetails[key].valuemap['liquiditytype'] === 'SHORTTERM') {
        this.shorttermAsset = + instrumentDetails[key].valuemap['value'] + this.shorttermAsset;
        this.setAccountDetails(instrumentDetails, key, shorttermAssets, this.accountDiffValuemap);
      }
      if (instrumentDetails[key].valuemap['liquiditytype'] === 'MIDTERM') {
        this.midtermAsset = + instrumentDetails[key].valuemap['value'] + this.midtermAsset;
        this.setAccountDetails(instrumentDetails, key, midtermAssets, this.accountDiffValuemap);
      }
      if (instrumentDetails[key].valuemap['liquiditytype'] === 'LONGTERM') {
        this.longtermAsset = + instrumentDetails[key].valuemap['value'] + this.longtermAsset;
        this.setAccountDetails(instrumentDetails, key, longtermAssets, this.accountDiffValuemap);
      }
      if (instrumentDetails[key].valuemap['instrumenttype'] === 'BUDGET') {
        this.setAccountDetails(instrumentDetails, key, this.budgetValuemap, this.budgetDiffValuemap);
      }
      if (instrumentDetails[key].valuemap['instrumenttype'] === 'ACCOUNTPORTFOLIO') {
        this.accountValueChange = + instrumentDetails[key].valuemap['valueChange'];
        this.accountAsset = + instrumentDetails[key].valuemap['value'];
      }
      if (instrumentDetails[key].valuemap['instrumenttype'] === 'BUDGETPORTFOLIO') {
        this.budgetvaluechange = + instrumentDetails[key].valuemap['valueChange'];
        this.budgetAsset = + instrumentDetails[key].valuemap['value'];
      }
    }
    this.accountValuemap = [
      {
        "name": "Liquid:"+this.liquidAsset,
        "series": liquiAssets
      },
      {
        "name": "ShortTerm:"+this.shorttermAsset,
        "series": shorttermAssets
      },
      {
        "name": "MidTerm:"+this.midtermAsset,
        "series": midtermAssets
      },
      {
        "name": "LongTerm:"+this.longtermAsset,
        "series": longtermAssets
      },
    ];
  }

  private setAccountDetails(instrumentDetails: { [key: string]: InstrumentDetails; }, key: string, assetmap: any[], valuechangemap: any[]) {
    assetmap.push({
      'name': key + ':' + instrumentDetails[key].valuemap['description'],
      'value': instrumentDetails[key].valuemap['value']
    });
    valuechangemap.push({
      'name': key + ':' + instrumentDetails[key].valuemap['description'],
      'value': instrumentDetails[key].valuemap['valueChange']
    });
  }
}
