import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';

import { AgEditorComponent } from 'ag-grid-angular';
import { ICellRendererParams, RowNode } from 'ag-grid-community';

@Component({
  selector: 'app-dropdown-renderer',
  templateUrl: './dropdown-renderer.component.html',
  styleUrls: ['./dropdown-renderer.component.scss']
})
export class DropdownRendererComponent implements AgEditorComponent {
  params!: any;
  public countryValue: any;
  public highlightAllOnFocus: boolean = true;
  cancelBeforeStart: boolean = false;

  @ViewChild('countrySelector', { read: ViewContainerRef }) public countrySelector: any;

  agInit(params: any): void {
    console.log('ddp', params);
    this.params = params;
  }

  setInitialState(params: any) {
    let startValue;
    let highlightAllOnFocus = true;

    this.countryValue = startValue;
    this.highlightAllOnFocus = highlightAllOnFocus;
  }

  getValue(): any {
    return this.countryValue;
  }

  isCancelBeforeStart(): boolean {
    return this.cancelBeforeStart;
  }

}
