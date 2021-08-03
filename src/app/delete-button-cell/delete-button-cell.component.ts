import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-delete-button-cell',
  templateUrl: './delete-button-cell.component.html',
  styleUrls: ['./delete-button-cell.component.scss']
})
export class DeleteButtonCellComponent {
  private params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
      this.params = params;
  }

  refresh(params: ICellRendererParams) {
      this.params = params;
  }

  buttonClicked() {
    const selectedData = this.params.node.data;
    this.params.api.updateRowData({
      remove: [selectedData]
    });
  }

}
