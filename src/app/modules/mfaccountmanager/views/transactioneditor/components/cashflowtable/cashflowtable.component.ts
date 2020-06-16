import {Component, Input, OnInit} from '@angular/core';
import {GridApi, GridOptions} from 'ag-grid-community';
import {TransactionService} from '../../services/transaction.service';


@Component({
  selector: 'app-cashflowtable',
  templateUrl: './cashflowtable.component.html',
  styleUrls: ['./cashflowtable.component.scss']
})
export class CashflowtableComponent  implements OnInit {

  @Input() data: any;

  options: GridOptions;
  private gridApi;

  title = 'cashflows';


  constructor( private transactionservice: TransactionService) {
    this.transactionservice.transactionSubject.subscribe(
      () => {
        this.loadData()}
    );
    this.transactionservice.transactionFilterSubject.subscribe(
      () => {
        this.loadData()}
    )
  }

  ngOnInit() {
    this.options = <GridOptions>{
      context: {parentComponent: this},
      rowSelection: 'single',
      floatingFilter: true,
      resizeable: true,
      sortable: true,
      onGridReady: (params) => this.onGridReady(params),
      suppressPropertyNamesCheck: true,
      columnDefs: [
        {headerName: 'Id', field: 'cashflowId', filter: true },
        {headerName: 'value', field: 'value', filter: true},
        {headerName: 'Instrument', field: 'instrument', filter: true},
        {headerName: 'TransactionId', field: 'transactionId', filter: true }
      ]
    };
  }

  private loadData(): void {
    if (this.gridApi) {
      this.gridApi.setRowData(this.transactionservice.getCashflows());
    }
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    if (this.transactionservice.getIsInit()) {
      this.loadData();
    }
  }
}
