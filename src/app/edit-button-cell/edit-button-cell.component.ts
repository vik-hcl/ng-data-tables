import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-edit-button-cell',
  templateUrl: './edit-button-cell.component.html',
  styleUrls: ['./edit-button-cell.component.scss']
})
export class EditButtonCellComponent {
  private params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams) {
    this.params = params;
  }

  edit() {
    this.params.api.startEditingCell({
      rowIndex: this.params.rowIndex,
      colKey: 'make'
    })
  }

}
