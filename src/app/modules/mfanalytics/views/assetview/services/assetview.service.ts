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
  selectedTenant: Instrument;
  valueCurveSubject: Subject<any> = new Subject<any>();
  instrumentValues: DateDoubleModel;
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
    this.dueday = dueday;
  }

  getDiffday(): Date {
    return this.diffday;
  }
  setDiffday(diffday: Date) {
    this.diffday = diffday;
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

  getAccountAsset(): number {
    return (this.liquidAsset + this.midtermAsset + this.shorttermAsset + this.longtermAsset);
  }

  private setInstrumentDetails(instrumentDetails: { [key: string]: InstrumentDetails; }) {
    this.liquidAsset = 0.0;
    this.shorttermAsset = 0.0;
    this.midtermAsset = 0.0;
    this.longtermAsset = 0.0;
    this.budgetAsset = 0.0;
    this.accountValuemap = [
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
    this.budgetValuemap = [];
    this.accountDiffValuemap = [];
    for (const key in instrumentDetails) {
      if (instrumentDetails[key].valuemap['liquiditytype'] === 'LIQUIDE') {
        this.liquidAsset = + instrumentDetails[key].valuemap['value'];
        this.setAccountDetails(instrumentDetails, key, 0);
      }
      if (instrumentDetails[key].valuemap['liquiditytype'] === 'SHORTTERM') {
        this.shorttermAsset = + instrumentDetails[key].valuemap['value'];
        this.setAccountDetails(instrumentDetails, key, 1);
      }
      if (instrumentDetails[key].valuemap['liquiditytype'] === 'MIDTERM') {
        this.midtermAsset = + instrumentDetails[key].valuemap['value'];
        this.setAccountDetails(instrumentDetails, key, 2);
      }
      if (instrumentDetails[key].valuemap['liquiditytype'] === 'LONGTERM') {
        this.longtermAsset = + instrumentDetails[key].valuemap['value'];
        this.setAccountDetails(instrumentDetails, key, 3);
      }
      if (instrumentDetails[key].valuemap['instrumenttype'] === 'Budget') {
        this.budgetAsset = + instrumentDetails[key].valuemap['value'];
        this.budgetValuemap.push({
          'name': instrumentDetails[key].valuemap['description'],
          'value': instrumentDetails[key].valuemap['value']
        });
        this.budgetDiffValuemap.push({
          'name': instrumentDetails[key].valuemap['description'],
          'value': instrumentDetails[key].valuemap['valueChange']
        });
      }
    }

  }


  private setAccountDetails(instrumentDetails: { [key: string]: InstrumentDetails; }, key: string, mapId: number) {
    this.accountValuemap[mapId].series.push({
      'name': instrumentDetails[key].valuemap['description'],
      'value': instrumentDetails[key].valuemap['value']
    });
    this.accountDiffValuemap.push({
      'name': instrumentDetails[key].valuemap['description'],
      'value': instrumentDetails[key].valuemap['valueChange']
    });
  }
}
