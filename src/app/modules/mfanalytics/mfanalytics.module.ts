import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import {MyFinanceService} from '../myfinance-tsclient-generated';
import {ConfigService} from '../../shared/services/config.service';
import {WidgetModule} from '../widget/widget.module';
import {DashboardModule} from '../dashboard/dashboard.module';
import {GridsterModule} from 'angular-gridster2';
import {BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDropdownModule, ButtonsModule, TabsModule } from 'ngx-bootstrap';
import {MyFinanceDataService} from '../../shared/services/myfinance-data.service';
import {ToastrModule} from 'ngx-toastr';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { AssetviewComponent } from './views/assetview/assetview.component';
import { InstrumentvaluehistoryComponent } from './views/assetview/components/instrumentvaluehistory/instrumentvaluehistory.component';
import { AssetviewcontrollerComponent } from './views/assetview/components/assetviewcontroller/assetviewcontroller.component';
import { AssetgroupviewComponent } from './views/assetview/components/assetgroupview/assetgroupview.component';
import { AssetdetailsviewComponent } from './views/assetview/components/assetdetailsview/assetdetailsview.component';
import { InstrumentvaluedetailsviewComponent } from './views/assetview/components/instrumentvaluedetailsview/instrumentvaluedetailsview.component';
import { AssetviewService } from './views/assetview/services/assetview.service';

@NgModule({
  imports: [
    AgGridModule.withComponents([]),
    DashboardModule,
    WidgetModule,
    GridsterModule,
    CommonModule,
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: true,
      iconClasses: {
        error: 'toast-error-wo-icon',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      }
    })
  ],
  declarations: [
    AssetviewComponent,
    InstrumentvaluehistoryComponent,
    AssetviewcontrollerComponent,
    AssetgroupviewComponent,
    AssetdetailsviewComponent,
    InstrumentvaluedetailsviewComponent
  ],
  exports: [
    AssetviewComponent
  ],
  providers: [
    MyFinanceService, ConfigService, MyFinanceDataService, AssetviewService
  ]
})
export class MfAnalyticsModule { }
