import {Injectable} from '@angular/core';
import {DashboardService} from '../../../../dashboard/services/dashboard.service';
import {MyFinanceDataService} from '../../../../../shared/services/myfinance-data.service';
import {Instrument, InstrumentListModel, DateDoubleModel} from '../../../../myfinance-tsclient-generated';
import InstrumentTypeEnum = Instrument.InstrumentTypeEnum;
import {HttpErrorResponse} from '@angular/common/http';
import {Subject} from 'rxjs/Rx';
import {AbstractDashboardDataService} from '../../../../../shared/services/abstract-dashboard-data.service';

@Injectable()
export class AssetviewService extends AbstractDashboardDataService {

  instruments: Array<Instrument> = new Array<Instrument>();
  instrumentSubject: Subject<any> = new Subject<any>();
  selectedinstrumentSubject: Subject<any> = new Subject<any>();
  selectedTenant: Instrument;
  valueCurveSubject: Subject<any> = new Subject<any>();
  instrumentValues: DateDoubleModel;
  daterange = [new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()),
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())];
  private isValueCurveLoaded = false;

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
  }

  protected isDataLoadComplete(): boolean {
    if (this.isInstrumentLoaded && this.isValueCurveLoaded) {
      return true;
    } else {
      return false;
    }
  }

  getValueCurve(): DateDoubleModel {

    return this.instrumentValues;
  }

  getIsValueCurveLoaded():boolean {
    return this.isValueCurveLoaded
  }

}
