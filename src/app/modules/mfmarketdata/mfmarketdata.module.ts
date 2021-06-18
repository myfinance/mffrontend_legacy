import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFinanceDataService } from '../../shared/services/myfinance-data.service';
import { ConfigService } from '../../shared/services/config.service';
import { MyFinanceService } from '../myfinance-tsclient-generated';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridsterModule } from 'angular-gridster2';
import { WidgetModule } from '../widget/widget.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { MarketDataConfiguratorComponent } from './views/instrumentconfigurator/marketdataconfigurator.component';
import { MarketInstrumentInputformComponent } from './views/instrumentconfigurator/components/marketinstrumentinputform/marketinstrumentinputform.component';
import { MarketInstrumentTableComponent } from './views/instrumentconfigurator/components/marketinstrumenttable/marketinstrumenttable.component';
import { MarketInstrumentUpdateformComponent } from './views/instrumentconfigurator/components/marketinstrumentupdateform/marketinstrumentupdateform.component';
import { MarketDataService } from './views/instrumentconfigurator/services/marketdata.service';
import { MarketDataControllerComponent } from './views/instrumentconfigurator/components/marketdatacontroller/marketdatacontroller.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  imports: [
    DashboardModule,
    WidgetModule,
    GridsterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    NgxChartsModule,
    NgxDatatableModule,
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
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
  declarations: [MarketDataConfiguratorComponent, MarketDataControllerComponent, MarketInstrumentInputformComponent, MarketInstrumentTableComponent, MarketInstrumentUpdateformComponent],
  exports: [
  ],
  providers: [
    MyFinanceService, ConfigService, MyFinanceDataService, MarketDataService
  ]
})
export class MfmarketdataModule { }
