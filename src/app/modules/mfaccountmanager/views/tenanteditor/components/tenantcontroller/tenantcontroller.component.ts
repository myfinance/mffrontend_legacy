import {Component, OnDestroy, OnInit} from '@angular/core';
import {TenantService} from '../../services/tenant.service';
import {Instrument} from '../../../../../myfinance-tsclient-generated';

@Component({
  selector: 'app-tenantcontroller',
  templateUrl: './tenantcontroller.component.html',
  styleUrls: ['./tenantcontroller.component.scss']
})
export class TenantcontrollerComponent implements OnInit {

  noTenantSelected = true;
  selectedTenant: Instrument

  constructor(private tenantservice: TenantService) { }

  ngOnInit() {
    this.tenantservice.selectedinstrumentSubject.subscribe(
      () => {
        this.updateSelectedTenant()
      }
    )
  }

  updateSelectedTenant() {
    console.log('updateSelectedTenant')
    this.selectedTenant = this.tenantservice.getSelectedTenant()
    if (this.selectedTenant) { this.noTenantSelected = false; }
  }

  getSelectedTenantId(): number {
      if (!this.selectedTenant) { return 0; } else { return this.selectedTenant.instrumentid; }
  }
}
