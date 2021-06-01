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
import { FormsModule } from '@angular/forms';
import { GridsterModule } from 'angular-gridster2';
import { WidgetModule } from '../widget/widget.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { InstrumentconfiguratorComponent } from './views/instrumentconfigurator/instrumentconfigurator.component';
import { InstrumentcontrollerComponent } from './views/instrumentconfigurator/components/instrumentcontroller/instrumentcontroller.component';
import { InstrumentinputformComponent } from './views/instrumentconfigurator/components/instrumentinputform/instrumentinputform.component';
import { InstrumenttableComponent } from './views/instrumentconfigurator/components/instrumenttable/instrumenttable.component';
import { InstrumentupdateformComponent } from './views/instrumentconfigurator/components/instrumentupdateform/instrumentupdateform.component';
import { MarketDataService } from './views/instrumentconfigurator/services/marketdata.service';



@NgModule({
  imports: [
    DashboardModule,
    WidgetModule,
    GridsterModule,
    CommonModule,
    FormsModule,
    NgxChartsModule,
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
  declarations: [InstrumentconfiguratorComponent, InstrumentcontrollerComponent, InstrumentinputformComponent, InstrumenttableComponent, InstrumentupdateformComponent],
  exports: [
  ],
  providers: [
    MyFinanceService, ConfigService, MyFinanceDataService, MarketDataService
  ]
})
export class MfmarketdataModule { }
